import './App.css'
import Calculator from './components/Calculator'
// import HistoryCalculator from './components/HistoryCalculator'


const historyCalculator = () =>{
  <HistoryCalculator/>
}

function App() {

  return (
    <>
        <div className="main">
          <h1 className="title">Calculator</h1>
          <button type="submit" className='history' onClick={historyCalculator}>History</button>
          
          <Calculator/>

        </div>
    </>
  )
}

export default App
