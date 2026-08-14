import { Link, NavLink } from "react-router-dom";
import navLogo from "../assets/logo/navLogo.PNG";
import { FiShoppingCart} from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
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
    const [searchOpen, setSearchOpen] = useState(false)

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
                        <IoSearch
                            className="searchIcon"
                            onClick={() => setSearchOpen (!searchOpen) }
                        />
                        <div
                            className="cartContainer"
                            onClick={() => {
                                setCartPopup(prev => !prev);
                            }}
                        >
                            <FiShoppingCart className="cartIcon" />

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

                    {
                        searchOpen && (
                            <div className="search-container">
                                <input
                                    className="searchInput"
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSearchInput(value);
                                        if (value.trim() === "") {
                                            setSearch("");
                                        }
                                    }}
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
                        )
                    }

                </div>

            </nav>
        </>
    );
}

export default Navbar;