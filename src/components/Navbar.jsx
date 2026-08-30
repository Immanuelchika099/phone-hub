import { Link, NavLink } from "react-router-dom";
import navLogo from "../assets/logo/navLogo.PNG";
import { FiShoppingCart, FiMoon, FiSun, FiChevronDown, FiChevronRight, FiPhone } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { IoSearch, IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar({ cartPopup, setCartPopup, cart, search, setSearch, searchInput, setSearchInput, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const handleSearch = () => setSearch(searchInput);
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenCategory(null);
  };

  return (
    <>
      <div className="announcementBar">New arrivals are here <span>·</span> Shop iPhone & Android <span>→</span></div>
      {menuOpen && <div className="overlay" onClick={closeMenu} />}
      <nav className={`nav ${scrolled ? "navScroll" : ""}`}>
        <div className="navTop">
          <div className="navLeft">
            <div className="menuIcon" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <IoClose className="ioclose" /> : <HiOutlineMenuAlt3 />}</div>
            <div className="logo"><Link to="/"><img src={navLogo} alt="PhoneHub logo" /></Link></div>
          </div>

          <div className={`navLinks ${menuOpen ? "activeMenu" : ""}`}>
            <NavLink className="navLinkText" to="/" onClick={closeMenu}>Home</NavLink>

            <div className={`mobileCategory ${openCategory === "iphone" ? "categoryOpen" : ""}`}>
              <button className="categoryTrigger" onClick={() => setOpenCategory(openCategory === "iphone" ? null : "iphone")}>iPhone <FiChevronDown /></button>
              {openCategory === "iphone" && <div className="categorySubmenu">
                <Link to="/phones?category=iPhone" onClick={closeMenu}>Shop iPhone</Link>
                <Link to="/phones?category=iPhone 17" onClick={closeMenu}>iPhone 17 Series</Link>
                <Link to="/phones?category=iPhone 16" onClick={closeMenu}>iPhone 16 Series</Link>
                <Link to="/phones?category=iPhone 15" onClick={closeMenu}>iPhone 15 Series</Link>
                <Link className="categoryViewAll" to="/phones?category=iPhone" onClick={closeMenu}>View all iPhone <FiChevronRight /></Link>
              </div>}
            </div>

            <div className={`mobileCategory ${openCategory === "android" ? "categoryOpen" : ""}`}>
              <button className="categoryTrigger" onClick={() => setOpenCategory(openCategory === "android" ? null : "android")}>Android <FiChevronDown /></button>
              {openCategory === "android" && <div className="categorySubmenu">
                <Link to="/phones?category=Android" onClick={closeMenu}>Shop Android</Link>
                <Link to="/phones?category=Samsung" onClick={closeMenu}>Samsung</Link>
                <Link to="/phones?category=Google Pixel" onClick={closeMenu}>Google Pixel</Link>
                <Link to="/phones?category=OnePlus" onClick={closeMenu}>OnePlus</Link>
                <Link className="categoryViewAll" to="/phones?category=Android" onClick={closeMenu}>View all Android <FiChevronRight /></Link>
              </div>}
            </div>

            <a href="#products" className="navLinkText desktopOnlyNav" onClick={closeMenu}>Products</a>
            <a href="#trends" className="navLinkText desktopOnlyNav" onClick={closeMenu}>Trends</a>
            <a href="#" className="navLinkText desktopOnlyNav" onClick={closeMenu}>About</a>
            <a href="#contact" className="navLinkText desktopOnlyNav" onClick={closeMenu}>Contact</a>
            <Link className="mobileMenuLink" to="/phones" onClick={closeMenu}>All Products <FiChevronRight /></Link>
            <a className="mobileMenuLink" href="#trends" onClick={closeMenu}>Latest News <FiChevronRight /></a>
            <a className="mobileMenuLink" href="#contact" onClick={closeMenu}>Contact <FiChevronRight /></a>

            <div className="mobileMenuContact">
              <span>Need help?</span>
              <a href="tel:07040860338"><FiPhone /> Contact us on <strong>0704 086 0338</strong></a>
            </div>
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
