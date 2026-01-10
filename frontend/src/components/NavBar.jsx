import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'

const NavBar = () => {
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <div className="brand">Fintech SaaS</div>
        <nav className="nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/goal-planner">Goal Planner</NavLink>
          <NavLink to="/sip-calculator">SIP Counter</NavLink>
          <NavLink to="/budget-planner">Budget Planner</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
          <NavLink to="/chatbot">Chatbot</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
