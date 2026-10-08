/* =========================
   COLOMONATI MINI STORE
========================= */


/* =========================
   PRODUCTS
========================= */

const products = [

    {
        id: 1,
        name: "Wireless Earbuds",
        category: "electronics",
        price: 24.99,
        icon: "fa-solid fa-headphones",
        description: "Clear sound with a compact wireless design.",
        badge: "Popular"
    },

    {
        id: 2,
        name: "Smart Watch Pro",
        category: "electronics",
        price: 45.00,
        icon: "fa-solid fa-clock",
        description: "Track your day with a modern smart watch.",
        badge: "New"
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "fashion",
        price: 32.50,
        icon: "fa-solid fa-shoe-prints",
        description: "Comfortable everyday shoes built for movement.",
        badge: "Popular"
    },

    {
        id: 4,
        name: "Classic Hoodie",
        category: "fashion",
        price: 29.99,
        icon: "fa-solid fa-shirt",
        description: "A comfortable hoodie for everyday style.",
        badge: ""
    },

    {
        id: 5,
        name: "Skincare Set",
        category: "beauty",
        price: 18.99,
        icon: "fa-solid fa-spa",
        description: "A simple skincare collection for your routine.",
        badge: "New"
    },

    {
        id: 6,
        name: "Perfume Collection",
        category: "beauty",
        price: 26.50,
        icon: "fa-solid fa-spray-can-sparkles",
        description: "Fresh and elegant fragrances for every occasion.",
        badge: ""
    },

    {
        id: 7,
        name: "Modern Lamp",
        category: "home",
        price: 22.99,
        icon: "fa-solid fa-lightbulb",
        description: "Give your room a clean modern touch.",
        badge: ""
    },

    {
        id: 8,
        name: "Travel Backpack",
        category: "home",
        price: 34.99,
        icon: "fa-solid fa-bag-shopping",
        description: "A practical backpack for work and travel.",
        badge: "Popular"
    }

];


/* =========================
   VARIABLES
========================= */

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category");
const noProducts = document.getElementById("noProducts");

const cartButton = document.getElementById("cartButton");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");


/* =========================
   CART
========================= */

let cart = JSON.parse(localStorage.getItem("colomonatiCart")) || [];


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(list) {

    productGrid.innerHTML = "";

    if (list.length === 0) {

        noProducts.style.display = "block";

        return;
    }

    noProducts.style.display = "none";


    list.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                ${product.badge
                    ? `<span class="product-badge">${product.badge}</span>`
                    : ""
                }

                <i class="${product.icon}"></i>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <span class="product-price">
                        $${product.price.toFixed(2)}
                    </span>

                    <button
                        class="add-cart"
                        data-id="${product.id}"
                        aria-label="Add ${product.name} to cart"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>

            </div>
        `;


        productGrid.appendChild(card);

    });


    document.querySelectorAll(".add-cart").forEach(button => {

        button.addEventListener("click", () => {

            const productId = Number(button.dataset.id);

            addToCart(productId);

        });

    });

}


/* =========================
   ADD TO CART
========================= */

function addToCart(productId) {

    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        const product = products.find(
            item => item.id === productId
        );

        if (!product) return;

        cart.push({
            id: product.id,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    openCart();

}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "colomonatiCart",
        JSON.stringify(cart)
    );

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>Add some products to get started.</p>

            </div>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "$0.00";

        return;
    }


    let total = 0;
    let itemCount = 0;


    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return;


        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;

        itemCount += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <i class="${product.icon}"></i>

            </div>


            <div>

                <h4>
                    ${product.name}
                </h4>

                <span class="cart-item-price">
                    $${product.price.toFixed(2)}
                </span>


                <div class="quantity-controls">

                    <button
                        class="decrease"
                        data-id="${product.id}"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="increase"
                        data-id="${product.id}"
                    >
                        +
                    </button>

                </div>

            </div>


            <div>

                <strong>
                    $${itemTotal.toFixed(2)}
                </strong>

                <br>

                <button
                    class="remove-item"
                    data-id="${product.id}"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = itemCount;

    cartTotal.textContent =
        `$${total.toFixed(2)}`;


    addCartControls();

}


/* =========================
   CART CONTROLS
========================= */

function addCartControls() {


    document.querySelectorAll(".increase").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            const item = cart.find(
                item => item.id === id
            );

            if (item) {

                item.quantity++;

                saveCart();

                updateCart();

            }

        });

    });


    document.querySelectorAll(".decrease").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            const item = cart.find(
                item => item.id === id
            );

            if (!item) return;


            item.quantity--;


            if (item.quantity <= 0) {

                cart = cart.filter(
                    cartItem => cartItem.id !== id
                );

            }


            saveCart();

            updateCart();

        });

    });


    document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);


            cart = cart.filter(
                item => item.id !== id
            );


            saveCart();

            updateCart();

        });

    });

}


/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", filterProducts);


let selectedCategory = "all";


function filterProducts() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();


    const filteredProducts =
        products.filter(product => {

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm) ||

                product.description
                    .toLowerCase()
                    .includes(searchTerm);


            return matchesCategory && matchesSearch;

        });


    displayProducts(filteredProducts);

}


/* =========================
   CATEGORY FILTER
========================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        selectedCategory =
            button.dataset.category;


        filterProducts();

    });

});


/* =========================
   OPEN CART
========================= */

function openCart() {

    cartSidebar.classList.add("open");

    cartOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* =========================
   CLOSE CART
========================= */

function closeCartSidebar() {

    cartSidebar.classList.remove("open");

    cartOverlay.classList.remove("show");

    document.body.style.overflow = "";

}


cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("show");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("show");

    });

});


/* =========================
   CHECKOUT
========================= */

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty. Add a product first.");

        return;
    }


    alert(
        "Checkout demo: Your order is ready to be processed."
    );

});


/* =========================
   INITIALIZE
========================= */

displayProducts(products);

updateCart();