import React, { useEffect, useState } from 'react'
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import * as api from '../services/api'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const Analytics = () => {
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('fv_token')
        if (!token) return
        
        const [txData, summaryData] = await Promise.all([
          api.getTransactions().catch(() => []),
          api.getSummary().catch(() => null)
        ])
        setTransactions(txData)
        setSummary(summaryData)
      } catch (err) {
        console.error('Failed to fetch analytics data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Process transactions for charts
  const processMonthlyData = () => {
    const monthlyIncome = {}
    const monthlyExpense = {}
    
    transactions.forEach(tx => {
      const date = new Date(tx.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      
      if (tx.type === 'income') {
        monthlyIncome[monthKey] = (monthlyIncome[monthKey] || 0) + tx.amount
      } else if (tx.type === 'expense') {
        monthlyExpense[monthKey] = (monthlyExpense[monthKey] || 0) + tx.amount
      }
    })

    const allMonths = [...new Set([...Object.keys(monthlyIncome), ...Object.keys(monthlyExpense)])].sort()
    const labels = allMonths.map(key => {
      const [year, month] = key.split('-')
      return new Date(year, month - 1).toLocaleDateString('en-US', { month: 'short' })
    })
    
    return {
      labels,
      income: allMonths.map(key => monthlyIncome[key] || 0),
      expense: allMonths.map(key => monthlyExpense[key] || 0)
    }
  }

  const processCategoryData = () => {
    const categoryTotals = {}
    transactions.forEach(tx => {
      if (tx.type === 'expense' && tx.category) {
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount
      }
    })
    
    const categories = Object.keys(categoryTotals)
    const amounts = Object.values(categoryTotals)
    
    return { categories, amounts }
  }

  const monthlyData = processMonthlyData()
  const categoryData = processCategoryData()

  const lineData = {
    labels: monthlyData.labels.length > 0 ? monthlyData.labels : ['No Data'],
    datasets: [
      {
        label: 'Income',
        data: monthlyData.income.length > 0 ? monthlyData.income : [0],
        borderColor: '#6F2DBD',
        backgroundColor: 'rgba(111,45,189,0.1)',
        tension: 0.3
      },
      {
        label: 'Expenses',
        data: monthlyData.expense.length > 0 ? monthlyData.expense : [0],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255,107,107,0.1)',
        tension: 0.3
      }
    ]
  }

  const barData = {
    labels: monthlyData.labels.length > 0 ? monthlyData.labels : ['No Data'],
    datasets: [
      {
        label: 'Income',
        data: monthlyData.income.length > 0 ? monthlyData.income : [0],
        backgroundColor: '#6F2DBD'
      },
      {
        label: 'Expenses',
        data: monthlyData.expense.length > 0 ? monthlyData.expense : [0],
        backgroundColor: '#ff6b6b'
      }
    ]
  }

  const pieData = {
      labels: categoryData.categories.length > 0 ? categoryData.categories : ['No Categories'],
      datasets: [{
        data: categoryData.amounts.length > 0 ? categoryData.amounts : [1],
        backgroundColor: [
          '#6F2DBD',
          '#00C48C',
          '#ff6b6b',
          '#f59e0b',
          '#7c3aed',
          '#ef4444',
          '#10b981',
          '#6366f1'
        ]
      }]
  }

  const doughnutData = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      data: [
        summary?.totalIncome || 0,
        summary?.totalExpense || 0
      ],
      backgroundColor: ['#6F2DBD', '#ff6b6b']
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    }
  }

  if (loading) {
    return (
      <div className="container">
        <h2>Analytics</h2>
        <div className="page" style={{padding:24,textAlign:'center'}}>
          <p style={{color:'#555'}}>Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Analytics</h2>

      {summary && (
        <div className="grid" style={{marginTop:12}}>
          <div className="col-4">
            <div className="page" style={{padding:16}}>
              <div style={{fontSize:14,color:'#555',marginBottom:8}}>Total Income</div>
              <div style={{fontSize:24,fontWeight:700,color:'#6F2DBD'}}>₹{Number(summary.totalIncome || 0).toLocaleString()}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="page" style={{padding:16}}>
              <div style={{fontSize:14,color:'#555',marginBottom:8}}>Total Expenses</div>
              <div style={{fontSize:24,fontWeight:700,color:'#ff6b6b'}}>₹{Number(summary.totalExpense || 0).toLocaleString()}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="page" style={{padding:16}}>
              <div style={{fontSize:14,color:'#555',marginBottom:8}}>Balance</div>
              <div style={{fontSize:24,fontWeight:700,color:'#222'}}>₹{Number(summary.balance || 0).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid" style={{marginTop:16}}>
        <div className="col-6 page">
          <h3 style={{marginTop:0,marginBottom:16}}>Income vs Expenses (Line)</h3>
          <div style={{height:300}}>
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
        <div className="col-6 page">
          <h3 style={{marginTop:0,marginBottom:16}}>Income vs Expenses (Bar)</h3>
          <div style={{height:300}}>
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="grid" style={{marginTop:16}}>
        <div className="col-6 page">
          <h3 style={{marginTop:0,marginBottom:16}}>Expense by Category</h3>
          <div style={{height:300}}>
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
        <div className="col-6 page">
          <h3 style={{marginTop:0,marginBottom:16}}>Income vs Expenses</h3>
          <div style={{height:300}}>
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
