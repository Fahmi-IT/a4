import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./App.css";


export default function ReviewPage() {
  const [form, setForm] = useState({ name: "", rating: 5, feedback: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStarClick = (rating) => {
    setForm({ ...form, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        navigate("/");
    }, 3000);
  };

  return (
    <div className="review-page">
      <div className="review-container">
        {!submitted ? (
          <>
            <h1 className="review-title">Leave a Review</h1>
            <form onSubmit={handleSubmit} className="review-form">
              <label>
                Name: <br />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Rating: <br />
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const labels = {
                      1: "1 - Terrible",
                      2: "2 - Poor",
                      3: "3 - Okay",
                      4: "4 - Good",
                      5: "5 - Excellent",
                    };
                    return (
                      <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        title={labels[star]}
                        className={star <= form.rating ? "star selected" : "star"}
                        onClick={() => handleStarClick(star)}
                      />
                    );
                  })}
                </div>
              </label>

              <label>
                Feedback: <br />
                <textarea
                  name="feedback"
                  value={form.feedback}
                  onChange={handleChange}
                  required
                />
              </label>

              <button type="submit" className="cta">Submit</button>
            </form>
          </>
        ) : (
          <div className="review-thankyou glow-fade">
            <h2>Thank you for your feedback!</h2>
            <p>We appreciate your input.</p>
          </div>
        )}
        {submitted && (
          <p className="redirect-message">
            Redirecting to home...
          </p>
        )}
      </div>
    </div>
  );
}