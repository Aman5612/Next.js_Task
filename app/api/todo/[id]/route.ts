import mongoose from "mongoose";
import Task from "../../../../taskModel";

const MONGODB_URI =
  "mongodb+srv://aman5612:hUw42fXicveWNNc6@cluster0.cqhprto.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, {
    dbName: "Todo",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

export async function DELETE(request: Request) {
  try {
    const { index } = await request.json();
    console.log(">>>>>>>>>>>>>>>.", index);
    const taskToDelete = await Task.findOneAndDelete({ index });
    if (!taskToDelete) {
      return new Response("Task not found", { status: 404 });
    }
    return new Response("Task deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting task", { status: 500 });
  }
}
