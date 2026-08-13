import { Link, NavLink } from "react-router-dom";
import navLogo from "../assets/logo/navLogo.PNG";
import { FaShoppingCart, FaMoon } from "react-icons/fa";
import { IoSearch, IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import "./Navbar.css";

function Navbar({
    cartPopup,
    setCartPopup,
    cart,
    search,
    setSearch,
    searchInput,
    setSearchInput,
    darkMode,
    setDarkMode
}) {

    const [menuOpen, setMenuOpen] = useState(false);

    const handleSearch = () => {
        setSearch(searchInput);
    };

    return (
        <>
            {menuOpen && (
                <div
                    className="overlay"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            <nav className="nav">

                {/* TOP ROW */}
                <div className="navTop">

                    {/* LEFT SIDE - MENU + LOGO */}
                    <div className="navLeft">

                        <div
                            className="menuIcon"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen
                                ? <IoClose />
                                : <HiOutlineMenuAlt3 />
                            }
                        </div>

                        <div className="logo">
                            <Link to="/">
                                <img src={navLogo} alt="nav logo" />
                            </Link>
                        </div>

                    </div>


                    {/* DESKTOP LINKS */}
                    <div className={`navLinks ${menuOpen ? "activeMenu" : ""}`}>
                        <NavLink
                            className="navLinkText"
                            to="/"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </NavLink>

                        <a
                            href="#trends"
                            className="navLinkText"
                            onClick={() => setMenuOpen(false)}
                        >
                            News
                        </a>

                        <a
                            href="#contact"
                            className="navLinkText"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </a>
                    </div>


                    {/* RIGHT SIDE - CART + DARK MODE */}
                    <div className="navActions">

                        <div
                            className="cartContainer"
                            onClick={() => {
                                setCartPopup(prev => !prev);
                            }}
                        >
                            <FaShoppingCart className="cartIcon" />

                            <span className="cartCount">
                                {cart.length}
                            </span>
                        </div>

                        <FaMoon
                            className="darkModeIcon"
                            onClick={() => {
                                setDarkMode(!darkMode);
                            }}
                        />

                    </div>

                </div>


                {/* SEARCH ROW */}
                <div className="navSearch">

                    <div className="search-container">

                        <input
                            className="searchInput"
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search phones, and categories..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />

                        <button
                            className="search-icon"
                            onClick={handleSearch}
                        >
                            <IoSearch />
                        </button>

                    </div>

                </div>

            </nav>
        </>
    );
}

export default Navbar;