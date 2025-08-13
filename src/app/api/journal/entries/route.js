import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import JournalEntry from "@/models/JournalEntry";

export async function GET(request) {
  try {
    await dbConnect();
    const entries = await JournalEntry.find({});
    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch journal entries" },
      { status: 500 }
    );
  }
}
