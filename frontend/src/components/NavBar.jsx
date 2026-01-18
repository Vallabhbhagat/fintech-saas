import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'
import logo from '../assets/logo.svg'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const token = typeof window !== 'undefined' ? localStorage.getItem('fv_token') : null

  const handleLogout = () => {
    localStorage.removeItem('fv_token')
    window.location.href = '/'
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="nav-inner">
        <div className="brand">
          <img src={logo} alt="Fintech SaaS" className="brand-logo"/>
          <span>Fintech SaaS</span>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
        </button>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
          <NavLink to="/goal-planner" onClick={closeMenu}>Goal Planner</NavLink>
          <NavLink to="/sip-calculator" onClick={closeMenu}>SIP Counter</NavLink>
          <NavLink to="/budget-planner" onClick={closeMenu}>Budget Planner</NavLink>
          <NavLink to="/analytics" onClick={closeMenu}>Analytics</NavLink>
          <NavLink to="/chatbot" onClick={closeMenu}>Chatbot</NavLink>
        </nav>

        <div className="nav-actions">
          {token ? (
            <a className="nav-logout" style={{cursor:'pointer'}} onClick={handleLogout}>Logout</a>
          ) : (
            <>
              <NavLink to="/" className="nav-auth" onClick={closeMenu}>Login</NavLink>
              <NavLink to="/register" className="nav-auth" onClick={closeMenu}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
