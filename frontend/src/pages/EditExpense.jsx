import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as api from '../services/api'

const EditExpense = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title:'', amount:'', category:'', date:'' })

  useEffect(()=>{
    const fetchExpense = async () => {
      try {
        const expense = await api.getExpense(id)
        if (expense) {
          setForm({ 
            title: expense.title||'', 
            amount: expense.amount||'', 
            category: expense.category||'', 
            date: expense.date ? new Date(expense.date).toISOString().slice(0,10) : '' 
          })
        }
        setLoading(false)
      } catch (err) {
        alert('Failed to load expense')
        navigate('/dashboard')
      }
    }
    fetchExpense()
  },[id, navigate])

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.updateExpense(id, { title: form.title, amount: Number(form.amount), category: form.category, date: form.date })
      // Notify dashboard to refresh data
      localStorage.setItem('transaction_updated', Date.now().toString())
      alert('Expense updated successfully!')
      navigate('/dashboard')
    } catch (err) { 
      alert('Update failed: ' + (err.message || 'Unknown error'))
    }
  }

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="container">
      <h2>Edit Expense</h2>
      <div className="page" style={{marginTop:12}}>
        <form onSubmit={submit} style={{display:'grid',gap:8}}>
          <label>Title</label>
          <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
          <label>Amount</label>
          <input value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} type="number" required />
          <label>Category</label>
          <input value={form.category} onChange={e=>setForm({...form, category: e.target.value})} />
          <label>Date</label>
          <input value={form.date} onChange={e=>setForm({...form, date: e.target.value})} type="date" />
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditExpense
