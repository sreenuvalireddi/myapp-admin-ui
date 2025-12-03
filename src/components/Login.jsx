import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function isEmail(s) {
  return /\S+@\S+\.\S+/.test(s)
}

function isPhone(s) {
  // Simple phone validation: optional leading +, digits only, 7-15 digits
  return /^\+?[0-9]{7,15}$/.test(s)
}

export default function Login() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!identifier) return setError('Please enter email or phone')
    if (!password) return setError('Please enter a password')
    if (!isEmail(identifier) && !isPhone(identifier)) return setError('Enter a valid email or phone number')

    // Demo submit handler: navigate to home
    console.log('Demo login', { identifier, password })
    navigate('/home')
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit} aria-label="Login form">
        <h1 className="logo">MyApp</h1>

        <label htmlFor="identifier">Email or phone</label>
        <input
          id="identifier"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="you@example.com or +1234567890"
          autoComplete="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn">Sign in</button>

        <p className="note">This is a demo login screen — no backend attached. You can sign in using an email or phone number.</p>

        <p className="note">Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </main>
  )
}
