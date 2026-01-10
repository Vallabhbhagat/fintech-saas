import React, { useState } from 'react'

const GoalPlanner = () => {
  const [goals, setGoals] = useState([])
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')

  const addGoal = (e) => {
    e.preventDefault()
    if (!title || !target) return
    setGoals(prev => [...prev, {title, target}])
    setTitle('')
    setTarget('')
  }

  return (
    <div className="container">
      <h2>Goal Planner</h2>
      <div className="grid" style={{marginTop:12}}>
        <div className="col-6 page">
          <form onSubmit={addGoal}>
            <label>Goal name</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g., Down payment" />
            <label>Target amount</label>
            <input value={target} onChange={e=>setTarget(e.target.value)} placeholder="e.g., 50000" />
            <button type="submit">Add Goal</button>
          </form>
        </div>
        <div className="col-6 page">
          <h3>Your Goals</h3>
          {goals.length===0 && <p>No goals yet</p>}
          <ul>
            {goals.map((g,i)=> (
              <li key={i}>{g.title} — {g.target}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GoalPlanner
