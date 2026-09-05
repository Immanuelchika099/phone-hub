import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import products from "../data/products";
import "../components/Hero.css";

function Hero() {
    const product = products[0];

    return (
        <section className="store-hero">
            <div className="store-hero-orb" aria-hidden="true" />
            <div className="store-hero-inner">
                <div className="store-hero-copy">
                    <p className="store-hero-kicker">PHONE HUB</p>
                    <h1>Meet your<br />next phone.</h1>
                    <p className="store-hero-description">
                        The latest iPhones and Androids. One place to find the one that feels right.
                    </p>
                    <Link to="/phones" className="store-primary-btn">
                        Explore phones <span>↗</span>
                    </Link>
                </div>

                <motion.div
                    className="store-hero-product"
                    initial={{ opacity: 0, y: 28, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="hero-product-glow" aria-hidden="true" />
                    <div className="hero-product-image-wrap">
                        <Link to={`/phones/${product.id}`} aria-label={`View ${product.title}`}>
                            <img src={product.thumbnail} alt={product.title} />
                        </Link>
                    </div>
                    <div className="hero-product-caption">
                        <span>{product.brand}</span>
                        <strong>{product.title}</strong>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
