// components/SentimentDashboard.js
"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SentimentDashboard({ entries }) {
  const data = {
    labels: entries.map((entry) =>
      entry.date && !isNaN(new Date(entry.date))
        ? new Date(entry.date).toLocaleDateString()
        : "No Date"
    ),
    datasets: [
      {
        label: "Sentiment Score",
        data: entries.map((entry) => entry.sentimentScore),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sentiment Score Over Time",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sentiment Trend</h2>
      {entries.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p className="text-center">No journal entries yet.</p>
      )}
    </div>
  );
}
