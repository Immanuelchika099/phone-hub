import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PhoneDetails from './pages/PhoneDetails'
import PhoneProduct from './pages/PhoneProduct'
import Contact from './pages/Contact'
import Login from './pages/Login'
import SignupReal from './pages/SignupReal'
import ResetPassword from './pages/ResetPassword'
import Checkout from './pages/Checkout'
import TrackOrder from './pages/TrackOrder'
import AdminPortal from './pages/AdminPortal'
import Account from './pages/Account'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import CartPopup from './components/CartPopup'
import CookieConsent from './components/CookieConsent'
import FrankyGadgetIntro from './components/FrankyGadgetIntro'
import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'

function ProtectedCheckout({ cart, clearCart }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!loading && !user) navigate('/login?redirect=/checkout', { replace: true })
  }, [loading, user, navigate])
  if (loading || !user) return null
  return <Checkout cart={cart} clearCart={clearCart} />
}

function App() {
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [search, setSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [cartPopup, setCartPopup] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', darkMode)
    document.body.classList.toggle('dark-theme', darkMode)
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => {
    if (location.hash === '#categories') {
      setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    const savedCart = localStorage.getItem('frankygadget-cart')
    if (savedCart) try { setCart(JSON.parse(savedCart)) } catch {}
    const savedFavorites = localStorage.getItem('frankygadget-favorites')
    if (savedFavorites) try { setFavorites(JSON.parse(savedFavorites)) } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('frankygadget-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('frankygadget-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToCart = (phone) => {
    const existing = cart.find(i => i.id === phone.id)
    if (existing) setCart(cart.map(i => i.id === phone.id ? { ...i, quantity: i.quantity + 1 } : i))
    else setCart([...cart, { ...phone, quantity: 1 }])
  }

  const increaseQuantity = (id) => setCart(cart.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
  const decreaseQuantity = (id) => setCart(cart.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0))
  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id))
  const clearCart = () => setCart([])
  const toggleFavorite = (id) => setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])

  const totalCartItems = cart.reduce((total, item) => total + Number(item.quantity || 0), 0)
  const authPage = ['/login', '/signup', '/reset-password', '/account'].includes(location.pathname)
  const commercePage = location.pathname.startsWith('/checkout') || location.pathname.startsWith('/track') || location.pathname.startsWith('/admin')
  const shopChrome = !authPage && !commercePage

  return (
    <div className={darkMode ? 'darkMode' : ''}>
      <FrankyGadgetIntro />
      {shopChrome && (
        <Navbar
          cart={cart}
          cartPopup={cartPopup}
          setCartPopup={setCartPopup}
          search={search}
          setSearch={setSearch}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} search={search} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/favorites" element={<Favorites addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/phones" element={<PhoneDetails addToCart={addToCart} search={search} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/phones/:id" element={<PhoneProduct addToCart={addToCart} />} />
        <Route path="/login" element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/signup" element={<SignupReal darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<ProtectedCheckout cart={cart} clearCart={clearCart} />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/track/:number" element={<TrackOrder />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {cartPopup && shopChrome && (
        <CartPopup
          setCartPopup={setCartPopup}
          cart={cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      )}

      {shopChrome && (
        <>
          <BottomNav cartCount={totalCartItems} onCart={() => setCartPopup(true)} />
          <CookieConsent />
        </>
      )}
    </div>
  )
}

export default App
