import heroTechImg from "../assets/phones/heroImg.png";
import "../components/Hero.css"
import { motion } from "framer-motion"

function Hero(){
    return(
        <>
        <main className="hero-container">
            <div className="heroFlex">
                <motion.div
                    initial={{ opacity: 0, y: -80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="summerTx">"Summer Sale - Up to 50% Off"</p>
                    <h1 className="heroH1"> Shop the Latest <br />Phones & Accesories </h1>
                    <p className="heroText">
                        Discover premuim smartphones from top brands at unbeatable prices.
                        Find perfect device for work, gaming, and everyday life.
                    </p>
                    <motion.button className="shopNow btn"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                        Shop Now
                    </motion.button>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img className="heroTechImg" src= { heroTechImg }  alt="Tech Products" />
                    <div className="blob blob1"></div>
                    <div className="blob blob2"></div>
                    <div className="blob blob3"></div>
                </motion.div>
            </div>
        </main>
        <p className="hero-footerTx">CALL TO ORDER <a className="callNo" href="tel:+2349161229138"> 234 916 122 9138 </a> </p>
        </>
    )
}

export default Hero;