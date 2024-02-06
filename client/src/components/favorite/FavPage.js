// FavPage.js
import React, { useState, useEffect } from 'react';
import FavExerciseNav from './FavExerciseNav';

function FavPage() {
    const [favoriteExercises, setFavoriteExercises] = useState([]);

    useEffect(() => {
        fetchFavoriteExercises();
    }, []); // Refetch favorites whenever the user changes

    const fetchFavoriteExercises = () => {
        fetch(`http://127.0.0.1:5555/patients/favorite-exercises`)
            .then((res) => res.json())
            .then((data) => {
                setFavoriteExercises(data);
            })
            .catch((error) => console.error("Error fetching favorite exercises:", error));
    };

    return (
        <div>
            <FavExerciseNav />
            {/* Render the favorite exercises here */}
            {favoriteExercises.map((exercise) => (
                <div key={exercise.id}>
                    <h2>{exercise.name}</h2>
                    <p>{exercise.description}</p>
                </div>
            ))}
        </div>
    );
}

export default FavPage;
