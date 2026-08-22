import "../pages/Home.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { searchProducts } from "../data/productFunctions";
import products from "../data/products";
import PhoneCard from "../components/PhoneCard";
import ProductModal from "../components/ProductModal";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Trends from "../components/Trends";
import Faq from "../components/Faq";
import Categories from "../components/Categories";
import ComingSoon from "../components/ComingSoon";
import Newsletter from "../components/Newsletter";

function Home({ addToCart, search }) {

  const [selectedPhone, setSelectedPhone] = useState(null);

  // SEARCH PRODUCTS
  const filteredProducts = search
    ? searchProducts(products, search)
    : [];

  return (
    <main className="home-container">

      {search ? (

        /* =========================
           SEARCH RESULTS
        ========================== */

        <section className="phone-section search-results-section">
          <div className="phoneHeadContainer">
            <p className="phoneTx">
              SEARCH
            </p>
            <h1 className="phoneHeading main">
              Search Results
            </h1>
          </div>
          <ul className="phone-container">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <PhoneCard
                  key={product.id}
                  phone={product}
                  addToCart={addToCart}
                  onClick={(phone) => setSelectedPhone(phone)}
                />

              ))
            ) : (

              <h2 className="noResults">
                No phones found.
              </h2>

            )}

          </ul>

        </section>

      ) : (

        /* =========================
           NORMAL HOME
        ========================== */

        <>
          <Hero />

          <section>
            <Categories />
          </section>

          <ComingSoon />

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

          <Newsletter />

          <Footer />
        </>

      )}

      
      /* =========================
          PRODUCT MODAL
      ========================== */

      {
        selectedPhone && (
        <ProductModal
          phone={selectedPhone}
          onClose={() => setSelectedPhone(null)}
          addToCart={addToCart}
        />
      )}

    </main>
  );
}

export default Home;