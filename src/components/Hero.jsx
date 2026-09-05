import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import products from "../data/products";
import "../components/Hero.css";

const CINEMATIC_IMAGE = "https://assets.lummi.ai/assets/QmcF94zZRfhUWA3fnU1yMvxpGru6cAr1EviBF8rbRoExvN?auto=format&w=1600";

function Hero() {
    const product = products[0];

    return (
        <section className="cinematic-hero">
            <div className="cinematic-hero-bg" style={{ backgroundImage: `url(${CINEMATIC_IMAGE})` }} aria-hidden="true" />
            <div className="cinematic-hero-overlay" aria-hidden="true" />
            <div className="cinematic-hero-glow" aria-hidden="true" />
            <div className="cinematic-hero-grain" aria-hidden="true" />

            <div className="cinematic-hero-inner">
                <div className="cinematic-hero-top">
                    <span>PHONE HUB</span>
                    <span className="hero-status"><i /> New collection</span>
                </div>

                <div className="cinematic-hero-content">
                    <motion.div
                        className="cinematic-hero-copy"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="cinematic-eyebrow">THE NEXT GENERATION</p>
                        <h1>Meet your<br /><span>next phone.</span></h1>
                        <p className="cinematic-description">
                            Discover the latest iPhones and Androids, carefully selected for the way you live.
                        </p>
                        <Link to="/phones" className="cinematic-cta">
                            <span>Explore phones</span><b>↗</b>
                        </Link>
                    </motion.div>

                    <motion.div
                        className="cinematic-product"
                        initial={{ opacity: 0, scale: 0.92, y: 35 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="cinematic-product-light" />
                        <Link to={`/phones/${product.id}`} className="cinematic-product-link" aria-label={`View ${product.title}`}>
                            <img src={product.thumbnail} alt={product.title} />
                        </Link>
                        <div className="cinematic-product-info">
                            <span>{product.brand}</span>
                            <strong>{product.title}</strong>
                        </div>
                    </motion.div>
                </div>

                <div className="cinematic-hero-bottom">
                    <span>Designed for everyday life</span>
                    <span className="hero-scroll">Scroll to explore <b>↓</b></span>
                </div>
            </div>
        </section>
    );
}

export default Hero;
