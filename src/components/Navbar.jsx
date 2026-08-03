import { Link, NavLink } from "react-router-dom"
import navLogo from "../assets/logo/navLogo.PNG"
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import "./Navbar.css"
import App from "../App";


function Navbar({cartPopup, setCartPopup, cart, setCart, search, setSearch, searchInput, setSearchInput}) {

    const handleSearch = () => {
    setSearch(searchInput);
    };

    return(
        <>

            <nav className="nav">
                <div className="logo">
                   <Link to="/"> <img src= { navLogo } alt="nav logo" /> </Link>
                </div>
                <ul className="navLinks">
                    <NavLink className="navLinkText" to="/" >Home</NavLink>
                    <a href="#trends" className="navLinkText" >News</a>
                    <a href="#contact" className="navLinkText" >Contact</a>
                </ul>

                <ul className="navSearchCart">
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
            
                </ul>

            </nav>
        </>
    )
}

export default Navbar