// History.js
import { useState, useEffect } from "react";
import { openDatabase } from "../../constants/data";
import { Icon } from "@iconify-icon/react";

import './History.css'

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    openDatabase().then((db) => {
      loadHistory(db);
    }).catch((error) => {
      console.error("IndexedDB error:", error);
    });
  }, []);

  const loadHistory = (db) => {
    const transaction = db.transaction("history", "readonly");
    const store = transaction.objectStore("history");
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => {
      setHistory(getAllRequest.result);
    };

    getAllRequest.onerror = (event) => {
      console.error("Failed to load history:", event.target.error);
    };
  };

  const clearHistory = () => {
    openDatabase().then((db) => {
      const transaction = db.transaction("history", "readwrite");
      const store = transaction.objectStore("history");
      const clearRequest = store.clear();

      clearRequest.onsuccess = () => {
        setHistory([]);
      };

      clearRequest.onerror = (event) => {
        console.error("Failed to clear history:", event.target.error);
      };
    }).catch((error) => {
      console.error("IndexedDB error:", error);
    });
  };

  return (
    <div className="history">
      <p className="clear" onClick={clearHistory}><Icon icon="guidance:bin-throw-person" style = {{fontSize: "20px", paddingTop:"20px", fontWeight: 400}}/>
      </p>
      <table className="scrollHistory">
        <thead>
          <th className="tr" colSpan={4} style={{height:"20px", fontWeight:"500"}}>
            History
          </th>
        </thead>
        {history.length !== 0 ?

history.map((entry, index) => (
  <tbody>
  <td key={index}>
    {/* {entry.input} = {entry.result} <span>{new Date(entry.timestamp).toLocaleString()}</span> */}
    {
      entry.length !== 0 ? entry.input  :"No History data" 
    }
    
  </td>
  <td key={index}>
    {"="}
    
  </td>
  <td key={index}>
    {/* {entry.input} = {entry.result} <span>{new Date(entry.timestamp).toLocaleString()}</span> */}
    {
      entry.length !== 0 ? entry.result  :"No History data" 
    }
    
  </td>
  
  </tbody>
)) : <td colSpan={3} >
  No Data Found
</td>
        }
        
      </table>
    </div>
  );
}