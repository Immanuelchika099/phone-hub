import { NavLink } from "react-router-dom";
import { FiHome, FiHeart, FiShoppingBag, FiUser } from "react-icons/fi";
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
            <NavLink to="/checkout" className={({ isActive }) => "bottom-nav-item cart-bottom" + (isActive ? " active" : "")}>
                <span className="bottom-cart-icon"><FiShoppingBag />{cartCount > 0 && <b>{cartCount > 99 ? "99+" : cartCount}</b>}</span><span>Cart</span>
            </NavLink>
            <NavLink to="/account" className={({ isActive }) => "bottom-nav-item" + (isActive ? " active" : "")}>
                <FiUser /><span>Profile</span>
            </NavLink>
        </nav>
    );
}
