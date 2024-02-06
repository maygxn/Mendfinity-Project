import React from "react";
import HealthJournalNav from "./HealthJournalNav";
import HealthJournalEntryList from "./HealthJournalEntryList";
import LoginPage from "../login/LoginPage";

function HealthJournalPage() {
  return (
    <>
      <HealthJournalNav />
      <div className="form-container"></div>
      <HealthJournalEntryList />
    </>
  );
}

export default HealthJournalPage;
