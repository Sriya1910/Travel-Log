import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import multer from 'multer';
import path from 'path';
const app= express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
const db= mysql.createConnection(
    {
        host:"localhost",
        port:'3306',
        user:"root",
        password:"191003",
        database:"travel_log"
    }
)
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});
app.post("/signup", (req, res) => {
    const userInsertSql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    const userValues = [req.body.name, req.body.email, req.body.password];

    db.query(userInsertSql, userValues, (err, userData) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error inserting user data" });
        } else {
            const logsTableSql = `CREATE TABLE \`${req.body.email}_logs\` (
                logid INT AUTO_INCREMENT PRIMARY KEY,
                place VARCHAR(50) NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
                user_experience VARCHAR(600) NOT NULL,
                image_1 VARCHAR(255),
                image_2 VARCHAR(255),
                image_3 VARCHAR(255),
                isprivate varchar(15) DEFAULT 'private'
            )`;

            const wishlistTableSql = `CREATE TABLE \`${req.body.email}_wishlist\` (
                wishlistid INT AUTO_INCREMENT PRIMARY KEY,
                place VARCHAR(50) UNIQUE,
                month VARCHAR(20) NOT NULL,
                year VARCHAR(4) NOT NULL
            )`;

            db.query(logsTableSql, (logsTableErr) => {
                if (logsTableErr) {
                    console.error(logsTableErr);
                    return res.status(500).json({ error: "Error creating logs table" });
                } else {
                    db.query(wishlistTableSql, (wishlistTableErr) => {
                        if (wishlistTableErr) {
                            console.error(wishlistTableErr);
                            return res.status(500).json({ error: "Error creating wishlist table" });
                        } else {
                            console.log("Successfully created tables");
                            return res.status(200).json({ message: "Signup successful", userData });
                        }
                    });
                }
            });
        }
    });
});

app.post("/", (req, res) => {
    const sql = "SELECT isAdmin FROM user WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        if (data.length > 0) {
            const isAdmin = data[0].isAdmin; // Extract isAdmin value from the first row of the result
            console.log("isAdmin:", isAdmin);
            return res.json(isAdmin);
        } else {
            return res.json({success:false}); // Send null if user not found
        }
    });
});

 //to make images accessible for webpage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

app.post('/addlog', upload.single('image'), (req, res) => {
  // Retrieve other form fields
  const { place, startDate, endDate, logType, experience } = req.body;
  const image = req.file.filename;
  console.log(image); // Join filenames with comma

  // Proceed with database insertion
  const sql = `INSERT INTO \`${req.body.username}_logs\` (place, start_date, end_date, user_experience, image_1, isprivate) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [place, startDate, endDate, experience, image, logType], (err, result) => {
    if (err) {
      console.error("Error adding log:", err);
      return res.status(500).json({ status: "error", message: "Failed to add log" });
    }
    return res.status(200).json({ status: "success", message: "Log added successfully" });
  });
});
app.post('/deletelog',(req,res)=>{
     const username = req.query.username; // Extract username from query parameters
  const { place, startDate, endDate } = req.body;
  console.log(req.body);

    const sql=`delete from \`${username}_logs\` where place=? and start_date=? and end_date=?`
    db.query(sql, [place, startDate, endDate], (err) => {
    if (err) {
      console.error("Error deleting log:", err);
      return res.status(500).json({ status: "error", message: "Failed to delete log" });
    }
    return res.status(200).json({ status: "success", message: "Log deleted successfully" });
  });
});


app.post('/viewlogs', (req, res) => {
  const { username } = req.body;
  console.log(username)
  const sql = `SELECT * FROM \`${username}_logs\` `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching log:", err);
      return res.status(500).json({ status: "error", message: "Failed to fetch log" });
    }

    if (result.length === 0 || !result[0].image_1) {
      return res.status(404).json({ status: "error", message: "Image not found" });
    }
    console.log(result);
    return res.json( result);
  });
});

app.post('/inputdialog', (req, res) => {
  const username  = req.body.username;
  const place=req.body.place; // Extract username, place, month, and year from request body
  const month =req.body.month;
  const year = req.body.year
// Check if values are received
   const sql = `INSERT INTO \`${username}_wishlist\` (place, month, year) VALUES (?, ?, ?)`;
  db.query(sql, [place, month, year], (err) => {
    if (err) {
      console.error("Error adding item to wishlist", err);
      return res.status(500).json({ status: "error", message: "Failed to add item to wishlist" });
    }
    return res.status(200).json({ status: "success", message: "Item added to wishlist successfully" });
  });
});

app.post('/editdialog', (req, res) => {
  const username = req.body.username;
  const place = req.body.place;
  const month = req.body.month;
  const year = req.body.year;

  console.log(username);
  console.log(place);

  const sql = `UPDATE \`${username}_wishlist\` SET month=?, year=? WHERE place=?`;
  db.query(sql, [month, year, place], (err, result) => {
    if (err) {
      console.error("Error editing item in wishlist", err);
      return res.status(500).json({ status: "error", message: "Failed to edit item in wishlist" });
    }
    if (result.affectedRows === 0) {
      // If no rows were affected, it means no rows matched the condition
      return res.status(404).json({ status: "error", message: "No item found in wishlist for the specified place" });
    }
    return res.status(200).json({ status: "success", message: "Item edited successfully" });
  });
});

