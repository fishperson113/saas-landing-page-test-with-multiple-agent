// Cart State
let cart = [];

export function initCart() {
    // Load from local storage
    const savedCart = localStorage.getItem('pharmacy_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

export function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    
    // Optional: Show toast or feedback
    // alert('Added to cart!'); 
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('pharmacy_cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update Badge
    const countBadge = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countBadge) countBadge.textContent = totalItems;

    // Update List
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    
    if (!cartContainer || !totalContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="text-center text-muted py-5"><i class="fa-solid fa-basket-shopping fs-1 mb-3 text-secondary"></i><br>Your cart is empty.</div>';
        totalContainer.textContent = '$0.00';
        return;
    }

    // Render Items
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item d-flex align-items-center mb-3 pb-3 border-bottom">
            <img src="${item.image || 'https://placehold.co/50x50'}" alt="${item.name}" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="flex-grow-1">
                <h6 class="mb-0 fw-bold">${item.name}</h6>
                <div class="text-muted small">$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <div class="text-end">
                <div class="fw-bold text-primary mb-1">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="btn btn-sm text-danger remove-btn p-0" data-id="${item.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Update Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalContainer.textContent = `$${total.toFixed(2)}`;

    // Listeners for newly added remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').dataset.id);
            removeFromCart(id);
        });
    });
}
