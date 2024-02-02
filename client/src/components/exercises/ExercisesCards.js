import React from 'react';

function ExercisesCards({ exercise }) {
    return (
        <div className="card">
            <div className='image-container'>
                <img src={exercise.image_url} alt={exercise.name}></img>
            </div>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
        </div>
    );
}

export default ExercisesCards;
