import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from './Signupvalidation';
import axios from "axios";
import './Signup.css'; // Import CSS file for styling

function Signup() {
    const [values, setValues] = useState({
        name:'',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    // Function to handle input changes
    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate inputs
        setErrors(validation(values));
         console.log(values);
        if(errors.name === "" && errors.email === "" && errors.password === "") {
            console.log(values);
            axios.post('http://localhost:3001/signup', values)
               .then(res => { alert("Signup successful");
                navigate('/');}) 
               .catch(err => console.log(err));
        }
    }

    return (
        <>
        <h1>Travel Log</h1> 
        <div className='container-main'>
            <div className="container">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            onChange={handleInput}
                            className="name"
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    <div>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            onChange={handleInput}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            onChange={handleInput}
                          />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <div className="submit">
                    <button type="submit" className="button">
                        Signup
                    </button>
                    <div className="link">
                        <Link to="/">Login</Link>
                    </div>
                    </div>
                </form>
            </div>
            </div>
            </>
    )
}

export default Signup;