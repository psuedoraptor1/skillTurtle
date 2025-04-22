import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js"
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
// import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import {Course} from "../models/Course.js" 
import cloudinary from "cloudinary"
import getDataUri from "../utils/dataUri.js"
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../models/Stats.js";
import { defaultQuestions } from "../models/defaultQuestions.js";
import { DSAQuestion } from "../models/dsaQuestionModel.js";

export const register = catchAsyncError(async (req, res, next) => {

  
  console.log("registration started");

  const { name, email, password } = req.body;
  const file = req.file;



    if (!name || !email || !password  || !file)
    return next(new ErrorHandler("Please enter all field", 400));
    

    let user=await User.findOne({email});

    if (user) return next(new ErrorHandler("User Already Exist", 409));
//upload file on cloudinary

const fileUri= getDataUri(file);

console.log("Image Upload Started");
const mycloud= await cloudinary.v2.uploader.upload(fileUri.content);

console.log("Image Uploaded");

user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id:mycloud.public_id,
      url:mycloud.secure_url,
    },
  });

  console.log("user created");


  await Promise.all(
    defaultQuestions.map(q =>
      DSAQuestion.create({
        userId: user._id,
        questionText: q.questionText,
        link: q.link,
        isCompleted: false
      })
    )
  );

  sendToken(res, user, "Registered Successfully", 201);


})




export const login=catchAsyncError(async(req,res,next)=>{
  const {  email, password } = req.body;
  // const file = req.file;
  if ( !email || !password )
  return next(new ErrorHandler("Please enter all fields", 400));
  

const user=await User.findOne({email}).select("+password");

if (!user) return next(new ErrorHandler("Incorrect Email or Passsword", 401));
//upload file on cloudinary
const isMatch = await user.comparePassword(password);

if (!isMatch) return next(new ErrorHandler("Incorrect Email or Passsword",401));


sendToken(res, user, `Welcome Back, ${user.name}`, 200);
})


export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

export const getMyProfile=catchAsyncError(async(req,res,next)=>
{
const user=await User.findById(req.user._id);
res
  .status(200)
 .json({
    success: true,
    user
  })
});


export const changePassword=catchAsyncError(async(req,res,next)=>
{
// const user=await User.findById(req.user._id);
const {oldPassword,newPassword} = req.body;
if ( !oldPassword || !newPassword )
  return next(new ErrorHandler("Please enter all field", 400));


const user= await User.findById(req.user._id).select("+password")

const isMatch=await user.comparePassword(oldPassword);

if ( !isMatch )
  return next(new ErrorHandler("Incorrect Old Password", 400));
user.password=newPassword;
await user.save();

res
  .status(200)
 .json({
    success: true,
    message: "Password Changed Successfully",
  })
});


export const updateProfile=catchAsyncError(async(req,res,next)=>
{
// const user=await User.findById(req.user._id);
const {name,email} = req.body;


const user= await User.findById(req.user._id);

if (name) user.name=name;
if(email) user.email=email;

await user.save();

res
  .status(200)
 .json({
    success: true,
    message: "Profile Updated Successfully",
  })
});

export const updateprofilepicture=catchAsyncError(async(req,res,next)=>{



  const file=req.file;
const user= await User.findById(req.user._id);

  const fileUri= getDataUri(file);
  const mycloud= await cloudinary.v2.uploader.upload(fileUri.content);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  user.avatar = {
    public_id: mycloud.public_id,
    url: mycloud.secure_url,
  };
  await user.save();

  //cloudinary: TODO
  res.status(200).json({
    success:true,
    message:"Profile Picture Updated Successfully",
  });
});

export const forgetPassword=catchAsyncError(async(req,res,next)=>{

const {email} = req.body;
const user = await User.findOne({email});
if (!user) return next(new ErrorHandler("No User Exists with this Email Address",400))

const resetToken=await user.getResetToken();
await user.save();
// http://localhost:3000/resetpassword/jafsdjfsjklfdjlkajf(random token)

const url= `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

const message= `Click on the link to reset your Password. ${url}. If you have not requested please ignore`

await sendEmail(user.email,"BrightBytes Reset Password",message)
  res.status(200).json({
    success:true,
    message:`Reset Token has been sent to ${user.email}`,
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPassword = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    const user = await User.findOne({
      resetPassword: resetPassword,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
  });
  

  if (!user)
    return next(new ErrorHandler("Token is invalid or has been expired", 401));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});


export const addToPlaylist= catchAsyncError(async(req,res,next)=>{

  const user= await User.findById(req.user._id);
const course = await Course.findById(req.body.id);
if(!course) return next(new ErrorHandler("Invalid Course Id",404));

const itemExist = user.playlist.find((item) => {
  if (item.course.toString() === course._id.toString()) return true;
});
if (itemExist) return next(new ErrorHandler("Item Already Exist", 409));


user.playlist.push({
  course: course._id,
  // poster: course.poster
  poster: course.poster.url
});
await user.save()
res.status(200).json({
  success:true,
  message: "Added to Playlist"
})
});

export const removeFromPlaylist= catchAsyncError(async(req,res,next)=>{
  const user= await User.findById(req.user._id);
const course = await Course.findById(req.query.id);
if(!course) return next(new ErrorHandler("Invalid Course Id",404));

const newPlaylist = user.playlist.filter((item) => {
  if (item.course.toString() !== course._id.toString()) return item;
})

user.playlist=newPlaylist;
// if (itemExist) return next(new ErrorHandler("Item Already Exist", 409));
await user.save()
res.status(200).json({
  success:true,
  message: "Removed From Playlist"});
});


// Admin Controllers

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

export const updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  if (user.role === "user") user.role = "admin";
  else user.role = "user";

  await user.save();

  res.status(200).json({
    success: true,
    message: "Role Updated",
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel Subscription

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});


export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel Subscription

  await user.remove();

  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Deleted Successfully",
    });
});


User.watch().on("change",async()=>{
  const stats=await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  const subscription = await User.find({ "subscription.status": "active" });
  stats[0].users = await User.countDocuments();
  stats[0].subscription = subscription.length;
  stats[0].createdAt = new Date(Date.now());

await stats[0].save();
});


//update controller -PD
export const updateDSAQuestionStatus = catchAsyncError(async (req, res, next) => {
  const { questionId } = req.params;
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return next(new ErrorHandler("isCompleted must be true or false", 400));
  }

  const question = await DSAQuestion.findOne({
    _id: questionId,
    userId: req.user._id,
  });

  if (!question) {
    return next(new ErrorHandler("Question not found", 404));
  }

  question.completed = completed;
  await question.save();

  res.status(200).json({
    success: true,
    message: "Question status updated",
    question,
  });
});




