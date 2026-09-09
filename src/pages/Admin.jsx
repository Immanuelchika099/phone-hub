import { useMemo, useState } from 'react'
import { FiBox, FiShoppingBag, FiUsers, FiDollarSign, FiPlus, FiSearch, FiMoreHorizontal, FiTrendingUp, FiAlertCircle, FiX } from 'react-icons/fi'
import products from '../data/products'
import './Admin.css'

const orders = [
  { id: '#PH-1048', customer: 'Daniel Okafor', items: 2, total: 2150000, status: 'Processing', date: 'Today, 10:42 AM' },
  { id: '#PH-1047', customer: 'Sarah Williams', items: 1, total: 1250000, status: 'Delivered', date: 'Today, 9:18 AM' },
  { id: '#PH-1046', customer: 'Emeka Nwosu', items: 1, total: 650000, status: 'Pending', date: 'Yesterday, 6:31 PM' },
  { id: '#PH-1045', customer: 'Tolu Adeyemi', items: 3, total: 3100000, status: 'Delivered', date: 'Yesterday, 3:12 PM' },
  { id: '#PH-1044', customer: 'Maya Johnson', items: 1, total: 1400000, status: 'Cancelled', date: 'Yesterday, 11:07 AM' },
]

const stock = products.map((product, index) => ({ ...product, stock: [4, 18, 7, 3, 2, 12, 9, 5, 4, 15][index % 10] }))

const money = (value) => `₦${new Intl.NumberFormat('en-NG').format(value)}`

