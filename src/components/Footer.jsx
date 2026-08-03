import "./Footer.css"
import navLogo from "../assets/logo/navLogo.PNG"

function Footer(){

    return(
        <>
            <footer id="contact" className="footer">

            <div className="footer-top">

                <div className="footer-logo">
                    <img className="Logo" src={navLogo} alt="PhoneHub Logo" />
                    
                    <p>
                        Bringing you the latest smartphones with unbeatable
                        prices and trusted quality.
                    </p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>

                    <a href="/">Home</a>
                    <a href="/contact">Contact</a>
                    <a href="/">Products</a>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>

                    <p>📍 Port Harcourt, Nigeria</p>
                    <p>📞 +234 800 000 0000</p>
                    <p>✉️ support@phonehub.com</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>
                    © 2026 PhoneHub. All rights reserved.
                </p>
            </div>

            </footer>
        </>
    )
}

export default Footer