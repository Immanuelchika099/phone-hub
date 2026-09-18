export const searchProducts = (products, search) => {
    return products.filter((phone) =>
        phone.title.toLowerCase().includes(search.toLowerCase())
    );
};

export const getProductsByCategory = (products, category) => {
    const value = category.toLowerCase();
    if (value === "iphone") return products.filter((phone) => phone.brand === "Apple");
    if (value === "android") return products.filter((phone) => phone.brand !== "Apple");
    return products.filter((phone) =>
        phone.brand?.toLowerCase() === value ||
        phone.category?.toLowerCase() === value
    );
};
