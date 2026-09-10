import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import Admin from './Admin'
import './AdminPortal.css'

const ADMIN_USERNAME = 'Admin'
const ADMIN_EMAIL = 'imanwahmed367@gmail.com'

function AdminPortal() {
  const { user, profile, loading } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const isAdmin = Boolean(user && profile?.role === 'admin')

  useEffect(() => {
    if (isAdmin) {
      setError('')
      setPassword('')
    }
  }, [isAdmin])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (username.trim() !== ADMIN_USERNAME || !password) {
      setError('Invalid admin username or password.')
      return
    }

    setBusy(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    })

    if (signInError) {
      setError('Invalid admin username or password.')
    }

    setBusy(false)
  }

  if (loading) {
    return (
      <main className="adminPortal adminPortalLoading">
        <div className="adminPortalMark">PH</div>
        <span>Securing control centre…</span>
      </main>
    )
  }

  if (isAdmin) return <Admin />

  return (
    <main className="adminPortal">
      <div className="adminPortalGlow adminPortalGlowOne" />
      <div className="adminPortalGlow adminPortalGlowTwo" />

      <section className="adminLoginShell">
        <div className="adminPortalBrand">
          <div className="adminPortalMark">PH</div>
          <div>
            <span>PHONE HUB</span>
            <small>CONTROL CENTRE</small>
          </div>
        </div>

        <div className="adminLoginCard">
          <div className="adminLoginEyebrow">RESTRICTED ACCESS</div>
          <h1>Welcome back.</h1>
          <p>Enter the administrator credentials to access the Phone Hub control centre.</p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Username</span>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Admin"
                autoComplete="username"
                autoFocus
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>

            {error && <div className="adminLoginError">{error}</div>}

            <button type="submit" disabled={busy}>
              {busy ? 'Authenticating…' : 'Enter control centre'}
              <span>↗</span>
            </button>
          </form>

          <div className="adminLoginFooter">
            <span>PHONE HUB</span>
            <span>ADMIN ONLY</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminPortal
