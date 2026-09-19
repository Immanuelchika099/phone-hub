import "./Footer.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiArrowRight, FiMapPin, FiTruck, FiRefreshCw, FiHelpCircle } from "react-icons/fi";
import navLogo from "../assets/logo/navLogo.PNG";
import { Link } from "react-router-dom";
import { useState } from "react";

function Footer() {
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubscribed(true);
    };

    return (
        <footer id="contact" className="footer">
            <div className="footer-newsletter">
                <div>
                    <span className="footer-eyebrow">STAY IN THE LOOP</span>
                    <h2>Get new drops & better deals.</h2>
                    <p>Be the first to hear about new phones, price updates and exclusive offers.</p>
                </div>
                <form onSubmit={handleSubmit} className="footer-subscribe">
                    <div className="footer-input">
                        <FiMail aria-hidden="true" />
                        <input type="email" placeholder="Enter your email address" aria-label="Email address" required disabled={subscribed} />
                    </div>
                    <button type="submit" disabled={subscribed}>
                        {subscribed ? "Subscribed" : "Subscribe"} {!subscribed && <FiArrowRight />}
                    </button>
                </form>
            </div>

            <div className="footer-main">
                <div className="footer-brand">
                    <img src={navLogo} alt="Franky Gadget" className="Logo" />
                    <p>Your destination for smartphones, honest pricing and a simple way to find your next device.</p>
                    <div className="socialIcons">
                        <a href="https://github.com/Immanuelchika099" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                        <a href="https://instagram.com/hi_imanw" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="X"><FaXTwitter /></a>
                    </div>
                </div>

                <div className="footer-column">
                    <h3>Shop</h3>
                    <Link to="/phones">All Phones</Link>
                    <Link to="/phones?category=iPhone">iPhone</Link>
                    <Link to="/phones?category=Android">Android</Link>
                    <Link to="/favorites">Favorites</Link>
                </div>

                <div className="footer-column">
                    <h3>Help & Support</h3>
                    <Link to="/faq">FAQs</Link>
                    <Link to="/orders">Track Order</Link>
                    <Link to="/contact">Contact Us</Link>
                    <a href="#contact"><FiHelpCircle /> Help Center</a>
                </div>

                <div className="footer-column">
                    <h3>Your Account</h3>
                    <Link to="/profile">My Account</Link>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/favorites">Saved Items</Link>
                    <Link to="/cart">Cart</Link>
                </div>

                <div className="footer-column footer-contact">
                    <h3>Need help?</h3>
                    <p><FiMapPin /> Nigeria</p>
                    <p><FiTruck /> Nationwide delivery</p>
                    <p><FiRefreshCw /> Customer support</p>
                    <a href="mailto:iman67@gmail.com"><FiMail /> iman67@gmail.com</a>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© 2026 Franky Gadget. All rights reserved.</span>
                <div>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                    <a href="#contact">Cookies</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;