import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as api from '../services/api'

/**
 * Expense List Page
 * Shows all expense transactions for the logged-in user
 * Allows edit and delete actions
 */
const ExpenseList = () => {
  const navigate = useNavigate()
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalExpense, setTotalExpense] = useState(0)

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const transactions = await api.getTransactions()
      const expenseTransactions = transactions.filter(t => t.type === 'expense')
      setExpenses(expenseTransactions)
      
      // Calculate total expense
      const total = expenseTransactions.reduce((sum, t) => sum + (t.amount || 0), 0)
      setTotalExpense(total)
    } catch (err) {
      setError(err.message || 'Failed to load expense transactions')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this expense transaction?')) return
    try {
      await api.deleteExpense(id)
      // Notify dashboard to refresh
      localStorage.setItem('transaction_updated', Date.now().toString())
      await fetchExpenses()
      alert('Expense deleted successfully!')
    } catch (err) {
      alert('Delete failed: ' + (err.message || 'Unknown error'))
    }
  }

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString('en-IN')}`
  }

  // Group expenses by category for better visualization
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(expense)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="container">
        <div style={{textAlign: 'center', padding: '60px 20px'}}>
          <div style={{fontSize: '24px', marginBottom: '16px'}}>⏳</div>
          <h2>Loading Expense Transactions...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
        <div>
          <h2>Expense Transactions</h2>
          <p style={{color: '#555', marginTop: 4}}>Total Expense: <strong style={{color: '#ff6b6b', fontSize: '18px'}}>{formatCurrency(totalExpense)}</strong></p>
        </div>
        <div>
          <button onClick={() => navigate('/add-expense')}>+ Add Expense</button>
          <button onClick={() => navigate('/dashboard')} style={{marginLeft: 8, background: '#555'}}>Back to Dashboard</button>
        </div>
      </div>

      {error && (
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          color: '#856404'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div className="page">
        {expenses.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px 20px', color: '#555'}}>
            <div style={{fontSize: '64px', marginBottom: '16px'}}>💸</div>
            <p style={{fontSize: '20px', fontWeight: 600, marginBottom: '8px'}}>No Expense Transactions Yet</p>
            <p style={{fontSize: '14px', marginBottom: '24px'}}>Start tracking your expenses by adding your first transaction</p>
            <button onClick={() => navigate('/add-expense')}>Add Your First Expense</button>
          </div>
        ) : (
          <>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{borderBottom: '2px solid #eef2f7', background: '#f8f9fa'}}>
                  <th style={{padding: '12px', textAlign: 'left', fontWeight: 600}}>Date</th>
                  <th style={{padding: '12px', textAlign: 'left', fontWeight: 600}}>Title</th>
                  <th style={{padding: '12px', textAlign: 'left', fontWeight: 600}}>Category</th>
                  <th style={{padding: '12px', textAlign: 'right', fontWeight: 600}}>Amount</th>
                  <th style={{padding: '12px', textAlign: 'center', fontWeight: 600}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id || expense.id} style={{borderBottom: '1px solid #eef2f7'}}>
                    <td style={{padding: '12px'}}>
                      {new Date(expense.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td style={{padding: '12px', fontWeight: 500}}>{expense.title || 'Untitled'}</td>
                    <td style={{padding: '12px'}}>
                      <span style={{
                        background: '#f0f0f0',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 500
                      }}>
                        {expense.category || 'Other'}
                      </span>
                    </td>
                    <td style={{padding: '12px', textAlign: 'right', fontWeight: 700, color: '#ff6b6b', fontSize: '16px'}}>
                      {formatCurrency(expense.amount)}
                    </td>
                    <td style={{padding: '12px', textAlign: 'center'}}>
                      <Link to={`/edit-expense/${expense._id || expense.id}`}>
                        <button style={{padding: '6px 12px', fontSize: '14px', marginRight: 8}}>Edit</button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(expense._id || expense.id)}
                        style={{padding: '6px 12px', fontSize: '14px', background: '#ff6b6b'}}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}

export default ExpenseList
