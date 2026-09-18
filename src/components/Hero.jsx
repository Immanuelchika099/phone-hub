import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import products from "../data/products";
import "../components/Hero.css";

function Hero() {
    const heroProduct = products[0];
    return (
        <section className="store-hero">
            <div className="store-hero-copy">
                <div className="hero-kicker"><span /> New season · 2026 collection</div>
                <h1>Upgrade to<br /><em>what's next.</em></h1>
                <p>Shop the latest iPhone and Android devices with clear pricing, trusted details and delivery across Nigeria.</p>
                <div className="hero-actions">
                    <Link to="/phones" className="hero-primary">Shop phones <span>→</span></Link>
                    <Link to="/phones?category=iPhone" className="hero-secondary">Explore iPhone</Link>
                </div>
                <div className="hero-proof">
                    <div><strong>30+</strong><span>devices</span></div>
                    <div><strong>4.8/5</strong><span>top rated</span></div>
                    <div><strong>Nationwide</strong><span>delivery</span></div>
                </div>
            </div>
            <motion.div className="store-hero-product" initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>
                <div className="hero-product-glow" />
                <span className="hero-product-badge">Featured</span>
                <img src={heroProduct.thumbnail} alt={heroProduct.title} />
                <div className="hero-product-info">
                    <div><span>{heroProduct.brand}</span><strong>{heroProduct.title}</strong></div>
                    <div className="hero-product-price">₦{Number(heroProduct.price).toLocaleString()}</div>
                </div>
            </motion.div>
            <div className="hero-corner">PHONE HUB <span>PH</span></div>
        </section>
    );
}
export default Hero;