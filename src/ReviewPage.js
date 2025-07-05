import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

export default function ReviewPage() {
  const [form, setForm] = useState({
    name: "",
    rating: "",
    comments: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to a backend here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="review-page">
        <h1>Thank You!</h1>
        <p>Your feedback has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="review-page">
      <h1>Leave a Review</h1>
      <form onSubmit={handleSubmit} className="review-form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Rating (1 to 5)
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={form.rating}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Comments
          <textarea
            name="comments"
            rows="4"
            value={form.comments}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-review-btn">
          Submit Review
        </button>
      </form>
    </div>
  );
}