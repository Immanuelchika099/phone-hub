import axios from "axios";

const Url = "https://dummyjson.com/products/category/smartphones"

export async function getPhones() {
    try{
        const response = await axios.get(Url)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}