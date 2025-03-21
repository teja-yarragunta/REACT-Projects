import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-8 font-mono">
        Simple Counter App using React JS
      </h1>
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg text-center">
        <h2 className="text-8xl font-mono  mb-6">{count}</h2>
        <div className="flex gap-6">
          <button
            onClick={increment}
            className="px-6 py-3 bg-green-500 text-white text-2xl font-mono rounded-full hover:bg-green-600 transition-all"
          >
            +
          </button>
          <button
            onClick={decrement}
            className="px-6 py-3 bg-red-500 text-white text-2xl font-mono rounded-full hover:bg-red-600 transition-all"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
