import React from "react";
import { useNavigate } from "react-router-dom";

function MainPageNav() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToExercises = () => {
    navigate("/Exercises");
  };

  const navigateToHealthJournal = () => {
    navigate("/HealthJournal");
  };

  const navigateToFavoriteExercises = () => {
    navigate("/FavoriteExercises");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <h1>Mendfinity</h1>
        </li>
        <li>
          <button onClick={navigateToHome}>Home</button>
        </li>
        <li>
          <button onClick={navigateToExercises}>Exercises</button>
        </li>
        <li>
          <button onClick={navigateToHealthJournal}>Health Journal</button>
        </li>
        <li>
          <button onClick={navigateToFavoriteExercises}>
            Favorite Exercises
          </button>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default MainPageNav;
