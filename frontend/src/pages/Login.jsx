import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await fetch("http://localhost:5050/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        alert("Successfull Login!");
        navigate("/dashboard")
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login Page</h2>

            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" /><br /><br />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" /><br /><br />

            <button onClick={handleLogin}>Login</button>

            <p>
                Don't have an account?
                <Link to="/register"> Register</Link>
            </p>
        </div>
    )
}

export default Login
