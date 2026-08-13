import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import "./Categories.css";

function Categories() {

    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Get representative phones from our existing products
    const iphone = products.find(
        (product) => product.brand === "Apple"
    );

    const android = products.find(
        (product) => product.brand !== "Apple"
    );


    const handleCategory = (category) => {
        setSelectedCategory(category);
        navigate(`/phones?category=${category.toLowerCase()}`);
    };


    return (
        <section className="categories">

            <div className="categoryHeading">

                <p className="phoneTx">
                    EXPLORE
                </p>

                <h2 className="phoneHeading">
                    Shop By Category
                </h2>

            </div>


            <div className="categoryContainer">

                {/* IPHONE */}

                <button
                    className={`categoryCard ${
                        selectedCategory === "iPhone"
                            ? "selected"
                            : ""
                    }`}
                    onClick={() => handleCategory("iPhone")}
                >

                    <div className="categoryText">

                        <span>01</span>

                        <h3>iPhone</h3>

                        <p>
                            Explore the latest Apple smartphones.
                        </p>

                    </div>


                    {iphone && (
                        <img
                            src={iphone.thumbnail}
                            alt={iphone.title}
                            className="categoryPhoneImage"
                        />
                    )}


                    <span className="categoryArrow">
                        →
                    </span>

                </button>


                {/* ANDROID */}

                <button
                    className={`categoryCard ${
                        selectedCategory === "Android"
                            ? "selected"
                            : ""
                    }`}
                    onClick={() => handleCategory("Android")}
                >

                    <div className="categoryText">

                        <span>02</span>

                        <h3>Android</h3>

                        <p>
                            Discover powerful Android devices.
                        </p>

                    </div>


                    {android && (
                        <img
                            src={android.thumbnail}
                            alt={android.title}
                            className="categoryPhoneImage"
                        />
                    )}


                    <span className="categoryArrow">
                        →
                    </span>

                </button>

            </div>

        </section>
    );
}

export default Categories;