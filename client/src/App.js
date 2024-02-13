import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from "./components/home/Navbar";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  
    const publicPaths = ['/', '/Register'];
    const path = location.pathname;
  
    // Redirect to '/' if not logged in and trying to access a protected route
    if (!loggedInStatus && !publicPaths.includes(path)) {
      navigate('/');
    }
  
  }, [location, navigate]);
  

  return (
    <div className="appContainer">
      {isLoggedIn && <Navbar />}
      <Outlet />
    </div>
  );
}

export default App;
