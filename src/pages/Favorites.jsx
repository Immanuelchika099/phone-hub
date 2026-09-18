import { Link } from "react-router-dom";
import products from "../data/products";
import PhoneCard from "../components/PhoneCard";
import Footer from "../components/Footer";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import "./Favorites.css";

export default function Favorites({ addToCart, favorites, toggleFavorite }) {
    const saved = products.filter(phone => favorites.includes(phone.id));

    return (
        <main className="favorites-page">
            <section className="favorites-head">
                <div>
                    <span>YOUR SAVED DEVICES</span>
                    <h1>Favorites.</h1>
                    <p>Keep the phones you're considering in one place.</p>
                </div>
                <Link to="/phones"><FiShoppingBag /> Continue shopping</Link>
            </section>

            {saved.length ? (
                <section className="favorites-grid">
                    {saved.map(phone => (
                        <PhoneCard key={phone.id} phone={phone} addToCart={addToCart} isFavorite toggleFavorite={toggleFavorite} />
                    ))}
                </section>
            ) : (
                <section className="favorites-empty">
                    <div><FiHeart /></div>
                    <h2>No favorites yet.</h2>
                    <p>Tap the heart on any phone to save it here for later.</p>
                    <Link to="/phones">Browse phones</Link>
                </section>
            )}
            <Footer />
        </main>
    );
}
