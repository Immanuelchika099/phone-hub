import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle, FiMapPin, FiTruck } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Commerce.css'

export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [form, setForm] = useState({ name: user?.user_metadata?.full_name || '', email: user?.email || '', phone: '', address: '', city: '', state: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)

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
        thumbnail_url: item.thumbnail || item.thumbnail_url || '',
      }))

      const { data: order, error: orderError } = await supabase.rpc('create_order', {
        p_items: items,
        p_shipping_name: form.name,
        p_shipping_phone: form.phone,
        p_shipping_email: form.email,
        p_shipping_address: form.address,
        p_shipping_city: form.city,
        p_shipping_state: form.state,
      })

      if (orderError) throw orderError
      if (!order?.order_number) throw new Error('The order was created but no order number was returned.')

      clearCart()
      setSuccess(order)
    } catch (err) {
      setError(err.message || 'Unable to place order.')
    } finally {
      setBusy(false)
    }
  }

  if (success) return (
    <main className="commerce-page">
      <section className="commerce-success">
        <FiCheckCircle size={52} />
        <p className="commerce-eyebrow">ORDER CONFIRMED</p>
        <h1>Thanks for your order.</h1>
        <p>Your order <strong>{success.order_number}</strong> has been received.</p>
        <div className="success-actions">
          <button onClick={() => navigate(`/track/${success.order_number}`)} className="commerce-primary"><FiTruck /> Track parcel</button>
          <button onClick={() => navigate('/')} className="commerce-secondary">Continue shopping</button>
        </div>
      </section>
    </main>
  )

  return (
    <main className="commerce-page">
      <button className="commerce-back" onClick={() => navigate(-1)}><FiArrowLeft /> Back to cart</button>
      <div className="checkout-grid">
        <section className="commerce-card">
          <p className="commerce-eyebrow">CHECKOUT</p>
          <h1>Delivery details</h1>
          <p className="commerce-muted">We'll use these details to deliver your device.</p>
          {error && <div className="commerce-error">{error}</div>}
          <form onSubmit={submit} className="commerce-form">
            <label>Full name<input name="name" value={form.name} onChange={change} required /></label>
            <label>Email<input type="email" name="email" value={form.email} onChange={change} required /></label>
            <label>Phone number<input name="phone" value={form.phone} onChange={change} required /></label>
            <label>Delivery address<textarea name="address" value={form.address} onChange={change} rows="3" required /></label>
            <div className="form-two"><label>City<input name="city" value={form.city} onChange={change} required /></label><label>State<input name="state" value={form.state} onChange={change} required /></label></div>
            <button disabled={busy || !cart.length} className="commerce-primary" type="submit"><FiMapPin /> {busy ? 'Placing order…' : 'Place order'}</button>
          </form>
        </section>
        <aside className="commerce-card order-summary-card">
          <p className="commerce-eyebrow">YOUR ORDER</p>
          {cart.map(item => <div className="checkout-item" key={item.id}><img src={item.thumbnail} alt="" /><div><strong>{item.title}</strong><span>{item.quantity} × ₦{Number(item.price).toLocaleString()}</span></div></div>)}
          <div className="checkout-total"><span>Subtotal</span><strong>₦{subtotal.toLocaleString()}</strong></div>
          <div className="checkout-total"><span>Delivery</span><strong>Free</strong></div>
          <div className="checkout-total total"><span>Total</span><strong>₦{total.toLocaleString()}</strong></div>
        </aside>
      </div>
    </main>
  )
}
