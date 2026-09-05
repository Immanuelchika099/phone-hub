import "../pages/Home.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { searchProducts } from "../data/productFunctions";
import products from "../data/products";
import PhoneCard from "../components/PhoneCard";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Faq from "../components/Faq";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";

function Home({ addToCart, search }) {
    const filteredProducts = search ? searchProducts(products, search) : [];
    const featuredProducts = products.slice(0, 8);
    const topRated = [...products]
        .filter((product) => Number(String(product.rating).replace(/[^0-9.]/g, "")) >= 4.6)
        .slice(0, 4);

    return (
        <main className="home-container">
            {search ? (
                <section className="phone-section search-results-section">
                    <div className="phoneHeadContainer">
                        <p className="phoneTx">SEARCH</p>
                        <h1 className="phoneHeading main">Search Results</h1>
                        <p className="shop-subtitle">{filteredProducts.length} products found</p>
                    </div>
                    <ul className="phone-container">
                        {filteredProducts.length > 0
                            ? filteredProducts.map((product) => <PhoneCard key={product.id} phone={product} addToCart={addToCart} />)
                            : <h2 className="noResults">No phones found.</h2>}
                    </ul>
                    <Footer />
                </section>
            ) : (
                <>
                    <Hero />

                    <section className="shop-trust-bar">
                        <div><strong>30+</strong><span>Phones available</span></div>
                        <div><strong>256GB+</strong><span>Storage options</span></div>
                        <div><strong>4.5★+</strong><span>Top rated picks</span></div>
                        <div><strong>Secure</strong><span>Easy checkout</span></div>
                    </section>

                    <section className="shop-section featured-section">
                        <div className="shop-section-head">
                            <div>
                                <p className="shop-kicker">FEATURED PHONES</p>
                                <h2>Find your next phone.</h2>
                                <p>Real products, real prices, and the details you need before you buy.</p>
                            </div>
                            <Link className="shop-view-all" to="/phones">View all phones <span>→</span></Link>
                        </div>
                        <div className="home-product-grid featured-product-rail">
                            {featuredProducts.map((product) => (
                                <PhoneCard key={product.id} phone={product} addToCart={addToCart} />
                            ))}
                        </div>
                    </section>

                    <section className="shop-category-wrap">
                        <Categories />
                    </section>

                    <section className="shop-section rated-section">
                        <div className="shop-section-head compact">
                            <div>
                                <p className="shop-kicker">CUSTOMER FAVOURITES</p>
                                <h2>Top-rated devices.</h2>
                            </div>
                            <Link className="shop-view-all" to="/phones">Shop all <span>→</span></Link>
                        </div>
                        <div className="home-product-grid four">
                            {topRated.map((product) => (
                                <PhoneCard key={product.id} phone={product} addToCart={addToCart} />
                            ))}
                        </div>
                    </section>

                    <section className="shopping-benefits">
                        <div className="benefit-heading">
                            <p className="shop-kicker">WHY PHONE HUB</p>
                            <h2>A better way to shop for your next device.</h2>
                        </div>
                        <div className="benefit-grid">
                            <article><span>01</span><h3>Clear pricing</h3><p>See the price, storage, brand and rating before you open a product.</p></article>
                            <article><span>02</span><h3>Compare easily</h3><p>Browse iPhone and Android options side by side and choose what fits you.</p></article>
                            <article><span>03</span><h3>Built to buy</h3><p>Add products to your cart directly from the collection without hunting for a button.</p></article>
                        </div>
                    </section>

                    <motion.section
                        className="shop-faq-section"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Faq />
                    </motion.section>

                    <Newsletter />
                    <Footer />
                </>
            )}
        </main>
    );
}

export default Home;
