import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Wishlist.css';
import axios from 'axios';
import Inputdialog from '../components/Inputdialog';

const WishlistItem = ({ id, place, month, year, onEdit, onRemove }) => {
  return (
    <tr>
      <td>{place}</td>
      <td>{month}</td>
      <td>{year}</td>
      <td>
        <button onClick={onRemove}>Remove</button> {/* Add remove button */}
      </td>
    </tr>
  );
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showInputdialog, setShowInputdialog] = useState(false);

  useEffect(() => {
    fetchWishlistItems();
  }, []); 

  const username = localStorage.getItem('username');
  const data = { username };

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.post('http://localhost:3001/wishlist', data);
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };   
  
  const handleAdd = () => {
     setShowInputdialog(true);
      
   };

  const handleCloseInputdialog = () => {
     setShowInputdialog(false);
  };

  const handleSubmitInputdialog = (inputValue) => {
    console.log('Submitted value:', inputValue);
    setShowInputdialog(false);
  };

  const handleRemove = async (id) => {
    try {
      console.log(id);
    axios.delete(`http://localhost:3001/wishlist/${id}`,{ data : {username}});
      setWishlistItems(wishlistItems.filter(item => item.id !== id));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
    }
  };

  return (
    <div className='body3'>
      <Navbar/>
      <div className='wishlist-container'>
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Place</th>
                <th>Month</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item) => (
                <WishlistItem
                  id={item.wishlistid}
                  place={item.place}
                  month={item.month}
                  year={item.year}
                  onRemove={() => handleRemove(item.wishlistid)} // Pass ID to handleRemove
                />
              ))}
            </tbody>
          </table>
          <button className="add" onClick={handleAdd}>
            Add to Wishlist
          </button>
          {showInputdialog && (
            <Inputdialog
              title="Add to Wishlist"
              onClose={handleCloseInputdialog}
              onSubmit={handleSubmitInputdialog}
            />
          )}
         
        </div>
      </div>      
    </div>
  );
};

export default Wishlist;
