// Profile.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPicture, fetchUserData } from './UserSlice';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import '../css/Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserData(user.id));
    }
  }, [user, dispatch]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        const pictureData = `data:image/jpeg;base64,${base64String}`;

        dispatch(setPicture(pictureData));

        // Save the picture in db.json
        fetch(`http://localhost:5000/signupdata/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ picture: pictureData }),
        })
          .then(response => response.json())
          .then(() => {
            toast.success('Uploaded your profile picture');
          })
          .catch((error) => {
            toast.error('Failed to upload profile picture');
            console.error('Error:', error);
          });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemovePicture = () => {
    const pictureData = null; // No picture

    dispatch(setPicture(pictureData));

    // Remove the picture in db.json
    fetch(`http://localhost:5000/signupdata/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ picture: pictureData }),
    })
      .then(response => response.json())
      .then(() => {
        toast.success('Removed your profile picture');
      })
      .catch((error) => {
        toast.error('Failed to remove profile picture');
        console.error('Error:', error);
      });
  };

  if (!user) {
    return <div>You are not signed in.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-heading">Profile</h2>
        <div>
          {userData.picture ? (
            <div className="profile-picture-container">
              <img src={userData.picture} alt="Profile" className="profile-picture" />
              <div>
                <button onClick={handleRemovePicture} className="remove-picture-button">
                  Remove Picture
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center mt-4">
              <p>No profile picture</p>
            </div>
          )}
          <div className="text-center mt-4">
            <input type="file" onChange={handleFileChange} className="input-file" />
            <button onClick={handleUpload} className="upload-picture-button">
              Upload Picture
            </button>
          </div>
          <p><strong>Name:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Address:</strong> {userData.address}</p>
        </div>
        <div className="text-center mt-4">
          <Link to="/update">
            <button className="details-update-button">
              Details Update
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
