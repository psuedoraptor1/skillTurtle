import mongoose from "mongoose";

export const connectDB = async()=>
{
    console.log(process.env.MONGO_URI);
   const {connection}= await mongoose.connect(process.env.MONGO_URI);

   console.log(`MongoDB connected with ${connection.host}`);
};

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI);