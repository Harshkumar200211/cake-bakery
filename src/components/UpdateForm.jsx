import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../css/UpdateForm.css';
 // Import the toast function from react-toastify

const UpdateForm = ({ user, onUpdate }) => {
    const [userData, setUserData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/signupdata/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                // Update user data in the parent component after successful update
                onUpdate(userData);
                toast.success("User updated successfully"); // Use the toast function for success message
            } else {
                throw new Error("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user: ", error);
            toast.error("An error occurred. Please try again."); // Use the toast function for error message
        }
    };

    return (
        <div className="update-form">
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Update</button>
                    <button type="button" onClick={() => onUpdate(null)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateForm;
