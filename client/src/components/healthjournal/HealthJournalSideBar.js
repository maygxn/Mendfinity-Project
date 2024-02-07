import React from 'react';

function HealthJournalSideBar({ entries, handleNewJournalEntryClick, selectEntry, search, updateSearch }) {
  return (
    <nav id='sidebar'>
      <input placeholder='Search' id='searchbar' value={search} onChange={updateSearch}></input>
      <button onClick={handleNewJournalEntryClick} id="composedbutton">Add New Journal Entry</button>
      <ul>
        {entries.map((entry, index) => (
          <li key={index} onClick={() => selectEntry(entry)}>
            {entry.entry_date}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default HealthJournalSideBar;
