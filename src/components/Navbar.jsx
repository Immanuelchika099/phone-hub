import { Link } from "react-router-dom";
import navLogo from "../assets/logo/navLogo.PNG";
import { FiShoppingCart, FiMoon, FiSun, FiChevronDown, FiChevronRight, FiPhone, FiUser, FiPackage } from "react-icons/fi";
import { IoSearch, IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar({ cartPopup, setCartPopup, cart, searchInput, setSearchInput, setSearch, darkMode, setDarkMode }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, profile } = useAuth();
    const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email || "Account";
    const firstName = displayName.includes("@") ? "Account" : displayName.split(" ")[0];
    const userInitial = displayName.trim().charAt(0).toUpperCase() || "U";
    const handleSearch = () => setSearch(searchInput.trim());
    const closeMenu = () => setMenuOpen(false);

    return <>
        <div className="announcementBar"><span>Free delivery updates</span><b>·</b><span>Shop the latest iPhone & Android devices</span><b>·</b><span>Track your order anytime</span></div>
        {menuOpen && <div className="overlay" onClick={closeMenu} aria-hidden="true" />}
        <header className="nav">
            <div className="nav-main">
                <Link to="/" className="logo" onClick={closeMenu} aria-label="Franky Gadget home"><img src={navLogo} alt="Franky Gadget" /></Link>

                <div className="desktop-search">
                    <IoSearch />
                    <input value={searchInput} onChange={(e) => { setSearchInput(e.target.value); if (!e.target.value.trim()) setSearch("") }} onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Search phones, brands, models..." aria-label="Search phones" />
                    {searchInput && <button type="button" onClick={() => { setSearchInput(""); setSearch("") }} aria-label="Clear search"><IoClose /></button>}
                </div>

                <button className="mobile-search-button" type="button" aria-label="Search phones" onClick={() => document.querySelector(".mobile-search-panel")?.classList.toggle("open")}><IoSearch /></button>

                <div className="nav-actions">
                    <Link to={user ? "/account" : "/login"} className="account-action" aria-label={user ? "Open account for " + displayName : "Sign in or create an account"}>
                        <span className="account-icon">{user ? userInitial : <FiUser />}</span>
                        <span className="account-copy"><small>{user ? "Hello" : "Welcome"}</small><strong>{user ? firstName : "Sign in"}</strong></span>
                    </Link>
                    <Link to={user ? "/track" : "/login"} className="orders-action"><FiPackage /><span><small>Track</small><strong>Orders</strong></span></Link>
                    <button type="button" className="cart-action" onClick={() => setCartPopup(prev => !prev)} aria-label="Open cart">
                        <span className="cart-icon-wrap"><FiShoppingCart /><b>{cart.length}</b></span>
                        <span className="cart-copy"><small>Cart</small><strong>₦</strong></span>
                    </button>
                    <button type="button" className="menuIcon" onClick={() => setMenuOpen(prev => !prev)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <IoClose /> : <HiOutlineMenuAlt3 />}</button>
                </div>
            </div>

            <div className="mobile-search-panel">
                <IoSearch />
                <input value={searchInput} onChange={(e) => { setSearchInput(e.target.value); if (!e.target.value.trim()) setSearch("") }} onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Search phones, brands, models..." aria-label="Search phones" />
                {searchInput && <button type="button" onClick={() => { setSearchInput(""); setSearch("") }} aria-label="Clear search"><IoClose /></button>}
            </div>

            <div className="nav-secondary">
                <Link to="/phones" className="nav-category-button"><span>☰</span> Categories <FiChevronDown /></Link>
                <Link to="/phones">All Phones</Link>
                <Link to="/phones?category=iPhone">iPhone</Link>
                <Link to="/phones?category=Samsung">Samsung</Link>
                <Link to="/phones?category=Android">Android</Link>
                <Link to="/phones?category=Google">Google Pixel</Link>
                <Link to="/phones?category=Xiaomi">Xiaomi</Link>
                <Link to="/phones?deals=true">Deals</Link>
                <Link to="/contact">Contact</Link>
            </div>

            <div className={"nav-mobile-menu " + (menuOpen ? "open" : "")}>
                <div className="mobile-menu-top"><span>SHOP</span><button onClick={closeMenu} aria-label="Close menu"><IoClose /></button></div>
                <Link to="/phones" onClick={closeMenu}>All Phones <FiChevronRight /></Link>
                <Link to="/phones?category=iPhone" onClick={closeMenu}>iPhone <FiChevronRight /></Link>
                <Link to="/phones?category=Samsung" onClick={closeMenu}>Samsung <FiChevronRight /></Link>
                <Link to="/phones?category=Android" onClick={closeMenu}>Android <FiChevronRight /></Link>
                <Link to="/phones?category=Google" onClick={closeMenu}>Google Pixel <FiChevronRight /></Link>
                <Link to="/phones?category=Xiaomi" onClick={closeMenu}>Xiaomi <FiChevronRight /></Link>
                <Link to="/phones?deals=true" onClick={closeMenu}>Deals <FiChevronRight /></Link>
                <Link to="/contact" onClick={closeMenu}>Contact <FiChevronRight /></Link>
                <div className="mobile-appearance"><span>Appearance</span><div><button className={!darkMode ? "active" : ""} onClick={() => setDarkMode(false)}><FiSun /> Light</button><button className={darkMode ? "active" : ""} onClick={() => setDarkMode(true)}><FiMoon /> Dark</button></div></div>
                <a className="mobile-help" href="tel:07040860338"><FiPhone /> Need help? <strong>0704 086 0338</strong></a>
            </div>
        </header>
    </>;
}
export default Navbar;
