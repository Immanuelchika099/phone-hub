import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { IoArrowBack, IoChevronBack, IoChevronForward, IoAdd } from "react-icons/io5";
import products from "../data/products";
import Footer from "../components/Footer";
import "./PhoneProduct.css";

const money = (value) => `₦${Number(value).toLocaleString()}`;

function PhoneProduct({ addToCart }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const phone = products.find((item) => item.id === Number(id));
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [id]);

    useEffect(() => {
        if (!phone) return;
        const colors = phone.colors ? Object.keys(phone.colors) : [];
        setSelectedColor(colors[0] || phone.color || null);
        setSelectedStorage(phone.storageOptions?.[0] || phone.storage || null);
        setActiveImage(0);
    }, [phone]);

    const gallery = useMemo(() => {
        if (!phone) return [];
        if (phone.colors) return Object.values(phone.colors);
        return [phone.thumbnail];
    }, [phone]);

    const related = useMemo(() => {
        if (!phone) return [];
        const sameBrand = products.filter((item) => item.id !== phone.id && item.brand === phone.brand);
        const rest = products.filter((item) => item.id !== phone.id && item.brand !== phone.brand);
        return [...sameBrand, ...rest].slice(0, 8);
    }, [phone]);

    if (!phone) {
        return (
            <main className="phone-product-not-found">
                <p>PHONEVERTEX / PRODUCT</p>
                <h1>Phone not found.</h1>
                <Link to="/phones">Back to phones</Link>
            </main>
        );
    }

    const colors = phone.colors ? Object.keys(phone.colors) : phone.color ? [phone.color] : [];
    const storageOptions = phone.storageOptions || (phone.storage ? [phone.storage] : []);
    const productImage = phone.colors && selectedColor ? phone.colors[selectedColor] : gallery[activeImage];
    const ratingNumber = Number.parseFloat(String(phone.rating).replace("⭐", ""));

    const handleAddToCart = () => {
        addToCart({
            ...phone,
            selectedColor,
            selectedStorage,
            thumbnail: productImage,
        });
    };

    const openRelated = (productId) => {
        navigate(`/phones/${productId}`);
    };

    return (
        <>
            <main className="phone-pdp">
                <button className="phone-pdp-back" onClick={() => navigate(-1)}>
                    <IoArrowBack />
                    Back to collection
                </button>

                <section className="phone-pdp-main">
                    <motion.div
                        className={`phone-pdp-gallery${gallery.length > 1 ? " has-thumbs" : ""}`}
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {gallery.length > 1 && (
                            <div className="phone-pdp-thumbs">
                                {gallery.map((image, index) => (
                                    <button
                                        key={`${image}-${index}`}
                                        className={activeImage === index ? "active" : ""}
                                        onClick={() => {
                                            setActiveImage(index);
                                            if (phone.colors) setSelectedColor(Object.keys(phone.colors)[index]);
                                        }}
                                    >
                                        <img src={image} alt={`${phone.title} view ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="phone-pdp-image-wrap">
                            <img src={productImage} alt={phone.title} className="phone-pdp-image" />
                            <span className="phone-pdp-badge">{phone.brand}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="phone-pdp-copy"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.05 }}
                    >
                        <p className="phone-pdp-eyebrow">PHONEVERTEX / {phone.brand.toUpperCase()}</p>
                        <h1>{phone.title}</h1>

                        <div className="phone-pdp-rating">
                            <div>
                                {[...Array(5)].map((_, index) => (
                                    <FaStar key={index} className={index < Math.floor(ratingNumber) ? "filled" : "empty"} />
                                ))}
                            </div>
                            <span>{phone.rating}</span>
                        </div>

                        <h2>{money(phone.price)}</h2>
                        <p className="phone-pdp-description">
                            {phone.description || "Experience powerful performance, beautiful design and an incredible smartphone experience."}
                        </p>

                        <div className="phone-pdp-specs">
                            <div><span>Brand</span><b>{phone.brand}</b></div>
                            <div><span>Storage</span><b>{selectedStorage || phone.storage || "—"}</b></div>
                            <div><span>Colour</span><b>{selectedColor || phone.color || "—"}</b></div>
                        </div>

                        {colors.length > 0 && (
                            <div className="phone-option-block">
                                <div className="phone-option-heading">
                                    <label>Colour</label>
                                    <span>{selectedColor}</span>
                                </div>
                                <div className="phone-color-options">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            className={selectedColor === color ? "active" : ""}
                                            onClick={() => {
                                                setSelectedColor(color);
                                                if (phone.colors) setActiveImage(Object.keys(phone.colors).indexOf(color));
                                            }}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {storageOptions.length > 0 && (
                            <div className="phone-option-block">
                                <div className="phone-option-heading">
                                    <label>Storage</label>
                                    <span>{selectedStorage}</span>
                                </div>
                                <div className="phone-storage-options">
                                    {storageOptions.map((storage) => (
                                        <button
                                            key={storage}
                                            className={selectedStorage === storage ? "active" : ""}
                                            onClick={() => setSelectedStorage(storage)}
                                        >
                                            {storage}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button className="phone-pdp-add" onClick={handleAddToCart}>
                            Add to Cart
                            <IoChevronForward />
                        </button>

                        <div className="phone-pdp-accordions">
                            <details open>
                                <summary>Performance & features <IoAdd /></summary>
                                <p>Built for smooth everyday performance, fast multitasking and a premium mobile experience.</p>
                            </details>
                            <details>
                                <summary>Delivery & availability <IoAdd /></summary>
                                <p>In stock and ready to ship. Delivery options and timing depend on your location.</p>
                            </details>
                            <details>
                                <summary>Returns & support <IoAdd /></summary>
                                <p>Need help choosing? Contact PhoneVertex for product guidance before placing your order.</p>
                            </details>
                        </div>
                    </motion.div>
                </section>

                <section className="phone-related">
                    <div className="phone-related-head">
                        <div>
                            <p className="phone-pdp-eyebrow">COMPLETE YOUR SETUP</p>
                            <h2>Customers also <em>buy...</em></h2>
                        </div>
                        <div className="phone-related-arrows">
                            <button onClick={() => document.getElementById("phone-related-track")?.scrollBy({ left: -280, behavior: "smooth" })}><IoChevronBack /></button>
                            <button onClick={() => document.getElementById("phone-related-track")?.scrollBy({ left: 280, behavior: "smooth" })}><IoChevronForward /></button>
                        </div>
                    </div>

                    <div className="phone-related-track" id="phone-related-track">
                        {related.map((item) => (
                            <button className="phone-related-card" key={item.id} onClick={() => openRelated(item.id)}>
                                <div className="phone-related-image"><img src={item.thumbnail} alt={item.title} /></div>
                                <div className="phone-related-copy">
                                    <p>{item.brand}</p>
                                    <h3>{item.title}</h3>
                                    <strong>{money(item.price)}</strong>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default PhoneProduct;
