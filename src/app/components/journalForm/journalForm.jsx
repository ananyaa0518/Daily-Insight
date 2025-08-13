// components/JournalForm.js
"use client";

import { useState } from "react";

export default function JournalForm({ onNewEntry }) {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !username) {
      alert("Please enter your name and a journal entry.");
      return;
    }

    try {
      const res = await fetch("/api/journal/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, text }),
      });

      if (res.ok) {
        setText("");
        setUsername("");
        onNewEntry();
      } else {
        alert("Failed to submit entry.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind today?"
          className="w-full p-2 border border-gray-300 rounded mb-4 h-32"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit Entry
        </button>
      </form>
    </div>
  );
}
