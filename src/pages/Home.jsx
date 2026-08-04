import "../pages/Home.css"
import { useState, useEffect } from "react";
import PhoneCard from "../components/PhoneCard";
import { Link } from "react-router-dom";
import products from "../data/products";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Trends from "../components/Trends";
import Faq from "../components/Faq";
import { motion } from "framer-motion"

function Home({ addToCart, search }) {


  // THE MAPPING FUNCTION FOR PHONES
  const filteredPhones = products.filter((phone) =>
    phone.title.toLowerCase().includes(search.toLowerCase())

);
const phoneCards = filteredPhones.map((product) => (

  <motion.div
    key={product.id}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <PhoneCard phone={product} addToCart={addToCart} />
  </motion.div>

));


  return (
    <>
      <main className="home-container">
        <Hero />

        <section>
            <ul className="phoneHeadContainer">
              <p className="phoneTx">THE PHONES</p>
              <h1 className="phoneHeading main">Our Impressive Phone Models</h1>
            </ul>

            <ul className="phone-container">
              {phoneCards.length > 0 ? ( phoneCards
                  ) : (
                      <h2 className="noResults">
                          No phones found.
                      </h2>
                )}
            </ul>

            <ul className="togglePages">
              <span></span>
              <Link to="/phones" className="prevPages"> Next <IoChevronForward /> </Link>
            </ul>
        </section>
        <motion.section
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <Trends />
        </motion.section>

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