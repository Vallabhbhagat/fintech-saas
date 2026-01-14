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
import AddExpense from './pages/AddExpense'
import AddIncome from './pages/AddIncome'
import EditExpense from './pages/EditExpense'
import EditIncome from './pages/EditIncome'
import IncomeList from './pages/IncomeList'
import ExpenseList from './pages/ExpenseList'
import Simulations from './pages/Simulations'

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
        <Route path='/add-expense' element={<AddExpense />} />
        <Route path='/add-income' element={<AddIncome />} />
        <Route path='/edit-expense/:id' element={<EditExpense />} />
        <Route path='/edit-income/:id' element={<EditIncome />} />
        <Route path='/income-list' element={<IncomeList />} />
        <Route path='/expense-list' element={<ExpenseList />} />
        <Route path='/simulations' element={<Simulations />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/analytics' element={<Analytics />} />
      </Routes>

    </div>
  )
}

export default App
