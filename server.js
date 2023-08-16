import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
//remember to add .js extension for our files when importing and "type" : "module" in package.json

import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

//routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// middleware
import errorHandleMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenicateUser } from "./middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

app.use("/api/v1/jobs", authenicateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenicateUser, userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandleMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
