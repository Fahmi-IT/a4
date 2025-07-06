import React, { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { CartContext } from "./contexts/CartContext";
import nintendo_switch_2 from "./assets/nintendo_switch_2.png"
import "./App.css";

const dummyProducts = [
  { id: 1, description: "A Nintendo Switch 2 console.", name: "Nintendo Switch 2", price: 700, available: false, brand: "Nintendo", type: "Console", img: nintendo_switch_2}, 
  { id: 2, description: "A refurbished Nintendo Gamecube console.", name: "Nintendo Gamecube", price: 100, available: true, brand: "Nintendo", type: "Console", img: "/assets/nintendo_gamecube.png"}, 
  { id: 3, description: "A Nintendo Switch 2 Pro Controller. Includes 2 additional buttons.", name: "Nintendo Switch 2 Pro Controller", price: 100, available: true, brand: "Nintendo", type: "Accessory", img: "/assets/nintendo_pro.png"}, 
  { id: 4, description: "The latest entry in the Mario Kart series. New tracks, new racers, and new modes!", name: "Mario Kart World", price: 100, available: true, brand: "Nintendo", type: "Game", img: "/assets/mkw.png"}, 
  { id: 5, description: "A Nintendo Switch Online subscription, allowing the user to get access to a library of retro games and online play.", name: "Nintendo Switch Online Subscription (3 Months)", price: 80, available: true, brand: "Nintendo", type: "Digital", img: "/assets/nintendo_online.png"}, 
  { id: 6, description: "The latest console in the Playstation family. Can run most games at high resolution and good framerate. Has access to PS exclusives.", name: "Playstation 5", price: 400, available: true, brand: "Playstation", type: "Console", img: "/assets/ps5.png"}, 
  { id: 7, description: "The console that took the 21st century by storm when it first released. The PS2 is an iconic entry in the series.", name: "Playstation 2", price: 100, available: true, brand: "Playstation", type: "Console", img: "/assets/ps2.png"}, 
  { id: 8, description: "A blue controller for the Playstation 4.", name: "PS4 Controller (Blue)", price: 60, available: true, brand: "Playstation", type: "Accessory", img: "/assets/ps4_blue.png"}, 
  { id: 9, description: "A subscription to Playstation Plus, which provides free access to games and online play.", name: "Playstation Plus Subscription (1 Month)", price: 12, available: true, brand: "Playstation", type: "Digital", img: "/assets/ps_plus.png"}, 
  { id: 10, description: "The sequel to the critically acclaimed Sly Cooper.", name: "Sly Cooper 2: Band of Thieves", price: 30, available: true, brand: "Playstation", type: "Game", img: "/assets/sl2.png"}, 
  { id: 11, description: "A modern entry in the Xbox family, the Xbox One modernized gaming and was a first step in modern gaming.", name: "Xbox One", price: 400, available: true, brand: "Xbox", type: "Console", img: "/assets/xbox_one.png"}, 
  { id: 12, description: "An accessory that provides camera support to the Xbox 360.", name: "Xbox Kinect Camera", price: 20, available: true, brand: "Xbox", type: "Accessory", img: "/assets/xbox_kinect.png"}, 
  { id: 13, description: "An iconic console, a defining piece of hardware in its generation, the Xbox 360 is a staple of an older time.", name: "Xbox 360", price: 100, available: true, brand: "Xbox", type: "Console", img: "/assets/xbox360.png"}, 
  { id: 14, description: "A subscription to Xbox Gold, which provides free access to games and online play.", name: "Xbox Gold Subscription (12 Months)", price: 80, available: true, brand: "Xbox", type: "Digital", img: "/assets/xbox_gold.png"}, 
  { id: 15, description: "from an iconic franchise, Halo CE is a game that cannot be overlooked. Combines FPS with fantasy.", name: "Halo: Combat Evolved", price: 30, available: true, brand: "Xbox", type: "Game", img: "/assets/halo_ce.png"},
  { id: 16, description: "An older console from a forgotten era, the Sega Genesis was one of Sega's finest works.", name: "Sega Genesis", price: 80, available: true, brand: "Sega", type: "Console", img: "/assets/sega_genesis.png"} 
];

const brands = ["All", "Playstation", "Xbox", "Nintendo", "Sega"];
const types = ["All", "Console", "Game", "Accessory", "Digital"];
const sortOptions = ["Price ↑", "Price ↓", "Name A-Z", "Name Z-A"];

export default function Marketplace() {
  const [searchParams] = useSearchParams();
  const preselectedBrand = searchParams.get("brand");
  const [brand, setBrand] = useState(preselectedBrand || "All");
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const ratings = ["E", "T", "M", "AO", "RP"];
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [type, setType] = useState("All");
  const [sortMode, setSortMode] = useState(0);
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesBrand = brand === "All" || product.brand === brand;
    const matchesType = type === "All" || product.type === type;
    const matchesPrice = product.price <= maxPrice;
    const matchesAvailability = !onlyAvailable || product.available;
    const matchesRating = !rating || (product.type === "Game" && product.rating === rating);
    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesType &&
      matchesPrice &&
      matchesRating && 
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

  const openPopup = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      closePopup();
    }
  };

  return (
  <div className="marketplace">
    <h1 className="marketplace-header">Marketplace</h1>

    <div className="marketplace-content">
      {/* Sidebar Filters */}
      <div className="filters-sidebar">
        <h3>Filters</h3>

        <div className="filter-group">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">All Ratings</option>
            {ratings.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Brand:</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Max Price: ${maxPrice}</label>
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={() => setOnlyAvailable(!onlyAvailable)}
            />
            In Stock Only
          </label>
        </div>

        <div className="filter-group">
          <button className="sort-button" onClick={toggleSort}>
            Sort: {sortOptions[sortMode]}
          </button>
        </div>
      </div>

      {/* Product Grid */}
<div className="product-grid">
  {sortedProducts.map((product) => (
    <div
      key={product.id}
      className="card"
      onClick={() => openPopup(product)}
    >
      <div className="card-image-container">
      <img src={product.img} alt={product.name} style={{ borderRadius: "12px" }}/>
      </div>
      <div clasName="card-info">
      <h2>{product.name}</h2>
      {product.available ? (
        <button
          className="cta"
          onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
          }}
        >
          Buy Now
        </button>
      ) : (
        <span className="out-of-stock">Out of Stock</span>
      )}
      </div>
    </div>
  ))}
</div>
{selectedProduct && (
  <div className="popup-overlay" onClick={handleOutsideClick}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={closePopup}>
        &times;
      </button>

      <div className="popup-body">
        <div className="popup-details">
          <h2>{selectedProduct.name}</h2>
          <p><strong>Brand:</strong> {selectedProduct.brand}</p>
          <p><strong>Type:</strong> {selectedProduct.type}</p>
          <p><strong>Description:</strong> {selectedProduct.description || "No description available."}</p>
          <p><strong>Price:</strong> ${selectedProduct.price}</p>

          {selectedProduct.available ? (
            <button
              className="cta"
              onClick={() => {
                addToCart(selectedProduct);
                closePopup();
              }}
            >
              Buy Now
            </button>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>

        <div className="popup-image-container">
          <img
            src={selectedProduct.img || "/assets/placeholder.jpg"}
            alt={selectedProduct.name}
            className="popup-product-image"
          />
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  </div>
);
}