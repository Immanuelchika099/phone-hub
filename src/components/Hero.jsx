import heroTechImg from "../assets/phones/heroImg.png";
import "../components/Hero.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Hero() {

    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            tag: '"Summer Sale - Up to 50% Off"',
            title: (
                <>
                    Smarter Technology <br />
                    Better Living.
                </>
            ),
            text:
                "Discover premium smartphones from top brands at unbeatable prices. Find the perfect device for work, gaming, and everyday life.",
            button: "Shop Now",
            image: heroTechImg,
        },

        {
            tag: '"Latest Technology"',
            title: (
                <>
                    Upgrade Your <br />
                    Everyday.
                </>
            ),
            text:
                "Explore powerful smartphones designed to keep up with your lifestyle, work, entertainment, and everything in between.",
            button: "Explore Phones",
            image: heroTechImg,
        },

        {
            tag: '"Built For You"',
            title: (
                <>
                    Find Your <br />
                    Perfect Phone.
                </>
            ),
            text:
                "From powerful Android devices to the latest iPhones, discover technology that fits your style and your needs.",
            button: "View Collection",
            image: heroTechImg,
        },
    ];



    const slide = slides[currentSlide];


    return (
        <>

            <main className="hero-container">

                <AnimatePresence mode="wait">

                    <motion.div
                        key={currentSlide}
                        className="heroFlex"

                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -80 }}

                        transition={{ duration: 0.6 }}

                        drag="x"
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


                            <motion.button
                                className="shopNow btn"

                                initial={{
                                    opacity: 0,
                                    scale: 0.8
                                }}

                                animate={{
                                    opacity: 1,
                                    scale: 1
                                }}

                                transition={{
                                    duration: 0.4,
                                    delay: 0.3
                                }}

                                whileHover={{
                                    scale: 1.05
                                }}

                                whileTap={{
                                    scale: 0.95
                                }}
                            >
                                {slide.button}
                            </motion.button>

                        </div>


                        {/* RIGHT IMAGE */}

                        <motion.div
                            className="hero-image-wrapper"

                            initial={{
                                opacity: 0,
                                x: 100
                            }}

                            animate={{
                                opacity: 1,
                                x: 0
                            }}

                            transition={{
                                duration: 0.7,
                                delay: 0.1
                            }}
                        >

                            <img
                                className="heroTechImg"
                                src={slide.image}
                                alt="Tech Products"
                            />


                        </motion.div>

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
                    234 916 122 9138
                </a>
            </p>

        </>
    );
}

export default Hero;