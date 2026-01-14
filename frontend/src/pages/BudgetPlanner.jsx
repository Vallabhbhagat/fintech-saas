import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const STORAGE_KEY = 'fv_budget_categories_v1'

const BudgetPlanner = () => {
  const [categories, setCategories] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : [{name:'Housing',amount:12000},{name:'Food',amount:6000},{name:'Transport',amount:2000}]
    } catch { return [{name:'Housing',amount:12000},{name:'Food',amount:6000},{name:'Transport',amount:2000}] }
  })

  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(categories)) },[categories])

  const update = (i, val) => {
    const copy = [...categories]
    copy[i].amount = parseFloat(val)||0
    setCategories(copy)
  }

  const addCategory = () => setCategories(prev => [...prev, {name:'New', amount:0}])
  const removeCategory = (i) => setCategories(prev => prev.filter((_,idx)=>idx!==i))

  const total = categories.reduce((s,c)=>s+Number(c.amount||0),0)

  const chartData = {
    labels: categories.map(c=>c.name),
    datasets: [{data: categories.map(c=>c.amount||0), backgroundColor: ['#6F2DBD','#00C48C','#ff6b6b','#f59e0b','#7c3aed']}]
  }

  return (
    <div className="container">
      <h2>Budget Planner</h2>
      <div className="grid" style={{marginTop:12}}>
        <div className="col-6 page">
          <h3>Set monthly budget</h3>
          {categories.map((c,i)=> (
            <div key={i} style={{marginBottom:8,display:'flex',gap:8,alignItems:'center'}}>
              <input style={{flex:2}} value={c.name} onChange={e=>{const copy=[...categories];copy[i].name=e.target.value;setCategories(copy)}} />
              <input style={{flex:1}} value={c.amount} onChange={e=>update(i,e.target.value)} />
              <button onClick={()=>removeCategory(i)}>Delete</button>
            </div>
          ))}
          <div style={{marginTop:8}}>
            <button onClick={addCategory}>Add Category</button>
          </div>
        </div>
        <div className="col-6 page">
          <h3>Summary</h3>
          <p>Total monthly budget: <strong>₹{total.toLocaleString()}</strong></p>
          <div style={{height:220,marginTop:12}}>
            <Pie data={chartData} options={{responsive:true, plugins:{legend:{position:'right'}}}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetPlanner
