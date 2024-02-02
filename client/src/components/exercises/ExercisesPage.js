import React, { useEffect, useState } from 'react';
import ExercisesSideBar from "./ExercisesSideBar";
import ExercisesCards from './ExercisesCards';
import ExercisesNav from './ExercisesNav';
import './ExercisesPage.css';

function ExercisesPage() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/exercises")
            .then(response => response.json())
            .then(data => setExercises(data));
    }, []);

    const handleNewExerciseClick = () => {
        console.log("Add new exercise logic here.");
    };

    return (
        <>
            <ExercisesNav />
            <ExercisesSideBar handleNewExerciseClick={handleNewExerciseClick} />
            <div className="main-content">
                {exercises.map((exercise) => (
                    <ExercisesCards key={exercise.id} exercise={exercise} />
                ))}
            </div>
        </>
    );
}

export default ExercisesPage;
