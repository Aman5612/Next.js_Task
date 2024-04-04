"use client";

import { useEffect, useState } from "react";

interface Task {
  _id: string;
  name: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("/api/todo");
    const tasksData = await response.json();
    console.log(tasksData.taskList);
    setTasks(tasksData.taskList);
  };

  const addTask = async () => {
    await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ task }),
    });
    setTask("");
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/todo/${id}`, { method: "DELETE" });
      if (response.ok) {
        console.log("Task deleted successfully");
      } else {
        console.error("Error deleting task:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      fetchTasks();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Tasks List</h1>

      <div className="w-full max-w-md">
        <div className="mb-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded"
            >
              <span>
                {index + 1}. {task.name}
              </span>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
        >
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full bg-gray-100 rounded py-2 px-4 mb-4"
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
