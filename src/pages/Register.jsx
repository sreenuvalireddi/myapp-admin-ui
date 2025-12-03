import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../store'

function isEmail(s) {
  return /\S+@\S+\.\S+/.test(s)
}

function isPhone(s) {
  return /^\+?[0-9]{7,15}$/.test(s)
}

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!firstName.trim()) return setError('Please enter first name')
    if (!lastName.trim()) return setError('Please enter last name')
    if (!phone.trim()) return setError('Please enter phone number')
    if (!isPhone(phone)) return setError('Enter a valid phone number')
    if (!email.trim()) return setError('Please enter email')
    if (!isEmail(email)) return setError('Enter a valid email')
    if (!password || password.length < 6) return setError('Password must be at least 6 characters')
    if (!confirmPassword) return setError('Please confirm your password')
    if (password !== confirmPassword) return setError('Passwords do not match')

    // Save registration to redux store and navigate to OTP verification
    const registration = { firstName, lastName, phone, email, password }
    try {
      dispatch(registerUser(registration))
    } catch (e) {
      console.warn('redux dispatch failed', e)
    }
    console.log('Demo registration (saved to redux)', registration)
    navigate('/verify-otp', { state: { firstName, lastName, phone, email } })
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit} aria-label="Register form">
        <h1 className="logo">Create account</h1>

        <div className="form-grid">
          <div>
            <label htmlFor="firstName">First name</label>
            <input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div>
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>

        <label htmlFor="phone">Phone number</label>
        <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+15551234567" />

        <label htmlFor="email">Email</label>
        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" autoComplete="new-password" />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat your password" autoComplete="new-password" />

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn">Create account</button>

        <p className="note">By creating an account you agree to the demo terms.</p>
      </form>
    </main>
  )
}
