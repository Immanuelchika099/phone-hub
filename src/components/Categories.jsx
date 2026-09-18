import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import products from "../data/products";
import "./Categories.css";

function Categories() {
    const navigate = useNavigate();
    const brands = [...new Set(products.map((product) => product.brand))];
    const featuredBrands = ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus", "Nothing", "OPPO", "Realme"].filter((brand) => brands.includes(brand));
    return (
        <section id="categories" className="market-categories">
            <div className="category-heading">
                <div><span>SHOP BY BRAND</span><h2>Find your match.</h2></div>
                <button onClick={() => navigate("/phones")}>View all phones <FiArrowUpRight /></button>
            </div>
            <div className="brand-rail">
                {featuredBrands.map((brand, index) => {
                    const product = products.find((item) => item.brand === brand);
                    return <motion.button key={brand} className="brand-tile" onClick={() => navigate("/phones?brand=" + encodeURIComponent(brand))} whileHover={{ y: -4 }} transition={{ duration: .2 }}>
                        <span className="brand-index">{String(index + 1).padStart(2, "0")}</span>
                        <img src={product?.thumbnail} alt="" />
                        <div><strong>{brand}</strong><span>{products.filter((item) => item.brand === brand).length} devices</span></div>
                        <FiArrowUpRight />
                    </motion.button>;
                })}
            </div>
        </section>
    );
}
export default Categories;