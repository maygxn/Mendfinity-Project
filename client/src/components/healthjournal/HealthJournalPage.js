import React, { useEffect, useState } from 'react';
import HealthJournalSideBar from './HealthJournalSideBar';
import HealthJournalEntryDetail from './HealthJournalEntryDetail';
import HealthJournalEntryForm from './HealthJournalEntryForm';

function HealthJournalPage() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

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
    .then(() => {
      // Check if the deleted entry is the currently selected one
      if (selectedEntry && selectedEntry.id === entryId) {
        setSelectedEntry(null); // Reset the selected entry to null
      }
      fetchEntries(); // Refresh the entries list
    })
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

  const updateSearch = (newSearch) => {
    setSearch(newSearch);
  };


  return (
    <>
      <div className='health-journal-page'>
      <div className="app-container">
        <HealthJournalSideBar
          entries={entries}
          handleNewJournalEntryClick={handleNewJournalEntryClick}
          selectEntry={handleEntrySelect}
          search={search}
          updateSearch={updateSearch}
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
      </div>
    </>
  );
}

export default HealthJournalPage;