app.post('/wishlist',(req,res)=> {
  const username =req.body.username
  console.log("hello")
  console.log(username)
   const sql=`select * from \`${username}_wishlist\``;
   db.query(sql,(err,result)=> {
    if (err) {
      console.error("Error fetching item in wishlist", err);
      return res.status(500).json({ status: "error", message: "Failed to fetch item in wishlist" });
    }
    return res.json(result);

   })
})

// Assuming you're using MySQL and have already configured your database connection

// POST route to handle deletion of a wishlist item
app.delete('/wishlist/:id', (req, res) => {
  const { id } = req.params;
  const { username }= req.body;
  // Assuming you have a MySQL connection pool named 'db'
  db.query(`DELETE FROM \`${username}_wishlist\` WHERE wishlistid = ?`, [id], (err, result) => {
    if (err) {
      console.error('Error deleting wishlist item:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to delete wishlist item' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Wishlist item not found' });
    }

    return res.json({ status: 'success', message: 'Wishlist item deleted successfully' });
  });
});


app.delete('/deleteposts/:postId', (req, res) => {
  const postId = req.params.postId; // Get the post ID from the route parameters

  // Get the userId from the request body
  const userId = req.body.userId;

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  // Check if postId is provided
  if (!postId) {
    return res.status(400).json({ error: 'Post ID is required' });
  }

  // Retrieve user details based on userId
  const sql1 = 'SELECT * FROM user WHERE userId = ?';
  db.query(sql1, [userId], (err, userResult) => {
    if (err) {
      console.error('Error retrieving user details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Check if user exists
    if (userResult.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResult[0]; // Assuming there's only one user with the given ID
  const userEmail = user.email;
    // Once user details are retrieved, proceed with deleting the post
    const sql2 = `DELETE FROM \`${userEmail}_logs\` WHERE logid = ?`;
    db.query(sql2, [postId], (err, result) => {
      if (err) {
        console.error('Error deleting post:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
        // If no rows were affected, it means no matching post was found
        return res.status(404).json({ error: 'Post not found' });
      }

      // Post deleted successfully
      return res.status(200).json({ message: 'Post deleted successfully' });
    });
  });
});

app.get('/adminpublicposts', (req, res) => {
  // Fetch all user details
  const sql = 'SELECT userId, email FROM user where isAdmin=0';
  db.query(sql, (err, userResults) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Array to store promises for fetching and processing data for each user
    const promises = [];

    // Iterate through each user
    userResults.forEach(user => {
      const userId = user.userId;
      const userEmail = user.email;
      console.log(userEmail)

      // Fetch data from the corresponding table using userEmail
      const query = `SELECT * FROM \`${userEmail}_logs\` where isPrivate='public'`;
      const promise = new Promise((resolve, reject) => {
        db.query(query, (err, dataResults) => {
          if (err) {
            console.error(`Error fetching data for ${userEmail}:`, err);
            reject(err);
          } else {
            // Add user ID to the fetched data
            const userData = dataResults.map(item => ({ ...item, userId }));
            resolve(userData);
          }
        });
      });

      promises.push(promise);
    });

    // Resolve all promises and send the combined data
    Promise.all(promises)
      .then(results => {
        // Combine data from all users into a single array
        const allData = results.reduce((acc, data) => acc.concat(data), []);
        console.log(allData);
        res.status(200).json(allData);
      })
      .catch(error => {
        console.error('Error fetching and processing data:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
});


app.get('/publicposts', (req, res) => {
  const sql = 'SELECT userId, email FROM user where isAdmin=0';
  db.query(sql, (err, userResults) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
     console.log(userResults);
    // Array to store promises for fetching and processing data for each user
    const promises = [];

    // Iterate through each user
    userResults.forEach(user => {
      const userId = user.userId;
      const userEmail = user.email;
      console.log(userEmail)

      // Fetch data from the corresponding table using userEmail
      const query = `SELECT * FROM \`${userEmail}_logs\` where isPrivate='public'`;
      const promise = new Promise((resolve, reject) => {
        db.query(query, (err, dataResults) => {
          if (err) {
            console.error(`Error fetching data for ${userEmail}:`, err);
            reject(err);
          } else {
            // Add user ID to the fetched data
            const userData = dataResults.map(item => ({ ...item, userId }));
            resolve(userData);
          }
        });
      });

      promises.push(promise);
    });

    // Resolve all promises and send the combined data
    Promise.all(promises)
      .then(results => {
        // Combine data from all users into a single array
        const allData = results.reduce((acc, data) => acc.concat(data), []);
        console.log(allData);
        res.status(200).json(allData);
      })
      .catch(error => {
        console.error('Error fetching and processing data:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
});
   




app.listen(3001,() => {
    console.log("running");

})
