import React, { useState, useEffect } from "react";

function FavPage() {
    const [favorites, setFavorites] = useState([]);
    const url = "http://127.0.0.1:5555/favorite-exercises";

    // function to fetch favorite exercises
    const fetchFavorites = () => {
        const token = sessionStorage.getItem("access_token");
        if (!token) {
            return;
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
        .then(response => response.json())
        .then(data => {
            setFavorites(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleUnfavorite = (exerciseId) => {
        // send DELETE request to backend
        fetch(`http://127.0.0.1:5555/favorite-exercises/${exerciseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to remove from favorites');
            }
            // update local state and sessionStorage after unfavorite
            const updatedFavorites = favorites.filter(exercise => exercise.id !== exerciseId);
            setFavorites(updatedFavorites);
            const favoritedExercises = JSON.parse(sessionStorage.getItem('favoritedExercises') || '[]');
            const index = favoritedExercises.indexOf(exerciseId);
            if (index > -1) {
                // remove exercise ID from the array
                favoritedExercises.splice(index, 1);
            }
            sessionStorage.setItem('favoritedExercises', JSON.stringify(favoritedExercises));
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h2>Favorite Exercises</h2>
            <div>
                {favorites.length > 0 ? (
                    favorites.map((exercise) => (
                        <div key={exercise.id} className="favorite-exercise">
                            <img src={exercise.image_url} alt={exercise.name} style={{width: "100px", height: "100px"}} />
                            <h3>{exercise.name}</h3>
                            <p>{exercise.description}</p>
                            <button onClick={() => handleUnfavorite(exercise.id)}>Unfavorite</button>
                        </div>
                    ))
                ) : (
                    <p>No favorite exercises found or not logged in.</p>
                )}
            </div>
        </div>
    );
}

export default FavPage;
