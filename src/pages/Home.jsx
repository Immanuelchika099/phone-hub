import "../pages/Home.css"
import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { searchProducts, getProductsByCategory } from "../data/productFunctions";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Trends from "../components/Trends";
import Faq from "../components/Faq";
import Categories from "../components/Categories";

function Home({ addToCart, search }) {


  return (
    <>
      <main className="home-container">
        <Hero />

        <motion.section
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
           <Categories />
        </motion.section>


        <div className="trends-scroll-section">
            <motion.div
                initial={{ opacity: 0, y: 90 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8 }}
                className="trends-moving"
            >
                <Trends />
            </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <Faq />
        </motion.section>

        <Footer />
      </main>
    </>
  )
}

export default Home;