import "./PhoneCard.css"
import { motion } from "framer-motion"
import { FaStar } from "react-icons/fa"

function PhoneCard({ phone, addToCart, onClick }) {

    return(
        <>
             <div className="phoneCard" onClick={() => onClick?.(phone)}>
                <div className="phoneImgFlex">
                    <img
                        src={phone.thumbnail}
                        alt={phone.title}
                    />
                </div>
                
                <div className="phoneCardFlex">
                    <h3 className="phoneCard-title">{phone.title}</h3>
                    
                </div>
                <div className="phoneCardFlex">
                    <div className="phoneCard-stars">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(phone.rating) ? "filled" : "empty"} />
                        ))}
                    </div>
                    <p className="phoneCard-price">₦{phone.price.toLocaleString() }</p>
                </div>
                <div className="phoneCardFlex outline">
                    <p className="phoneCard-brand"> {phone.brand}</p>
                    <p className="phoneCard-storage">{phone.storage}</p>
                </div>
                <button className="btn buy"
                    onClick={(e) => { e.stopPropagation(); addToCart(phone); }}
                >
                    Add to Cart
                </button>
             </div>  
        </>
    )
}

export default PhoneCard