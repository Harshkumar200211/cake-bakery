import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Admin.css';

const Admin = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleAdmin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/admin");
            const data = await response.json();
            const admin = data.find(var1 => var1.username === username && var1.password === password);
            if (admin) {
                toast.success("Admin Login Successfully");
                navigate("/data", { state: { admin: admin } });
            } else {
                toast.error("Invalid username or password");
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <h2 className="title">Admin Login</h2>
                <form onSubmit={handleAdmin} className="form">
                    <div className="form-group">
                        <label htmlFor="username" className="label">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="label">Password <span className="required">*</span>:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div>
                        <button type="submit" className="button">
                            Admin Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Admin;
