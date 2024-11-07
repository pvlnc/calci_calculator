import { useState, useEffect } from "react";
import "./Calculator.css";
import { CaluclatorHelper } from "../../constants/caluclationHelper";
import { openDatabase } from "../../constants/data";
import { Icon } from "@iconify-icon/react";


export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [highlightedKey, setHighlightedKey] = useState(null);

  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
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

    operators.forEach((operator, index) => {
      const operation = operations[operator];
      if (operation) {
        res = operation(res, number[index + 1]);
      }
    });

    setResult(res);
    setInput(String(res));
    saveHistory(input, res);
  };

  const saveHistory = (input, result) => {
    const timestamp = new Date();
    openDatabase()
      .then((db) => {
        const transaction = db.transaction("history", "readwrite");
        const store = transaction.objectStore("history");

        store.add({ input, result, timestamp }).onerror = (e) => {
          console.error("Error saving history:", e.target.error);
        };
      })
      .catch((error) => {
        console.error("IndexedDB error:", error);
      });
  };

  // Add key events
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (!isNaN(key) || key === ".") {
        handleClick(key);
        setHighlightedKey(key);
      } else if (key in operations) {
        handleClick(key);
        setHighlightedKey(key);
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
          <Icon icon="guidance:bin-throw-person" style = {{fontSize: "20px", paddingTop:"20px", fontWeight: 400}}/>
          </div>
        </div>

        <div className="clickButton">
          {CaluclatorHelper.map((ch, index) => (
            <button  key={index}  className={`buttonClick ${highlightedKey === ch.operationValue ? 'highlighted' : ""} ${ ch.operationKey === "equal" ? "equal" : ""  }`} type="submit"  onClick={ ch.operationKey === "equal"  ? handleResult : () => handleClick(ch.operationValue) }    >   {ch.iconName ? <Icon icon={ch.iconName} /> : null} </button> ))}
        </div>
      </div>
    </>
  );
}
