import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUserForm from './AddUserForm';
import UpdateForm from './UpdateForm'; // Import the UpdateForm component

const Data = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const location = useLocation();
    const { admin } = location.state || {};

    useEffect(() => {
        if (!admin) {
            toast.error("Please login as admin");
            navigate("/admin");
            return;
        }

        fetchData();
    }, [admin, navigate]);

    const fetchData = () => {
        fetch('http://localhost:5000/signupdata')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                toast.error("Data not found");
            });
    };

    const handleRemove = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to remove this user?");
            if (!confirmed) {
                return;
            }
            const response = await fetch(`http://localhost:5000/signupdata/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error("Failed to delete item");
            }
            setData(data.filter(item => item.id !== id));
            toast.success("User removed successfully");
        } catch (error) {
            console.error("Error removing user: ", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleUpdateUser = (user) => {
        setSelectedUser(user);
    };

    const handleRequest = () => {
        navigate('/messages');
    };

    const handleAddUser = () => {
        setShowAddForm(true);
    };

    const handleAddUserSubmit = async (userData) => {
        try {
            const response = await fetch(`http://localhost:5000/signupdata`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error("Failed to add user");
            }
            const newUser = await response.json();
            setData([...data, newUser]);
            setShowAddForm(false);
            toast.success("User added successfully");
        } catch (error) {
            console.error("Error adding user: ", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#B5C18E' }}>Data Table</h1>
            <button onClick={handleRequest} className="mb-4 float-right mr-12 bg-green-400 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">User Requests</button>
            <button onClick={handleAddUser} className="mb-4 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">Add User</button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <p><strong>ID:</strong> {item.id}</p>
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Username:</strong> {item.username}</p>
                        <p><strong>Phone:</strong> {item.phone}</p>
                        <p><strong>Address:</strong> {item.address}</p>
                        <div className="mt-2">
                            <button onClick={() => handleRemove(item.id)} className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">Remove</button>
                            <button onClick={() => handleUpdateUser(item)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded">Update</button>
                        </div>
                    </div>
                ))}
            </div>

            {showAddForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <AddUserForm onSubmit={handleAddUserSubmit} onCancel={() => setShowAddForm(false)} />
                </div>
            )}

            {selectedUser && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <UpdateForm user={selectedUser} onUpdate={() => setSelectedUser(null)} />
                </div>
            )}
        </div>
    );
};

export default Data;
