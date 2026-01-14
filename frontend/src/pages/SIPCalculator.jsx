import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const SIPCalculator = () => {
  const [monthly, setMonthly] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [result, setResult] = useState(null)

  const calc = (e) => {
    e.preventDefault()
    const P = parseFloat(monthly)
    const r = parseFloat(rate)/100/12
    const n = parseFloat(years)*12
    if (!P || !r || !n) return
    const fv = P * ( (Math.pow(1+r,n)-1)/r ) * (1+r)
    setResult(fv.toFixed(2))
  }

  const getChartData = () => {
    const monthlyP = parseFloat(monthly) || 0
    const monthlyRate = parseFloat(rate)/100/12 || 0
    const months = (parseFloat(years)||0) * 12
    const labels = []
    const data = []
    let balance = 0
    for (let i=1;i<=months;i++){
      balance = balance * (1 + monthlyRate) + monthlyP
      if (i % Math.ceil(months/6 || 1) === 0 || i===months) {
        labels.push(`M${i}`)
        data.push(Math.round(balance))
      }
    }
    return {labels,datasets:[{label:'Estimated Corpus',data,borderColor:'#6F2DBD',tension:0.3}]}
  }

  return (
    <div className="container">
      <h2>SIP Counter</h2>
      <div className="grid" style={{marginTop:12}}>
        <div className="col-6 page">
          <form onSubmit={calc}>
            <label>Monthly investment</label>
            <input value={monthly} onChange={e=>setMonthly(e.target.value)} />
            <label>Annual return %</label>
            <input value={rate} onChange={e=>setRate(e.target.value)} />
            <label>Years</label>
            <input value={years} onChange={e=>setYears(e.target.value)} />
            <button type="submit">Calculate</button>
          </form>
        </div>
        <div className="col-6 page">
          <h3>Result</h3>
          {result ? (
            <>
              <p>Estimated corpus: <strong>₹{Number(result).toLocaleString()}</strong></p>
              <p>Total invested: <strong>₹{(parseFloat(monthly)*parseFloat(years)*12).toLocaleString()}</strong></p>
              <div style={{height:220}}>
                <Line data={getChartData()} options={{responsive:true, plugins:{legend:{display:false}}}} />
              </div>
            </>
          ) : <p>Enter values to compute</p>}
        </div>
      </div>
    </div>
  )
}

export default SIPCalculator
