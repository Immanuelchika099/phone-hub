import "./ProductModal.css";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

function ProductModal({ phone, onClose, addToCart }) {

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!phone) return;

        const availableColors = phone.colors
            ? Object.keys(phone.colors)
            : [];

        setSelectedColor(
            availableColors.length > 0
                ? availableColors[0]
                : null
        );

        setSelectedStorage(
            phone.storageOptions?.[0] || phone.storage || null
        );

        setQuantity(1);

    }, [phone]);


    if (!phone) return null;


    const colors = phone.colors
        ? Object.keys(phone.colors)
        : [];


    const storageOptions = phone.storageOptions || [
        phone.storage
    ];


    const colorSwatches = {
        Silver: "#d9d9d9",
        "Cosmic Orange": "#c96a32",
        "Deep Blue": "#293c68",
        Black: "#151515",
        White: "#f4f4f4",
        Blue: "#536d9d",
        Green: "#68765c",
        Pink: "#e9a4a9",
    };


    const productImage = phone.colors && selectedColor
        ? phone.colors[selectedColor]
        : phone.thumbnail;


    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };


    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };


    const handleAddToCart = () => {

        addToCart({
            ...phone,
            selectedColor,
            selectedStorage,
            quantity
        });

        onClose();
    };


    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="product-modal"
                onClick={(e) => e.stopPropagation()}
            >

                {/* CLOSE */}
                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close product details"
                >
                    ×
                </button>


                {/* LEFT SIDE */}
                <div className="modal-left">

                    <div className="modal-image-container">

                        <img
                            src={productImage}
                            alt={phone.title}
                        />

                    </div>

                </div>


                {/* RIGHT SIDE */}
                <div className="modal-details">

                    <p className="modal-brand">
                        {phone.brand}
                    </p>


                    <h2 className="modal-title">
                        {phone.title}
                    </h2>


                    {/* RATING */}

                    <div className="modal-rating">

                        <div className="phoneCard-stars">

                            {[...Array(5)].map((_, i) => (

                                <FaStar
                                    key={i}
                                    className={
                                        i < Math.floor(phone.rating)
                                            ? "filled"
                                            : "empty"
                                    }
                                />

                            ))}

                        </div>

                        <span>
                            {phone.rating}
                        </span>

                    </div>


                    {/* PRICE */}

                    <h3 className="modal-price">
                        ₦{Number(phone.price).toLocaleString()}
                    </h3>


                    {/* COLOUR */}

                    {colors.length > 0 && (

                        <div className="option-section">

                            <div className="option-heading">

                                <p className="option-title">
                                    Colour
                                </p>

                                <span className="selected-option">
                                    {selectedColor}
                                </span>

                            </div>


                            <div className="color-options">

                                {colors.map((color) => (

                                    <button
                                        key={color}
                                        className={`color-option ${
                                            selectedColor === color
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedColor(color)
                                        }
                                        aria-label={`Select ${color}`}
                                    >

                                        <span
                                            className="color-circle"
                                            style={{
                                                backgroundColor:
                                                    colorSwatches[color] ||
                                                    "#ccc"
                                            }}
                                        />

                                    </button>

                                ))}

                            </div>

                        </div>

                    )}


                    {/* STORAGE */}

                    {storageOptions.length > 0 && (

                        <div className="option-section">

                            <div className="option-heading">

                                <p className="option-title">
                                    Storage
                                </p>

                                <span className="selected-option">
                                    {selectedStorage}
                                </span>

                            </div>


                            <div className="storage-options">

                                {storageOptions.map((storage) => (

                                    <button
                                        key={storage}
                                        className={`storage-option ${
                                            selectedStorage === storage
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedStorage(storage)
                                        }
                                    >
                                        {storage}
                                    </button>

                                ))}

                            </div>

                        </div>

                    )}


                    {/* DESCRIPTION */}

                    <p className="modal-description">

                        {phone.description ||
                            "Experience powerful performance, beautiful design and an incredible smartphone experience."
                        }

                    </p>


                    {/* ADD TO CART */}

                    <button
                        className="modal-cart-btn"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>


                    {/* STOCK */}

                    <p className="stock-status">
                        ● In stock — Ready to ship
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ProductModal;