import PhoneCard from "../components/PhoneCard";
import { Link, useSearchParams } from "react-router-dom";
import products from "../data/products";
import { IoChevronBack } from "react-icons/io5";
import "./Home.css";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { searchProducts, getProductsByCategory } from "../data/productFunctions";

function PhoneDetails({ addToCart, search }) {

    const [searchParams] = useSearchParams();

    const category = searchParams.get("category");


    // CATEGORY FILTER
    let filteredPhones = category
        ? getProductsByCategory(products, category)
        : products;


    // SEARCH FILTER
    if (search) {
        filteredPhones = searchProducts(filteredPhones, search);
    }


    const phoneCards = filteredPhones.map((product) => (


            <PhoneCard
                phone={product}
                addToCart={addToCart}
            />


    ));


    return (
        <>

            <section className="phone-section">

                <div className="phoneHeadContainer">

                    <p className="phoneTx">
                        {category
                            ? category.toUpperCase()
                            : "ALL PHONES"
                        }
                    </p>

                    <h1 className="phoneHeading main">

                        {category
                            ? `${category} Phones`
                            : "Our Phone Collection"
                        }

                    </h1>

                </div>


                <ul className="phone-container">

                    {phoneCards.length > 0
                        ? phoneCards
                        : (
                            <h2 className="noResults">
                                No phones found.
                            </h2>
                        )
                    }

                </ul>


                <div className="togglePages">

                    <Link
                        to="/"
                        className="prevPages"
                    >
                        <IoChevronBack />
                        Previous
                    </Link>

                </div>

            </section>

            <Footer />

        </>
    );
}

export default PhoneDetails;