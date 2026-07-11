import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import type { RootState } from "./store"
import { newTree, type Tree } from "./reducers"
import tree from './assets/tree.svg'
import './App.css'
import moment from "moment"
import { Link } from "react-router"

const formatTime =(seconds:number)=> {
    const hours = (Math.floor(seconds / 3600))===0 ? false :Math.floor(seconds / 3600) ;
    const minutes = (Math.floor((seconds % 3600) / 60))===0 ? false :Math.floor((seconds % 3600)/60);
    const remainingSeconds = (seconds % 60).toFixed(0);
    return `${!hours ? "" : hours +"h"} ${!minutes ? "" : minutes +"m"} ${remainingSeconds}s`;
}

const renderTrees = (i:Tree, k:number, n:number, setExpandTree:React.Dispatch<React.SetStateAction<number|false>>) => {
  // const [visibleLabel, setVisibleLabel] = useState(false)
  
  const plottingalgorithm = (a:number) => {
    const noOfGrids = (n % 2 ===0) ? n + 1 : n + 2
    
    const coordinate = ((a %2 ===0) ? (noOfGrids+1)/2 -a/2 : (noOfGrids+1)/2 +a)
    return coordinate
  }

  return (
    <div key={k} className="tree-block" style={{
      gridColumn:plottingalgorithm(k),
      gridRow:(Math.floor(k/5) +1),
    }}
    onClick={() => setExpandTree(k)}
    >

      <img src={tree} width={100} aria-describedby={`${k}label`} className="tree-icon"></img>
      <div role="tooltip" id={`${k}label`}>{i.label} for {formatTime(i.duration)} </div>
    </div>
  )
}


function App() {
  const [treeLabel, setTreeLabel] = useState<string>("")
  const [initialTime, setInitialTime] = useState<number>(0)
  const [stopwatchOn, setStopwatchOn] = useState<boolean>(false)
  const [expandTree, setExpandTree] = useState<false|number>(false)
  const stopwatchTime = useStopwatch(stopwatchOn ? initialTime : null)
  const dispatch = useDispatch()


  const treeExpandView = (treeId:number)=> {
    const detailedTree = store[treeId]

    const CreationDate = new Date(detailedTree.dateCreated *1000)
    return (
      <div className="tree-detail">
        <button onClick={() => {setExpandTree(false)}} className="detail-close-btn">X</button>
      
        <div className="hellapadding"> You worked on <span className="imp">{detailedTree.label}</span> for <span className="imp">{formatTime(detailedTree.duration)}</span></div>
        <div className="hellapadding">Date you worked <span className="imp">{moment(CreationDate).format('h:mm a, MMMM Do YYYY')}</span></div>
        <img src={tree} width={120} className="tree-icon-detail" alt="Healthy Tree"></img>
        </div>
    )
  }


  const store = [ ...useSelector((state:RootState) => state.trees)]
  

  const makeTree = () => {
    if (stopwatchTime !==0) {
      dispatch(newTree({label:treeLabel, duration:stopwatchTime, dateCreated:initialTime}))
      setStopwatchOn(false)
      setInitialTime(0)
      setTreeLabel("")
    }
    
  }

  const toggleStopwatch = () => {
    if (stopwatchOn) {
      setStopwatchOn(false)
      setInitialTime(0)
      return
    }

    setInitialTime(Date.now()/1000)
    setStopwatchOn(true)
  }
  
  return (
    <main>
      <h1>Grow your Woods</h1>
      <Link to="/detail" className="navlink">Dashboard</Link>
      {!(expandTree===false) && treeExpandView(expandTree)}
      {!stopwatchOn && <div className="tree-field" style={{
        
        display:"grid",
        width:"100%",
        gridTemplateColumns:"1fr ".repeat((store.length % 2 ===0) ? store.length + 1 : store.length + 2),
        gridTemplateRows: "1fr",

        overflowX:"clip"
      }}>
        {store.map(
          (i, k) => {
            const realLength = store.reduce(x=> x+1, 0) 
            return renderTrees(i, k, realLength, setExpandTree)
          }
        )}
      </div>}
      {stopwatchOn && <img src={tree} width={100} className="tree-icon-stopwatch"></img>}
      <div style={{margin:"4rem"}}>

      
      <input value={treeLabel} placeholder="What are you working on?" onChange={(e) => {setTreeLabel(e.target.value)}} className="tree-input"></input>
      <div className="btns">
        <button onClick={toggleStopwatch} className="btn-counter">{!stopwatchOn ? "Grow it" : "Burn it"}</button>
        {stopwatchOn && <button onClick={makeTree} className="btn-counter">Done!</button>}
      </div>
      <p style={{margin:"3rem"}}> {stopwatchOn && "Time Elapsed " + formatTime(stopwatchTime) + " working on " +treeLabel}</p>
      </div>
    </main>
  )
}

const useStopwatch = (initialTime:number | null) => {
  const [now, setNow] = useState<number>(() => Date.now()/1000)

  useEffect(() => {
    if (initialTime === null) {
      return
    }

    const intervalId = window.setInterval(() => {
      setNow(Date.now()/1000)
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [initialTime])

  if (initialTime === null) {
    return 0
  }
  
  return Math.max(0, now - initialTime)
}

export default App