import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as api from '../services/api'

const EditIncome = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title:'', amount:'', date:'' })

  useEffect(()=>{
    const fetchIncome = async () => {
      try {
        const income = await api.getIncome(id)
        if (income) {
          setForm({ 
            title: income.title||'', 
            amount: income.amount||'', 
            date: income.date ? new Date(income.date).toISOString().slice(0,10) : '' 
          })
        }
        setLoading(false)
      } catch (err) {
        alert('Failed to load income')
        navigate('/dashboard')
      }
    }
    fetchIncome()
  },[id, navigate])

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.updateIncome(id, { title: form.title, amount: Number(form.amount), date: form.date })
      // Notify dashboard to refresh data
      localStorage.setItem('transaction_updated', Date.now().toString())
      alert('Income updated successfully!')
      navigate('/dashboard')
    } catch (err) { 
      alert('Update failed: ' + (err.message || 'Unknown error'))
    }
  }

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="container">
      <h2>Edit Income</h2>
      <div className="page" style={{marginTop:12}}>
        <form onSubmit={submit} style={{display:'grid',gap:8}}>
          <label>Title</label>
          <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
          <label>Amount</label>
          <input value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} type="number" required />
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

export default EditIncome
