import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function isPhone(s) {
  // Simple phone validation: optional leading +, digits only, 7-15 digits
  return /^\+?[0-9]{7,15}$/.test(s)
}

export default function Login() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [sentMessage, setSentMessage] = useState('')
  const navigate = useNavigate()

  // Simple math captcha: sum of two single-digit numbers
  const rand = () => Math.floor(Math.random() * 9) + 1
  const [captcha, setCaptcha] = useState({ a: rand(), b: rand() })
  const [captchaInput, setCaptchaInput] = useState('')
  const captchaSum = Number(captcha.a) + Number(captcha.b)
  const captchaNumber = captchaInput === '' ? NaN : Number(captchaInput)
  const captchaValid = Number.isFinite(captchaNumber) && captchaNumber === captchaSum

  const handleSend = (e) => {
    e && e.preventDefault()
    setError('')
    if (!isPhone(phone)) return setError('Enter a valid phone number')
    if (!captchaValid) return setError('Captcha incorrect')
    // Simulate sending OTP
    setSent(true)
    setSentMessage('OTP sent (demo)')
  }

  const handleVerify = (e) => {
    e && e.preventDefault()
    setError('')
    if (!sent) return setError('Press Send OTP first')
    if (!otp || !/^[0-9]{4,6}$/.test(otp)) return setError('Enter the 4–6 digit OTP')
    const FIXED_OTP = '123456'
    if (otp !== FIXED_OTP) return setError('Incorrect OTP')
    // Success — navigate to home
    navigate('/home')
  }

  const handleResend = () => {
    setSent(false)
    setOtp('')
    setTimeout(() => {
      setSent(true)
      setSentMessage('OTP resent (demo)')
    }, 600)
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={sent ? handleVerify : handleSend} aria-label="Phone OTP login form">
        <h1 className="logo">MyApp</h1>

        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1234567890"
          autoComplete="tel"
        />

        {!sent && (
          <>
            <div style={{height:8}} />
            <label htmlFor="captcha">Captcha: What is {captcha.a} + {captcha.b} ?</label>
            <div style={{display:'flex',gap:8,alignItems:'center',marginTop:6}}>
              <input id="captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value.replace(/[^0-9]/g, ''))} placeholder="Answer" style={{width:100}} />
              <button type="button" onClick={() => { setCaptcha({ a: rand(), b: rand() }); setCaptchaInput(''); setError('') }} className="btn" style={{background:'#6b7280'}}>Refresh</button>
            </div>
            {captchaInput !== '' && !captchaValid && <div className="error" style={{marginTop:8}}>Captcha incorrect</div>}
            <div style={{height:8}} />
            <button type="submit" className="btn" disabled={!isPhone(phone) || !captchaValid}>Send OTP</button>
          </>
        )}

        {sent && (
          <>
            <p className="note">We sent a one-time code to <strong>{phone}</strong>.</p>
            <label htmlFor="otp">Enter OTP</label>
            <input id="otp" inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} placeholder="123456" />
            {error && <div className="error">{error}</div>}
            <div style={{display:'flex',gap:8,marginTop:10}}>
              <button type="button" className="btn" onClick={handleResend} style={{background:'#6b7280'}}>Resend</button>
              <button type="submit" className="btn">Verify</button>
            </div>
            {sentMessage && <small style={{color:'#6b7280',display:'block',marginTop:8}}>{sentMessage}</small>}
          </>
        )}

        <p className="note" style={{marginTop:12}}>This is a demo login — OTP is <code>123456</code>.</p>
        <p className="note">Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </main>
  )
}
