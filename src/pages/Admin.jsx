import { useEffect, useState } from 'react'
import { FiBox, FiCheck, FiEdit2, FiPackage, FiPlus, FiSave, FiTrash2, FiTruck, FiUsers } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Commerce.css'

const emptyProduct = { title:'', brand:'', price:'', stock:'', thumbnail_url:'', storage:'', color:'', description:'' }

export default function Admin() {
  const { isAdmin, loading } = useAuth()
  const [tab, setTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyProduct)
  const [message, setMessage] = useState('')

  const load = async () => {
    if (!supabase || !isAdmin) return
    const [{ data: orderRows }, { data: productRows }] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('*').order('created_at', { ascending: false }),
    ])
    setOrders(orderRows || [])
    setProducts(productRows || [])
  }
  useEffect(() => { load() }, [isAdmin])

  const updateOrder = async (order, patch) => {
    const { error } = await supabase.from('orders').update(patch).eq('id', order.id)
    if (error) return setMessage(error.message)
    if (patch.status) await supabase.from('tracking_events').insert({ order_id: order.id, status: patch.status.replaceAll('_',' '), note: `Order status changed to ${patch.status.replaceAll('_',' ')}.` })
    setMessage('Order updated.')
    load()
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) }
    const { error } = editing ? await supabase.from('products').update(payload).eq('id', editing) : await supabase.from('products').insert(payload)
    if (error) return setMessage(error.message)
    setMessage(editing ? 'Product updated.' : 'Product created.')
    setForm(emptyProduct); setEditing(null); load()
  }

  const editProduct = (p) => { setEditing(p.id); setForm({ title:p.title, brand:p.brand, price:p.price, stock:p.stock, thumbnail_url:p.thumbnail_url, storage:p.storage || '', color:p.color || '', description:p.description || '' }); setTab('products') }
  const deleteProduct = async (id) => { if (!confirm('Delete this product?')) return; await supabase.from('products').delete().eq('id', id); load() }

  if (loading) return <main className="commerce-page"><div className="commerce-card">Loading admin portal…</div></main>
  if (!isAdmin) return <main className="commerce-page"><section className="commerce-success"><FiUsers size={48}/><h1>Admin access required.</h1><p>Sign in with an account that has the <strong>admin</strong> role in Supabase.</p></section></main>

  return <main className="commerce-page admin-page">
    <div className="admin-head"><div><p className="commerce-eyebrow">PHONEHUB ADMIN</p><h1>Commerce control centre.</h1></div><div className="admin-stats"><span><FiBox/> {products.length} products</span><span><FiPackage/> {orders.length} orders</span></div></div>
    {message && <div className="commerce-success-inline">{message}</div>}
    <nav className="admin-tabs"><button className={tab==='orders'?'active':''} onClick={()=>setTab('orders')}>Orders</button><button className={tab==='products'?'active':''} onClick={()=>setTab('products')}>Products</button></nav>

    {tab === 'orders' && <section className="commerce-card admin-table-wrap"><div className="admin-table-head"><h2>Orders</h2><span>Update delivery status and tracking from here.</span></div><div className="admin-orders">{orders.map(order => <article className="admin-order" key={order.id}><div><strong>{order.order_number}</strong><p>{order.shipping_name} · ₦{Number(order.total).toLocaleString()}</p><small>{new Date(order.created_at).toLocaleString()}</small></div><div className="admin-order-controls"><select value={order.status} onChange={e=>updateOrder(order,{status:e.target.value})}><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="out_for_delivery">Out for delivery</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select><input defaultValue={order.tracking_number || ''} placeholder="Tracking no." onBlur={e=>{ if(e.target.value !== (order.tracking_number||'')) updateOrder(order,{tracking_number:e.target.value || null}) }}/><input defaultValue={order.courier || ''} placeholder="Courier" onBlur={e=>{ if(e.target.value !== (order.courier||'')) updateOrder(order,{courier:e.target.value || null}) }}/></div></article>)}</div></section>}

    {tab === 'products' && <div className="admin-products-grid"><section className="commerce-card"><div className="admin-table-head"><h2>{editing ? 'Edit product' : 'Add product'}</h2><span>Products here can become your database-backed catalogue.</span></div><form className="commerce-form" onSubmit={saveProduct}>{['title','brand','price','stock','thumbnail_url','storage','color'].map(name=><label key={name}>{name.replace('_',' ')}<input required={['title','brand','price','stock','thumbnail_url'].includes(name)} type={['price','stock'].includes(name)?'number':'text'} value={form[name]} onChange={e=>setForm({...form,[name]:e.target.value})}/></label>)}<label>Description<textarea rows="3" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label><div className="success-actions"><button className="commerce-primary"><FiSave/> {editing?'Save changes':'Create product'}</button>{editing&&<button type="button" className="commerce-secondary" onClick={()=>{setEditing(null);setForm(emptyProduct)}}>Cancel</button>}</div></form></section><section className="commerce-card"><div className="admin-table-head"><h2>Catalogue</h2><span>{products.length} database products</span></div><div className="product-admin-list">{products.map(p=><div className="product-admin-row" key={p.id}><img src={p.thumbnail_url} alt=""/><div><strong>{p.title}</strong><span>₦{Number(p.price).toLocaleString()} · {p.stock} in stock</span></div><button onClick={()=>editProduct(p)}><FiEdit2/></button><button onClick={()=>deleteProduct(p.id)}><FiTrash2/></button></div>)}</div></section></div>}
  </main>
}
