// JournalEntryDetail.js
import React from 'react';

function JournalEntryDetail({ selectedEntry }) {
  if (!selectedEntry) return <div>Please select an entry</div>;

  return (
    <div id='hjbody'>
      <div id='date'><p>Date: {selectedEntry.entry_date}</p></div>
      <div id='content'><p>{selectedEntry.content}</p></div>
    </div>
  );
}

export default JournalEntryDetail;
