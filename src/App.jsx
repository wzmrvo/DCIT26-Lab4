import { useState } from "react";
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
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  const handleAddToCart = (title) => {
    setCartCount((count) => count + 1);
    setLastAdded(title);
  };

  const handleClear = () => {
    setSearchText("");
    setCategory("All");
    setSortOrder("default");
  };

  // Derived list: calculated during render, not stored in state.
  const keyword = searchText.trim().toLowerCase();
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

  const badges = { 1: "New", 8: "Sale" };

  return (
    <div className="theme-root" data-theme={theme}>
      <div className="app">
        <header className="header">
          <div>
            <h1>CvSU Mini Store</h1>
            <p>Browse school and tech essentials</p>
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
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

        <p className="result-count">
          Showing {filteredProducts.length} of {products.length} products
        </p>

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

        <footer className="footer">CvSU Mini Store · DCIT26</footer>
      </div>
    </div>
  );
}

export default App;
