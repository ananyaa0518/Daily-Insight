import { NextResponse } from "next/server";
import dbConnect from "@lib/dbconnect";
import JournalEntry from "@/models/JournalEntry";
import sentiment from "sentiment";
export async function Post(request) {
  try {
    await dbConnect();
    const { userID, username, text } = await request.json();
    const result = sentiment(text);
    const sentimentScore = result.score;
    const moodLabel =
      sentimentScore > 0
        ? "Positive"
        : sentimentScore < 0
        ? "Negative"
        : "Neutral";

    const newEntry = new JournalEntry({
      userID,
      username,
      text,
      sentimentScore,
      moodLabel,
    });

    await newEntry.save();

    return NextResponse.json(
      { message: "Entry saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save entry", details: error.message },
      { status: 500 }
    );
  }
}
