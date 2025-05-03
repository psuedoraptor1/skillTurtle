// controllers/dsaController.js
import { DSAQuestion } from "../models/dsaQuestionModel.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getDSATopicsForUser = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { category } = req.params;

  const allowedCategories = [
    "Data Structures & Alogrithms",
    "Web Development",
    "Core Subjects",
    "System Sesign",
    "Off-campus",
    "Others"
  ];

  // Validate category (case-insensitive check)
  const matchedCategory = allowedCategories.find(
    c => c.toLowerCase() === category.toLowerCase()
  );

  if (!matchedCategory) {
    return next(new ErrorHandler("Invalid category", 400));
  }

  const topics = await DSAQuestion.find({
    userId,
    category: matchedCategory // exact match from allowed list
  });

  res.status(200).json({
    success: true,
    topics,
  });
});
