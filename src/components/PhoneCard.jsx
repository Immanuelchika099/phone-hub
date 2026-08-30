import "./PhoneCard.css"
import { motion } from "framer-motion"
import { FaStar } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function PhoneCard({ phone, addToCart }) {
    const navigate = useNavigate()

    return(
        <motion.div
            className="phoneCard"
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
            </div>

            <div className="phoneCardFlex">
                <h3 className="phoneCard-title">{phone.title}</h3>
            </div>

            <div className="phoneCardFlex">
                <div className="phoneCard-stars">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={i < Math.floor(phone.rating) ? "filled" : "empty"}
                        />
                    ))}
                </div>
                <p className="phoneCard-price">₦{Number(phone.price).toLocaleString()}</p>
            </div>

            <div className="phoneCardFlex outline">
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
