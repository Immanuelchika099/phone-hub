import PhoneCard from "../components/PhoneCard";
import { Link, useSearchParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import products from "../data/products";
import { searchProducts, getProductsByCategory } from "../data/productFunctions";
import { useEffect } from "react";
import Footer from "../components/Footer";
import "./Home.css";

function PhoneDetails({ addToCart, search }) {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    let filteredPhones = category
        ? getProductsByCategory(products, category)
        : products;

    if (search) {
        filteredPhones = searchProducts(filteredPhones, search);
    }

    const phoneCards = filteredPhones.map((product) => (
        <PhoneCard
            key={product.id}
            phone={product}
            addToCart={addToCart}
        />
    ));

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [category]);

    return (
        <>
            <section className="phone-section">
                <div className="phoneHeadContainer">
                    <p className="phoneTx">{category ? category.toUpperCase() : "ALL PHONES"}</p>
                    <h1 className="phoneHeading main">
                        {category ? `${category} Phones` : "Our Phone Collection"}
                    </h1>
                </div>

                <ul className="phone-container">
                    {phoneCards.length > 0 ? phoneCards : <h2 className="noResults">No phones found.</h2>}
                </ul>

                <div className="togglePages">
                    <Link to="/#categories" className="prevPages">
                        <IoChevronBack />
                        previous
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default PhoneDetails;
