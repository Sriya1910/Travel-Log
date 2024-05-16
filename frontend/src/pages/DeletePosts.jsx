import React, { useState } from 'react';
import axios from 'axios';
import './DeletePosts.css'; 
import Adminnavbar from '../components/Adminnavbar';

const DeletePosts = () => {
  const [userId, setUserId] = useState('');
  const [postId, setPostId] = useState('');

  const handleDelete = async () => {
    try {
      // Make sure both userId and postId are filled
      if (!userId || !postId) {
        alert('Please enter both User ID and Post ID');
        return;
      }
      console.log(userId);
      console.log(postId);
      // Send the DELETE request to the backend with userId and postId
      const response = await axios.delete(`http://localhost:3001/deleteposts/${postId}`, {
        data: { userId } // Sending userId as data
      });

      if (response.status === 200) {
        alert('Post deleted successfully!');
        setUserId('');
        setPostId('');
        // Optionally, you might want to handle UI updates after successful deletion
      } else {
        alert('Error deleting post. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting post. Please try again later.');
    }
  };

  return (
    <div className='deletebody'>
      <Adminnavbar/>
      <div className="delete-post">  
        <div className='box'>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <br />
          <label htmlFor="postId">Post ID:</label>
          <input
            type="text"
            id="postId"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          />
          <br />
          <button onClick={handleDelete}>Delete Post</button>
        </div>
      </div>
    </div>
  );
}

export default DeletePosts;
