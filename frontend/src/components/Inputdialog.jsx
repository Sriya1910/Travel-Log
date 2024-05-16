import React, { useState } from 'react';
import axios from 'axios';
import './Inputdialog.css';
const Inputdialog = ({ title, onClose, onSubmit }) => {
const username= localStorage.getItem('username');
const [place, setPlace] = useState();
const [month, setMonth] = useState();
const [year, setYear] = useState();
const handlePlace = (event) => {
        setPlace(event.target.value);
    };
const handleMonth = (event) => {
        setMonth(event.target.value);
    };
const handleYear = (event) => {
        setYear(event.target.value);
    };
const data = {
    username: username,
    place: place,
    month: month,
    year: year
  };
   console.log(data)
  const handleSubmit = () => {
    axios.post('http://localhost:3001/inputdialog', data)
    .then(res => { alert("Added to wishlist");
                   onClose();
                  window.location.reload();}) 
               .catch(err => console.log(err));
    // onSubmit({ place, month, year });   
  };
  return (
    <div className="input-dialog">
      <div className="input-dialog-content">
        <h2>{title}</h2>
        <label htmlFor="place">Place:</label>
        <input type="text" id="place" onChange={handlePlace} />
        <label htmlFor="month">Month:</label>
        <input type="text" id="month" onChange={handleMonth} />
        <label htmlFor="year">Year:</label>
        <input type="text" id="year" onChange={handleYear} />
        <div>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Inputdialog;
