import { Routes, Route } from 'react-router-dom'
import PhoneCard from './components/PhoneCard'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PhoneDetails from './pages/PhoneDetails'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import CartPopup from './components/CartPopup'
import { useState } from 'react'


function App() {
  
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState("")
  const [searchInput, setSearchInput] = useState("");
  const [cartPopup, setCartPopup] = useState(false)
  const [darkMode, setDarkMode] = useState(false)


const addToCart = (phone) => {
    const existingItem = cart.find((item) => item.id === phone.id);
    if (existingItem) {

        setCart(
            cart.map((item) =>
                item.id === phone.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );

    } else {

        setCart([
            ...cart,
            {
                ...phone,
                quantity: 1,
            },
        ]);

    }

};
const increaseQuantity = (id) => {

    setCart(
        cart.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    );

};
const decreaseQuantity = (id) => {

    setCart(
        cart
            .map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0)
    );

};
const removeFromCart = (id) => {

    setCart(
        cart.filter((item) => item.id !== id)
    );

};


  return (
    <div className= {darkMode ? "darkMode" : "" } >

      <Navbar
        cart={cart}
        cartPopup = {cartPopup}
        setCartPopup = {setCartPopup}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        search={search}
        setSearch={setSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        darkMode= { darkMode }
        setDarkMode = { setDarkMode }
      />
        <Routes>
          <Route path = "/" element = { <Home addToCart={addToCart} search={search}  /> } />
          <Route path = "/contact" element = { <Contact /> } />
          <Route path = "/phones" element = { <PhoneDetails addToCart={addToCart} search={search} /> } />
        </Routes>
        { cartPopup && <CartPopup
              setCartPopup = {setCartPopup}
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
              /> }
        
    </div>
  )
}

export default App
