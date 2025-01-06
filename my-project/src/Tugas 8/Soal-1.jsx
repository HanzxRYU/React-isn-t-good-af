import { useState } from "react";

function Calculator() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Counter: <span className="text-blue-500">{count}</span>
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-200"
        >
          Tambah 1
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-200"
        >
          Kurang 1
        </button>
        <button
          onClick={() => setCount(0)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Calculator;
