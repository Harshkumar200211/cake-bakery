import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Update.css';

const Update = () => {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const handleUpdate = async () => {
    const updatedUser = { ...user, email, username, phone, address };
    try {
      await axios.put(`http://localhost:5000/signupdata/${user.id}`, updatedUser);
      setUser(updatedUser);
      toast.success('Profile updated successfully');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div className="update-container">
      <div className="update-form">
        <h2 className="update-title">Update Profile</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={() => navigate('/profile')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
