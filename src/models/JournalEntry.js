import mongoose from "mongoose";

const JournalEntrySchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  text: {
    type: String,
    required: true,
  },
  sentimentScore: {
    type: Number,
    required: true,
  },
  moodLabel: {
    type: String,
    required: true,
  },
});
const JournalEntry =
  mongoose.models.JournalEntry ||
  mongoose.model("JournalEntry", JournalEntrySchema);
export default JournalEntry;
