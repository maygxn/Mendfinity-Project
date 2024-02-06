import React from 'react';

function ExercisesCards({ exercise, onEdit, onDelete }) {

    const handleFavoriteClick = () => {
        fetch(`http://127.0.0.1:5555/patients/favorite-exercises`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exercise),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="card">
            <div className='image-container'>
                <img src={exercise.image_url} alt={exercise.name}></img>
            </div>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
            <button onClick={() => onEdit(exercise)}>Edit</button>
            <button onClick={() => onDelete(exercise.id)}>Delete</button>
            <button onClick={handleFavoriteClick}>Favorite</button> {/* Add this line */}
        </div>
    );
}

export default ExercisesCards;
