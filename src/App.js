import React from "react";
import { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Marketplace from "./marketplace";
import CartPage from "./CartPage";
import Navbar from "./components/Navbar";
import PaymentPage from "./PaymentPage";
import ReviewPage from "./ReviewPage";
import "./App.css";

const slides = [
  {
    id: 1,
    title: "Introducing the Future",
    subtitle: "Tech reimagined",
    image: "/assets/slide1.jpg",
  },
  {
    id: 2,
    title: "Modular. Minimal. Mighty.",
    subtitle: "Customize your power",
    image: "/assets/slide2.jpg",
  },
  {
    id: 3,
    title: "Performance that adapts",
    subtitle: "Smarter tools, brighter future",
    image: "/assets/slide3.jpg",
  },
];

const SlideShow = () => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="slideshow">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`slide ${i === index ? "active" : i === prevIndex ? "prev" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Card = ({ title, description, image }) => (
  <div className="card">
    <img src={image} alt={title} />
    <h2>{title}</h2>
    <p>{description}</p>
    <button className="cta">Buy Now</button>
  </div>
);

<Navbar />

const Home = () => (
  <>
    <SlideShow />
    <section className="product-grid">
      <Card
        title="Ultra Laptop"
        description="Powerful. Customizable. Portable."
        image="/assets/product1.jpg"
      />
      <Card
        title="Modular Dock"
        description="Expand your workspace your way."
        image="/assets/product2.jpg"
      />
      <Card
        title="Performance Kit"
        description="Supercharge your experience."
        image="/assets/product3.jpg"
      />
    </section>
  </>
);

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}