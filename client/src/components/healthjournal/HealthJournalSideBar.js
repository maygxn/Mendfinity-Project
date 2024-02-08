import React from 'react';

function HealthJournalSideBar({ entries, handleNewJournalEntryClick, selectEntry, search = '', updateSearch }) {
  // Ensure search is a string to prevent .toLowerCase() from throwing an error
  const safeSearch = search ? search.toLowerCase() : '';

  // Safely filter entries considering potential undefined values
  const filteredEntries = entries.filter(entry => {
    // Use optional chaining and nullish coalescing to safely handle undefined values
    const entryContentLower = entry.content?.toLowerCase() ?? '';
    const entryDateStr = entry.entry_date ?? '';

    return entryDateStr.includes(search) || entryContentLower.includes(safeSearch);
  });

  return (
    <nav id='sidebar'>
      <input
        placeholder='Search entries'
        id='searchbar'
        type="text" // Specify input type
        value={search}
        onChange={(e) => updateSearch(e.target.value)}
      />
      <button onClick={handleNewJournalEntryClick} id="composedbutton">Add New Journal Entry</button>
      <ul>
        {filteredEntries.map((entry, index) => (
          <li key={index} onClick={() => selectEntry(entry)}>
            {entry.entry_date} - {entry.content?.substring(0, 100)}{/* Display more content for clarity */}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default HealthJournalSideBar;
