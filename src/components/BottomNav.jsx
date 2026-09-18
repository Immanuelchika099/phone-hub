import { NavLink } from "react-router-dom";
import { FiHome, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import "./BottomNav.css";

export default function BottomNav({ cartCount, onCart }) {
    return (
        <nav className="bottom-nav" aria-label="Mobile navigation">
            <NavLink to="/" end className={({ isActive }) => "bottom-nav-item" + (isActive ? " active" : "")}>
                <FiHome /><span>Home</span>
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => "bottom-nav-item" + (isActive ? " active" : "")}>
                <FiHeart /><span>Favorites</span>
            </NavLink>
            <button type="button" className="bottom-nav-item bottom-cart-button" onClick={onCart} aria-label="Open cart">
                <span className="bottom-cart-icon">
                    <FiShoppingCart />
                    {cartCount > 0 && <b>{cartCount > 99 ? "99+" : cartCount}</b>}
                </span>
                <span>Cart</span>
            </button>
            <NavLink to="/account" className={({ isActive }) => "bottom-nav-item" + (isActive ? " active" : "")}>
                <FiUser /><span>Profile</span>
            </NavLink>
        </nav>
    );
}
