import App from "./App";
import ExercisesPage from "./components/exercises/ExercisesPage";
import HealthJournalPage from "./components/healthjournal/HealthJournalPage";
import Dashboard from "./components/home/Dashboard";
import FavPage from "./components/favorite/FavPage";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/RegisterPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/Register", element: <RegisterPage /> },
      { path: "/Dashboard", element: <Dashboard /> },
      { path: "/Exercises", element: <ExercisesPage /> },
      { path: "/FavoriteExercises", element: <FavPage /> },
      { path: "/HealthJournal", element: <HealthJournalPage /> },
    ],
  },
];

export default routes;
