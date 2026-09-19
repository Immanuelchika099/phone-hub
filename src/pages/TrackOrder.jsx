import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCheck, FiChevronRight, FiClock, FiPackage, FiSearch, FiTruck } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Commerce.css'

const steps = ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered']

const labels = {
  pending: 'Order placed',
  confirmed: 'Order confirmed',
  processing: 'Preparing your order',
  shipped: 'Shipped',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
}

function money(value) {
  return `₦${Number(value || 0).toLocaleString()}`
}

function statusLabel(value) {
  return labels[value] || String(value || '').replaceAll('_', ' ')
}

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDateTime(value) {
  if (!value) return 'Awaiting update'
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

export default function TrackOrder() {
  const { number } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [selected, setSelected] = useState(null)
  const [items, setItems] = useState([])
  const [events, setEvents] = useState([])
  const [tracking, setTracking] = useState(number || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadOrders() {
    if (!user || !supabase) return
    setLoading(true)
    setError('')
    const { data, error: orderError } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (orderError) setError(orderError.message)
    setOrders(data || [])
    setLoading(false)
  }

  async function loadOrder(value) {
    if (!user || !supabase || !value) return
    setError('')
    const { data, error: orderError } = await supabase.from('orders').select('*').eq('order_number', value.trim().toUpperCase()).maybeSingle()
    if (orderError) return setError(orderError.message)
    if (!data) return setError('We could not find that order. Check the order number and make sure you are signed in.')
    await openOrder(data)
  }

  async function openOrder(order) {
    setSelected(order)
    const [{ data: itemRows }, { data: eventRows }] = await Promise.all([
      supabase.from('order_items').select('*').eq('order_id', order.id),
      supabase.from('tracking_events').select('*').eq('order_id', order.id).order('created_at', { ascending: false })
    ])
    setItems(itemRows || [])
    setEvents(eventRows || [])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => { if (user) loadOrders() }, [user])

  useEffect(() => {
    if (!number || !orders.length) return
    const match = orders.find(order => order.order_number === number.toUpperCase())
    if (match) openOrder(match)
    else loadOrder(number)
  }, [number, orders.length])

  const progress = useMemo(() => {
    if (!selected) return { index: 0, percent: 0, eventMap: {} }
    const index = steps.indexOf(selected.status)
    const currentIndex = index < 0 ? 0 : index
    const percent = steps.length === 1 ? 100 : (currentIndex / (steps.length - 1)) * 100
    const eventMap = events.reduce((map, event) => {
      if (event.status && !map[event.status]) map[event.status] = event
      return map
    }, {})
    return { index: currentIndex, percent, eventMap }
  }, [selected, events])

  if (!user) {
    return <main className="commerce-page"><section className="commerce-card orders-empty"><div className="orders-empty-icon"><FiPackage /></div><p className="commerce-eyebrow">MY ORDERS</p><h1>Sign in to see your orders.</h1><p className="commerce-muted">Your purchases, delivery status and order details will all live here.</p><button className="commerce-primary" onClick={() => navigate('/login?redirect=/track')}>Sign in to continue</button></section></main>
  }

  if (selected) {
    return (
      <main className="commerce-page orders-page">
        <button className="commerce-back" onClick={() => { setSelected(null); navigate('/track') }}><FiArrowLeft /> All orders</button>

        <header className="order-detail-header">
          <div>
            <p className="commerce-eyebrow">ORDER DETAILS</p>
            <h1>{selected.order_number}</h1>
            <p>Placed {formatDate(selected.created_at)}</p>
          </div>
          <span className={`order-status status-${selected.status}`}>{statusLabel(selected.status)}</span>
        </header>

        <div className="order-detail-grid">
          <section className="order-detail-main">
            <div className="commerce-card order-card delivery-progress-card">
              <div className="order-card-heading">
                <div>
                  <p className="commerce-eyebrow">DELIVERY PROGRESS</p>
                  <h2>{statusLabel(selected.status)}</h2>
                </div>
                <div className="delivery-progress-percent">{Math.round(progress.percent)}%</div>
              </div>

              <div className="delivery-progress">
                <div className="delivery-progress-track">
                  <div className="delivery-progress-fill" style={{ width: `${progress.percent}%` }} />
                </div>

                <div className="delivery-steps">
                  {steps.map((step, i) => {
                    const event = progress.eventMap[step]
                    const done = i <= progress.index
                    const current = i === progress.index

                    return (
                      <div className={`delivery-step ${done ? 'done' : ''} ${current ? 'current' : ''}`} key={step}>
                        <span className="delivery-step-dot">
                          {done ? <FiCheck /> : i + 1}
                        </span>
                        <div>
                          <strong>{statusLabel(step)}</strong>
                          <small>{event ? formatDateTime(event.created_at) : done ? formatDateTime(step === 'pending' ? selected.created_at : null) : 'Pending'}</small>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="tracking-meta">
                <span><FiTruck /> Courier: {selected.courier || 'FrankyGadget delivery'}</span>
                <span><FiPackage /> Tracking: {selected.tracking_number || 'Awaiting dispatch'}</span>
                <span><FiClock /> Placed: {formatDateTime(selected.created_at)}</span>
              </div>
            </div>

            <div className="commerce-card order-card">
              <div className="order-card-heading"><div><p className="commerce-eyebrow">ITEMS</p><h2>{items.length} product{items.length !== 1 ? 's' : ''}</h2></div></div>
              <div className="order-items-detail">
                {items.map(item => <div className="order-item-detail" key={item.id}><img src={item.thumbnail_url} alt="" /><div><strong>{item.title}</strong><span>Qty {item.quantity}</span></div><b>{money(Number(item.price) * item.quantity)}</b></div>)}
              </div>
            </div>

            <div className="commerce-card order-card">
              <div className="order-card-heading"><div><p className="commerce-eyebrow">UPDATES</p><h2>Tracking activity</h2></div></div>
              <div className="timeline">
                {events.length ? events.map((event, i) => <div className="timeline-item" key={event.id}><div className="timeline-dot">{i === 0 ? <FiCheck /> : <FiPackage />}</div><div><strong>{statusLabel(event.status)}</strong><p>{event.note || 'Package update'}</p><small>{event.location || ''}{event.location ? ' · ' : ''}{formatDateTime(event.created_at)}</small></div></div>) : <div className="tracking-empty">No tracking events yet. Your order is being prepared.</div>}
              </div>
            </div>
          </section>

          <aside className="order-detail-side">
            <div className="commerce-card order-card">
              <p className="commerce-eyebrow">ORDER TOTAL</p>
              <div className="detail-total"><span>Subtotal</span><strong>{money(selected.subtotal)}</strong></div>
              <div className="detail-total"><span>Delivery</span><strong className="free">Free</strong></div>
              <div className="detail-grand"><span>Total</span><strong>{money(selected.total)}</strong></div>
            </div>
            <div className="commerce-card order-card delivery-card">
              <p className="commerce-eyebrow">DELIVERING TO</p>
              <h3>{selected.shipping_name}</h3>
              <p>{selected.shipping_address}<br />{selected.shipping_city}, {selected.shipping_state}</p>
              <p>{selected.shipping_phone}</p>
            </div>
          </aside>
        </div>
      </main>
    )
  }

  return (
    <main className="commerce-page orders-page">
      <header className="orders-header">
        <div><p className="commerce-eyebrow">ACCOUNT</p><h1>My orders</h1><p>Everything you've bought from Franky Gadget, in one place.</p></div>
        <button className="commerce-secondary" onClick={() => navigate('/phones')}>Continue shopping <FiChevronRight /></button>
      </header>

      <section className="order-search-card">
        <div><FiSearch /><div><strong>Track an order</strong><span>Enter your order number to jump straight to its details.</span></div></div>
        <form onSubmit={(e) => { e.preventDefault(); loadOrder(tracking); navigate(`/track/${tracking.toUpperCase()}`) }}><input value={tracking} onChange={e => setTracking(e.target.value)} placeholder="PH-8A31F2C9D0" required /><button className="commerce-primary">Track</button></form>
      </section>

      {error && <div className="commerce-error">{error}</div>}
      <div className="orders-list-heading"><h2>Recent orders</h2><span>{orders.length} order{orders.length !== 1 ? 's' : ''}</span></div>
      {loading ? <div className="orders-loading">Loading your orders…</div> : orders.length ? (
        <div className="orders-list">
          {orders.map(order => (
            <button className="order-list-card" key={order.id} onClick={() => { openOrder(order); navigate(`/track/${order.order_number}`) }}>
              <div className="order-list-top"><div><span>ORDER PLACED</span><strong>{formatDate(order.created_at)}</strong></div><div><span>ORDER NUMBER</span><strong>{order.order_number}</strong></div><span className={`order-status status-${order.status}`}>{statusLabel(order.status)}</span><FiChevronRight /></div>
              <div className="order-list-bottom"><div><span>TOTAL</span><strong>{money(order.total)}</strong></div><div><span>DELIVERY TO</span><strong>{order.shipping_city}, {order.shipping_state}</strong></div><div><span>TRACKING</span><strong>{order.tracking_number || 'Not dispatched yet'}</strong></div><div className="order-view">View order <FiChevronRight /></div></div>
            </button>
          ))}
        </div>
      ) : (
        <section className="commerce-card orders-empty"><div className="orders-empty-icon"><FiPackage /></div><p className="commerce-eyebrow">NOTHING HERE YET</p><h2>Your first order is waiting.</h2><p className="commerce-muted">When you buy a phone, you'll be able to track it and revisit the details here.</p><button className="commerce-primary" onClick={() => navigate('/phones')}>Shop phones</button></section>
      )}
    </main>
  )
}
