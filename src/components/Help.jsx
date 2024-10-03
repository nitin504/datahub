import React, { useState } from 'react';
import Header from './Header'; 
import './Help.css';

const Help = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
  };

  return (
    <div>
      <Header />
      <div className="help-container">
        <h1>How can I help?</h1>
        <p>Do you have a question? Just fill out the form fields below.</p>
        <form onSubmit={handleSubmit}>
          <label>I’d like to chat about...</label>
          <input 
            type="text" 
            name="topic" 
            placeholder="Your topic of discussion" 
            required 
          />
          
          <label>First Name</label>
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName}
            onChange={handleChange}
            required 
          />
          
          <label>Last Name</label>
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName}
            onChange={handleChange}
            required 
          />
          
          <label>Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          
          <label>Message (remember, short & sweet please)</label>
          <textarea 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            required 
          />
          
          <p>
            By clicking the button below, you consent for NP Digital and partners to use automated technology, including pre-recorded messages, cell phones and texts, and email to contact you at the number and email address provided. This includes if the number is currently on any Do Not Call Lists. This consent is not required to make a purchase. <a href="/privacy">Privacy Policy</a>.
          </p>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Help;
