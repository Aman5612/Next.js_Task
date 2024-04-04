import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
