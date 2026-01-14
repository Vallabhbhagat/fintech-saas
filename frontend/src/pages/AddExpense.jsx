import React, { useState } from 'react'
import * as api from '../services/api'
import { useNavigate } from 'react-router-dom'

const AddExpense = () => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Other')
  const [date, setDate] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.addExpense({ title, amount: Number(amount), category, date })
      // Notify dashboard to refresh data
      localStorage.setItem('transaction_updated', Date.now().toString())
      alert('Expense added successfully!')
      navigate('/dashboard')
    } catch (err) { 
      alert('Failed to add expense: ' + (err.message || 'Unknown error'))
    }
  }

  return (
    <div className="container">
      <h2>Add Expense</h2>
      <div className="page" style={{marginTop:12}}>
        <form onSubmit={submit} style={{display:'grid',gap:8}}>
          <label>Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} required />
          <label>Amount</label>
          <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" required />
          <label>Category</label>
          <input value={category} onChange={e=>setCategory(e.target.value)} />
          <label>Date</label>
          <input value={date} onChange={e=>setDate(e.target.value)} type="date" />
          <div>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddExpense
