// SignIn.css
import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import '../css/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      const response = await axios.get('http://localhost:5000/signupdata');
      const users = response.data;

      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        toast.success("User SignIn Successfully");
        signIn(user);
        navigate('/products');
      } else {
        toast.error('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full transform transition-all duration-200 hover:scale-105">
        <h2 className="text-2xl font-bold mb-8 text-center text-green">Sign In</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email" style={{ color: '#C7B7A3' }}>
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: '#EADBC8' }}
              />
            </div>
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password" style={{ color: '#C7B7A3' }}>
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: '#EADBC8' }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105"
              type="submit"
            >
              Sign In
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-green hover:text-green-dark transform transition-all duration-300 hover:scale-105"
              to="/signup"
            >
              Create Account
            </Link>
          </div>
          <div className="text-center">
            <Link
              className="text-green hover:text-green-dark transform transition-all duration-300 hover:scale-105"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
