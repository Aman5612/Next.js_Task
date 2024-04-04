"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("/api/todo");
    const tasksData = await response.json();
    console.log(tasksData);
    setTasks(tasksData.tasks);
  };

  const addTask = async () => {
    await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ task, index: tasks.length + 1 }),
    });
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = async (index: number) => {
    await fetch(`/api/todo/${index}`, { method: "DELETE" });
    await fetchTasks();
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
                {index + 1}. {task}
              </span>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteTask(index)}
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
