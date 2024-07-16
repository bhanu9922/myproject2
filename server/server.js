import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { dbConnect } from "./dbConnect/dbConnect.js";
import routes from "./routes/routes.js";
//import commentRoute from './routes/comments.js';
//const bodyParser = require('body-parser');


const app = express();
dotenv.config();

app.get("/", (req, res)=>
  res.send("Backend is working!")
)

//comment schema

const workoutTypeSchema = new mongoose.Schema({
  comment: { 
      type: String, 
      required: true
      
  }
});

const WorkoutType = mongoose.model('WorkoutType', workoutTypeSchema);

//crud operations of workouttypes

app.post('/workout-types', async (req, res) => {
try {
    const workoutType = new WorkoutType(req.body);
    await workoutType.save();
    res.status(201).send(workoutType);
} catch (error) {
    res.status(400).send(error);
}
});


app.get('/workout-types', async (req, res) => {
try {
    const workoutTypes = await WorkoutType.find();
    res.status(200).send(workoutTypes);
} catch (error) {
    res.status(500).send(error);
}
});


app.patch('/workout-types/:id', async (req, res) => {
try {
    const workoutType = await WorkoutType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!workoutType) {
        return res.status(404).send();
    }
    res.status(200).send(workoutType);
} catch (error) {
    res.status(400).send(error);
}
});


app.delete('/workout-types/:id', async (req, res) => {
try {
    const workoutType = await WorkoutType.findByIdAndDelete(req.params.id);
    if (!workoutType) {
        return res.status(404).send();
    }
    res.status(200).send(workoutType);
} catch (error) {
    res.status(500).send(error);
}
});




app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(5000, () => {
  console.log("Server is Running");
  dbConnect();
});
