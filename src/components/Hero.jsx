import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../components/Hero.css";

const CINEMATIC_IMAGE = "https://assets.lummi.ai/assets/QmcF94zZRfhUWA3fnU1yMvxpGru6cAr1EviBF8rbRoExvN?auto=format&w=1600";

function Hero() {
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
                </div>
            </div>
        </section>
    );
}

export default Hero;
