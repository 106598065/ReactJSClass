import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
         <form>
            <label>Username</label>
            <input type="text" placeholder="Enter Username" required/><br/>
            <label>Password</label>
            <input type="password" placeholder="Enter Password" required/><br/>
            <button type="submit">Login</button>
         <form/>
      </div>
    );
  }
}

export default Login;