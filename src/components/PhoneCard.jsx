import "./PhoneCard.css"
import { motion } from "framer-motion"
import { FaStar } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function PhoneCard({ phone, addToCart, featured = false }) {
    const navigate = useNavigate()
    const rating = Number(String(phone.rating).replace(/[^0-9.]/g, ""))

    return(
        <motion.div
            className={`phoneCard${featured ? " featured-card" : ""}`}
            onClick={() => navigate(`/phones/${phone.id}`)}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    navigate(`/phones/${phone.id}`)
                }
            }}
        >
            <div className="phoneImgFlex">
                <img src={phone.thumbnail} alt={phone.title} />
                {featured && (
                    <div className="featured-details">
                        <div className="featured-rating">
                            <span>{rating.toFixed(1)}</span>
                            <span className="featured-stars">★★★★★</span>
                        </div>
                        <div className="featured-meta">
                            <span>{phone.storage}</span>
                            <span>{phone.color}</span>
                        </div>
                        <strong>₦{Number(phone.price).toLocaleString()}</strong>
                    </div>
                )}
            </div>

            <div className="phoneCardFlex">
                <h3 className="phoneCard-title">{phone.title}</h3>
            </div>

            <div className="phoneCardFlex card-info-row">
                <div className="phoneCard-stars">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={i < Math.floor(rating) ? "filled" : "empty"}
                        />
                    ))}
                </div>
                <p className="phoneCard-price">₦{Number(phone.price).toLocaleString()}</p>
            </div>

            <div className="phoneCardFlex outline card-info-row">
                <p className="phoneCard-brand">{phone.brand}</p>
                <p className="phoneCard-storage">{phone.storage}</p>
            </div>

            <button
                className="btn buy"
                onClick={(e) => {
                    e.stopPropagation()
                    addToCart(phone)
                }}
            >
                Add to Cart
            </button>
        </motion.div>
    )
}

export default PhoneCard
