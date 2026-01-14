import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as api from '../services/api'

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await api.register(name, email, password)
      alert("Registered successfully!")
      navigate("/")
      setEmail("")
      setName("")
      setPassword("")
    } catch (err) {
      alert('Registration failed')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 style={{marginTop:0}}>Register</h2>
        <form onSubmit={handleRegister} style={{display:'grid',gap:12}}>
          <div>
            <label style={{display:'block',marginBottom:6}}>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" required />
          </div>

          <div>
            <label style={{display:'block',marginBottom:6}}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
          </div>

          <div>
            <label style={{display:'block',marginBottom:6}}>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" required />
          </div>

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
            <button type="submit">Register</button>
            <small style={{color:'var(--muted)'}}>Already have an account? <Link to="/">Login</Link></small>
          </div>
        </form>
        <div className="login-footer">Powered by SinovaX</div>
      </div>
    </div>
  )
}

export default Register
