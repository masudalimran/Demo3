import express from "express";
import {} from "dotenv/config";
import mongoose from "mongoose";
import stringRouter from "./routes/stringRoutes.mjs";
import cors from "cors";
// Logger
import log from "log-to-file";

// Constants
const app = express();
const PORT = process.env.PORT || 3600;

// DB
try {
  await mongoose.connect(process.env.LOCAL_DB);
  console.log("Connected to Local MongoDB Database");
} catch (error) {
  log(error.message, "./logs/errors.log");
  console.log(error.message);
}

// Middle ware
app.use(express.json());
app.use(cors());

// Routes
app.use("/rest/strings", stringRouter);

// Listening
app.listen(PORT, () => {
  console.log(`Server is listening in http://localhost:${PORT}`);
});
