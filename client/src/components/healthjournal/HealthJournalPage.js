import React, { useEffect, useState } from 'react';
import HealthJournalNav from './HealthJournalNav';
import HealthJournalSideBar from './HealthJournalSideBar';
import HealthJournalEntryDetail from './HealthJournalEntryDetail';
import HealthJournalEntryForm from './HealthJournalEntryForm';
import './HealthJournalPage.css';

function HealthJournalPage() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetches entries from the backend
  const fetchEntries = () => {
    fetch("http://127.0.0.1:5555/health-journal-entries", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
    .then(response => response.json())
    .then(data => setEntries(data))
    .catch(error => console.error("Error fetching health journal entries:", error));
  };

  useEffect(fetchEntries, []);

  // Handles saving both new and existing entries
  const handleSaveEntry = (entryData, entryId) => {
    const url = entryId ? `http://127.0.0.1:5555/health-journal-entries/${entryId}` : "http://127.0.0.1:5555/health-journal-entries";
    const method = entryId ? "PATCH" : "POST";
  
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      body: JSON.stringify(entryData),
    })
    .then(() => {
      setShowForm(false);
      setSelectedEntry(null); // Clear selection
      fetchEntries(); // Refetch entries to reflect changes
    })
    .catch(error => console.error("Error saving the entry:", error));
  };

  // Handles deleting an entry
  const handleDeleteEntry = (entryId) => {
    fetch(`http://127.0.0.1:5555/health-journal-entries/${entryId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
    .then(() => fetchEntries()) // Refresh the entries list
    .catch(error => console.error("Error deleting the entry:", error));
  };

  // Toggles the form to add a new entry
  const handleNewJournalEntryClick = () => {
    setShowForm(true);
    setSelectedEntry(null); // Clear any selected entry
  };

  // Selects an entry for viewing or editing
  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry); // Set the selected entry
    setShowForm(false); // Ensure the form is not shown if an entry is selected for viewing
  };

  return (
    <>
      <HealthJournalNav onAddButtonClick={handleNewJournalEntryClick} />
      <div className='app-container'>
        <HealthJournalSideBar
          entries={entries}
          handleNewJournalEntryClick={handleNewJournalEntryClick}
          selectEntry={handleEntrySelect}
        />
        {showForm ? (
          <HealthJournalEntryForm
            onSaveEntry={handleSaveEntry}
            showForm={showForm}
            setShowForm={setShowForm}
            initialEntry={selectedEntry}
          />
        ) : selectedEntry ? (
          <HealthJournalEntryDetail
            selectedEntry={selectedEntry}
            onEdit={() => setShowForm(true)}
            onDelete={() => handleDeleteEntry(selectedEntry.id)}
          />
        ) : <div>Select an entry to view its details or create a new entry.</div>}
      </div>
    </>
  );
}

export default HealthJournalPage;
