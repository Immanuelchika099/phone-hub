import "./Footer.css"
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import navLogo from "../assets/logo/navLogo.PNG"

function Footer(){

    return(
        <>
            <footer id="contact" className="footer">

                <div className="footer-top">

                    <div className="footer-logo">
                        <img
                            className="Logo"
                            src={navLogo}
                            alt="PhoneHub Logo"
                        />

                        <p>
                            Discover the latest smartphones, unbeatable prices,
                            and premium shopping experiences built for every tech lover.
                        </p>

                        <div className="socialIcons">

                            <a href="https://github.com/Immanuelchika099"
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaGithub />
                            </a>

                            <a href="#"
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>

                            <a href="https://github.com/hi_imanw"
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaInstagram />
                            </a>

                            <a href="#"
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaXTwitter />
                            </a>

                        </div>

                    </div>


                    <div className="footer-links">

                        <h3>Quick Links</h3>

                        <a href="/">Home</a>
                        <a href="#trends">Latest News</a>
                        <a href="#contact">Contact</a>

                    </div>


                    <div className="footer-links">

                        <h3>Resources</h3>

                        <a href="/">Products</a>
                        <a href="#faq">FAQs</a>
                        <a href="/">Support</a>

                    </div>


                    <div className="footer-contact">

                        <h3>Contact</h3>

                        <p>📍 Port Harcourt, Nigeria</p>

                        <p>
                            ✉️ iman67@gmail.com
                        </p>

                        <p className="available">
                            Available for freelance projects.
                        </p>

                    </div>

                </div>


                <div className="footer-bottom">

                    <p>
                        © 2026 <strong>PhoneHub</strong>. All rights reserved.
                    </p>

                </div>

            </footer>
        </>
    )
}

export default Footer