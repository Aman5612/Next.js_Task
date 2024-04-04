import mongoose from "mongoose";
import Task from "../../../taskModel";

const MONGODB_URI =
  "mongodb+srv://aman5612:hUw42fXicveWNNc6@cluster0.cqhprto.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, {
    dbName: "Todo",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

export async function GET(request: Request) {
  const taskList = await Task.find();
  const tasks = taskList.map((task) => task.name);
  return new Response(JSON.stringify({ tasks }));
}

export async function POST(request: Request) {
  try {
    const { task, index } = await request.json();
    await Task.create({ index, name: task });
    return new Response("Task created successfully", { status: 201 });
  } catch (error) {
    return new Response("Error creating task", { status: 500 });
  }
}


