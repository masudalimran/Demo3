import { Router } from "express";
import str from "../models/stringsModel.mjs";
const stringRouter = Router();
// Logger
import log from "log-to-file";

// create String
stringRouter.post("/", async (req, res) => {
  try {
    const newText = new str(req.body);
    await newText.save();
    res.json({ message: "Code Working" });
  } catch (error) {
    log(error.message, "./logs/errors.log");
    res.send(error.message);
  }
});

// Get String
stringRouter.get("/", async (req, res) => {
  try {
    const stringList = await str.find();
    log("Creation Successful!", "./logs/errors.log");
    res.json(stringList);
  } catch (error) {
    log(error.message, "./logs/errors.log");
    res.send(error.message);
  }
});

// Remove String
stringRouter.delete("/:id", async (req, res) => {
  try {
    await str.findByIdAndDelete({ _id: req.params.id });
    log("Deletion Successful!", "./logs/errors.log");
    res.json({ message: "Deletion Code Working" });
  } catch (error) {
    log(error.message, "./logs/errors.log");
    res.send(error.message);
  }
});

export default stringRouter;
