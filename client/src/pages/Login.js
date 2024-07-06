import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/auth/login', { username, password })
      .then(response => {
        localStorage.setItem('accessToken', response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
          role: response.data.role
        });
        navigate('/');
      })
      .catch(error => {
        console.error('Login failed', error);
      });
  };

  return (
    <div className='loginPage'>
      <div className='formContainer'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label className="label">Username: </label>
          <input
            type="text"
            className="inputField"
            placeholder="(Ex. John123...)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="label">Password: </label>
          <input
            type="password"
            className="inputField"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='submitButton'>Login</button>
          <p>or <Link className='smallLink' to="/register">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
