import React from 'react'
import { Link } from 'react-router-dom'

const items = [
  { key: 'goal', label: 'Goal Planner', to: '/goal-planner' },
  { key: 'sip', label: 'SIP Counter', to: '/sip-calculator' },
  { key: 'budget', label: 'Budget Planner', to: '/budget-planner' },
  { key: 'analytics', label: 'Analytics', to: '/analytics' },
  { key: 'chatbot', label: 'Chatbot', to: '/chatbot' },
  { key: 'sim', label: 'Simulations', to: '/simulations' },
  { key: 'expense', label: 'Add Expense', to: '/add-expense' },
  { key: 'income', label: 'Add Income', to: '/add-income' }
]

const Icon = ({ name }) => {
  const common = { width: 36, height: 36 }
  switch (name) {
    case 'goal':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none"><path d="M5 3v18" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/><path d="M5 7c4-2 8-2 12 0v8c-4 2-8 2-12 0V7z" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/></svg>
      )
    case 'sip':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="10" r="6" stroke="#6F2DBD" strokeWidth="2"/><path d="M6 18c2-2 10-2 12 0" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/></svg>
      )
    case 'budget':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#6F2DBD" strokeWidth="2"/><path d="M7 8h10" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/></svg>
      )
    case 'analytics':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none"><path d="M4 20v-8" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/><path d="M10 20v-4" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/><path d="M16 20v-12" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/></svg>
      )
    case 'chatbot':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )
    case 'sim':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/><path d="M7 6v12" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/></svg>
      )
    case 'expense':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none"><rect x="4" y="7" width="16" height="10" rx="2" stroke="#6F2DBD" strokeWidth="2"/><path d="M8 11h8" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/></svg>
      )
    case 'income':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none"><path d="M12 5v14" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/><path d="M5 12h14" stroke="#6F2DBD" strokeWidth="2" strokeLinecap="round"/></svg>
      )
    default:
      return null
  }
}

const FeatureGrid = () => {
  return (
    <div className="feature-grid-react">
      {items.map(i => (
        <Link key={i.key} to={i.to} className="feature-item" aria-label={i.label}>
          <div className="feature-icon"><Icon name={i.key} /></div>
          <div className="feature-label">{i.label}</div>
        </Link>
      ))}
    </div>
  )
}

export default FeatureGrid
