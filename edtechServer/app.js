import express from "express";
import {config} from "dotenv"
import ErrorMiddleware  from "./middlewares/Error.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import axios from "axios"
import path from 'path';
import { fileURLToPath } from "url";

// Resolving dirname for ES module
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)
console. log(_dirname);

config({
    path:"./config/config.env",
})
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "./config/config.env" });
// }

const app=express();

//using middlewares
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.use(express.json());
app.use(express.urlencoded(
    {
        extended:true,
    }
));
app.use(cookieParser());

app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      // origin: process.env.FRONTEND_URL,
      // preflightContinue: true,
      // methods: ["GET", "POST", "PUT", "DELETE"],
      // allowedHeaders: ["Content-Type", "Authorization"],
      // exposedHeaders: ["Content-Type", "Authorization"],
      // credentials: true,
    })
  );

import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import mongoose from "mongoose";
import other from "./routes/otherRoutes.js"


mongoose.set('strictQuery',false)
// mongoose.set('strictQuery',false)
app.use("/api/v1",course);
app.use("/api/v1",other);
app.use("/api/v1",user);
app.use("/api/v1",payment);

// Use the client app
app.use(express.static(path.join(_dirname,"/edtech/build")));

// Render client for any path
app.get("*", (req, res) =>
  res.sendFile(path.join(_dirname, "/edtech/build/index.html"))
);

export default app;

app.use(ErrorMiddleware)

