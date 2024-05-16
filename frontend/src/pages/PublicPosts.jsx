import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './PublicPosts.css';
import axios from 'axios'; 

const SmallBox = ({ userId, postId, placeName, picture, userExperience }) => {
  console.log("userId:", userId);
  console.log("postId:", postId);
  console.log("placeName:", placeName);
  console.log("picture:", picture);
  console.log("userExperience:", userExperience);

  return (
    <div className="small-box-p">
      <div className="info-p">
        <h7>User ID: {userId}</h7>
        <h7>Post ID: {postId}</h7>
      </div>
      <img src={`http://localhost:3001/images/${picture}`} alt={placeName} />
      <h7>{placeName}</h7>
      <p className='description-p'>{userExperience}</p>
    </div>
  );
};

const PublicPosts = () => {
  console.log("hello1");
  const [boxesData, setBoxesData] = useState([]);
  useEffect(() => {
        const fetchPublicPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/publicposts');
        console.log(response.data);
        // Assuming response.data is an array with only one object
        if (response.data.length > 0) {
        const formattedData = response.data.map(postData => ({
          userId: postData.userId,
          postId: postData.logid,
          placeName: postData.place,
          picture: postData.image_1,
          userExperience: postData.user_experience,
        }));
        setBoxesData(formattedData);
}

      } catch (error) {
        console.error('Error fetching public posts:', error);
      }
    };

    fetchPublicPosts();
  }, []);

  return (
    <div className='body2-p'>
      <Navbar/>
      <div className="container1-p">          
        <h2>Public Posts</h2>
        <div className="scrollable-content-p">
          {boxesData.length > 0 && // Render only if boxesData is not empty
            boxesData.map((box, index) => (
              <SmallBox
                key={index}
                userId={box.userId}
                postId={box.postId}
                placeName={box.placeName}
                picture={box.picture}
                userExperience={box.userExperience}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PublicPosts;
