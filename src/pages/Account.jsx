import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCheck, FiChevronRight, FiHome, FiLogOut, FiMapPin, FiMail, FiPhone, FiUser, FiShoppingBag } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import './Account.css'

const defaultSettings = { address: '', city: '', state: '', phone: '', currency: 'NGN' }

export default function Account() {
  const navigate = useNavigate()
  const { user, profile, loading, signOut, updateProfile } = useAuth()
  const [settings, setSettings] = useState(defaultSettings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) navigate('/login?redirect=/account', { replace: true })
  }, [loading, user, navigate])

  useEffect(() => {
    if (!user) return
    let stored = {}
    try { stored = JSON.parse(localStorage.getItem(`phonehub-profile-${user.id}`) || '{}') } catch {}
    setSettings({ ...defaultSettings, address: profile?.address ?? stored.address ?? '', city: profile?.city ?? stored.city ?? '', state: profile?.state ?? stored.state ?? '', phone: profile?.phone ?? stored.phone ?? '', currency: profile?.currency ?? stored.currency ?? 'NGN' })
  }, [user, profile])

  const name = profile?.full_name || user?.user_metadata?.full_name || 'Phone Hub customer'
  const initial = name.trim().charAt(0).toUpperCase() || 'U'
  const email = profile?.email || user?.email || ''
  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : 'Recently'
  const hasAddress = useMemo(() => [settings.address, settings.city, settings.state].some(Boolean), [settings])
  const set = (key, value) => setSettings(current => ({ ...current, [key]: value }))

  const save = async (e) => {
    e.preventDefault(); setSaving(true); setSaved(false); setError('')
    try {
      localStorage.setItem(`phonehub-profile-${user.id}`, JSON.stringify(settings))
      await updateProfile({ address: settings.address.trim(), city: settings.city.trim(), state: settings.state.trim(), phone: settings.phone.trim(), currency: settings.currency })
      setSaved(true); window.setTimeout(() => setSaved(false), 3000)
    } catch (err) { setError(err.message || 'Unable to save your settings.') }
    finally { setSaving(false) }
  }

  const logout = async () => { await signOut(); navigate('/', { replace: true }) }
  if (loading || !user) return null

  return <main className="account-page"><div className="account-shell">
    <Link to="/" className="account-back"><FiArrowLeft /> Back to shop</Link>
    <header className="account-hero"><div className="account-avatar">{initial}</div><div className="account-identity"><span className="account-eyebrow">MY ACCOUNT</span><h1>Welcome back, {name.split(' ')[0]}.</h1><p><FiMail /> {email} <span>·</span> Member since {memberSince}</p></div><button className="account-signout" type="button" onClick={logout}><FiLogOut /> Sign out</button></header>
    <div className="account-layout">
      <aside className="account-sidebar"><div className="account-nav-label">ACCOUNT</div><a className="account-nav-item active" href="#profile"><FiUser /> Profile & settings</a><Link className="account-nav-item" to="/track"><FiShoppingBag /> My orders <FiChevronRight /></Link><a className="account-nav-item" href="#delivery"><FiMapPin /> Delivery address <FiChevronRight /></a><div className="account-sidebar-bottom"><Link to="/phones"><FiHome /> Continue shopping</Link><button type="button" onClick={logout}><FiLogOut /> Sign out</button></div></aside>
      <section className="account-content"><div className="account-section-heading" id="profile"><div><span>PERSONAL DETAILS</span><h2>Profile & settings</h2><p>Keep your details ready for a faster Phone Hub checkout.</p></div></div>
        <form className="settings-card" onSubmit={save}>
          <div className="settings-card-head"><div><h3>Your information</h3><p>Your account name and email are linked to your Phone Hub login.</p></div><div className="verified-pill"><FiCheck /> Account active</div></div>
          <div className="settings-grid"><label><span>Full name</span><div className="field"><FiUser /><input value={name} readOnly /></div><small>Your account name.</small></label><label><span>Email address</span><div className="field"><FiMail /><input value={email} readOnly /></div><small>Your sign-in email.</small></label><label><span>Phone number</span><div className="field"><FiPhone /><input value={settings.phone} onChange={e => set('phone', e.target.value)} placeholder="e.g. 0803 123 4567" /></div></label></div>
          <div className="settings-divider" />
          <div className="settings-card-head address-head" id="delivery"><div><h3>Delivery address</h3><p>Save your usual delivery location so checkout is quicker.</p></div></div>
          <div className="settings-grid address-grid"><label className="full-field"><span>Street address</span><div className="field"><FiMapPin /><input value={settings.address} onChange={e => set('address', e.target.value)} placeholder="House number, street, area" /></div></label><label><span>City</span><div className="field"><input value={settings.city} onChange={e => set('city', e.target.value)} placeholder="Port Harcourt" /></div></label><label><span>State</span><div className="field"><input value={settings.state} onChange={e => set('state', e.target.value)} placeholder="Rivers" /></div></label></div>
          <div className="settings-divider" />
          <div className="settings-card-head"><div><h3>Shopping preferences</h3><p>Choose how prices are displayed across the store.</p></div></div>
          <div className="currency-options" role="radiogroup" aria-label="Currency">{[['NGN','₦','Nigerian Naira'],['USD','$','US Dollar'],['GBP','£','British Pound']].map(([code, symbol, label]) => <button type="button" key={code} className={settings.currency === code ? 'currency-option selected' : 'currency-option'} onClick={() => set('currency', code)} role="radio" aria-checked={settings.currency === code}><strong>{symbol}</strong><span><b>{code}</b>{label}</span>{settings.currency === code && <FiCheck />}</button>)}</div>
          {error && <div className="account-message error">{error}</div>}{saved && <div className="account-message success"><FiCheck /> Your settings have been saved.</div>}
          <div className="settings-actions"><span>{hasAddress ? 'Delivery details saved for this account.' : 'Add an address to speed up checkout.'}</span><button className="save-settings" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button></div>
        </form>
      </section>
    </div>
  </div></main>
}
