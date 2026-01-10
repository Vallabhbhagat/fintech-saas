import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="grid" style={{marginTop:16}}>
        <div className="col-4 page">
          <h3>Goal Planner</h3>
          <p>Plan your financial goals and track progress.</p>
          <Link to="/goal-planner"><button>Open</button></Link>
        </div>
        <div className="col-4 page">
          <h3>SIP Counter</h3>
          <p>Estimate SIP returns and schedules.</p>
          <Link to="/sip-calculator"><button>Open</button></Link>
        </div>
        <div className="col-4 page">
          <h3>Budget Planner</h3>
          <p>Create and manage budgets.</p>
          <Link to="/budget-planner"><button>Open</button></Link>
        </div>
        <div className="col-6 page">
          <h3>Analytics</h3>
          <p>Visualize your spending & income.</p>
          <Link to="/analytics"><button>Open</button></Link>
        </div>
        <div className="col-6 page">
          <h3>Chatbot</h3>
          <p>Ask finance-related questions.</p>
          <Link to="/chatbot"><button>Open</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
