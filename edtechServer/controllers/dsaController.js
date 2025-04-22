// controllers/dsaController.js
import { DSAQuestion } from "../models/dsaQuestionModel.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getDSAQuestionsForUser = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id; // assuming you're using auth middleware that sets req.user

  const questions = await DSAQuestion.find({ userId });

  res.status(200).json({
    success: true,
    questions,
  });
});
