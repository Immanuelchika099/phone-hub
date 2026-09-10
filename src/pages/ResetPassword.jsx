import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiEye, FiEyeOff, FiLock } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import './Auth.css'
import './Commerce.css'

function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true
    if (!supabase) {
      setError('Supabase is not configured.')
      return undefined
    }

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (active) setReady(Boolean(data.session))
    }

    checkSession()
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setReady(Boolean(session))
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    if (password !== confirmPassword) return setError('Passwords do not match.')
    if (!supabase) return setError('Supabase is not configured.')

    setBusy(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) {
      setError(updateError.message || 'Unable to update your password.')
    } else {
      setMessage('Password updated successfully. Redirecting you to admin login…')
      setTimeout(() => navigate('/admin', { replace: true }), 1200)
    }
    setBusy(false)
  }

  return <main className="auth-page">
    <div className="auth-topbar"><Link to="/" className="auth-back"><FiArrowLeft /> Back</Link></div>
    <div className="auth-orb auth-orb-one" />
    <div className="auth-orb auth-orb-two" />
    <section className="auth-card">
      <div className="auth-brand"><span>PHONE</span>HUB</div>
      <p className="auth-eyebrow">SECURE ACCESS</p>
      <h1 className="auth-title">Create a new password.</h1>
      <p className="auth-subtitle">Set a new password for your Phone Hub account.</p>
      {!ready && !error && <div className="commerce-error">Your recovery session is still loading. Please wait a moment and try again.</div>}
      {error && <div className="commerce-error">{error}</div>}
      {message && <div className="commerce-success">{message}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <label>New password</label>
        <div className="auth-input-wrap"><FiLock /><input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter new password" required minLength={6} /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FiEyeOff /> : <FiEye />}</button></div>
        <label>Confirm password</label>
        <div className="auth-input-wrap"><FiLock /><input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" required minLength={6} /><button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <FiEyeOff /> : <FiEye />}</button></div>
        <button className="auth-submit" type="submit" disabled={busy || !ready}>{busy ? 'Updating…' : 'Update password'}</button>
      </form>
    </section>
  </main>
}

export default ResetPassword
