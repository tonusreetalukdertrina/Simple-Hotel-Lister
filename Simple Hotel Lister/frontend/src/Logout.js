import React from "react";
import { useNavigate } from "react-router-dom";
import './Logout.css';

function Logout({ darkMode, toggleTheme }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('isLoggedIn');
      navigate('/');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="logout-header">
      <h2>Hotel Lister</h2>
      <div className="logout-buttons">
        <button onClick={toggleTheme}>
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
