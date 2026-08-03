import { Link, NavLink } from "react-router-dom"
import navLogo from "../assets/logo/navLogo.PNG"
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import "./Navbar.css"


function Navbar({cartPopup, setCartPopup, cart, setCart, search, setSearch, searchInput, setSearchInput}) {

    const handleSearch = () => {
    setSearch(searchInput);
    };
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <>
            {
                menuOpen && (
                    <div
                        className="overlay"
                        onClick={() => setMenuOpen(false)}
                    ></div>
                )
            }
            <nav className="nav">
                    
                <div className="logo">
                   <Link to="/"> <img src= { navLogo } alt="nav logo" /> </Link>
                </div>

                <div
                        className="menuIcon"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {
                            menuOpen
                            ? <IoClose />
                            : <HiOutlineMenuAlt3 />
                        }
                </div>

                <div className={`navLinks ${menuOpen ? "activeMenu" : ""}`} >
                    <NavLink className="navLinkText" to="/" onClick={() => setMenuOpen(false)} >Home</NavLink>
                    <a href="#trends" className="navLinkText" onClick={() => setMenuOpen(false)}>News</a>
                    <a href="#contact" className="navLinkText" onClick={() => setMenuOpen(false)}>Contact</a>
                </div>

                <div className="navSearchCart">
                    <div className="search-container">
                        <input className="searchInput"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search phones, and categories..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />
                        <button className="search-icon" onClick={handleSearch}>
                            <IoSearch  />
                        </button> 
                    </div>

                    
        
                        <div className="cartContainer"
                            onClick={(()=> { 
                            setCartPopup( prevCartPopup => !prevCartPopup)
                        })}
                        >
                            { <FaShoppingCart className="cartIcon" /> }
                            <span className="cartCount">
                                { cart.length }
                            </span>
                        </div>
            
                </div>

            </nav>
        </>
    )
}

export default Navbar