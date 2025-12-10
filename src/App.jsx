import { useState } from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'
import { useEffect } from 'react'

// Simple Toast component inside App to show soft top messages
function Toast({ toast }) {
  if (!toast || !toast.visible) return null
  return (
    <div className={`app-toast ${toast.type || 'info'}`}>
      {toast.message}
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('login') 
  const [userName, setUserName] = useState('')
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' })

  useEffect(() => {
    let t
    if (toast.visible) t = setTimeout(() => setToast({ ...toast, visible: false }), 3500)
    return () => clearTimeout(t)
  }, [toast])

  function showToast(message, type = 'info') {
    setToast({ visible: true, message, type })
  }

  function handleSignedUp() {
    // switch login 
    setView('login')
  }

  function handleLogin(name) {
    setUserName(name)
    setView('dashboard')
  }

  function handleLogout() {
    setUserName('')
    setView('login')
  }

  if (view === 'dashboard') {
    return <Dashboard name={userName} onLogout={handleLogout} showToast={showToast} />
  }

  return (
    <div>
      <Toast toast={toast} />
      <header style={{ textAlign: 'center' }}>
        <h1>React Forms</h1>
        <p style={{ color: '#666' }}>Signup and Login</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 760, width: '100%' }}>
          <div className="auth-tabs">
            <button className={`tab-btn ${view === 'signup' ? 'active' : ''}`} onClick={() => setView('signup')}>Signup</button>
            <button className={`tab-btn ${view === 'login' ? 'active' : ''}`} onClick={() => setView('login')}>Login</button>
          </div>

          <main className="auth-container">
            {view === 'signup' && <Signup onSignedUp={handleSignedUp} showToast={showToast} />}
            {view === 'login' && <Login onLogin={handleLogin} showToast={showToast} />}
          </main>
        </div>
      </div>
    </div>
  )
}
