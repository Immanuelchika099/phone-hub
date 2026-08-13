export const searchProducts = (products, search) => {
    return products.filter((phone) =>
        phone.title.toLowerCase().includes(search.toLowerCase())
    );
};


export const getProductsByCategory = (products, category) => {
    if (category.toLowerCase() === "iphone") {
        return products.filter((phone) => phone.brand === "Apple");
    }

    if (category.toLowerCase() === "android") {
        return products.filter((phone) => phone.brand !== "Apple");
    }

    return products;
};