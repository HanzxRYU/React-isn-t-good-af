import React, { useState, useEffect } from "react";

// Custom hook untuk mengelola status tugas
function useTaskStatus() {
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  useEffect(() => {
    console.log(
      `Task Status: ${isTaskCompleted ? "Completed" : "Not Completed"}`
    );
  }, [isTaskCompleted]);

  const toggleTaskStatus = () => {
    setIsTaskCompleted((prevStatus) => !prevStatus);
  };

  return { isTaskCompleted, toggleTaskStatus };
}

function TaskStatusApp() {
  const { isTaskCompleted, toggleTaskStatus } = useTaskStatus();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg text-center">
        <h1
          className={`text-2xl font-bold ${
            isTaskCompleted ? "text-green-500" : "text-red-500"
          }`}
        >
          {isTaskCompleted ? "✅ Task Completed" : "❌ Task Not Completed"}
        </h1>
        <button
          onClick={toggleTaskStatus}
          className="mt-6 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow transition duration-300"
        >
          Toggle Task
        </button>
      </div>
    </div>
  );
}

export default TaskStatusApp;
