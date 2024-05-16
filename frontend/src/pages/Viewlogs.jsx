import React, { useState, useEffect } from 'react';
import './Viewlogs.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import {adjustDate} from './Viewlogvalidation';
const Viewlogs = () => {
  const [logData, setLogData] = useState([]);
  // const [username, setUsername] = useState('');

  useEffect(() => {
    // Get username from local storage and set state
    const usernameFromStorage = localStorage.getItem('username');
    // setUsername(usernameFromStorage);

    // Fetch log data from backend
    if (usernameFromStorage) {
      axios.post('http://localhost:3001/viewlogs', { username: usernameFromStorage })
        .then(res => { 
          if (Array.isArray(res.data) && res.data.length > 0) {
            // Format date before setting log data
            const formattedLogData = res.data.map(log => ({
              ...log,
              start_date: adjustDate(log.start_date),
              end_date: adjustDate(log.end_date)
              // start_date: log.start_date.slice(0, 10), // Extract date part
              // end_date: log.end_date.slice(0, 10) // Extract date part
            }));
            setLogData(formattedLogData);
          } else {
            console.error('Invalid log data format');
          }
        })
        .catch(error => {
          console.error('Error fetching log data:', error);
        });
    }
  }, []);

  return (
    <>
    <Navbar/>
    <div className="log-container">
      {logData.map((log, index) => (
        <div key={index} className="log-box">
          <div className="image-box">
            <img src={`http://localhost:3001/images/${log.image_1}`} alt="" />
          </div>
          <div className="info-box">
            <p>Place: {log.place}</p>
            <p>Start Date: {log.start_date}</p>
            <p>End Date: {log.end_date}</p>
            <p>User Experience: {log.user_experience}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Viewlogs;
