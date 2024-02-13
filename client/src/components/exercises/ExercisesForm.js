import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

function ExerciseForm({ showForm, setShowForm, onSaveExercise, initialExercise = null }) {
    const validationSchema = yup.object({
        name: yup.string().required("Exercise name is required."),
        description: yup.string().required("Description is required."),
        image_url: yup.string().url("Image URL must be valid.").required("Image URL is required."),
    });

    const formik = useFormik({
        initialValues: {
            name: initialExercise ? initialExercise.name : '',
            description: initialExercise ? initialExercise.description : '',
            image_url: initialExercise ? initialExercise.image_url : '',
        },
        validationSchema,
        onSubmit: (values) => {
            onSaveExercise(values);
            setShowForm(false);
        },
    });

    const handleExit = () => setShowForm(false);

    return (
        <div id="exerciseForm" className={`exercise-form ${showForm ? 'active' : ''}`}>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Exercise Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && <div>{formik.errors.name}</div>}
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    {formik.errors.description && <div>{formik.errors.description}</div>}
                </div>

                <div>
                    <label htmlFor="image_url">Image URL</label>
                    <input
                        id="image_url"
                        name="image_url"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.image_url}
                    />
                    {formik.errors.image_url && <div>{formik.errors.image_url}</div>}
                </div>
                <button type="submit">{initialExercise ? 'Update' : 'Add'} Exercise</button>
                <button type="button" onClick={handleExit}>Cancel</button>
            </form>
        </div>
    );
}

export default ExerciseForm;