function Admin() {
  const [active, setActive] = useState('Overview')
  const [query, setQuery] = useState('')
  const [showProductForm, setShowProductForm] = useState(false)
  const [productsList, setProductsList] = useState(stock)
  const [product, setProduct] = useState({ name: '', brand: 'Apple', price: '', stock: '', storage: '128GB' })

  const filteredProducts = useMemo(() => productsList.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.brand.toLowerCase().includes(query.toLowerCase())), [productsList, query])
  const lowStock = productsList.filter((item) => item.stock <= 4)

  const addProduct = (event) => {
    event.preventDefault()
    if (!product.name || !product.price || !product.stock) return
    setProductsList((current) => [{ id: Date.now(), title: product.name, brand: product.brand, price: Number(product.price), stock: Number(product.stock), storage: product.storage, thumbnail: null }, ...current])
    setProduct({ name: '', brand: 'Apple', price: '', stock: '', storage: '128GB' })
    setShowProductForm(false)
  }

  const nav = [
    { label: 'Overview', icon: <FiTrendingUp /> },
    { label: 'Products', icon: <FiBox /> },
    { label: 'Orders', icon: <FiShoppingBag /> },
    { label: 'Customers', icon: <FiUsers /> },
  ]

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span className="admin-brand-mark">P</span><div><strong>Phone Hub</strong><small>Admin Portal</small></div></div>
        <nav className="admin-nav">
          {nav.map((item) => <button key={item.label} className={active === item.label ? 'active' : ''} onClick={() => setActive(item.label)}>{item.icon}<span>{item.label}</span></button>)}
        </nav>
        <div className="admin-sidebar-footer"><span className="admin-avatar">I</span><div><strong>Administrator</strong><small>Store manager</small></div></div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div><p className="admin-eyebrow">PHONE HUB / ADMIN</p><h1>{active}</h1></div>
          <div className="admin-header-actions"><div className="admin-search"><FiSearch /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." /></div><button className="admin-user">I</button></div>
        </header>

        {active === 'Overview' && <>
          <section className="admin-stats">
            <div className="stat-card"><div className="stat-icon"><FiDollarSign /></div><span>Revenue</span><strong>₦8.42m</strong><small className="positive">+12.8% this month</small></div>
            <div className="stat-card"><div className="stat-icon"><FiShoppingBag /></div><span>Orders</span><strong>184</strong><small className="positive">+8.4% this month</small></div>
            <div className="stat-card"><div className="stat-icon"><FiUsers /></div><span>Customers</span><strong>1,248</strong><small className="positive">+16.2% this month</small></div>
            <div className="stat-card"><div className="stat-icon"><FiBox /></div><span>Products</span><strong>{productsList.length}</strong><small>{lowStock.length} need attention</small></div>
          </section>

          <section className="admin-grid">
            <div className="admin-panel chart-panel"><div className="panel-heading"><div><h2>Sales overview</h2><p>Revenue performance over the last 7 days</p></div><select><option>Last 7 days</option><option>Last 30 days</option></select></div><div className="fake-chart"><div className="chart-line"><span style={{ height: '38%' }} /><span style={{ height: '52%' }} /><span style={{ height: '45%' }} /><span style={{ height: '70%' }} /><span style={{ height: '58%' }} /><span style={{ height: '82%' }} /><span style={{ height: '92%' }} /></div><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></div>
            <div className="admin-panel"><div className="panel-heading"><div><h2>Low stock</h2><p>Products that need restocking</p></div><button className="text-button" onClick={() => setActive('Products')}>View all</button></div><div className="stock-list">{lowStock.slice(0, 5).map((item) => <div className="stock-row" key={item.id}><div className="stock-image">{item.thumbnail ? <img src={item.thumbnail} alt="" /> : <FiBox />}</div><div><strong>{item.title}</strong><small>{item.brand} · {item.storage}</small></div><b className="low-stock">{item.stock} left</b></div>)}</div></div>
          </section>
          <section className="admin-panel orders-panel"><div className="panel-heading"><div><h2>Recent orders</h2><p>Latest activity from your store</p></div><button className="text-button" onClick={() => setActive('Orders')}>View all</button></div><OrderTable rows={orders.slice(0, 4)} /></section>
        </>}

        {active === 'Products' && <section className="admin-panel full-panel"><div className="panel-heading"><div><h2>Products</h2><p>Manage your phone catalogue and stock.</p></div><button className="primary-button" onClick={() => setShowProductForm(true)}><FiPlus /> Add product</button></div><div className="product-table">{filteredProducts.map((item) => <div className="product-row" key={item.id}><div className="product-cell product-main"><div className="product-thumb">{item.thumbnail ? <img src={item.thumbnail} alt="" /> : <FiBox />}</div><div><strong>{item.title}</strong><small>{item.brand} · {item.storage}</small></div></div><span>{money(item.price)}</span><span className={item.stock <= 4 ? 'low-stock' : 'in-stock'}>{item.stock} in stock</span><button className="more-button"><FiMoreHorizontal /></button></div>)}</div></section>}

        {active === 'Orders' && <section className="admin-panel full-panel"><div className="panel-heading"><div><h2>Orders</h2><p>Track and manage customer orders.</p></div></div><OrderTable rows={orders} /></section>}

        {active === 'Customers' && <section className="admin-panel full-panel"><div className="panel-heading"><div><h2>Customers</h2><p>Customers who have interacted with Phone Hub.</p></div></div><div className="customer-grid">{['Daniel Okafor','Sarah Williams','Emeka Nwosu','Tolu Adeyemi','Maya Johnson','Chisom Eze'].map((name, index) => <div className="customer-card" key={name}><span className="customer-avatar">{name[0]}</span><div><strong>{name}</strong><small>{index + 2} orders · {money((index + 1) * 450000)}</small></div><FiMoreHorizontal /></div>)}</div></section>}
      </main>

      {showProductForm && <div className="admin-modal-backdrop" onClick={() => setShowProductForm(false)}><form className="admin-modal" onSubmit={addProduct} onClick={(e) => e.stopPropagation()}><button type="button" className="modal-close" onClick={() => setShowProductForm(false)}><FiX /></button><p className="admin-eyebrow">CATALOGUE</p><h2>Add product</h2><p className="modal-copy">Add a phone to the admin catalogue. Supabase will replace this local state when the database is connected.</p><label>Product name<input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} placeholder="e.g. iPhone 17 Pro" /></label><div className="form-grid"><label>Brand<select value={product.brand} onChange={(e) => setProduct({ ...product, brand: e.target.value })}><option>Apple</option><option>Samsung</option><option>Google</option><option>OnePlus</option><option>Xiaomi</option><option>Nothing</option><option>OPPO</option></select></label><label>Storage<select value={product.storage} onChange={(e) => setProduct({ ...product, storage: e.target.value })}><option>64GB</option><option>128GB</option><option>256GB</option><option>512GB</option><option>1TB</option></select></label></div><div className="form-grid"><label>Price<input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} placeholder="1500000" /></label><label>Stock<input type="number" value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} placeholder="10" /></label></div><button className="primary-button submit-button"><FiPlus /> Add product</button></form></div>}
    </div>
  )
}

function OrderTable({ rows }) {
  return <div className="order-table"><div className="order-head"><span>Order</span><span>Customer</span><span>Items</span><span>Total</span><span>Status</span><span>Date</span></div>{rows.map((order) => <div className="order-row" key={order.id}><strong>{order.id}</strong><span>{order.customer}</span><span>{order.items}</span><span>{money(order.total)}</span><span><em className={`status ${order.status.toLowerCase()}`}>{order.status}</em></span><small>{order.date}</small></div>)}</div>
}

export default Admin
