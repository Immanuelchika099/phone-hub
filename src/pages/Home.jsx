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
import { FiTruck, FiShield, FiRefreshCw, FiMapPin } from "react-icons/fi";

function Home({ addToCart, search }) {
    const filteredProducts = search ? searchProducts(products, search) : [];
    const deals = products.slice(4, 10);
    const featured = products.slice(0, 8);
    const newArrivals = products.slice(18, 26);
    const topRated = [...products].sort((a,b) => Number(String(b.rating).replace(/[^0-9.]/g,"")) - Number(String(a.rating).replace(/[^0-9.]/g,""))).slice(0,4);

    if (search) return <main className="home-container"><section className="search-store"><div className="search-store-head"><span>SEARCH</span><h1>Results for “{search}”</h1><p>{filteredProducts.length} products found</p></div><div className="market-grid">{filteredProducts.length ? filteredProducts.map(p => <PhoneCard key={p.id} phone={p} addToCart={addToCart}/>) : <div className="empty-search">No phones found. Try another brand or model.</div>}</div></section><Footer/></main>;

    return <main className="home-container">
        <Hero />
        <section className="trust-strip">
            <div><FiShield/><strong>Authentic devices</strong><span>Shop with confidence</span></div>
            <div><FiTruck/><strong>Nationwide delivery</strong><span>Across Nigeria</span></div>
            <div><FiRefreshCw/><strong>Easy support</strong><span>We're here to help</span></div>
            <div><FiMapPin/><strong>Order tracking</strong><span>From store to doorstep</span></div>
        </section>
        <Categories />
        <section className="market-section deal-section">
            <div className="market-head"><div><span>LIMITED-TIME OFFERS</span><h2>Today's deals.</h2><p>Good phones. Clear prices. No hunting around.</p></div><Link to="/phones">View all deals →</Link></div>
            <div className="market-grid six">{deals.map(p => <PhoneCard key={p.id} phone={p} addToCart={addToCart}/>)}</div>
        </section>
        <section className="dark-market-band">
            <div className="dark-band-copy"><span>PHONE HUB PICKS</span><h2>The phones worth<br/><em>a closer look.</em></h2><p>A curated mix of new releases, popular upgrades and devices customers keep coming back to.</p><Link to="/phones">Explore the collection <span>→</span></Link></div>
            <div className="dark-band-products">{featured.slice(0,3).map(p => <motion.div key={p.id} whileHover={{y:-8}} className="dark-mini-card"><img src={p.thumbnail} alt={p.title}/><div><span>{p.brand}</span><strong>{p.title}</strong><b>₦{Number(p.price).toLocaleString()}</b></div></motion.div>)}</div>
        </section>
        <section className="market-section">
            <div className="market-head"><div><span>JUST LANDED</span><h2>New arrivals.</h2><p>The latest additions to the Phone Hub catalogue.</p></div><Link to="/phones">Shop all →</Link></div>
            <div className="market-grid">{newArrivals.map(p => <PhoneCard key={p.id} phone={p} addToCart={addToCart}/>)}</div>
        </section>
        <section className="market-section top-rated-section">
            <div className="market-head"><div><span>CUSTOMER FAVOURITES</span><h2>Top-rated phones.</h2></div><Link to="/phones">Shop all →</Link></div>
            <div className="market-grid four">{topRated.map(p => <PhoneCard key={p.id} phone={p} addToCart={addToCart}/>)}</div>
        </section>
        <section className="market-promo">
            <div><span>UPGRADE SEASON</span><h2>Ready for your<br/><em>next device?</em></h2><p>Compare the latest iPhone and Android models and find the one that fits your budget.</p><Link to="/phones">Start shopping →</Link></div>
            <img src={products[4].thumbnail} alt={products[4].title}/>
        </section>
        <section className="market-benefits">
            <div className="benefit-intro"><span>WHY PHONE HUB</span><h2>Everything you need to buy with confidence.</h2></div>
            <div className="benefit-grid"><article><FiShield/><h3>Authentic devices</h3><p>Clear product information so you know what you're buying.</p></article><article><FiTruck/><h3>Delivery across Nigeria</h3><p>Get your order moving with straightforward delivery updates.</p></article><article><FiMapPin/><h3>Track every order</h3><p>Follow your purchase from confirmation to your doorstep.</p></article></div>
        </section>
        <motion.section className="home-faq" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}}><Faq/></motion.section>
        <Newsletter/><Footer/>
    </main>;
}
export default Home;