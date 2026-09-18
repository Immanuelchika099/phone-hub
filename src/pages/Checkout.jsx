import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle, FiMapPin, FiShield, FiTruck } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Commerce.css'

export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const [form, setForm] = useState({ name: '', email: user?.email || '', phone: '', address: '', city: '', state: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (!user) return
    let stored = {}
    try { stored = JSON.parse(localStorage.getItem(`phonehub-profile-${user.id}`) || '{}') } catch {}
    setForm({
      name: profile?.full_name || user?.user_metadata?.full_name || '',
      email: profile?.email || user?.email || '',
      phone: profile?.phone ?? stored.phone ?? '',
      address: profile?.address ?? stored.address ?? '',
      city: profile?.city ?? stored.city ?? '',
      state: profile?.state ?? stored.state ?? ''
    })
  }, [user, profile])

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0), [cart])
  const shipping = 0
  const total = subtotal + shipping
  const change = (e) => setForm((v) => ({ ...v, [e.target.name]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (!supabase || !user) return setError('Please sign in before placing an order.')
    if (!cart.length) return setError('Your cart is empty.')
    setBusy(true)
    try {
      const items = cart.map((item) => ({
        legacy_product_id: String(item.id),
        product_id: String(item.id),
        title: item.title,
        price: Number(item.price),
        quantity: Number(item.quantity),
        thumbnail_url: item.thumbnail || item.thumbnail_url || ''
      }))
      const { data: order, error: orderError } = await supabase.rpc('create_order', {
        p_items: items,
        p_shipping_name: form.name,
        p_shipping_phone: form.phone,
        p_shipping_email: form.email,
        p_shipping_address: form.address,
        p_shipping_city: form.city,
        p_shipping_state: form.state
      })
      if (orderError) throw orderError
      if (!order?.order_number) throw new Error('The order was created but no order number was returned.')
      clearCart()
      navigate(`/track/${order.order_number}`, { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to place order.')
    } finally {
      setBusy(false)
    }
  }

  if (success) {
    return (
      <main className="commerce-page checkout-page">
        <section className="commerce-success checkout-success">
          <div className="success-icon"><FiCheckCircle /></div>
          <p className="commerce-eyebrow">ORDER CONFIRMED</p>
          <h1>Thanks for your order.</h1>
          <p>Your order <strong>{success.order_number}</strong> has been received and is now being prepared.</p>
          <div className="success-actions">
            <button onClick={() => navigate(`/track/${success.order_number}`)} className="commerce-primary"><FiTruck /> Track parcel</button>
            <button onClick={() => navigate('/')} className="commerce-secondary">Continue shopping</button>
          </div>
        </section>
      </main>
    )
  }

  if (!cart.length) {
    return (
      <main className="commerce-page checkout-page">
        <section className="checkout-empty commerce-card">
          <span className="empty-cart-icon"><FiTruck /></span>
          <p className="commerce-eyebrow">YOUR CART</p>
          <h1>Your cart is empty.</h1>
          <p className="commerce-muted">Add a phone to your cart and come back when you're ready to checkout.</p>
          <button className="commerce-primary" onClick={() => navigate('/phones')}>Browse phones</button>
        </section>
      </main>
    )
  }

  return (
    <main className="commerce-page checkout-page">
      <div className="checkout-top">
        <button className="commerce-back" onClick={() => navigate(-1)}><FiArrowLeft /> Back to cart</button>
        <div className="checkout-secure"><FiShield /> Secure checkout</div>
      </div>

      <header className="checkout-heading">
        <div>
          <p className="commerce-eyebrow">PHONE HUB CHECKOUT</p>
          <h1>Complete your order.</h1>
          <p>Fast delivery. Clear pricing. No surprises.</p>
        </div>
        <div className="checkout-steps">
          <span className="active"><b>1</b> Delivery</span>
          <i />
          <span><b>2</b> Confirmation</span>
        </div>
      </header>

      <div className="checkout-grid">
        <section className="checkout-main">
          <div className="commerce-card checkout-section">
            <div className="section-heading">
              <span className="section-number">01</span>
              <div><p className="commerce-eyebrow">DELIVERY</p><h2>Where should we deliver?</h2><p>Use the details you want attached to this order.</p></div>
            </div>
            {error && <div className="commerce-error">{error}</div>}
            <form onSubmit={submit} className="commerce-form checkout-form">
              <div className="form-two">
                <label>Full name<input name="name" value={form.name} onChange={change} placeholder="Your full name" required /></label>
                <label>Phone number<input name="phone" value={form.phone} onChange={change} placeholder="0803 123 4567" required /></label>
              </div>
              <label>Email address<input type="email" name="email" value={form.email} onChange={change} placeholder="you@example.com" required /></label>
              <label>Delivery address<textarea name="address" value={form.address} onChange={change} rows="3" placeholder="House number, street, area" required /></label>
              <div className="form-two">
                <label>City<input name="city" value={form.city} onChange={change} placeholder="Port Harcourt" required /></label>
                <label>State<input name="state" value={form.state} onChange={change} placeholder="Rivers" required /></label>
              </div>
              <button disabled={busy} className="commerce-primary checkout-submit" type="submit"><FiMapPin /> {busy ? 'Placing order…' : 'Place order'} <span>₦{total.toLocaleString()}</span></button>
            </form>
          </div>

          <div className="commerce-card checkout-reassurance">
            <div><FiTruck /><span><strong>Delivery</strong><small>Free delivery on this order</small></span></div>
            <div><FiShield /><span><strong>Secure</strong><small>Your order is tied to your account</small></span></div>
            <div><FiCheckCircle /><span><strong>Trackable</strong><small>Get an order number instantly</small></span></div>
          </div>
        </section>

        <aside className="commerce-card order-summary-card checkout-summary">
          <div className="summary-heading"><div><p className="commerce-eyebrow">ORDER SUMMARY</p><h2>{cart.reduce((n, i) => n + i.quantity, 0)} item{cart.reduce((n, i) => n + i.quantity, 0) !== 1 ? 's' : ''}</h2></div><button onClick={() => navigate('/')} type="button">Edit</button></div>
          <div className="checkout-items">
            {cart.map(item => (
              <div className="checkout-item" key={item.id}>
                <div className="checkout-image"><img src={item.thumbnail || item.thumbnail_url} alt="" /><span>{item.quantity}</span></div>
                <div><strong>{item.title}</strong><span>₦{Number(item.price).toLocaleString()} each</span></div>
                <b>₦{(Number(item.price) * item.quantity).toLocaleString()}</b>
              </div>
            ))}
          </div>
          <div className="summary-lines">
            <div><span>Subtotal</span><strong>₦{subtotal.toLocaleString()}</strong></div>
            <div><span>Delivery</span><strong className="free">Free</strong></div>
          </div>
          <div className="checkout-grand-total"><span>Total</span><strong>₦{total.toLocaleString()}</strong></div>
          <p className="summary-note"><FiShield /> You won't be charged until you place the order.</p>
        </aside>
      </div>
    </main>
  )
}
