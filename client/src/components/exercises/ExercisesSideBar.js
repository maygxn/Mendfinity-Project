import React from 'react';

function ExercisesSideBar({ handleNewExerciseClick, search, updateSearch }) {
    return (
        <div className="sidebar">
            <input placeholder='Search' value={search} onChange={updateSearch}></input>
            <button onClick={handleNewExerciseClick} className="new-exercise-btn">Add New Exercise</button>
            {/*  add more buttons and stuff here */}
        </div>
    );
}

export default ExercisesSideBar;
