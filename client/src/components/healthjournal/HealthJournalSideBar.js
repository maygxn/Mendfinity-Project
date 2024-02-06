import React from 'react';

function HealthJournalSideBar({ handleNewJournalEntryClick, search, updateSearch }) {
    return (
        <div className="sidebar">
            <input placeholder='Search' value={search} onChange={updateSearch}></input>
            <button onClick={handleNewJournalEntryClick} className="new-journal-entry-btn">Add New Journal Entry</button>
            {/* Add more buttons and stuff here */}
        </div>
    );
}

export default HealthJournalSideBar;
