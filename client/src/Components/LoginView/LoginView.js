import React, { Component } from "react";
import './LoginView.css';
import logo1 from '../../assets/Rent (2).png';
import logo2 from '../../assets/Rent (3).png';

export default class LoginView extends Component {
  render() {
    return (
      <div className="login">
        {/* <img src={logo1} alt="Upkeepr Logo"/> */}

        <div className="loginContainer">
          <img src={logo2} alt="Upkeepr Logo"/>

          <div className="AuthButton"><a href='http://localhost:3001/api/auth/login'>Login / Register</a></div>
        </div>

      </div>
      
    );
  }
}