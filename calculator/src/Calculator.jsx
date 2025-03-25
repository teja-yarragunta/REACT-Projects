import React, { useState } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);
  const [history, setHistory] = useState("");

  // Handle number inputs
  const handleNumberClick = (num) => {
    if (display === "0" || resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  // Handle decimal point
  const handleDecimalClick = () => {
    if (resetDisplay) {
      setDisplay("0.");
      setResetDisplay(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Handle operators
  const handleOperatorClick = (op) => {
    const currentValue = parseFloat(display);

    // If previousValue is null but display has a valid number (after equals was pressed)
    if (previousValue === null && operation === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculateResult();
      setPreviousValue(result);
      setDisplay(String(result));
    }

    setOperation(op);
    setResetDisplay(true);
    setHistory(`${currentValue} ${op}`);
  };

  // Calculate result
  const calculateResult = () => {
    const currentValue = parseFloat(display);

    if (previousValue === null || operation === null) {
      return currentValue;
    }

    switch (operation) {
      case "+":
        return previousValue + currentValue;
      case "-":
        return previousValue - currentValue;
      case "*":
        return previousValue * currentValue;
      case "/":
        return previousValue / currentValue;
      default:
        return currentValue;
    }
  };

  // Handle equals
  const handleEquals = () => {
    if (previousValue === null || operation === null) {
      return;
    }

    const currentValue = parseFloat(display);
    const result = calculateResult();

    // Create history string with the full equation
    const opSymbol =
      operation === "+"
        ? "+"
        : operation === "-"
          ? "−"
          : operation === "*"
            ? "×"
            : operation === "/"
              ? "÷"
              : operation;

    setHistory(`${previousValue} ${opSymbol} ${currentValue}`);
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(true);
  };

  // Clear everything
  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
    setHistory("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl overflow-hidden font-mono">
        <div className="p-5 bg-gray-900">
          <h1 className="text-3xl font-bold text-white text-center mb-4 font-mono">
            Calculator
          </h1>
          <div className="bg-gray-800 rounded-lg p-4 mb-2 h-24 flex flex-col justify-end">
            <div className="h-full flex flex-col justify-end">
              <div className="text-right text-sm font-mono text-gray-400 h-6">
                {history ||
                  (operation &&
                    `${previousValue} ${
                      operation === "+"
                        ? "+"
                        : operation === "-"
                          ? "−"
                          : operation === "*"
                            ? "×"
                            : operation === "/"
                              ? "÷"
                              : operation
                    }`) ||
                  " "}
              </div>
              <div className="text-right text-3xl font-mono text-white truncate">
                {display}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 p-5">
          <button
            onClick={handleClear}
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg text-xl font-bold transition-colors font-mono"
          >
            Clear
          </button>
          <button
            onClick={() => handleOperatorClick("/")}
            className="bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-lg text-xl font-bold transition-colors font-mono"
          >
            ÷
          </button>
          <button
            onClick={() => handleOperatorClick("*")}
            className="bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-lg text-xl font-bold transition-colors font-mono"
          >
            ×
          </button>

          {[7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="bg-gray-600 hover:bg-gray-500 text-white py-4 rounded-lg text-xl font-bold transition-colors font-mono"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleOperatorClick("-")}
            className="bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-lg text-xl font-bold transition-colors font-mono"
          >
            −
          </button>

          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="bg-gray-600 hover:bg-gray-500 text-white py-4 rounded-lg text-xl font-bold transition-colors font-mono"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleOperatorClick("+")}
            className="bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-lg text-xl font-bold transition-colors font-mono"
          >
            +
          </button>

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="bg-gray-600 hover:bg-gray-500 text-white py-4 rounded-lg text-xl font-bold transition-colors font-mono"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleEquals}
            className="row-span-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg text-xl font-bold transition-colors font-mono"
          >
            =
          </button>

          <button
            onClick={() => handleNumberClick("0")}
            className="col-span-2 bg-gray-600 hover:bg-gray-500 font-mono text-white py-4 rounded-lg text-xl font-bold transition-colors"
          >
            0
          </button>
          <button
            onClick={handleDecimalClick}
            className="bg-gray-600 hover:bg-gray-500 text-white py-4 rounded-lg text-xl font-bold transition-colors font-mono"
          >
            <div className="clear"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
