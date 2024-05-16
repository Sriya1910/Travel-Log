import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import './Deletelog.css';
const Deletelog = () => {
  // State variables to store input values

  const [values, setValues] = useState({
  place:'',
  startDate:'',
  endDate:''
  })
    const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const username=localStorage.getItem('username')
  console.log(username)


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can perform any action with the input values, such as sending them to a server or performing some local operation.
  axios.post('http://localhost:3001/deletelog?username='+username,values)
    .then(res => {
      if (res.data.status === 'success') {
        console.log('success');
       alert("Log deleted successfully.");
   setValues({
          place: '',
          startDate: '',
          endDate: '',
        })
      }
    }
    )};
  return (
    <>
    <div className='body1'>
      <Navbar/>
    <div className="deletelog">
      <div className='back1'>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="place">Place:</label>
          <input
            type="text"
            id="place"
            name="place"
            value={values.place}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={values.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name='endDate'
            value={values.endDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Delete Log</button>
      </form>
      </div>      
    </div>
    </div>    
    </>
  );
};

export default Deletelog;
