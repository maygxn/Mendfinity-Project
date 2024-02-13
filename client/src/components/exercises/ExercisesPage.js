import React, { useState, useEffect } from "react";
import ExercisesSideBar from "./ExercisesSideBar";
import ExercisesCards from "./ExercisesCards";
import ExercisesForm from "./ExercisesForm";

function ExercisesPage() {
    const url = "http://127.0.0.1:5555";
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [favoritedExercises, setFavoritedExercises] = useState([]);

    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = () => {
        fetch(`${url}/exercises`)
            .then((res) => res.json())
            .then((data) => {
                setExercises(data);
            })
            .catch((error) => console.error("Error fetching exercises:", error));
    };

    const handleAddExerciseClick = () => {
        setSelectedExercise(null);
        setShowForm(true);
    };

    const handleEditExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
        setShowForm(true);
    };

    const saveExercise = (exercise) => {
        const method = selectedExercise ? "PATCH" : "POST";
        const appEndpoint = selectedExercise ? `${url}/exercises/${selectedExercise.id}` : `${url}/exercises`;

        fetch(appEndpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exercise),
        })
            .then((res) => res.json())
            .then(() => {
                setShowForm(false);
                fetchExercises();
            })
            .catch((error) => console.error("Failed to save exercise:", error));
    };

    const deleteExercise = (id) => {
        fetch(`${url}/exercises/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                fetchExercises();
            })
            .catch((error) => console.error("Failed to delete exercise:", error));
    };

    const updateSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleFavoriteToggle = (exerciseId) => {
        setFavoritedExercises(prevExercises => {
            if (prevExercises.includes(exerciseId)) {
                return prevExercises.filter(id => id !== exerciseId);
            } else {
                return [...prevExercises, exerciseId];
            }
        });
    };


    const filteredExercises = exercises.filter(exercise => exercise.name.toUpperCase().includes(search.toUpperCase()));

    return (
        <div>
            <ExercisesSideBar handleNewExerciseClick={handleAddExerciseClick} search={search} updateSearch={updateSearch} />
            <div className="exercise-form-container">
                {showForm && (
                    <ExercisesForm
                        showForm={showForm}
                        setShowForm={setShowForm}
                        exercise={selectedExercise}
                        onSaveExercise={saveExercise}
                        onCancel={() => setShowForm(false)}
                    />
                )}
            </div>
            {/* Wrap exercise cards in a grid container */}
            <div className="exercise-grid">
                {filteredExercises.map((exercise) => (
                    <ExercisesCards
                        key={exercise.id}
                        exercise={exercise}
                        onEdit={() => handleEditExerciseClick(exercise)}
                        onDelete={() => deleteExercise(exercise.id)}
                        isFavorited={favoritedExercises.includes(exercise.id)}
                        onFavoriteToggle={handleFavoriteToggle}
                    />
                ))}
            </div>
        </div>
    );
}

export default ExercisesPage;
