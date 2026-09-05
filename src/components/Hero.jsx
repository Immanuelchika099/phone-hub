import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import products from "../data/products";
import "../components/Hero.css";

function Hero() {
    const product = products[0];

    return (
        <section className="store-hero">
            <div className="store-hero-inner">
                <div className="store-hero-copy">
                    <p className="store-hero-kicker">NEW ARRIVAL · PHONE HUB</p>
                    <h1>Meet your next phone.</h1>
                    <p className="store-hero-description">
                        Discover the latest iPhones and Android devices with clear prices, storage options and the details you need before you buy.
                    </p>
                    <div className="store-hero-actions">
                        <Link to="/phones" className="store-primary-btn">Explore phones <span>↗</span></Link>
                        <Link to={`/phones/${product.id}`} className="store-secondary-btn">View {product.title}</Link>
                    </div>
                    <div className="store-hero-meta" aria-label="Phone Hub benefits">
                        <span>30+ devices</span>
                        <span>iPhone & Android</span>
                        <span>Easy checkout</span>
                    </div>
                </div>

                <motion.div
                    className="store-hero-product"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="hero-product-glow" aria-hidden="true" />
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
        </section>
    );
}

export default Hero;
