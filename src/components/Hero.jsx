import bg1 from "../assets/bg1.png";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg3.png";
import "../components/Hero.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Hero() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            image: bg1,
            tag: '"Summer Sale - Up to 50% Off"',
            title: (
                <>
                    Smarter Tech <br />
                    <span> Better Living. </span>
                </>
            ),
            text:
                "Discover premium smartphones from top brands at unbeatable prices. Find the perfect device for work, gaming, and everyday life.",
            button: "Shop Now",
            secondButton: "Explore",
        },

        {
            image: bg2,
            tag: '"Latest Technology"',
            title: (
                <>
                    Designed for <br />
                   <span> what's next. </span>
                </>
            ),
            text:
                "Explore powerful smartphones designed to keep up with your lifestyle, work, entertainment, and everything in between.",
            button: "Buy Now",
            secondButton: "Explore",
        },

        {
            image: bg3,
            tag: '"Built For You"',
            title: (
                <>
                    The future <br />
                    <span> in your hands. </span>
                </>
            ),
            text:
                "From powerful Android devices to the latest iPhones, discover technology that fits your style and your needs.",
            button: "Shop Now",
            secondButton: "Watch Video",
        },
    ];

    const slide = slides[currentSlide];

    return (
        <>

            <main className="hero-container"
                style={{
                    backgroundImage: `url(${slides[currentSlide].image})`
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="heroFlex"
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -80 }}
                        transition={{ duration: 0.6 }}

                        drag="x"
                        dragDirectionLock
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}

                        onDragEnd={(event, info) => {
                            if (info.offset.x < -80) {
                                setCurrentSlide((prev) =>
                                    (prev + 1) % slides.length
                                );
                            }

                            if (info.offset.x > 80) {
                                setCurrentSlide((prev) =>
                                    (prev - 1 + slides.length) % slides.length
                                );
                            }

                        }}
                    >

                        {/* LEFT CONTENT */}

                        <div className="hero-content">

                            <motion.p
                                className="summerTx"
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {slide.tag}
                            </motion.p>


                            <motion.h1
                                className="heroH1"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.1
                                }}
                            >
                                {slide.title}
                            </motion.h1>


                            <motion.p
                                className="heroText"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2
                                }}
                            >
                                
                                {slide.text}
                            </motion.p>


                            <div className="hero-buttons">
                                <motion.button
                                    className="shopNow btn"
                                    initial={{ opacity: 0, scale: 0.8}}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.1, delay: 0 }}
                                    whileHover={{ scale: .95 }}
                                >
                                    {slide.button}
                                </motion.button>
                                <motion.button
                                    className="explore btn"
                                    initial={{ opacity: 0, scale: 0.8}}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.1, delay: 0 }}
                                    whileHover={{ scale: .95 }}
                                >
                                    {slide.secondButton}
                                </motion.button>
                            </div>


                        </div>

                    </motion.div>

                </AnimatePresence>


                {/* SLIDER DOTS */}

                <div className="hero-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={
                                currentSlide === index
                                    ? "hero-dot active"
                                    : "hero-dot"
                            }

                            onClick={() => setCurrentSlide(index)}

                            aria-label={`Go to slide ${index + 1}`}
                        />

                    ))}

                </div>

            </main>


            <p className="hero-footerTx">
                CALL TO ORDER{" "}
                <a
                    className="callNo"
                    href="tel:+2349161229138"
                >
                    234 704 086 0338
                </a>
            </p>

        </>
    );
}

export default Hero;