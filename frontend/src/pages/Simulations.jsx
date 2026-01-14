import React, { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

function runMonteCarlo({initial=0, monthly=0, mean=0.07, vol=0.12, years=20, sims=500}){
  const months = years*12
  const runs = []
  const finals = []
  for(let s=0;s<sims;s++){
    let balance = initial
    const series = []
    for(let m=0;m<months;m++){
      // monthly return sampled from normal approx using Box-Muller
      const u1 = Math.random(); const u2 = Math.random();
      const z = Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2)
      const monthlyRet = mean/12 + z*(vol/Math.sqrt(12))
      balance = balance*(1+monthlyRet) + monthly
      if ((m+1) % 12 === 0) series.push(Math.round(balance))
    }
    runs.push(series)
    finals.push(Math.round(series[series.length-1]))
  }
  // compute percentiles per year
  const yearsArr = Array.from({length:years},(_,i)=>i+1)
  const percentiles = {p10:[], p50:[], p90:[]}
  for(let y=0;y<years;y++){
    const vals = runs.map(r=>r[y]).sort((a,b)=>a-b)
    const idx = (p)=> Math.max(0, Math.min(vals.length-1, Math.floor((p/100)*(vals.length-1))))
    percentiles.p10.push(vals[idx(10)])
    percentiles.p50.push(vals[idx(50)])
    percentiles.p90.push(vals[idx(90)])
  }
  return {years: yearsArr, finals, ...percentiles}
}

const Simulations = ()=>{
  const [initial, setInitial] = useState(10000)
  const [monthly, setMonthly] = useState(5000)
  const [mean, setMean] = useState(8)
  const [vol, setVol] = useState(14)
  const [years, setYears] = useState(20)
  const [sims, setSims] = useState(500)
  const [result, setResult] = useState(null)
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fv_sim_scenarios_v1')||'[]') } catch { return [] }
  })

  const run = (e)=>{
    e && e.preventDefault()
    const res = runMonteCarlo({initial: Number(initial), monthly: Number(monthly), mean: Number(mean)/100, vol: Number(vol)/100, years: Number(years), sims: Number(sims)})
    setResult(res)
  }

  const saveScenario = () => {
    if (!result) return alert('Run simulation first')
    const item = { id: Date.now(), name: `Sim ${new Date().toLocaleString()}`, params:{initial,monthly,mean,vol,years,sims}, summary:{median: result?.p50?.slice(-1)[0]||null}, created: new Date().toISOString() }
    const next = [item, ...saved].slice(0,20)
    setSaved(next)
    localStorage.setItem('fv_sim_scenarios_v1', JSON.stringify(next))
  }

  const loadScenario = (s) => {
    setInitial(s.params.initial); setMonthly(s.params.monthly); setMean(s.params.mean); setVol(s.params.vol); setYears(s.params.years); setSims(s.params.sims)
  }

  const deleteScenario = (id) => {
    const next = saved.filter(x=>x.id!==id)
    setSaved(next); localStorage.setItem('fv_sim_scenarios_v1', JSON.stringify(next))
  }

  const downloadCSV = () => {
    if (!result) return alert('Run simulation first')
    const rows = result.finals.map((v,i)=>`${i+1},${v}`).join('\n')
    const csv = `run,final\n${rows}`
    const blob = new Blob([csv], {type:'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `simulations_${Date.now()}.csv`; a.click(); URL.revokeObjectURL(url)
  }

  const chartData = result ? {
    labels: result.years.map(y=>`Year ${y}`),
    datasets: [
      {label:'10th percentile', data: result.p10, borderColor:'#ff6b6b', tension:0.2, fill:false},
      {label:'Median', data: result.p50, borderColor:'#6F2DBD', tension:0.2, fill:false, borderWidth:2},
      {label:'90th percentile', data: result.p90, borderColor:'#00C48C', tension:0.2, fill:false}
    ]
  } : null

  return (
    <div className="container">
      <h2>Simulations</h2>
      <div className="grid" style={{marginTop:12}}>
        <div className="col-6 page">
          <form onSubmit={run} style={{display:'grid',gap:8}}>
            <label>Initial investment</label>
            <input value={initial} onChange={e=>setInitial(e.target.value)} type="number" />
            <label>Monthly contribution</label>
            <input value={monthly} onChange={e=>setMonthly(e.target.value)} type="number" />
            <label>Expected annual return (%)</label>
            <input value={mean} onChange={e=>setMean(e.target.value)} type="number" step="0.1" />
            <label>Volatility (annual %, std dev)</label>
            <input value={vol} onChange={e=>setVol(e.target.value)} type="number" step="0.1" />
            <label>Years</label>
            <input value={years} onChange={e=>setYears(e.target.value)} type="number" />
            <label>Simulations</label>
            <input value={sims} onChange={e=>setSims(e.target.value)} type="number" />
            <div style={{display:'flex',gap:8}}>
              <button type="submit">Run</button>
              <button type="button" onClick={()=>{ setResult(null); setInitial(10000); setMonthly(5000); setMean(8); setVol(14); setYears(20); setSims(500) }}>Reset</button>
            </div>
          </form>
        </div>
        <div className="col-6 page">
          <h3>Result</h3>
          {!result && <p>Run the simulation to see percentile envelopes.</p>}
          {result && (
            <div>
              <div style={{height:320}}>
                <Line data={chartData} options={{responsive:true, plugins:{legend:{position:'top'}}}} />
              </div>
              <p style={{marginTop:8}}>Median after {years} years: <strong>₹{(result.p50[result.p50.length-1]||0).toLocaleString()}</strong></p>
              <div style={{display:'flex',gap:8,marginTop:12,alignItems:'center'}}>
                <button onClick={saveScenario}>Save scenario</button>
                <button onClick={downloadCSV}>Download finals CSV</button>
              </div>
              <div style={{marginTop:12}}>
                <h4>Finals distribution</h4>
                <div style={{height:200}}>
                  <Bar data={{labels:result.finals.map((_,i)=>i+1), datasets:[{label:'Final balance per run', data: result.finals, backgroundColor:'rgba(111,45,189,0.6)'}]}} options={{plugins:{legend:{display:false}}, responsive:true}} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{marginTop:16}} className="container">
        <div className="page">
          <h3>Saved Scenarios</h3>
          {saved.length===0 ? <p style={{color:'#666'}}>No saved scenarios.</p> : (
            <ul style={{listStyle:'none',padding:0}}>
              {saved.map(s=> (
                <li key={s.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid #f1f3f6'}}>
                  <div>
                    <div style={{fontWeight:700}}>{s.name}</div>
                    <div style={{fontSize:12,color:'#666'}}>median: ₹{(s.summary.median||0).toLocaleString()}</div>
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>loadScenario(s)}>Load</button>
                    <button onClick={()=>deleteScenario(s.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Simulations
