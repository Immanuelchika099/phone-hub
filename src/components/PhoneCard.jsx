import "./PhoneCard.css"
import { motion } from "framer-motion"

function PhoneCard({ phone, addToCart }) {

    return(
        <>
             <div className="phoneCard">
                <div className="phoneImgFlex">
                    <img
                        src={phone.thumbnail}
                        alt={phone.title}
                    />
                </div>
                
                <div className="phoneCardFlex">
                    <h3 className="phoneCard-title">{phone.title}</h3>
                    <p className="phoneCard-storage">{phone.storage}</p>
                </div>
                <div className="phoneCardFlex">
                    <p className="phoneCard-rating">{phone.rating}</p>
                    <p className="phoneCard-price">₦{phone.price.toLocaleString() }</p>
                </div>
                <div className="phoneCardFlex outline">
                    <p className="phoneCard-brand"> {phone.brand}</p>
                    <p className="phoneCard-color"> {phone.color}</p>
                </div>
                <button className="btn buy"
                    onClick={(()=> addToCart(phone) )}
                >
                    Add to Cart
                </button>
             </div>  
        </>
    )
}

export default PhoneCard