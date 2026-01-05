import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5050/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    alert("Registered successfully!");
    navigate("/");
    setEmail("");
    setName("");
    setPassword("");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register Page</h2>

      <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" /><br /><br />
      <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" /><br /><br />
      <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" /><br /><br />

      <button onClick={handleRegister}>Register</button>

      <p>
        Already have an account?
        <Link to="/"> Login</Link>
      </p>
    </div>
  )
}

export default Register
