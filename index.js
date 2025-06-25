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
