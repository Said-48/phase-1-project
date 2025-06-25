// DOM elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const booksContainer = document.getElementById("books");
const cartList = document.getElementById("cart-list");
const totalPriceElement = document.getElementById("total-price");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const checkoutBtn = document.getElementById("checkout-btn")

let cart = [];
let total = 0;

// opereting the search bar
searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();

    if (query) {
        const books = await fetchBooks(query);
        displayBooks(books);
    }
});

// Fetch books from API(openlibrary)
async function fetchBooks(query) {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
        const data = await response.json();
        return data.docs
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}

// display books 
function displayBooks(books) {
    booksContainer.innerHTML = "";

    books.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";

        const title = book.title || "No title";
        const priceKES = 500
        const author = book.author_name ? book.author_name.join(", ") : "Unknown";
        const coverId = book.cover_i;
        const imageUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : "https://via.placeholder.com/150x200?text=No+Cover";

        bookCard.innerHTML = `
            <img src="${imageUrl}" alt="${title}" width="150" height="200"/>
            <h3>${title}</h3>
            <p><i>${author}</i></p>
            <p>Price: KES ${priceKES}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        // Add eventlistener for cart button
        bookCard.querySelector(".add-to-cart").addEventListener("click", () => {
            addToCart(title);
        });

        booksContainer.appendChild(bookCard);
    });
}
// add book to cart
function addToCart(title) {
    cart.push(title);
    total += 500; // all books are Ksh 500
    displayCart();
}

// display the cart
function displayCart() {
    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = "<li>No items in cart yet.</li>";
    } else {
        cart.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            cartList.appendChild(li);
        });
    }

    totalPriceElement.textContent = total;
}

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Change button text either from darl or light mode
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "Light mode";
    } else {
        darkModeToggle.textContent = "Dark mode";
    }
});


//  Checkout function alert
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some books first.");
    } else {
        alert(`Thank you for your purchase☺️! Your Total is KES: ${total}.`);

        cart = [];
        total = 0;
        displayCart();
    }
});

