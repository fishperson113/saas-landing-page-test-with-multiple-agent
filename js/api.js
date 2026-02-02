// API Configuration
// In a real app, this would be an API URL. For now, we mock with local JSON.
const API_URL = 'assets/products.json';

/**
 * Fetch all products from the "CMS"
 * @returns {Promise<Array>} List of products
 */
export async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Simulating network delay for realism
        return new Promise(resolve => {
            setTimeout(() => resolve(data.products || []), 500);
        });
        
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}
