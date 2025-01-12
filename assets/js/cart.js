let cart = [];

function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity++;
    } else {
        const newProduct = { id: productId, quantity: 1 };
        cart.push(newProduct);
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartDisplay = document.getElementById('cart-display');
    cartDisplay.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h5 class="cart-item-name">${product.name}</h5>
                <p class="cart-item-price">$${product.price.toFixed(2)} x ${item.quantity}</p>
                <p class="cart-item-total">Total: $${itemTotal.toFixed(2)}</p>
                <button class="remove-from-cart btn btn-danger" data-id="${product.id}">Remove</button>
            </div>
        `;
        cartDisplay.appendChild(cartItem);
    });

    const totalDisplay = document.createElement('div');
    totalDisplay.classList.add('cart-total');
    totalDisplay.innerHTML = `<h5>Total: $${total.toFixed(2)}</h5>`;
    cartDisplay.appendChild(totalDisplay);

    attachRemoveFromCartListeners();
}

function attachRemoveFromCartListeners() {
    const buttons = document.querySelectorAll('.remove-from-cart');
    buttons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function removeFromCart(event) {
    const productId = event.target.getAttribute('data-id');
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}

document.getElementById('clear-cart').addEventListener('click', clearCart);