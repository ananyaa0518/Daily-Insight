// app/page.js
"use client";

import { useState, useEffect } from "react";
import JournalForm from "@/app/components/journalForm/journalForm.jsx";
import SentimentDashboard from "@/app/components/sentimentDashboard/sentimentDashboard.jsx";

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/journal/entries");
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleNewEntry = () => {
    fetchEntries();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Sentiment Journal
      </h1>
      <JournalForm onNewEntry={handleNewEntry} />
      {loading ? (
        <p className="text-center mt-8">Loading dashboard...</p>
      ) : (
        <SentimentDashboard entries={entries} />
      )}
    </div>
  );
}
