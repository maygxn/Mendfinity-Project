import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '../login/UserContext'; // Adjust the path as necessary
import axios from 'axios';

function HealthJournalForm({ showForm, setShowForm, initialEntry = null, onCancel }) {
    const { user } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            entry_date: initialEntry ? initialEntry.entry_date : '',
            content: initialEntry ? initialEntry.content : '',
        },
        validationSchema: yup.object({
            entry_date: yup.date().required("Entry date is required."),
            content: yup.string().required("Content is required."),
        }),
        onSubmit: async (values) => {
            if (!user) {
                alert("Please log in to submit an entry.");
                return;
            }
            const url = initialEntry
                ? `http://127.0.0.1:5555/health-journal-entries/${initialEntry.id}`
                : 'http://127.0.0.1:5555/health-journal-entries';
            const method = initialEntry ? 'PUT' : 'POST';

            try {
                await axios({
                    method,
                    url,
                    data: { ...values, patient_id: user.id },
                });
                setShowForm(false);
                // Refresh your entries list or show a success message here
            } catch (error) {
                console.error('Failed to save journal entry:', error);
            }
        },
    });

    return (
        <div style={{ display: showForm ? 'block' : 'none' }}>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="entry_date">Date</label>
                    <input
                        id="entry_date"
                        name="entry_date"
                        type="date"
                        onChange={formik.handleChange}
                        value={formik.values.entry_date}
                    />
                    {formik.errors.entry_date && <div>{formik.errors.entry_date}</div>}
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        onChange={formik.handleChange}
                        value={formik.values.content}
                    />
                    {formik.errors.content && <div>{formik.errors.content}</div>}
                </div>
                <button type="submit">{initialEntry ? 'Update' : 'Add'} Journal Entry</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default HealthJournalForm;
