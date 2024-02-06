import App from "./App";
import ExercisesPage from "./components/exercises/ExercisesPage";
import HealthJournalPage from "./components/healthjournal/HealthJournalPage";
import MainPage from "./components/home/MainPage";
import FavPage from "./components/favorite/FavPage";
import LoginPage from "./components/login/LoginPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/MainPage", element: <MainPage /> },
      { path: "/Exercises", element: <ExercisesPage /> },
      { path: "/FavoriteExercises", element: <FavPage /> },
      { path: "/HealthJournal", element: <HealthJournalPage /> },
    ],
  },
];

export default routes;
