import React, { useEffect, useState } from "react";

function HealthJournalEntryList() {
  // initialize state to hold entries
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/health-journal-entries", {
      method: "GET",
      credentials: "include", // Important for session handling, especially for cross-origin requests
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
        setEntries(data);
      })
      .catch((error) => {
        console.error("Error fetching health journal entries:", error);
      });
  }, []);

  return (
    <div>
      {entries.length > 0 ? (
        entries.map((entry, index) => (
          <div key={index}>
            <p>{entry.content}</p>
            <p>{entry.entry_date}</p>
          </div>
        ))
      ) : (
        <p>No journal entries found.</p>
      )}
    </div>
  );
}

export default HealthJournalEntryList;
