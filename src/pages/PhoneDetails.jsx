import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoChevronBack, IoCloseOutline, IoFilterOutline, IoChevronDown } from "react-icons/io5";
import PhoneCard from "../components/PhoneCard";
import products from "../data/products";
import { searchProducts, getProductsByCategory } from "../data/productFunctions";
import Footer from "../components/Footer";
import "./Home.css";
import "./PhoneDetails.css";

function PhoneDetails({ addToCart, search }) {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const [filterOpen, setFilterOpen] = useState(false);
    const [sort, setSort] = useState("featured");
    const [brand, setBrand] = useState("all");
    const [priceRange, setPriceRange] = useState("all");
    const [storage, setStorage] = useState("all");
    const [rating, setRating] = useState("all");

    const basePhones = useMemo(() => {
        let list = category ? getProductsByCategory(products, category) : products;
        return search ? searchProducts(list, search) : list;
    }, [category, search]);

    const brands = [...new Set(basePhones.map((phone) => phone.brand).filter(Boolean))];
    const storages = [...new Set(basePhones.map((phone) => phone.storage).filter(Boolean))];

    const filteredPhones = useMemo(() => {
        let list = basePhones.filter((phone) => {
            const matchesBrand = brand === "all" || phone.brand === brand;
            const matchesStorage = storage === "all" || phone.storage === storage;
            const matchesRating = rating === "all" || Number(phone.rating) >= Number(rating);
            const price = Number(phone.price);
            const matchesPrice = priceRange === "all"
                || (priceRange === "under500" && price < 500000)
                || (priceRange === "500-1m" && price >= 500000 && price < 1000000)
                || (priceRange === "1-2m" && price >= 1000000 && price < 2000000)
                || (priceRange === "over2m" && price >= 2000000);
            return matchesBrand && matchesStorage && matchesRating && matchesPrice;
        });
        return [...list].sort((a, b) => {
            if (sort === "price-low") return Number(a.price) - Number(b.price);
            if (sort === "price-high") return Number(b.price) - Number(a.price);
            if (sort === "rating") return Number(b.rating) - Number(a.rating);
            return 0;
        });
    }, [basePhones, brand, priceRange, storage, rating, sort]);

    const clearFilters = () => {
        setBrand("all"); setPriceRange("all"); setStorage("all"); setRating("all");
    };

    useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [category]);

    return (
        <>
            <section className="phone-section phone-shop-page">
                <div className="phoneHeadContainer">
                    <p className="phoneTx">{category ? category.toUpperCase() : "ALL PHONES"}</p>
                    <h1 className="phoneHeading main">{category ? `${category} Phones` : "Our Phone Collection"}</h1>
                    <p className="shop-subtitle">Find the device that's right for you.</p>
                </div>

                <div className="shop-toolbar">
                    <span className="product-count">{filteredPhones.length} {filteredPhones.length === 1 ? "product" : "products"}</span>
                    <div className="shop-actions">
                        <button className="shop-control" onClick={() => setFilterOpen(true)}><IoFilterOutline /> Filter</button>
                        <label className="sort-control"><span>Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Top Rated</option></select><IoChevronDown /></label>
                    </div>
                </div>

                <ul className="phone-container">
                    {filteredPhones.length > 0 ? filteredPhones.map((product) => <PhoneCard key={product.id} phone={product} addToCart={addToCart} />) : <h2 className="noResults">No phones found.</h2>}
                </ul>

                <div className="togglePages"><Link to="/#categories" className="prevPages"><IoChevronBack /> previous</Link></div>
            </section>

            {filterOpen && <div className="filter-overlay" onClick={() => setFilterOpen(false)}><aside className="filter-drawer" onClick={(e) => e.stopPropagation()}>
                <div className="filter-header"><div><p>REFINE</p><h2>Filter</h2></div><button onClick={() => setFilterOpen(false)}><IoCloseOutline /></button></div>
                <div className="filter-group"><label>Brand</label><select value={brand} onChange={(e) => setBrand(e.target.value)}><option value="all">All brands</option>{brands.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
                <div className="filter-group"><label>Price range</label><select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}><option value="all">Any price</option><option value="under500">Under ₦500,000</option><option value="500-1m">₦500,000 – ₦1m</option><option value="1-2m">₦1m – ₦2m</option><option value="over2m">₦2m+</option></select></div>
                <div className="filter-group"><label>Storage</label><select value={storage} onChange={(e) => setStorage(e.target.value)}><option value="all">Any storage</option>{storages.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
                <div className="filter-group"><label>Rating</label><select value={rating} onChange={(e) => setRating(e.target.value)}><option value="all">Any rating</option><option value="4">4★ & up</option><option value="4.5">4.5★ & up</option></select></div>
                <div className="filter-footer"><button className="clear-filters" onClick={clearFilters}>Clear all</button><button className="apply-filters" onClick={() => setFilterOpen(false)}>Show {filteredPhones.length} products</button></div>
            </aside></div>}
            <Footer />
        </>
    );
}

export default PhoneDetails;
