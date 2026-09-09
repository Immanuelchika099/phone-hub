import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCheck, FiClock, FiPackage, FiTruck } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Commerce.css'

export default function TrackOrder() {
  const { number } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [order, setOrder] = useState(null)
  const [events, setEvents] = useState([])
  const [tracking, setTracking] = useState(number || '')
  const [error, setError] = useState('')

  const load = async (value) => {
    if (!user || !supabase || !value) return
    setError('')
    const { data, error: orderError } = await supabase.from('orders').select('*').eq('order_number', value.trim().toUpperCase()).maybeSingle()
    if (orderError) return setError(orderError.message)
    if (!data) return setError('We could not find that order. Check the order number and make sure you are signed in.')
    setOrder(data)
    const { data: rows } = await supabase.from('tracking_events').select('*').eq('order_id', data.id).order('created_at', { ascending: false })
    setEvents(rows || [])
  }

  useEffect(() => { if (user && number) load(number) }, [user, number])

  return (
    <main className="commerce-page">
      <button className="commerce-back" onClick={() => navigate(-1)}><FiArrowLeft /> Back</button>
      <section className="tracking-header">
        <p className="commerce-eyebrow">PARCEL TRACKING</p>
        <h1>Track your PhoneHub order.</h1>
        <p className="commerce-muted">Enter your order number to see the latest delivery status.</p>
        <form className="tracking-search" onSubmit={(e) => { e.preventDefault(); load(tracking); navigate(`/track/${tracking.toUpperCase()}`, { replace: true }) }}>
          <input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="e.g. PH-8A31F2C9D0" required />
          <button className="commerce-primary">Track</button>
        </form>
        {!user && <div className="commerce-error">Please sign in to view your order tracking.</div>}
        {error && <div className="commerce-error">{error}</div>}
      </section>

      {order && <section className="commerce-card tracking-card">
        <div className="tracking-top"><div><span>Order</span><strong>{order.order_number}</strong></div><div className="tracking-status">{order.status.replaceAll('_',' ')}</div></div>
        <div className="tracking-meta"><span><FiPackage /> Courier: {order.courier || 'PhoneHub delivery'}</span><span><FiTruck /> Tracking: {order.tracking_number || 'Awaiting dispatch'}</span><span><FiClock /> Placed: {new Date(order.created_at).toLocaleDateString()}</span></div>
        <div className="timeline">
          {events.length ? events.map((event, i) => <div className="timeline-item" key={event.id}><div className="timeline-dot">{i === 0 ? <FiCheck /> : <FiPackage />}</div><div><strong>{event.status}</strong><p>{event.note || 'Package update'}</p><small>{event.location || ''} · {new Date(event.created_at).toLocaleString()}</small></div></div>) : <div className="tracking-empty">No tracking events yet. Your order is being prepared.</div>}
        </div>
      </section>}
    </main>
  )
}
