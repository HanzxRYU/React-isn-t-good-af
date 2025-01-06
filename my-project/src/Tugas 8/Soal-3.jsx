import React, { useState } from "react";

function SimpleCalculator() {
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [result, setResult] = useState();

  const handleAdd = () => setResult(num1 + num2);
  const handleSubtract = () => setResult(num1 - num2);
  const handleMultiply = () => setResult(num1 * num2);
  const handleDivide = () => setResult(num1 / num2);
  const handleReset = () => {
    setNum1(0);
    setNum2(0);
    setResult(0);
  };

  return (
    <div className="p-4">
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(parseInt(e.target.value))}
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(parseInt(e.target.value))}
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-4">
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          +
        </button>
        <button
          onClick={handleSubtract}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {" "}
          -{" "}
        </button>
        <button
          onClick={handleMultiply}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {" "}
          x{" "}
        </button>
        <button
          onClick={handleDivide}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {" "}
          %{" "}
        </button>
      </div>
      <button
        onClick={handleReset}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold mt-4 py-2 px-4 rounded"
      >
        Reset
      </button>
      <div className="mt-4">
        <p className="text-2xl font-bold mt-4 ml-4">Hasil: {result}</p>
      </div>
    </div>
  );
}

export default SimpleCalculator;
