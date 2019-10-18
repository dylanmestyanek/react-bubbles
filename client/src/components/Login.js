import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth"

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    const {value, name} = e.target
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth().post("login", credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push("/bubble-page")
      })
      .catch(err => console.log('You messed up the login process!', err))
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='username'
          placeholder='Username'
          value={credentials.username}
          onChange={handleChange}
        />
        <input 
          type='password'
          name='password'
          placeholder='Password'
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
