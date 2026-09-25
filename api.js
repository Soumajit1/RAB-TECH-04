// api.js - Modular REST API Client
const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetches all products from the external API.
 * @returns {Promise<Array>} Array of product objects
 */
export async function fetchProducts() {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error; // Re-throw to handle in app.js
    }
}

/**
 * Fetches product categories.
 * @returns {Promise<Array>} Array of category strings
 */
export async function fetchCategories() {
    try {
        const response = await fetch(`${BASE_URL}/products/categories`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        throw error;
    }
}
