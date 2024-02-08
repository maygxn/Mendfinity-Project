import React from 'react';

// Include onEdit and onDelete props that you'll pass from HealthJournalPage
function JournalEntryDetail({ selectedEntry, onEdit, onDelete }) {
  if (!selectedEntry) return <div>Please select an entry</div>;

  return (
    <div id='hjbody'>
      <div id='date'>
        <p>Date: {selectedEntry.entry_date}</p>
      </div>
      <div id='content'>
        <p>{selectedEntry.content}</p>
      </div>
      {/* Use the onEdit and onDelete props for the edit and delete functionality */}
      <button onClick={onEdit}>Edit</button>
      <button onClick={() => onDelete(selectedEntry.id)}>Delete</button>
    </div>
  );
}

export default JournalEntryDetail;
