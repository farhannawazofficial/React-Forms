import React from 'react'
import './auth.css'

export default function Dashboard({ name, onLogout, showToast }) {
  // Dashboard simple page
  function handleLogout() {
    if (typeof showToast === 'function') showToast('You have logged out', 'info')
    if (typeof onLogout === 'function') onLogout()
  }

  return (
    <div style={{ padding: '3rem', textAlign: 'center' }}>
      <div className="auth-form" style={{ maxWidth: 680, margin: '0 auto' }}>
        <h2>Welcome, {name}</h2>
        <p style={{ color: '#444' }}>You are now logged in. This is a simple dashboard placeholder.</p>
        <div style={{ marginTop: '1rem' }}>
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}
