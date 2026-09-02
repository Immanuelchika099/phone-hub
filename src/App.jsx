import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PhoneDetails from './pages/PhoneDetails'
import PhoneProduct from './pages/PhoneProduct'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import CartPopup from './components/CartPopup'
import CookieConsent from './components/CookieConsent'
import PhoneHubIntro from './components/PhoneHubIntro'
import { useState, useEffect } from 'react'

function App() {
  const [cart, setCart] = useState([])
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
    if (location.hash === "#categories") {
      setTimeout(() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
    } else {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [location.pathname, location.search, location.hash])

  const addToCart = (phone) => {
    const existingItem = cart.find((item) => item.id === phone.id)
    if (existingItem) setCart(cart.map((item) => item.id === phone.id ? { ...item, quantity: item.quantity + 1 } : item))
    else setCart([...cart, { ...phone, quantity: 1 }])
  }

  const increaseQuantity = (id) => setCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
  const decreaseQuantity = (id) => setCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0))
  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id))

  const authPage = location.pathname === "/login" || location.pathname === "/signup"

  return (
    <div className={darkMode ? "darkMode" : ""}>
      <PhoneHubIntro />
      {!authPage && <Navbar cart={cart} cartPopup={cartPopup} setCartPopup={setCartPopup} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} search={search} setSearch={setSearch} searchInput={searchInput} setSearchInput={setSearchInput} darkMode={darkMode} setDarkMode={setDarkMode} />}
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} search={search} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/phones" element={<PhoneDetails addToCart={addToCart} search={search} />} />
        <Route path="/phones/:id" element={<PhoneProduct addToCart={addToCart} />} />
        <Route path="/login" element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/signup" element={<Signup darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {cartPopup && !authPage && <CartPopup setCartPopup={setCartPopup} cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} />}
      {!authPage && <CookieConsent />}
    </div>
  )
}

export default App
