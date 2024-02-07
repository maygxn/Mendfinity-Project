import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function HealthJournalEntryForm({
  showForm,
  setShowForm,
  onSaveEntry,
  initialEntry = null,
}) {
  const validationSchema = yup.object({
    entry_date: yup.date().required("Entry date is required."),
    content: yup.string().required("Content is required."),
  });

  const formik = useFormik({
    initialValues: {
      entry_date: initialEntry ? initialEntry.entry_date : "",
      content: initialEntry ? initialEntry.content : "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSaveEntry(values);
      setShowForm(false);
    },
  });

  const handleExit = () => setShowForm(false);

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
