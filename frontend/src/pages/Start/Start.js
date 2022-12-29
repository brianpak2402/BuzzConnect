import React, { useEffect } from "react";
import {Link} from 'react-router-dom';

import "./Start.css";

export default function Start() {
    useEffect(() => {
        window.sessionStorage.clear();
    }, [])

    return (
    <div className="container">
      <div className="start-back">
          <div className="left-container">
              <h1>Log In</h1>
              <p>If you already have an account</p>
              <Link to="/login" style={{textDecoration: 'none'}}>
                  <button className='start-btn'>Go Now</button>
              </Link>
              <div className="or-container">
                  <div className="or-line"/>
                  <h2>or</h2>
                  <div className="or-line"/>
              </div>
              <h1>Sign Up</h1>
              <p>Create a new account to start</p>
              <Link to="/userType" style={{textDecoration: 'none'}}>
                  <button className='start-btn'>Get Started</button>
              </Link>
          </div>
          <div className="right-container">
              <h1>Buzz Connect</h1>
              <p><i>Keeping you <span style={{color: '#B3A369'}}>connected</span> to the events you need</i></p>
          </div>
      </div>
    </div>
  );
}   