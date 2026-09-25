// app.js - Main Application State & DOM Logic
import { fetchProducts, fetchCategories } from './api.js';

// Client-Side State
const state = {
    products: [],
    categories: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    filters: {
        search: '',
        category: 'all',
        sortBy: 'default' // 'price-asc', 'price-desc'
    }
};

// DOM Elements
const elements = {
    grid: document.getElementById('product-grid'),
    tabsContainer: document.getElementById('category-tabs'),
    searchInput: document.getElementById('search-input'),
    sortSelect: document.getElementById('sort-select'),
    cartCount: document.getElementById('cart-count'),
    errorBanner: document.getElementById('error-banner')
};

// Initialization
async function initApp() {
    updateCartCount();
    renderSkeletons(8); // Show 8 loading skeletons

    try {
        // Fetch data concurrently
        const [products, categories] = await Promise.all([
            fetchProducts(),
            fetchCategories()
        ]);
        
        state.products = products;
        state.categories = categories;
        
        renderCategories();
        renderProducts(); // Render initial state
    } catch (error) {
        showError("Failed to load products. Please check your connection and try again.");
        elements.grid.innerHTML = ''; // Clear skeletons
    }
}

// Render Logic
function renderSkeletons(count) {
    elements.grid.innerHTML = Array(count).fill(0).map(() => `
        <div class="skeleton-card">
            <div class="skeleton-img"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text short"></div>
            <div class="skeleton-btn"></div>
        </div>
    `).join('');
}

function renderCategories() {
    const tabsHTML = state.categories.map(cat => 
        `<button class="tab-btn" data-category="${cat}">${cat}</button>`
    ).join('');
    // Append to existing 'All' button
    elements.tabsContainer.innerHTML += tabsHTML;
}

function renderProducts() {
    // 1. Filter
    let filtered = state.products.filter(p => {
        const matchCategory = state.filters.category === 'all' || p.category === state.filters.category;
        const matchSearch = p.title.toLowerCase().includes(state.filters.search.toLowerCase());
        return matchCategory && matchSearch;
    });

    // 2. Sort
    if (state.filters.sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (state.filters.sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    // 3. Render DOM
    if (filtered.length === 0) {
        elements.grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No products found.</p>`;
        return;
    }

    elements.grid.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
            <h3 class="product-title" title="${product.title}">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-cart-btn" onclick="window.addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Event Listeners (Filtering, Sorting, Search)
elements.searchInput.addEventListener('input', (e) => {
    state.filters.search = e.target.value;
    renderProducts();
});

elements.sortSelect.addEventListener('change', (e) => {
    state.filters.sortBy = e.target.value;
    renderProducts();
});

elements.tabsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
        // Update Active Class
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update State & Render
        state.filters.category = e.target.dataset.category;
        renderProducts();
    }
});

// Cart & Global Helpers
window.addToCart = function(productId) {
    const product = state.products.find(p => p.id === productId);
    if (product) {
        state.cart.push(product);
        localStorage.setItem('cart', JSON.stringify(state.cart));
        updateCartCount();
        
        // Quick visual feedback (optional)
        const btn = document.querySelector(`.product-card[data-id="${productId}"] .add-cart-btn`);
        const originalText = btn.innerText;
        btn.innerText = "Added!";
        btn.style.background = "#10b981";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "";
        }, 1000);
    }
};

function updateCartCount() {
    elements.cartCount.textContent = state.cart.length;
}

function showError(message) {
    elements.errorBanner.textContent = message;
    elements.errorBanner.classList.remove('hidden');
}

// Boot
document.addEventListener('DOMContentLoaded', initApp);
