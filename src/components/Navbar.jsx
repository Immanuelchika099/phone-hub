import { Link, NavLink } from "react-router-dom";
import navLogo from "../assets/logo/navLogo.PNG";
import { FiShoppingCart, FiMoon, FiSun } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { IoSearch, IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar({ cartPopup, setCartPopup, cart, search, setSearch, searchInput, setSearchInput, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const handleSearch = () => setSearch(searchInput);

  return (
    <>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
      <nav className={`nav ${scrolled ? "navScroll" : ""}`}>
        <div className="navTop">
          <div className="navLeft">
            <div className="menuIcon" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <IoClose className="ioclose" /> : <HiOutlineMenuAlt3 />}</div>
            <div className="logo"><Link to="/"><img src={navLogo} alt="PhoneHub logo" /></Link></div>
          </div>

          <div className={`navLinks ${menuOpen ? "activeMenu" : ""}`}>
            <NavLink className="navLinkText" to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <a href="#products" className="navLinkText" onClick={() => setMenuOpen(false)}>Products</a>
            <a href="#trends" className="navLinkText" onClick={() => setMenuOpen(false)}>Trends</a>
            <a href="#" className="navLinkText" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#contact" className="navLinkText" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>

          <div className="navActions">
            <IoSearch className="searchIcon" onClick={() => setSearchOpen(!searchOpen)} />
            <div className="cartContainer" onClick={() => setCartPopup(prev => !prev)}>
              <FiShoppingCart className="cartIcon" /><span className="cartCount">{cart.length}</span>
            </div>
            {darkMode ? <FiSun className="darkModeIcon" onClick={() => setDarkMode(!darkMode)} /> : <FiMoon className="darkModeIcon" onClick={() => setDarkMode(!darkMode)} />}
            <Link to="/login" aria-label="Account login"><LuUserRound className="darkModeIcon user" /></Link>
          </div>
        </div>

        <div className="navSearch">
          {searchOpen && <div className="search-container">
            <input className="searchInput" type="text" value={searchInput} onChange={(e) => { const value = e.target.value; setSearchInput(value); if (!value.trim()) setSearch(""); }} placeholder="Search phones, and categories..." onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
            <button className="search-icon" onClick={handleSearch}><IoSearch /></button>
          </div>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
