import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  // State to track whether the dropdown is open or closed
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to handle dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="nav">
      <ul >
        <li>
          {/* Logs dropdown */}
          <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
              Logs
              <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>&#9660;</span>
            </div>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/addlog">Add Log</Link></li>
                <li><Link to="/deletelog">Delete Log</Link></li>
                <li><Link to="/viewlogs">View Logs</Link></li>
              </ul>
            )}
          </div>
        </li>
        <ul className='nav_ul'>
          <li><Link to="/wishlist">Wishlist</Link></li>
           <li><Link to="/publicposts">Public Posts</Link></li>
           <li><Link to="/">Logout</Link></li>
        </ul>
      </ul>
    </div>
  );
};

export default Navbar;





