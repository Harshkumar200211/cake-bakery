import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#B5C18E' }}>Admin Login</h2>
                <form onSubmit={handleAdmin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span>:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-2 px-4 bg-red-400 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{ backgroundColor: '#B5C18E' }}>
                            Admin Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Admin;
