import React, { useState } from 'react';

function ExercisesCards({ exercise, onEdit, onDelete }) {
    // initialize favorited state from sessionStorage
    const initialFavorited = JSON.parse(sessionStorage.getItem('favoritedExercises') || '[]').includes(exercise.id);
    const [isFavorited, setIsFavorited] = useState(initialFavorited);

    const handleFavoriteClick = () => {
        const method = isFavorited ? 'DELETE' : 'POST';
        const url = isFavorited ? `http://127.0.0.1:5555/favorite-exercises/${exercise.id}` : `http://127.0.0.1:5555/favorite-exercises`;

        const requestOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            },
            body: isFavorited ? null : JSON.stringify({ exercise_id: exercise.id }),
        };

        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) throw new Error('Failed to update favorite status');
                setIsFavorited(!isFavorited);

                // update sessionStorage with new state
                let favoritedExercises = JSON.parse(sessionStorage.getItem('favoritedExercises') || '[]');
                if (isFavorited) {
                    // remove unfavorited exercise
                    favoritedExercises = favoritedExercises.filter(id => id !== exercise.id);
                } else {
                    // add favorited exercise
                    favoritedExercises.push(exercise.id);
                }
                sessionStorage.setItem('favoritedExercises', JSON.stringify(favoritedExercises));
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="exercise-card">
            <div className='exercise-image-container'>
                <img src={exercise.image_url} alt={exercise.name} />
            </div>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
            <button onClick={() => onEdit(exercise)}>Edit</button>
            <button onClick={() => onDelete(exercise.id)}>Delete</button>
            <button onClick={handleFavoriteClick} disabled={isFavorited}>
                {isFavorited ? 'Favorited' : 'Favorite'}
            </button>
        </div>
    );
}

export default ExercisesCards;
