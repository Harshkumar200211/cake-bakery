import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaEdit, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || name === "" || description === "") {
      alert("Please fill all the fields");
    } else {
      try {
        const response = await fetch('http://localhost:5000/msg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            Description: description // Corrected key to match your JSON structure
          })
        });
        if (response.ok) {
          toast.success("Success! Your message has been sent successfully to the admin");
          navigate('/'); // Navigate back to the home page
        } else {
          toast.error("Failed to send message");
        }
      } catch (error) {
        toast.error("Server Error");
      }
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h2 className="contact-title">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <div className="input-wrapper">
              <FaEdit className="input-icon" />
              <textarea
                id="message"
                name="message"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your message"
                className="form-input form-textarea"
                required
              />
            </div>
          </div>
          <div className="form-button-container">
            <button type="submit" className="form-button">
              Submit <FaPaperPlane className="button-icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
