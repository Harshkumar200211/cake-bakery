import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaAddressCard } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const userData = { email, username, password, phone, address };
    try {
      const response = await axios.get('http://localhost:5000/signupdata');
      const users = response.data;
      const emailExists = users.some(user => user.email === email);

      if (emailExists) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        await axios.post('http://localhost:5000/signupdata', userData);
        toast.success("User SignUp Successfully");
        setEmail('');
        setUsername('');
        setPassword('');
        setPhone('');
        setAddress('');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Failed to sign up. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-icon">
              <FaEnvelope className="icon" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-icon">
              <FaUser className="icon" />
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <FaLock className="icon" />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <div className="input-icon">
              <FaPhone className="icon" />
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <div className="input-icon">
              <FaAddressCard className="icon" />
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={handleSignUp}>Sign Up</button>
            <Link to="/signin">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
