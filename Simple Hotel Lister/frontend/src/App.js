import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import HotelSearch from './HotelSearch';
import HotelDetails from './HotelDetails';
import BookmarkPage from './BookmarkPage';
import Logout from './Logout';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/Register') {
      document.body.className = 'light-mode'; 
    } else {
      document.body.className = darkMode ? 'dark-mode' : 'light-mode'; 
    }
  }, [darkMode, location]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev); 
  };

  const showThemeToggle = location.pathname !== '/' && location.pathname !== '/Register';

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        
        <Route
          path="/hotel_search"
          element={
            <>
              <Logout darkMode={darkMode} toggleTheme={toggleTheme} />  
              <HotelSearch />
            </>
          }
        />
        <Route
          path="/hotel/:id"
          element={
            <>
              <Logout darkMode={darkMode} toggleTheme={toggleTheme} />
              <HotelDetails />
            </>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <>
              <Logout darkMode={darkMode} toggleTheme={toggleTheme} />
              <BookmarkPage />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
