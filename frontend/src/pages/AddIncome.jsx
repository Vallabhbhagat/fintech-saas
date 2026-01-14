import React, { useState } from 'react'
import * as api from '../services/api'
import { useNavigate } from 'react-router-dom'

const AddIncome = () => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.addIncome({ title, amount: Number(amount), date })
      // Notify dashboard to refresh data
      localStorage.setItem('transaction_updated', Date.now().toString())
      alert('Income added successfully!')
      navigate('/dashboard')
    } catch (err) { 
      alert('Failed to add income: ' + (err.message || 'Unknown error'))
    }
  }

  return (
    <div className="container">
      <h2>Add Income</h2>
      <div className="page" style={{marginTop:12}}>
        <form onSubmit={submit} style={{display:'grid',gap:8}}>
          <label>Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} required />
          <label>Amount</label>
          <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" required />
          <label>Date</label>
          <input value={date} onChange={e=>setDate(e.target.value)} type="date" />
          <div>
            <button type="submit">Add Income</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddIncome
