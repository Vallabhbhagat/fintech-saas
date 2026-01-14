import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SummaryCard from '../components/SummaryCard'
import FeatureGrid from '../components/FeatureGrid'
import HowItWorks from '../components/HowItWorks'
import * as api from '../services/api'

const Dashboard = () => {
  const navigate = useNavigate()
  
  // State management
  const [summary, setSummary] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Animated values for Balance, Income, Expense
  const [animatedBalance, setAnimatedBalance] = useState(0)
  const [animatedIncome, setAnimatedIncome] = useState(0)
  const [animatedExpense, setAnimatedExpense] = useState(0)
  
  // Animated stats for bottom section
  const [animatedStats, setAnimatedStats] = useState({
    savingsRate: 0,
    monthlyGrowth: 0,
    avgTransaction: 0,
    totalTransactions: 0
  })

  /**
   * Animate a numeric value from start to end over duration
   * Used for smooth number counting animations
   */
  const animateValue = (key, start, end, duration, setter) => {
    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const current = Math.floor(progress * (end - start) + start)
      
      if (setter) {
        setter(current)
      } else {
        setAnimatedStats(prev => ({ ...prev, [key]: current }))
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        // Ensure final value is set exactly
        if (setter) {
          setter(end)
        } else {
          setAnimatedStats(prev => ({ ...prev, [key]: end }))
        }
      }
    }
    window.requestAnimationFrame(step)
  }

  /**
   * Fetch dashboard data from backend API
   * Uses JWT token for authentication
   * Handles loading and error states
   */
  const fetchData = async () => {
    const token = localStorage.getItem('fv_token')
    if (!token) {
      setError('Please login to view dashboard')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Step 1: Fetch dashboard summary (Balance, Income, Expense) from backend
      const summaryData = await api.getDashboardSummary()
      setSummary(summaryData)
      
      // Animate Balance, Income, Expense counters
      animateValue(null, 0, summaryData.balance || 0, 1500, setAnimatedBalance)
      animateValue(null, 0, summaryData.totalIncome || 0, 1500, setAnimatedIncome)
      animateValue(null, 0, summaryData.totalExpense || 0, 1500, setAnimatedExpense)
      
      // Step 2: Fetch all transactions from backend
      const txData = await api.getTransactions()
      
      // Step 3: Display recent 5 transactions
      setTransactions(txData.slice(0, 5))
      
      // Step 4: Process data for bottom section (Financial Insights)
      if (txData.length > 0) {
        // Calculate total amount of all transactions
        const total = txData.reduce((sum, t) => sum + Math.abs(t.amount), 0)
        
        // Calculate average transaction amount
        const avg = total / txData.length
        
        // Separate income and expense transactions
        const incomeTransactions = txData.filter(t => t.type === 'income')
        const expenseTransactions = txData.filter(t => t.type === 'expense')
        
        // Calculate total income and total expense
        const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0)
        const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0)
        
        // Calculate Savings Rate: (Income - Expense) / Income * 100
        const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100) : 0
        
        // Calculate Monthly Growth: Same as savings rate for now
        const monthlyGrowth = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100) : 0
        
        // Step 5: Animate the calculated values from 0 to actual value
        animateValue('savingsRate', 0, savingsRate, 2000)
        animateValue('monthlyGrowth', 0, monthlyGrowth, 2000)
        animateValue('avgTransaction', 0, avg, 2000)
        animateValue('totalTransactions', 0, txData.length, 2000)
      } else {
        // Reset stats if no transactions
        setAnimatedStats({
          savingsRate: 0,
          monthlyGrowth: 0,
          avgTransaction: 0,
          totalTransactions: 0
        })
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      setError(err.message || 'Failed to load dashboard data. Please try again.')
      
      // Set default values on error
      setSummary({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
      })
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch data on component mount
  useEffect(()=>{
    fetchData()
  },[])

  // Listen for storage events to update when income/expense is added from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'fv_token' || e.key === 'transaction_updated') {
        fetchData()
      }
    }
    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom events (same tab)
    const handleCustomEvent = () => {
      fetchData()
    }
    window.addEventListener('transactionUpdated', handleCustomEvent)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('transactionUpdated', handleCustomEvent)
    }
  }, [])

  // Check for transaction updates when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchData()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  /**
   * Handle transaction deletion
   * Refreshes dashboard data after successful deletion
   */
  const handleDelete = async (tx) => {
    if (!confirm('Delete this transaction?')) return
    try {
      if (tx.type === 'expense') {
        await api.deleteExpense(tx._id || tx.id)
      } else if (tx.type === 'income') {
        await api.deleteIncome(tx._id || tx.id)
      } else {
        return
      }
      // Refresh all data including bottom section calculations
      await fetchData()
      // Notify other tabs/windows
      localStorage.setItem('transaction_updated', Date.now().toString())
    } catch (err) { 
      alert('Delete failed: ' + (err.message || 'Unknown error'))
    }
  }

  // Refresh data when window regains focus (user returns to tab)
  useEffect(() => {
    const handleFocus = () => {
      fetchData()
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  // Format currency in ₹ (INR) format
  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString('en-IN')}`
  }

  // Loading state
  if (loading) {
    return (
      <div className="container">
        <div style={{textAlign: 'center', padding: '60px 20px'}}>
          <div style={{fontSize: '24px', marginBottom: '16px'}}>⏳</div>
          <h2>Loading Dashboard...</h2>
          <p style={{color: '#555'}}>Fetching your financial data</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error && !summary) {
    return (
      <div className="container">
        <div style={{textAlign: 'center', padding: '60px 20px'}}>
          <div style={{fontSize: '24px', marginBottom: '16px', color: '#ff6b6b'}}>⚠️</div>
          <h2>Error Loading Dashboard</h2>
          <p style={{color: '#555', marginBottom: '24px'}}>{error}</p>
          <button onClick={fetchData}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
        <h2>Dashboard</h2>
        <button 
          onClick={fetchData} 
          style={{padding: '8px 16px', fontSize: '14px'}}
          title="Refresh all data"
          disabled={loading}
        >
          {loading ? '⏳ Loading...' : '🔄 Refresh'}
        </button>
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

      <div className="feature-grid-wrapper purple-bg">
        <FeatureGrid />
      </div>

      <div className="grid" style={{marginTop:12}}>
        <div className="col-4">
          <SummaryCard 
            title="Balance" 
            value={formatCurrency(animatedBalance)} 
            change="" 
            color="#6F2DBD"
            onClick={() => navigate('/analytics')}
            tooltip="Click to view detailed analytics"
          />
        </div>
        <div className="col-4">
          <SummaryCard 
            title="Income" 
            value={formatCurrency(animatedIncome)} 
            change="" 
            color="#6F2DBD"
            onClick={() => navigate('/income-list')}
            tooltip="Click to view all income transactions"
          />
        </div>
        <div className="col-4">
          <SummaryCard 
            title="Expense" 
            value={formatCurrency(animatedExpense)} 
            change="" 
            color="#ff6b6b"
            onClick={() => navigate('/expense-list')}
            tooltip="Click to view all expense transactions"
          />
        </div>
      </div>

      <div className="grid" style={{marginTop:16}}>
        <div className="col-12 page">
          <h3>Recent Transactions</h3>
          {transactions.length===0 ? (
            <div style={{textAlign: 'center', padding: '40px 20px', color: '#555'}}>
              <div style={{fontSize: '48px', marginBottom: '16px'}}>💰</div>
              <p style={{fontSize: '18px', fontWeight: 600, marginBottom: '8px'}}>No transactions yet</p>
              <p style={{fontSize: '14px', marginBottom: '24px'}}>Start by adding your first income</p>
              <div style={{display: 'flex', gap: '12px', justifyContent: 'center'}}>
                <button onClick={() => navigate('/add-income')}>Add Income</button>
                <button onClick={() => navigate('/add-expense')}>Add Expense</button>
              </div>
            </div>
          ) : (
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <tbody>
                {transactions.map((r)=> (
                    <tr key={r._id || r.id} style={{borderBottom:'1px solid #eef2f7'}}>
                      <td style={{padding:8}}>{new Date(r.date).toLocaleDateString()}</td>
                      <td style={{padding:8}}>{r.category || r.title || r.name}</td>
                      <td style={{padding:8}}>{r.type || (r.amount>0 ? 'Income' : 'Expense')}</td>
                      <td style={{padding:8,fontWeight:700}}>₹{Number(r.amount).toLocaleString()}</td>
                      <td style={{padding:8}}>
                        { (r.type === 'expense') ? (
                          <>
                            <Link to={`/edit-expense/${r._id || r.id}`}><button>Edit</button></Link>
                            <button onClick={()=>handleDelete(r)}>Delete</button>
                          </>
                        ) : (
                          <>
                            <Link to={`/edit-income/${r._id || r.id}`}><button>Edit</button></Link>
                            <button onClick={()=>handleDelete(r)}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Animated Fintech Data Section - Bottom Processing Flow */}
      <div className="grid" style={{marginTop:24}}>
        <div className="col-12 page" style={{background: 'linear-gradient(135deg, #6F2DBD 0%, rgba(111,45,189,0.8) 100%)', color: '#ffffff', padding: '24px', borderRadius: '12px'}}>
          <h3 style={{marginTop:0, color: '#ffffff', marginBottom: 20}}>Financial Insights</h3>
          <p style={{fontSize: '12px', opacity: 0.8, marginBottom: 16, fontStyle: 'italic'}}>
            Calculated from your transaction data: Savings Rate, Monthly Growth, Average Transaction, and Total Count
          </p>
          <div className="animated-stats-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
            <div className="animated-stat-item" style={{textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)'}}>
              <div style={{fontSize: '14px', opacity: 0.9, marginBottom: '8px'}}>Savings Rate</div>
              <div style={{fontSize: '32px', fontWeight: 700}}>{animatedStats.savingsRate.toFixed(1)}%</div>
            </div>
            <div className="animated-stat-item" style={{textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)'}}>
              <div style={{fontSize: '14px', opacity: 0.9, marginBottom: '8px'}}>Monthly Growth</div>
              <div style={{fontSize: '32px', fontWeight: 700}}>{animatedStats.monthlyGrowth.toFixed(1)}%</div>
            </div>
            <div className="animated-stat-item" style={{textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)'}}>
              <div style={{fontSize: '14px', opacity: 0.9, marginBottom: '8px'}}>Avg Transaction</div>
              <div style={{fontSize: '32px', fontWeight: 700}}>₹{Math.round(animatedStats.avgTransaction).toLocaleString()}</div>
            </div>
            <div className="animated-stat-item" style={{textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)'}}>
              <div style={{fontSize: '14px', opacity: 0.9, marginBottom: '8px'}}>Total Transactions</div>
              <div style={{fontSize: '32px', fontWeight: 700}}>{animatedStats.totalTransactions}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
    
    {/* How It Works Section - Full Width */}
    <HowItWorks />
  </>
  )
}

export default Dashboard
