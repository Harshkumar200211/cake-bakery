import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../css/AddUserForm.css';

const AddUserForm = ({ onSubmit, onCancel }) => {
    const [userData, setUserData] = useState({
        email: '',
        username: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(userData);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label className="form-label" htmlFor="email">
                    Email
                </label>
                <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="username">
                    Username
                </label>
                <input
                    className="form-input"
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="phone">
                    Phone
                </label>
                <input
                    className="form-input"
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="address">
                    Address
                </label>
                <textarea
                    className="form-textarea"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                />
            </div>
            <div className="form-buttons">
                <button type="submit" className="submit-button">Submit</button>
                <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
            </div>
        </form>
    );
};

export default AddUserForm;
