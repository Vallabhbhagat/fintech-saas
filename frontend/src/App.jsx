import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NavBar from './components/NavBar'
import GoalPlanner from './pages/GoalPlanner'
import SIPCalculator from './pages/SIPCalculator'
import BudgetPlanner from './pages/BudgetPlanner'
import Chatbot from './pages/Chatbot'
import Analytics from './pages/Analytics'

const App = () => {
  const location = useLocation()
  const hideNav = location.pathname === '/' || location.pathname === '/register'

  return (
    <div>
      {!hideNav && <NavBar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/goal-planner' element={<GoalPlanner />} />
        <Route path='/sip-calculator' element={<SIPCalculator />} />
        <Route path='/budget-planner' element={<BudgetPlanner />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/analytics' element={<Analytics />} />
      </Routes>

    </div>
  )
}

export default App
