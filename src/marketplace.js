import React, { useState, useContext } from "react";
import { CartContext } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import "./App.css";

const dummyProducts = [
  { id: 1, name: "Laptop X", category: "Laptops", price: 1200, available: true, brand: "PC", type: "console" },
  { id: 2, name: "Portable Dock", category: "Accessories", price: 150, available: true, brand: "Nintendo", type: "accessory" },
  { id: 3, name: "Smart Mouse", category: "Accessories", price: 60, available: false, brand: "PC", type: "accessory" },
  { id: 4, name: "Workstation Pro", category: "Laptops", price: 2000, available: true, brand: "PC", type: "console" },
  { id: 5, name: "Gaming Pad", category: "Accessories", price: 100, available: true, brand: "Playstation", type: "accessory" },
  { id: 6, name: "Zelda: DLC Pack", category: "Games", price: 30, available: true, brand: "Nintendo", type: "digital" },
  { id: 7, name: "Sega Genesis Mini", category: "Consoles", price: 90, available: true, brand: "Sega", type: "console" }
];

const categories = ["All", "Laptops", "Accessories", "Games", "Consoles"];
const brands = ["All", "PC", "Playstation", "XBox", "Nintendo", "Sega"];
const types = ["All", "console", "accessory", "game", "digital"];
const sortOptions = ["Price ↑", "Price ↓", "Name A-Z", "Name Z-A"];

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [brand, setBrand] = useState("All");
  const [type, setType] = useState("All");
  const [sortMode, setSortMode] = useState(0);
  const { addToCart } = useContext(CartContext);

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesBrand = brand === "All" || product.brand === brand;
    const matchesType = type === "All" || product.type === type;
    const matchesPrice = product.price <= maxPrice;
    const matchesAvailability = !onlyAvailable || product.available;
    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesType &&
      matchesPrice &&
      matchesAvailability
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortMode) {
      case 0: return a.price - b.price;
      case 1: return b.price - a.price;
      case 2: return a.name.localeCompare(b.name);
      case 3: return b.name.localeCompare(a.name);
      default: return 0;
    }
  });

  const toggleSort = () => {
    setSortMode((prev) => (prev + 1) % sortOptions.length);
  };

  return (
    <div className="marketplace">

      <h1>Marketplace</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <label>Max Price: ${maxPrice}</label>

        <label>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={() => setOnlyAvailable(!onlyAvailable)}
          />
          In Stock Only
        </label>

        <button className="sort-button" onClick={toggleSort}>
          Sort: {sortOptions[sortMode]}
        </button>
      </div>

      <div className="product-grid">
        {sortedProducts.map((product) => (
          <div key={product.id} className="card">
            <img src="/assets/placeholder.jpg" alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>Type: {product.type}</p>
            <p>${product.price}</p>
            {!product.available && <span className="out-of-stock">Out of Stock</span>}
            <button
              className="cta"
              disabled={!product.available}
              onClick={() => addToCart(product)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
