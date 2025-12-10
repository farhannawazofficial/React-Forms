import { useState } from 'react'
import './auth.css'
import { hashString } from '../utils/crypto'

export default function Login({ onLogin, showToast }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!form.email.trim() || !form.password) {
      setError('Email and password are required')
      return
    }

    const raw = localStorage.getItem('users')
    if (!raw) {
      setError('No users found. Please signup first.')
      if (typeof showToast === 'function') showToast('No accounts exist. Please signup.', 'warn')
      return
    }
    try {
      const users = JSON.parse(raw)
      const emailNorm = form.email.trim().toLowerCase()
      const found = users.find(u => u.email === emailNorm)
      if (!found) {
        setError('Email or password is incorrect')
        if (typeof showToast === 'function') showToast('Email or password is incorrect', 'error')
        return
      }

      const enteredHash = await hashString(form.password)
      const stored = found.password || ''
      const isMatch = (stored === enteredHash) || (stored === form.password)
      if (isMatch) {  
        
        if (stored === form.password) {
          const upgraded = users.map(u => u.email === emailNorm ? { ...u, password: enteredHash } : u)
          localStorage.setItem('users', JSON.stringify(upgraded))
        }
        setSuccess(`Welcome back, ${found.fullName}`)
        setForm({ email: '', password: '' })
        if (typeof showToast === 'function') showToast(`Welcome, ${found.fullName}`, 'success')
        if (typeof onLogin === 'function') {
          setTimeout(() => onLogin(found.fullName), 400)
        }
      } else {
        setError('Email or password is incorrect')
        if (typeof showToast === 'function') showToast('Email or password is incorrect', 'error')
      }
    } catch (e) {
      setError('LocalStorage data is corrupted')
      if (typeof showToast === 'function') showToast('LocalStorage data corrupted', 'error')
    }
  }

  return (
    <form className="auth-form card-anim" onSubmit={handleSubmit} noValidate>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}

      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} placeholder="your@example.com" />
      </label>

      <label>
        Password
        <div className="password-wrapper">
          <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Enter password" />
          <button type="button" className="pw-toggle" aria-label="Toggle password visibility" aria-pressed={showPassword} onClick={() => setShowPassword(s => !s)}>
            <i className={showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'} aria-hidden="true"></i>
          </button>
        </div>
      </label>

      <button type="submit" className="btn">Login</button>

      {success && <div className="success">{success}</div>}
    </form>
  )
}
