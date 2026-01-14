import React, { useState } from 'react'

const GoalPlanner = () => {
  const [goals, setGoals] = useState([])
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')

  const addGoal = (e) => {
    e.preventDefault()
    const t = Number(target || 0)
    if (!title || !t) return
    setGoals(prev => [...prev, { id: Date.now(), title, target: t, saved: 0 }])
    setTitle('')
    setTarget('')
  }

  const removeGoal = (id) => setGoals(prev => prev.filter(g => g.id !== id))

  const addContribution = (id, amount) => {
    const v = Number(amount || 0)
    if (!v) return
    setGoals(prev => prev.map(g => g.id === id ? { ...g, saved: g.saved + v } : g))
  }

  return (
    <div className="container">
      <h2>Goal Planner</h2>

      <div className="grid" style={{marginTop:12}}>
        <div className="col-4 page">
          <h3>Create a Goal</h3>
          <form onSubmit={addGoal} style={{display:'grid',gap:10}}>
            <label>Goal name</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g., Dream Bike" />
            <label>Target amount (₹)</label>
            <input value={target} onChange={e=>setTarget(e.target.value)} placeholder="e.g., 50000" />
            <button type="submit">Add Goal</button>
          </form>
        </div>

        <div className="col-8 page">
          <h3>Your Goals</h3>
          {goals.length===0 ? (
            <p style={{color:'#666'}}>No goals yet — add one to get started.</p>
          ) : (
            <div className="goals-grid">
              {goals.map(g => {
                const pct = g.target > 0 ? Math.min(100, Math.round((g.saved / g.target) * 100)) : 0
                return (
                  <div className="goal-card" key={g.id}>
                    <div className="goal-header">
                      <div className="goal-title">{g.title}</div>
                      <div className="goal-actions">
                        <button className="ghost" onClick={() => removeGoal(g.id)}>Delete</button>
                      </div>
                    </div>
                    <div className="goal-body">
                      <div className="goal-meta">₹{g.saved.toLocaleString()} / ₹{g.target.toLocaleString()}</div>
                      <div className="progress-bar">
                        <div className="progress" style={{width:`${pct}%`}} />
                      </div>
                    </div>

                    <div className="goal-footer">
                      <ContributionForm onContribute={(amt) => addContribution(g.id, amt)} />
                      <div className="goal-percent">{pct}%</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ContributionForm({ onContribute }){
  const [amt, setAmt] = useState('')
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onContribute(Number(amt)); setAmt('')}} className="contrib-form">
      <input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="Amount" />
      <button type="submit" className="small">Add</button>
    </form>
  )
}

export default GoalPlanner
