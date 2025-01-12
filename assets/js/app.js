// Fetch product data and handle user interactions for the shopping cart
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartDisplay = document.getElementById('cart-display');
    const totalDisplay = document.getElementById('total-display');
    const checkoutButton = document.getElementById('checkout-button');

    let cart = [];

    // Fetch products from a local JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error('Error fetching products:', error));

    function displayProducts(products) {
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('card', 'product-container', 'mb-3');
            productItem.innerHTML = `
                <div class="row g-0">
                    <div class="col-3">
                        <img src="/assets/img/products/product-1.png" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-9">
                        <div class="card-body">
                            <h5 class="card-title product-name mb-1">${product.name}</h5>
                            <p class="card-text product-price mb-0">$${product.price.toFixed(2)}</p> 
                            <button class="add-to-cart btn btn-info" data-id="${product.id}">Add to Cart</button>                             
                        </div>
                    </div>
                </div>
            `;
            productList.appendChild(productItem);
        });
        attachAddToCartListeners();
    }

    function attachAddToCartListeners() {
        const buttons = document.querySelectorAll('.add-to-cart');
        buttons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

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
        cartDisplay.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            const itemTotal = product.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <p>${product.name} - $${product.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartDisplay.appendChild(cartItem);
        });

        totalDisplay.innerText = `Total: $${total.toFixed(2)}`;
        attachRemoveItemListeners();
    }

    function attachRemoveItemListeners() {
        const buttons = document.querySelectorAll('.remove-item');
        buttons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    function removeFromCart(event) {
        const productId = event.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
    }

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Proceeding to checkout...');
            // Implement checkout logic here
        }
    });
});