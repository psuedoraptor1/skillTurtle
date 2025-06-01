import mongoose from "mongoose";

// const dsaQuestionSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   questionText: {
//     type: String,
//     required: true,
//   },
//   link: {
//     type: String,
//     required: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });


const dsaQuestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  levels: {
    level1: { type: Boolean, default: false },
    level2: { type: Boolean, default: false },
    level3: { type: Boolean, default: false },
  }
  ,
  category: {
    type: String,
    required: true,
  }
 
  
});

// module.exports = mongoose.model("DSAQuestion", dsaQuestionSchema);

export const DSAQuestion = mongoose.model("DSAQuestion", dsaQuestionSchema);
