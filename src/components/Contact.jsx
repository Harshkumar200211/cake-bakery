import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaEdit, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || name === "" || description === "") {
      alert("Please fill all the fields");
    } else {
      try {
        const response = await fetch('http://localhost:5000/msg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            Description: description // Corrected key to match your JSON structure
          })
        });
        if (response.ok) {
          toast.success("Success! Your message has been sent successfully to the admin");
          navigate('/'); // Navigate back to the home page
        } else {
          toast.error("Failed to send message");
        }
      } catch (error) {
        toast.error("Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F1F1]">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#B5C18E' }}>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2" style={{ color: '#C7B7A3' }}>Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input type="text" id="name" name="name" value={name}
            onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2" style={{ color: '#C7B7A3' }}>Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
              <input type="email" id="email" name="email" value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2" style={{ color: '#C7B7A3' }}>Message</label>
            <div className="relative">
              <FaEdit className="absolute left-3 top-3 text-gray-500" />
              <textarea id="message" name="message" value={description}
            onChange={(e) => setDescription(e.target.value)} placeholder="Enter your message" className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none" required />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-[#B5C18E] hover:bg-[#A3B397] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit <FaPaperPlane className="inline ml-2" /></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
