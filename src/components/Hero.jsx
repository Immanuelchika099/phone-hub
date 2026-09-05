import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";
import "../components/Hero.css";

function Hero() {
    const featured = products.slice(0, 3);
    const [currentSlide, setCurrentSlide] = useState(0);
    const product = featured[currentSlide];

    return (
        <section className="store-hero">
            <div className="store-hero-inner">
                <div className="store-hero-copy">
                    <p className="store-hero-kicker">PHONE HUB · PREMIUM DEVICES</p>
                    <h1>Choose your next phone.</h1>
                    <p className="store-hero-description">
                        Shop the latest iPhones and Android devices with clear prices, storage options and product details — all in one place.
                    </p>
                    <div className="store-hero-actions">
                        <Link to="/phones" className="store-primary-btn">Shop all phones</Link>
                        <Link to={`/phones/${product.id}`} className="store-secondary-btn">View {product.title}</Link>
                    </div>
                    <div className="store-hero-meta">
                        <span>✓ 30+ devices</span>
                        <span>✓ iPhone & Android</span>
                        <span>✓ Add to cart</span>
                    </div>
                </div>

                <motion.div
                    className="store-hero-product"
                    key={product.id}
                    initial={{ opacity: 0, y: 30, scale: .96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: .45, ease: "easeOut" }}
                >
                    <div className="hero-product-label">FEATURED</div>
                    <Link to={`/phones/${product.id}`} className="hero-product-image-wrap">
                        <img src={product.thumbnail} alt={product.title} />
                    </Link>
                    <div className="hero-product-info">
                        <div>
                            <p>{product.brand}</p>
                            <h2>{product.title}</h2>
                            <span>{product.storage} · {product.color || "Multiple colours"}</span>
                        </div>
                        <strong>₦{Number(product.price).toLocaleString()}</strong>
                    </div>
                </motion.div>
            </div>

            <div className="store-hero-switcher">
                {featured.map((item, index) => (
                    <button
                        key={item.id}
                        className={currentSlide === index ? "active" : ""}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Show ${item.title}`}
                    >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <b>{item.title}</b>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default Hero;
