import React, { useState } from 'react';
import Header from './Header'; 
import './Feedback.css';
import {API_BASE_URL_HF} from '../apiConfig';


const Feedback = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
    scale: 10,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL_HF}/feedback/send-feedback`, {  // Update with full API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          setSubmitted(true);
          // Optionally reset form data here if needed
          setFormData({
            email: '',
            subject: '',
            message: '',
            scale: 10,
          });
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("There was an error submitting your feedback. Please try again later.");
      });
  };

  if (submitted) {
    return (
      <div>
        <Header />
        <h2>Thank you for your feedback! We appreciate your input.</h2>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="feedback-container">
        <h1>Feedback Form</h1>
        <p>Your feedback is valuable to us. Please fill out the form below.</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          
          <label>Subject</label>
          <input 
            type="text" 
            name="subject" 
            value={formData.subject}
            onChange={handleChange}
            required 
          />
          
          <label>Message</label>
          <textarea 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            required 
          />
          
          <label>Rate us (1-10)</label>
          <input 
            type="number" 
            name="scale" 
            value={formData.scale}
            onChange={handleChange}
            min="1" 
            max="10" 
            required 
          />
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
