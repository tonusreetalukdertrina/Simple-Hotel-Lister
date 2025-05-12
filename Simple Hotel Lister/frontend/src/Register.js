import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const getCSRFToken = async () => {
  const response = await axios.get('http://localhost:8000/api/csrf/', { withCredentials: true });
  return response.data.csrfToken;
};

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const csrfToken = await getCSRFToken();
      const res = await axios.post(
        'http://localhost:8000/api/register/',
        { username, email, password },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );
      alert(res.data.message);
      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setErrorMessage("Registration failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Simple Hotel Lister</h1>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button onClick={register}>Register</button>
        <button className="secondary-button" onClick={() => navigate('/')}>Login</button>
      </div>
    </div>
  );
}

export default Register;
