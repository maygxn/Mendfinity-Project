import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from './MENDFINITY.png';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("isLoggedIn"); // Clear login status
    sessionStorage.removeItem("favoritesLastUpdated");
    sessionStorage.removeItem("favoritedExercises");
    navigate("/"); // Redirects to the login page upon logout.
  };

  // Navigation functions
  const navigateToDashboard = () => navigate("/Dashboard");
  const navigateToExercises = () => navigate("/Exercises");
  const navigateToHealthJournal = () => navigate("/HealthJournal");
  const navigateToFavoriteExercises = () => navigate("/FavoriteExercises");

  return (
    <nav className="navbarContainer">
      <div className="navbarLogo">
        <img src={logoImage} alt="Logo" className="navbar-logo"/>
      </div>
      <div className="navbarLinks">
        <ul>
          <li><h1>Mendfinity</h1></li>
          <li><button onClick={navigateToDashboard}>Dashboard</button></li>
          <li><button onClick={navigateToExercises}>Exercises</button></li>
          <li><button onClick={navigateToHealthJournal}>Health Journal</button></li>
          <li><button onClick={navigateToFavoriteExercises}>Favorite Exercises</button></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
