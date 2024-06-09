import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Messages() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/msg')
      .then(response => response.json())
      .then(data => {
        setRequests(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        toast.error("Data not found");
      });
  };

  const handleAccept = () => {
    toast.success("Request Accepted");
  };

  const handleReject = async (id) => {
    try {
        const confirmed = window.confirm("Are you sure you want to reject this request?");
        if (!confirmed) {
            return; 
        }
        const response = await fetch(`http://localhost:5000/msg/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error("Failed to delete item");
        }
        setRequests(requests.filter(request => request.id !== id));
        toast.success("Request rejected successfully");
    } catch (error) {
        console.error("Error rejecting request: ", error);
        toast.error("An error occurred. Please try again.");
    }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10 max-w-xs sm:max-w-md lg:max-w-lg w-full">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center text-white bg-[#B5C18E] p-2 rounded-lg">
          USER REQUESTS
        </h1>
        <div className="space-y-6">
          {requests.map((request) => (
            <div key={request.id} className="bg-gray-200 rounded-lg p-6">
              <div className="space-y-2">
                <div className="text-lg font-semibold">
                  <p>Name: {request.name}</p>
                </div>
                <div className="text-lg font-semibold">
                  <p>Email: {request.email}</p>
                </div>
                <div className="text-lg font-semibold">
                  <p>Description: {request.Description}</p>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleAccept}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messages;
