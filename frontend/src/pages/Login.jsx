import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:5050/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            if (!res.ok) throw new Error('Login failed')
            const data = await res.json()
            if (data.token) localStorage.setItem('fv_token', data.token)
            alert("Successful Login!")
            navigate("/dashboard")
        } catch (err) {
            alert('Login failed')
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2 style={{marginTop:0}}>Login</h2>
                <form onSubmit={handleLogin} style={{display:'grid',gap:12}}>
                    <div>
                        <label style={{display:'block',marginBottom:6}}>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" />
                    </div>

                    <div>
                        <label style={{display:'block',marginBottom:6}}>Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" />
                    </div>

                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
                        <button type="submit">Login</button>
                        <small style={{color:'var(--muted)'}}>Don't have an account? <Link to="/register">Register</Link></small>
                    </div>
                </form>
                <div className="login-footer">Powered by SinovaX</div>
            </div>
        </div>
    )
}

export default Login
