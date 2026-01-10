import React, { useState } from 'react'

const BudgetPlanner = () => {
  const [categories, setCategories] = useState([{name:'Housing',amount:0},{name:'Food',amount:0},{name:'Transport',amount:0}])

  const update = (i, val) => {
    const copy = [...categories]
    copy[i].amount = parseFloat(val)||0
    setCategories(copy)
  }

  const total = categories.reduce((s,c)=>s+c.amount,0)

  return (
    <div className="container">
      <h2>Budget Planner</h2>
      <div className="grid" style={{marginTop:12}}>
        <div className="col-6 page">
          <h3>Set monthly budget</h3>
          {categories.map((c,i)=> (
            <div key={i} style={{marginBottom:8}}>
              <label>{c.name}</label>
              <input value={c.amount} onChange={e=>update(i,e.target.value)} />
            </div>
          ))}
        </div>
        <div className="col-6 page">
          <h3>Summary</h3>
          <p>Total: <strong>₹{total}</strong></p>
        </div>
      </div>
    </div>
  )
}

export default BudgetPlanner
