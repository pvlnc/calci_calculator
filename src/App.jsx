import { useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator/Calculator";
import Shortcut from "./components/Shortcuts/Shortcut";
import History from "./components/History/History";
import { Icon } from "@iconify-icon/react";



function App() {
  const [historyShow, setHistoryShow] = useState(false);
  const [shortcutShow, setShortcutShow] = useState(false);

  const showHistory = () =>{
    setHistoryShow(!historyShow)
    setShortcutShow(false)
  }
  const showShortcut = () =>{
    setShortcutShow(!shortcutShow)
    setHistoryShow(false)

  }
  return (
    <>
      {}
      <div className="main">
        <h1 className="title">Calculator</h1>
        <div className="containerFlex">
          <div className="calculator">
            <Calculator /> 
          </div>
          <div className="accordion">
            {/* */}
            <div onClick={showHistory} >
             <button type="submit" className="historyBtn" style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", justifyItems:"center"}}>
                <Icon icon="material-symbols:history-2-rounded" style={{fontSize:"20px", alignContent:"center"}} />History<Icon icon="fe:arrow-down" />
              </button> 
             {historyShow ? 
             <div className="historyShows">
                  <History /> 
             </div>
              : null}
            </div>
            <div onClick={showShortcut} >
             <button type="submit" className="shortcutBtn" style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", justifyItems:"center"}}>
             <Icon icon="arcticons:keysmith" style={{color:"#4285f4", fontSize:"20px", alignContent:"center"}} />Shortcut Keys<Icon icon="fe:arrow-down" />
              </button> 
             {shortcutShow ? 
             <div className="shortcutShows">
                  <Shortcut /> 
             </div>
              : null}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;

