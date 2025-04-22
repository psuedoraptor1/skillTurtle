import mongoose from "mongoose";

const dsaQuestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const DSAQuestion = mongoose.model("DSAQuestion", dsaQuestionSchema);
