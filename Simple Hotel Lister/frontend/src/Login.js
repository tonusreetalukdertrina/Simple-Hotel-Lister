import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';  

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const getCSRFToken = async () => {
    const res = await axios.get('http://localhost:8000/api/csrf/', {
      withCredentials: true,
    });
    return res.data.csrfToken;
  };

  const login = async () => {
    try {
      const csrfToken = await getCSRFToken();

      const res = await axios.post(
        'http://localhost:8000/api/login/',
        { username, password },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );

      if (res.data.message === "Login successful") {
        localStorage.setItem('isLoggedIn', 'true');  
        navigate('/hotel_search');  
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Login failed: Incorrect Username or Password");  
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Simple Hotel Lister</h1>
        <h2>Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
        <button className="secondary-button" onClick={login}>Login</button>
        <h3>Need to create an account?</h3>
        <button className="secondary-button" onClick={() => navigate(`/Register`)}>Register</button>
      </div>
    </div>
  );
}

export default Login;
