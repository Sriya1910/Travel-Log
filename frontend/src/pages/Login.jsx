import React, { useState } from 'react';
import './Login.css'; // Import CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import validation from './Loginvalidation'; // Import JS file for validation
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    // const [username, setUsername] = useState('');

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if (true) {
        axios
            .post('http://localhost:3001/', values)
            .then((res) => {
                console.log('Response data:', res.data); // Log entire response data object 
                if (res.data === 1) {      
                    navigate('/adminhome'); 
                } else if (res.data === 0) {
                    localStorage.setItem('username', values.email);       
                    navigate('/home');
                } else {
                    alert('No record found'); 
                }
            })
            .catch((err) => console.log(err));
    }
};


    return (
        <>
        <h1>Travel Log</h1> 
        <div className="container-main">                  
            <div className="container">
                  <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            onChange={handleInput}
                            className="form-control rounded-0"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            onChange={handleInput}
                            className="form-control rounded-0"
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <p>Enter the details correctly</p>
                    <div className='submit'>
                    <button type="submit" className="btn btn-success btn-block rounded-0">
                        Login
                    </button>
                    <div className="link">
                        <Link to="/signup">Signup</Link>
                    </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;
