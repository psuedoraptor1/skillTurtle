import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import {User} from "../models/User.js"


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    let { token } = req.cookies;

    // Also check for token in Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) return next(new ErrorHandler("Not Logged In", 401));
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = await User.findById(decoded._id);
  
    next();
  });

 

  export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin")
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource`,
          403
        )
      );
  
    next();
  };



  export const authorizeSubscribers = (req, res, next) => {
    if (req.user.subscription.status !== "active" && req.user.role !== "admin")
      return next(
        new ErrorHandler(`Only Subscribers can acces this resource`, 403)
      );
  
    next();
  };
  
  export const protect = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from header
  
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret
      req.user = decoded.user; // Add user info to the request
      next(); // Proceed to next middleware/route handler
    } catch (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  };
