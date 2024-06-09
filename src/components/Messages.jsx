import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Messages.css';

function Messages() {
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
    <div className="messages-container">
      <h1 className="messages-title">USER REQUESTS</h1>
      <div className="requests-container">
        {requests.map((request) => (
          <div key={request.id} className="request-card">
            <div className="request-details">
              <p className="request-label">Name:</p>
              <p className="request-info">{request.name}</p>
            </div>
            <div className="request-details">
              <p className="request-label">Email:</p>
              <p className="request-info">{request.email}</p>
            </div>
            <div className="request-details">
              <p className="request-label">Description:</p>
              <p className="request-info">{request.Description}</p>
            </div>
            <div className="button-container">
              <button
                className="accept-button"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="reject-button"
                onClick={() => handleReject(request.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
