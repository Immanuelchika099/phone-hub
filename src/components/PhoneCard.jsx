import "./PhoneCard.css";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function PhoneCard({ phone, addToCart, featured = false, isFavorite = false, toggleFavorite }) {
    const navigate = useNavigate();
    const rating = Number(String(phone.rating).replace(/[^0-9.]/g, "")) || 0;

    return (
        <motion.article className={"phoneCard" + (featured ? " featured-card" : "")} whileHover={{ y: -4 }} transition={{ duration: .2 }} onClick={() => navigate("/phones/" + phone.id)} role="link" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate("/phones/" + phone.id); } }}>
            <div className="phone-card-image">
                <div className="phone-discount">New</div>
                <button
                    className={"phone-wishlist" + (isFavorite ? " active" : "")}
                    type="button"
                    aria-label={isFavorite ? "Remove " + phone.title + " from favorites" : "Save " + phone.title}
                    aria-pressed={isFavorite}
                    onClick={(e) => { e.stopPropagation(); toggleFavorite?.(phone.id); }}
                >
                    <FiHeart />
                </button>
                <img src={phone.thumbnail} alt={phone.title} loading="lazy" />
            </div>
            <div className="phone-card-body">
                <span className="phone-card-brand">{phone.brand}</span>
                <h3>{phone.title}</h3>
                <div className="phone-rating"><span className="stars">{[...Array(5)].map((_, i) => <FaStar key={i} className={i < Math.floor(rating) ? "filled" : "empty"} />)}</span><span>{rating.toFixed(1)}</span></div>
                <div className="phone-card-specs"><span>{phone.storage}</span><span>{phone.color}</span></div>
                <div className="phone-card-buy"><div><strong>₦{Number(phone.price).toLocaleString()}</strong><small>In stock</small></div><button type="button" aria-label={"Add " + phone.title + " to cart"} onClick={(e) => { e.stopPropagation(); addToCart(phone); }}><IoAdd /></button></div>
            </div>
        </motion.article>
    );
}
export default PhoneCard;
