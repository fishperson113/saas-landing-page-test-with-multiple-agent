import { fetchProducts } from './api.js';
import { addToCart, initCart } from './cart.js';

// State
let allProducts = [];

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Init Cart
    initCart();

    // Load Products
    await loadProducts();

    // Event Listeners
    setupEventListeners();
});

async function loadProducts() {
    const productList = document.getElementById('product-list');
    
    try {
        allProducts = await fetchProducts();
        renderProducts(allProducts);
    } catch (error) {
        console.error('Failed to load products:', error);
        productList.innerHTML = `
            <div class="col-12 text-center text-danger">
                <i class="fa-solid fa-triangle-exclamation mb-2 fs-3"></i>
                <p>Failed to load products. Please try again later.</p>
            </div>
        `;
    }
}

function renderProducts(products) {
    const productList = document.getElementById('product-list');
    
    if (products.length === 0) {
        productList.innerHTML = '<div class="col-12 text-center py-5">No products found.</div>';
        return;
    }

    productList.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-sm">
                <div class="product-img-container rounded-top">
                    <!-- Using placeholder if image fails or for mock -->
                    <img src="${product.image || 'https://placehold.co/300x300?text=' + product.name}" 
                         alt="${product.name}" 
                         class="card-img-top p-3">
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="mb-2 text-muted small text-uppercase fw-bold">${product.category}</div>
                    <h5 class="card-title fw-bold">${product.name}</h5>
                    <p class="card-text text-secondary small flex-grow-1">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="fs-5 fw-bold text-primary">$${product.price.toFixed(2)}</span>
                        <button class="btn btn-sm btn-outline-primary add-to-cart-btn" data-id="${product.id}">
                            <i class="fa-solid fa-plus me-1"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Re-attach event listeners for dynamic buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').dataset.id);
            const product = allProducts.find(p => p.id === id);
            if (product) addToCart(product);
        });
    });
}

function setupEventListeners() {
    const filterSelect = document.getElementById('category-filter');
    
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            const category = e.target.value;
            if (category === 'all') {
                renderProducts(allProducts);
            } else {
                const filtered = allProducts.filter(p => p.category.toLowerCase() === category);
                renderProducts(filtered);
            }
        });
    }
}
