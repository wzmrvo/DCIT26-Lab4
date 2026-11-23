const CATEGORY_ICONS = {
  Electronics: "🖱️",
  Books: "📚",
  "School Supplies": "✏️",
  Accessories: "🎒",
};

function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children,
}) {
  const formattedPrice = price.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  const icon = CATEGORY_ICONS[category] ?? "🛍️";
  const categoryClass = `cat-${category.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div
      className={`product-card ${categoryClass} ${inStock ? "" : "out-of-stock"}`}
    >
      {children && <div className="badge">{children}</div>}
      <div className="thumb" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p className="category">{category}</p>
      <p className="price">{formattedPrice}</p>
      <p className={inStock ? "stock in" : "stock out"}>
        {inStock ? "In Stock" : "Out of Stock"}
      </p>
      {inStock && <p className="ship">🚚 Free campus pick-up</p>}
      <button disabled={!inStock} onClick={() => onAddToCart(title)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
