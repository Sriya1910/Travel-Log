import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Adminnavbar.css';
const Adminnavbar = () => {
  
  return (
    <div className="navb">      
         <ul className='nav_ulb'>
          <li><Link to="/adminpublicposts">Public Posts</Link></li>
          <li><Link to="/deleteposts">Delete Posts</Link></li>
           <li><Link to="/">Logout</Link></li>        
      </ul>
    </div>
  );
};

export default Adminnavbar;





