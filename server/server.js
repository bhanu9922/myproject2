import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { dbConnect } from "./dbConnect/dbConnect.js";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend is working!"));

const workoutTypeSchema = new mongoose.Schema({
  comment: { 
    type: String, 
    required: true 
  }
});

const WorkoutType = mongoose.model('WorkoutType', workoutTypeSchema);

app.use(routes);
app.post("/workout-types", async (req, res) => {
  try {
    const workoutType = new WorkoutType(req.body);
    await workoutType.save();
    res.status(201).send(workoutType);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get("/workout-types", async (req, res) => {
  try {
    const workoutTypes = await WorkoutType.find();
    res.status(200).send(workoutTypes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.patch("/workout-types/:id", async (req, res) => {
  try {
    const workoutType = await WorkoutType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!workoutType) {
      return res.status(404).send({ message: 'Workout type not found' });
    }
    res.status(200).send(workoutType);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.delete("/workout-types/:id", async (req, res) => {
  try {
    const workoutType = await WorkoutType.findByIdAndDelete(req.params.id);
    if (!workoutType) {
      return res.status(404).send({ message: 'Workout type not found' });
    }
    res.status(200).send(workoutType);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
  dbConnect();
});
