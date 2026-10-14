// Product Data

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        image: "https://placehold.co/300x200/e8edff/253b80?text=Headphones"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        image: "https://placehold.co/300x200/e8edff/253b80?text=Smart+Watch"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 999,
        image: "https://placehold.co/300x200/e8edff/253b80?text=Speaker"
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 799,
        image: "https://placehold.co/300x200/e8edff/253b80?text=Backpack"
    },
    {
        id: 5,
        name: "Wireless Mouse",
        price: 599,
        image: "https://placehold.co/300x200/e8edff/253b80?text=Mouse"
    },
    {
        id: 6,
        name: "USB Keyboard",
        price: 899,
        image: "https://placehold.co/300x200/e8edff/253b80?text=Keyboard"
    }
];

// Shopping Cart

let cart = [];

// Display Products Dynamically

function displayProducts() {
    const productList = document.getElementById("productList");

    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p class="price">₹${product.price}</p>

            <button class="add-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

// Add Product to Cart

function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    alert(product.name + " added to cart!");
}

// Increase Quantity

function increaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    }

    updateCart();
}

// Decrease Quantity

function decreaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity--;

        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }

    updateCart();
}

// Remove Product

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update Cart

function updateCart() {
    const cartItems = document.getElementById("cartItems");

    const itemCount = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cartCount").textContent = itemCount;
    document.getElementById("totalPrice").textContent = total;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <div>
                <button onclick="decreaseQuantity(${item.id})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button class="remove-btn"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        </div>
    `).join("");
}

// Show or Hide Cart

function toggleCart() {
    const cartSection = document.getElementById("cartSection");

    if (cartSection.style.display === "block") {
        cartSection.style.display = "none";
    } else {
        cartSection.style.display = "block";
        cartSection.scrollIntoView({ behavior: "smooth" });
    }
}

// Open Checkout Modal

function openCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add products.");
        return;
    }

    const checkoutItems = document.getElementById("checkoutItems");

    checkoutItems.innerHTML = cart.map(item => `
        <p>
            ${item.name} × ${item.quantity}
            = ₹${item.price * item.quantity}
        </p>
    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("checkoutTotal").textContent = total;

    document.getElementById("checkoutModal").style.display = "flex";
}

// Close Checkout Modal

function closeCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
}

// Confirm Order

function confirmOrder() {
    alert("🎉 Order placed successfully! Thank you for shopping!");

    cart = [];

    updateCart();
    closeCheckout();

    document.getElementById("cartSection").style.display = "none";
}

// Close modal when clicking outside

window.addEventListener("click", function(event) {
    const modal = document.getElementById("checkoutModal");

    if (event.target === modal) {
        closeCheckout();
    }
});

// Close modal with Escape key

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeCheckout();
    }
});

// Load Products

displayProducts();
updateCart();