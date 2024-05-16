import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Addlog.css';
import { isValidStartDate, isValidEndDate, isValidLogType } from './Addlogvalidation';
const Addlog = () => {
  const [values, setValues] = useState({
    place: '',
    startDate: '',
    endDate: '',
    logType: '',
    experience: ''
  });
  const[file,setFile]=useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  const handleFile=(e)=>{
    const selectedfile=e.target.files[0];
    setFile(selectedfile) ;
}

const username=localStorage.getItem('username')

const handleSubmit = (e) => {
  e.preventDefault();
  if (!file) {
    alert('Please upload a photo');
    return;
  }
    if (!isValidStartDate(values.startDate)) {
      alert('Start date must be today or earlier');
      return;
    }

    if (!isValidEndDate(values.startDate, values.endDate)) {
      alert('End date must be later than start date and should not be later than current date');
      return;
    }

    if (!isValidLogType(values.logType)) {
      alert('Type of log must be either "public" or "private"');
      return;
    }
  const formData = new FormData();
  formData.append('username',username);
  formData.append('image', file);
  formData.append('place', values.place);
  formData.append('startDate', values.startDate);
  formData.append('endDate', values.endDate);
  formData.append('logType', values.logType);
  formData.append('experience', values.experience);
  console.log(formData.getAll('image'));
  axios.post('http://localhost:3001/addlog', formData)
    .then(res => {
      if (res.data.status === 'success') {
        console.log('success');
        // Clear input fields after successful submission
        setValues({
          place: '',
          startDate: '',
          endDate: '',
          logType: '',
          experience: ''
        });
        setFile(null); 
        console.log('File cleared:', file);
        alert('Log added successfully');// Clear file input field
      } else {
        console.log('error');
      }
    })
    .catch(err => console.log(err));
    // document.getElementById('fileInput').value = ''; 
};


  return (
    <>
      <div className='body'>
        <Navbar />
        <div className="addlog">
          <div className='back'>
              <div>
                <label htmlFor="place">Name of the place:</label>
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
                  name="endDate"
                  value={values.endDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="logType">Type of log (Private/Public):</label>
                <input
                  type="text"
                  id="logType"
                  name="logType"
                  value={values.logType}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="experience">User Experience:</label>
                <textarea
                  id="experience"
                  name="experience"
                  value={values.experience}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="photo_upload">
                <label>Upload photo:</label>
                <input type="file" key={file ? file.name : 'default'} onChange={handleFile} />
                <button onClick={handleSubmit}>Add log</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addlog;