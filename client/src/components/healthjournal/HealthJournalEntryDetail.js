import React from 'react';


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
      <button onClick={onEdit}>Edit</button>
      <button onClick={() => onDelete(selectedEntry.id)}>Delete</button>
    </div>
  );
}

export default JournalEntryDetail;
