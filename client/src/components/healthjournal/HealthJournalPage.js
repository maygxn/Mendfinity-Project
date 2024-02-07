import React, { useEffect, useState } from 'react';
import HealthJournalNav from './HealthJournalNav';
import HealthJournalSideBar from './HealthJournalSideBar';
import HealthJournalEntryDetail from './HealthJournalEntryDetail';
import HealthJournalEntryForm from './HealthJournalEntryForm';
import './HealthJournalPage.css'

function HealthJournalPage() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/health-journal-entries", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setEntries(data);
      })
      .catch((error) => {
        console.error("Error fetching health journal entries:", error);
      });
  }, []);

  const handleNewJournalEntryClick = () => {
    setShowForm(true);
    setSelectedEntry(null);
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
    setShowForm(false);
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
          <HealthJournalEntryForm showForm={showForm} setShowForm={setShowForm} />
        ) : (
          <HealthJournalEntryDetail selectedEntry={selectedEntry} />
        )}
        </div>
    </>
  );
}

export default HealthJournalPage;
