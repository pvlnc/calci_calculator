import { useState, useEffect } from "react";
import { CaluclatorHelper } from "../constants/caluclationHelper";

import "./Calculator.css";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const operations = {
    '+' : (a, b) => a + b,
    '-' : (a, b) => a - b,
    '*' : (a, b) => a * b,
    '/' : (a, b) => a / b,
  };

  const handleClick = (value) => {
    setInput(input + value);
  };

  const clearValue = () => {
    setInput("");
    setResult("");
  };

  const handleResult = () => {
    const number = input.split(/[\+\-\*\/]/).map(Number);
    const operators = input.replace(/[0-9]|\./g, "").split("");
    let res = number[0];

    operators.map((operator, index) => {
      const operation = operations[operator];
      if (operation) {
        res = operation(res, number[index + 1]);
      }
    });

    setResult(res);
    setInput(String(res));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (!isNaN(key) || key === ".") {
        handleClick(key);
      } else if (key in operations) {
        handleClick(key);
      } else if (key === "Enter") {
        handleResult();
      } else if (key === "Backspace") {
        setInput(input.slice(0, -1));
      } else if (key === "Escape") {
        clearValue();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  return (
    <>
      <div className="mainContainer">
        <div className="inputText">
          <input
            type="text"
            name="text"
            id="text"
            className="text"
            value={input || ""}
            readOnly
          />
          <input
            type="text"
            name="text"
            id="text"
            className="resultValue"
            value={result || ""}
            readOnly
          />
          <div className="clearButton" type="reset" onClick={clearValue}>
            X
          </div>
        </div>

        <div className="clickButton">
          {CaluclatorHelper.map((ch, index) => (
            <button key={index}  className={ch.operationKey === "equal" ? "buttonClick equal" : "buttonClick"}  type="submit"  onClick={ch.operationKey === "equal" ? handleResult : () => handleClick(ch.operationValue)}   >  {ch.operationValue}   </button>  ))}
        </div>
      </div>
    </>
  );
}