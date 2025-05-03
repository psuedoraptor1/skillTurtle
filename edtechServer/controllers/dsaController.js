// controllers/dsaController.js
import { DSAQuestion } from "../models/dsaQuestionModel.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getDSATopicsForUser = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  const topics = await DSAQuestion.find({ userId });

  res.status(200).json({
    success: true,
    topics,
  });
});
