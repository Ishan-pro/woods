import type { Tree } from "./reducers"
import type { RootState } from "./store"
import { useSelector } from "react-redux"
import moment from "moment"
import { formatTime } from "./App"
import { Pie, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Colors } from "chart.js"
import { Link } from "react-router"
import { useState } from "react"



export default function DetailView() {
    ChartJS.register(ArcElement, Tooltip, Legend, Colors);

  const store = [ ...useSelector((state:RootState) => state.trees)]
  const chartdata = {
    labels: store.map((i,t) => i.label),
    datasets: [
        {
            data:store.map((i, t)=> i.duration / 60),
            label:'Minutes Worked',
            borderWidth:1,
        }
    ]
  }
  
    return (
        <div className="chart">
            <h2>Amount of time spent</h2>

      <Link to="/" className="navlink">Home</Link>
           <Pie
           datasetIdKey="id"
        data={chartdata}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Amount Spent"
            }
          }
        }}
      />
        
            
        </div>
    )
}