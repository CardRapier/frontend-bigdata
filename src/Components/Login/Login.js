import React, { useState } from 'react';
import axios from 'axios';

import {
    Redirect,
    Link
  } from "react-router-dom";

function Login(props) {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (event) => {
      event.preventDefault();
      axios.post(process.env.REACT_APP_API_URL + '/auth/login',
      {
          username: userName,
          password: password
      })
      .then(res => {
        localStorage.setItem('user',res.data.user.username)
        localStorage.setItem('token',res.data.token)
        props.setLoggedIn(true)
      })
      .catch(err => {
          console.log(err)
      })
  }
  if(props.loggedIn){
    return ( <Redirect to="/songs" />);
  }
  else {
  return (
    
      <div className="container mt-5">
          <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">Log in in Spoopify</div>
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
                      <button type="button" className="btn btn-primary" onClick={onSubmitHandler}>Login</button>
                  </form>
                  <div className="d-flex">
                  <p>Do you want an account?</p><Link to="/register" className="nav-link">Register.</Link>
                  </div>
              </div>
              <div className="col-md-3"></div>
          </div>

      </div>
    );
  }
  }
  
  export default Login;
  