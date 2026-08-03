import PhoneCard from "../components/PhoneCard";
import { Link } from "react-router-dom";
import products from "../data/products";
import { IoChevronBack } from "react-icons/io5";
import "./Home.css"
import Footer from "../components/Footer";
import { useState } from "react";

function PhoneDetails({phone, addToCart, search }){

// THE MAPPING FUNCTION FOR PHONES
const filteredPhones = products.filter((phone) =>
    phone.title.toLowerCase().includes(search.toLowerCase())

);
const phoneCards = filteredPhones.map((product) => (
    <PhoneCard
        key={product.id}
        phone={product}
        addToCart={addToCart}
    />

));

    return (        
        <>
            <ul className="phone-container">
                { phoneCards }
            </ul>
            <ul className="togglePages">

                <Link to="/" className="prevPages"><IoChevronBack /> Previous </Link>
                <Link to="/phones" className="prevPages"> </Link>
            </ul>
            <Footer />
        </>
    )
}

export default PhoneDetails