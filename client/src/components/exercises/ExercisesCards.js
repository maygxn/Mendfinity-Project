import React from 'react';

function ExercisesCards({ exercise, onEdit, onDelete }) {
    return (
        <div className="card">
            <div className='image-container'>
                <img src={exercise.image_url} alt={exercise.name}></img>
            </div>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
            <button onClick={() => onEdit(exercise)}>Edit</button>
            <button onClick={() => onDelete(exercise.id)}>Delete</button>
        </div>
    );
}

export default ExercisesCards;
