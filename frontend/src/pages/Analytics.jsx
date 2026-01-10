import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Analytics = () => {
  const data = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun'],
    datasets: [
      {label:'Expenses',data:[500,700,600,800,900,750],borderColor:'#ff6384',tension:0.3},
      {label:'Income',data:[1000,1100,1200,1300,1250,1400],borderColor:'#36a2eb',tension:0.3}
    ]
  }

  const options = {responsive:true, plugins:{legend:{position:'top'}}}

  return (
    <div className="container">
      <h2>Analytics</h2>
      <div className="page" style={{padding:12}}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default Analytics
