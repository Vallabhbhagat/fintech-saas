import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as api from '../services/api'

/**
 * Income List Page
 * Shows all income transactions for the logged-in user
 * Allows edit and delete actions
 */
const IncomeList = () => {
  const navigate = useNavigate()
  const [incomes, setIncomes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalIncome, setTotalIncome] = useState(0)

  useEffect(() => {
    fetchIncomes()
  }, [])

  const fetchIncomes = async () => {
    try {
      setLoading(true)
      const transactions = await api.getTransactions()
      const incomeTransactions = transactions.filter(t => t.type === 'income')
      setIncomes(incomeTransactions)
      
      // Calculate total income
      const total = incomeTransactions.reduce((sum, t) => sum + (t.amount || 0), 0)
      setTotalIncome(total)
    } catch (err) {
      setError(err.message || 'Failed to load income transactions')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this income transaction?')) return
    try {
      await api.deleteIncome(id)
      // Notify dashboard to refresh
      localStorage.setItem('transaction_updated', Date.now().toString())
      await fetchIncomes()
      alert('Income deleted successfully!')
    } catch (err) {
      alert('Delete failed: ' + (err.message || 'Unknown error'))
    }
  }

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString('en-IN')}`
  }

  if (loading) {
    return (
      <div className="container">
        <div style={{textAlign: 'center', padding: '60px 20px'}}>
          <div style={{fontSize: '24px', marginBottom: '16px'}}>⏳</div>
          <h2>Loading Income Transactions...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
        <div>
          <h2>Income Transactions</h2>
          <p style={{color: '#555', marginTop: 4}}>Total Income: <strong style={{color: '#6F2DBD', fontSize: '18px'}}>{formatCurrency(totalIncome)}</strong></p>
        </div>
        <div>
          <button onClick={() => navigate('/add-income')}>+ Add Income</button>
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
        {incomes.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px 20px', color: '#555'}}>
            <div style={{fontSize: '64px', marginBottom: '16px'}}>💰</div>
            <p style={{fontSize: '20px', fontWeight: 600, marginBottom: '8px'}}>No Income Transactions Yet</p>
            <p style={{fontSize: '14px', marginBottom: '24px'}}>Start tracking your income by adding your first transaction</p>
            <button onClick={() => navigate('/add-income')}>Add Your First Income</button>
          </div>
        ) : (
          <>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{borderBottom: '2px solid #eef2f7', background: '#f8f9fa'}}>
                  <th style={{padding: '12px', textAlign: 'left', fontWeight: 600}}>Date</th>
                  <th style={{padding: '12px', textAlign: 'left', fontWeight: 600}}>Title</th>
                  <th style={{padding: '12px', textAlign: 'right', fontWeight: 600}}>Amount</th>
                  <th style={{padding: '12px', textAlign: 'center', fontWeight: 600}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((income) => (
                  <tr key={income._id || income.id} style={{borderBottom: '1px solid #eef2f7'}}>
                    <td style={{padding: '12px'}}>
                      {new Date(income.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td style={{padding: '12px', fontWeight: 500}}>{income.title || 'Untitled'}</td>
                    <td style={{padding: '12px', textAlign: 'right', fontWeight: 700, color: '#6F2DBD', fontSize: '16px'}}>
                      {formatCurrency(income.amount)}
                    </td>
                    <td style={{padding: '12px', textAlign: 'center'}}>
                      <Link to={`/edit-income/${income._id || income.id}`}>
                        <button style={{padding: '6px 12px', fontSize: '14px', marginRight: 8}}>Edit</button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(income._id || income.id)}
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

export default IncomeList
