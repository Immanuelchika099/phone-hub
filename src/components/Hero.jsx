import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiTruck, FiShield } from "react-icons/fi";
import products from "../data/products";
import "../components/Hero.css";

function Hero() {
    const heroProduct = products[0];

    return (
        <section className="store-hero">
            <div className="hero-orb hero-orb-one" />
            <div className="hero-orb hero-orb-two" />
            <div className="store-hero-copy">
                <div className="hero-kicker"><span /> FRANKY GADGET · 2026</div>
                <h1>Find the phone<br /><em>you've been looking for.</em></h1>
                <p>Shop genuine iPhone and Android devices at clear prices, with nationwide delivery and order tracking.</p>
                <div className="hero-actions">
                    <Link to="/phones" className="hero-primary">Shop all phones <FiArrowRight /></Link>
                    <Link to="/phones?category=iPhone" className="hero-secondary">Shop iPhone</Link>
                </div>
                <div className="hero-assurance">
                    <span><FiCheck /> Genuine devices</span>
                    <span><FiTruck /> Nationwide delivery</span>
                    <span><FiShield /> Secure checkout</span>
                </div>
            </div>
            <motion.div className="store-hero-product" initial={{ opacity: 0, y: 28, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>
                <div className="hero-product-stage">
                    <div className="hero-product-glow" />
                    <span className="hero-product-badge">Featured device</span>
                    <img src={heroProduct.thumbnail} alt={heroProduct.title} />
                </div>
                <div className="hero-product-info">
                    <div><span>{heroProduct.brand}</span><strong>{heroProduct.title}</strong><small>Available now</small></div>
                    <div className="hero-product-price">₦{Number(heroProduct.price).toLocaleString()}</div>
                </div>
            </motion.div>
            <div className="hero-floating-card hero-floating-one"><FiCheck /><div><strong>Trusted shopping</strong><span>Clear product details</span></div></div>
            <div className="hero-floating-card hero-floating-two"><span>4.8</span><div><strong>Top rated</strong><span>Customer favourites</span></div></div>
        </section>
    );
}
export default Hero;
