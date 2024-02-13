import React from 'react';

function ExercisesSideBar({ handleNewExerciseClick, search, updateSearch }) {
    return (
        <div className="sidebar-container">
            <div className="bottom-right-container">
                <div className="search-container">
                    <input className="search-input" placeholder='Search' value={search} onChange={updateSearch} />
                </div>
                <div className="add-exercise-container">
                    <button className="new-exercise-btn" onClick={handleNewExerciseClick}>
                        Add New Exercise
                    </button>
                    {/*  Add more buttons and elements here */}
                </div>
            </div>
        </div>
    );
}

export default ExercisesSideBar;
