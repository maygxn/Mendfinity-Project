import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function HealthJournalEntryForm({
  showForm,
  setShowForm,
  onSaveEntry,
  initialEntry = null,
}) {
  // Define the form's validation schema using Yup
  const validationSchema = yup.object({
    entry_date: yup.date().required("Entry date is required."),
    content: yup.string().required("Content is required."),
  });

  // Initialize Formik for form handling
  const formik = useFormik({
    initialValues: {
      entry_date: initialEntry ? initialEntry.entry_date : "",
      content: initialEntry ? initialEntry.content : "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // pass the entry ID if updating
      onSaveEntry(values, initialEntry ? initialEntry.id : null);
      setShowForm(false);
      // reset the form after successful submission
      resetForm(); 
    },
  });

  // handle form cancellation and reset form state
  const handleExit = () => {
    setShowForm(false);
    formik.resetForm();
  };

  return (
    <div id="journalEntryForm" style={{ display: showForm ? "block" : "none" }}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="entry_date">Entry Date</label>
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

        <button type="submit">
          {initialEntry ? "Update" : "Add"} Journal Entry
        </button>
        <button type="button" onClick={handleExit}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default HealthJournalEntryForm;
