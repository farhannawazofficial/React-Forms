import { useState } from 'react'
import './auth.css'
import { hashString } from '../utils/crypto'

export default function Signup({ onSignedUp, showToast }) {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [users, setUsers] = useState(() => {
    const raw = localStorage.getItem('users')
    return raw ? JSON.parse(raw) : []
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}/

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setSuccess('')
  }

  // show & hide iconss
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  function validate() {
    const err = {}
    if (!form.fullName.trim()) err.fullName = 'Full name is required'
    if (!form.email.trim()) err.email = 'Email is required'
    else if (!emailRegex.test(form.email)) err.email = 'Please enter a valid email'
    if (!form.password) err.password = 'Password is required'
    else if (!strongPassword.test(form.password)) err.password = 'Password must be 8+ chars and include upper, lower, number, special'
    if (!form.confirm) err.confirm = 'Please confirm password'
    else if (form.password !== form.confirm) err.confirm = 'Passwords do not match'
    return err
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length > 0) return

    const emailNorm = form.email.trim().toLowerCase()
    try {
      const exists = users.find(u => u.email === emailNorm)
      if (exists) {
        if (typeof showToast === 'function') showToast('This email is already registered. Please login.', 'warn')
        setErrors({ form: 'Email already in use. Use login.' })
        return
      }

      const hashed = await hashString(form.password)
      const newUser = { fullName: form.fullName.trim(), email: emailNorm, password: hashed }
      const next = [...users, newUser]
      localStorage.setItem('users', JSON.stringify(next))
      setUsers(next)
      setSuccess('Signup successful. You can now login.')
      setForm({ fullName: '', email: '', password: '', confirm: '' })
      if (typeof showToast === 'function') showToast('Account created successfully', 'success')
      if (typeof onSignedUp === 'function') setTimeout(() => onSignedUp(), 700)
    } catch (e) {
      setErrors({ form: 'Error saving to localStorage' })
      if (typeof showToast === 'function') showToast('Error saving data', 'error')
    }
  }

  return (
    <form className="auth-form card-anim" onSubmit={handleSubmit} noValidate>
      <h2>Signup</h2>
      {errors.form && <div className="error">{errors.form}</div>}

      <label>
        Full Name
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="e.g. John Doe" />
        {errors.fullName && <div className="field-error">{errors.fullName}</div>}
      </label>

      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} placeholder="your@example.com" />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </label>

      <label>
        Password
        <div className="password-wrapper">
          <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="At least 8 chars" />
          <button type="button" className="pw-toggle" aria-label="Toggle password visibility" aria-pressed={showPassword} onClick={() => setShowPassword(s => !s)}>
            <i className={showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'} aria-hidden="true"></i>
          </button>
        </div>
        {errors.password && <div className="field-error">{errors.password}</div>}
      </label>

      <label>
        Confirm Password
        <div className="password-wrapper">
          <input name="confirm" type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={handleChange} placeholder="Repeat password" />
          <button type="button" className="pw-toggle" aria-label="Toggle confirm visibility" aria-pressed={showConfirm} onClick={() => setShowConfirm(s => !s)}>
            <i className={showConfirm ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'} aria-hidden="true"></i>
          </button>
        </div>
        {errors.confirm && <div className="field-error">{errors.confirm}</div>}
      </label>

      <button type="submit" className="btn">Create Account</button>

      {success && <div className="success">{success}</div>}
    </form>
  )
}
