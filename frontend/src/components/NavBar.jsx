import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'
import logo from '../assets/logo.svg'
import navIcon from '../assets/nav-icon.svg'

const NavBar = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('fv_token') : null

  const handleLogout = () => {
    localStorage.removeItem('fv_token')
    window.location.href = '/'
  }

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <div className="brand"><img src={logo} alt="Fintech SaaS" className="brand-logo"/>Fintech SaaS</div>

        <nav className="nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/goal-planner">Goal Planner</NavLink>
          <NavLink to="/sip-calculator">SIP Counter</NavLink>
          <NavLink to="/budget-planner">Budget Planner</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
          <NavLink to="/chatbot">Chatbot</NavLink>
        </nav>

        <div className="nav-actions">
          {token ? (
            <a className="nav-logout" style={{cursor:'pointer'}} onClick={handleLogout}>Logout</a>
          ) : (
            <>
              <NavLink to="/" className="nav-auth">Login</NavLink>
              <NavLink to="/register" className="nav-auth">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
