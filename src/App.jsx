import { useState, useEffect } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  // Cart state (from Lab 3)
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");
  const [theme, setTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  // Lab 4 state
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  const handleAddToCart = (title) => {
    setCartCount((count) => count + 1);
    setLastAdded(title);
  };

  // Debounce: only the final pause in typing updates debouncedSearch.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);
    return () => clearTimeout(timer); // cleanup cancels the previous timer
  }, [searchText]);

  // Derived list: calculated during render, not stored in state.
  const keyword = debouncedSearch.trim().toLowerCase();
  let filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(keyword) &&
      (category === "All" || p.category === category)
  );

  // Copy before sorting so the original products array is never changed.
  if (sortOrder === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  // Tab title follows the number of results.
  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
  }, [filteredProducts.length]);

  const handleClear = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  };

  const badges = { 1: "New", 8: "Sale" };

  return (
    <div className="theme-root" data-theme={theme}>
      <div className="announce">
        🚚 Free campus pick-up · 🔒 Secure checkout · ↩️ Easy returns
      </div>

      <div className="app">
        <header className="header">
          <div className="brand">
            <span className="logo" aria-hidden="true">
              🛍️
            </span>
            <div>
              <h1>CvSU Mini Store</h1>
              <p>School and tech essentials for every student</p>
            </div>
          </div>

          <div className="header-actions">
            <span className="cart-chip" aria-label={`Cart: ${cartCount} items`}>
              🛒 Cart <strong>{cartCount}</strong>
            </span>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        <p className="cart-message" key={cartCount}>
          {cartCount === 0
            ? "Your cart is empty."
            : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}
        </p>

        <SearchBar
          searchText={searchText}
          onSearchChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onClear={handleClear}
        />

        <div className="section-head">
          <h2>Shop Products</h2>
          <p className="result-count">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="empty-state">
            No products found. Try a different keyword or category.
          </p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                title={p.title}
                price={p.price}
                category={p.category}
                inStock={p.inStock}
                onAddToCart={handleAddToCart}
              >
                {badges[p.id] && <span>{badges[p.id]}</span>}
              </ProductCard>
            ))}
          </div>
        )}

        <footer className="footer">
          <div className="trust-row">
            <span>🚚 Free campus pick-up</span>
            <span>🔒 Secure checkout</span>
            <span>↩️ Easy returns</span>
            <span>💬 Student support</span>
          </div>
          <p>CvSU Mini Store · DCIT26</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
