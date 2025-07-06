import React from "react";
import { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Marketplace from "./marketplace";
import CartPage from "./CartPage";
import Navbar from "./components/Navbar";
import PaymentPage from "./PaymentPage";
import ReviewPage from "./ReviewPage";
import "./App.css";

const slides = [
  {
    id: 1,
    title: "One Stop Shop",
    subtitle: "for all your gaming needs.",
    image: "/assets/slide1_new.png",
  },
  {
    id: 2,
    title: "Old and New",
    subtitle: "We have it all.",
    image: "/assets/slide2_new.png",
  },
  {
    id: 3,
    title: "Niche?",
    subtitle: "No problem.",
    image: "/assets/slide3_new.png",
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

const Card = ({ className, image, brand, bgColor, height }) => {
  const navigate = useNavigate();

  const handleBrandClick = (brand) => {
    navigate("/marketplace", { state: { preselectedBrand: brand } });
  };

  return (
  <Link to={`/marketplace?brand=${encodeURIComponent(brand)}`} className="card-link">
    <div className="card" onClick={() => handleBrandClick({brand})} style={{ backgroundColor: bgColor, height: height }}>
      <img src={image} alt={`${brand} logo`} className={className} />
    </div>
  </Link>
);
}

<Navbar />

const Home = () => {
  const [newsletterForm, setNewsletterForm] = useState({ name: "", email: "" });

  const handleNewsletterChange = (e) => {
    setNewsletterForm({ ...newsletterForm, [e.target.name]: e.target.value });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // You can add validation here if needed

    // Show alert
    alert("Thank you for subscribing to our newsletter.");

    // Clear form
    setNewsletterForm({ name: "", email: "" });
  };

  return (
  <>
    <SlideShow />
    <div className="shop-now-container">
      <Link to="/marketplace" className="shop-now-button">
        Shop Now
      </Link>
    </div>
    <div className="section-header">
      <h2>Popular Brands</h2>
      <div className="underline-accent"></div>
    <section className="product-grid-home">
      <Card className="playstation-logo" image="/assets/ps_clean.png" brand="Playstation" bgColor="rgb(14, 14, 116)" />
      <Card className="nintendo-logo" image="/assets/nintendo_logo_clean.png" brand="Nintendo" bgColor="red" height="200px" />
      <Card className="xbox-logo" image="/assets/xbox_clean.png" brand="Xbox" bgColor="green" />
    </section>
    </div>
    <div className="split-section">
  {/* Left side: Review button */}
  <div className="split-left">
    <h3 className="leave-review">Enjoyed shopping?</h3>
    <Link to="/review" className="review-button">
      Leave a Review
    </Link>
    <h3 className="leave-review">Help us Improve!</h3>
  </div>

  <div className="vertical-divider"></div>

  {/* Right side: Newsletter form */}
  <div className="split-right">
    <h3 className="newsLetter">Join Our Newsletter</h3>
    <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
    <input
      type="text"
      name="name"
      value={newsletterForm.name}
      onChange={handleNewsletterChange}
      placeholder="Your name"
      required
    />
    <input
      type="email"
      name="email"
      value={newsletterForm.email}
      onChange={handleNewsletterChange}
      placeholder="Your Email"
      required
    />
  <button type="submit" className="signup-button">
    Sign Up
  </button>
</form>
  </div>
</div>
  </>
);
}

export default function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowSplash(true);
      localStorage.setItem("hasVisited", "true");
    }
    setShowSplash(true);
  }, []);

  const handleLogoClick = () => {
    setGlow(true);
    // Glow duration 0.6s, then start fade out
    setTimeout(() => {
      setFadeOut(true);
    }, 600);
    // After fade out ends, hide splash
    setTimeout(() => {
      setShowSplash(false);
      setFadeOut(false);
      setGlow(false);
    }, 1600); // 600 + 1000 (glow + fade-out)
  };

  if (showSplash) {
    return (
      <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
        <button
          className={`logo-button ${glow ? "glow" : ""}`}
          onClick={handleLogoClick}
        >
          <img src="/assets/neo_icon.png" alt="NeoStore Logo" />
        </button>
      </div>
    );
  }
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