import { NextResponse } from "next/server";
import vader from "vader-sentiment";
import dbConnect from "@/lib/dbconnect";
import JournalEntry from "@/models/JournalEntry";

export async function POST(request) {
  try {
    await dbConnect();
    console.log("Database connected successfully.");

    const { username, text } = await request.json();
    console.log("Received data:", { username, text });

    if (!username || !text) {
      return NextResponse.json(
        { error: "Username and text are required." },
        { status: 400 }
      );
    }

    const userID = username;

    const scores = vader.SentimentIntensityAnalyzer.polarity_scores(text);
    const sentimentScore = scores.compound;
    const moodLabel =
      sentimentScore >= 0.05
        ? "Positive"
        : sentimentScore <= -0.05
        ? "Negative"
        : "Neutral";

    console.log("Sentiment analysis complete:", { sentimentScore, moodLabel });

    const newEntry = new JournalEntry({
      userID,
      username,
      text,
      sentimentScore,
      moodLabel,
    });

    await newEntry.save();
    console.log("Journal entry saved:", newEntry);

    return NextResponse.json(
      { message: "Entry saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("API submission error:", error);
    return NextResponse.json(
      { error: "Failed to save journal entry. Check server logs." },
      { status: 500 }
    );
  }
}
