
import React from 'react';

function ExercisesSideBar({ handleNewExerciseClick }) {
    return (
        <div className="sidebar">
            <button onClick={handleNewExerciseClick} className="new-exercise-btn">Add New Exercise</button>
            {/*  add more buttons and stuff here */}
        </div>
    );
}

export default ExercisesSideBar;
