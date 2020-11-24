import React, { useState } from 'react';
import axios from 'axios';

import {
    Redirect,
    Link
  } from "react-router-dom";

function Register() {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + '/auth/register',
        {
            username: userName,
            password: password
        })
        .then(res => {
            setSuccess(true)
        })
        .catch(err => {
            console.log(err)
        })
    }
    if(success){
        return ( <Redirect to="/login" />);
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">Register in Spoopify</div>
                <div className="col-md-4"></div>
            </div>
            <div className="row mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input required type="text" className="form-control" id="exampleInputEmail1" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input required type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={onSubmitHandler}>Submit</button>
                    </form>
                    <div className="d-flex">
                    <p>Already registered?</p><Link to="/login" className="nav-link">Login.</Link>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>

        </div>
    );
  }
  
  export default Register;
  