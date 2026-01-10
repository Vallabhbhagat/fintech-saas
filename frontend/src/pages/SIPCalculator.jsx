import React, { useState } from 'react'

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
          {result ? <p>Estimated corpus: <strong>₹{result}</strong></p> : <p>Enter values to compute</p>}
        </div>
      </div>
    </div>
  )
}

export default SIPCalculator
