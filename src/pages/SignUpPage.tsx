// src/pages/SignUpPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const allowedUsers = [
  'eve.holt@reqres.in',
  // Add more allowed emails as needed
];

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Check if the email is in the allowed users list
    if (!allowedUsers.includes(email)) {
      setError('Registration failed. Email not allowed.'); // Show error if email is not allowed
      return;
    }

    try {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully registered
        console.log('Sign Up successful:', data); // Log the token or user info if needed
        navigate('/dashboard'); // Redirect to the dashboard on successful signup
      } else {
        // Handle error responses
        setError(data.error || 'Sign Up failed. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again later.'); // Handle network errors
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSignUp} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">Email</label>
          <input
            className="border rounded w-full py-2 px-3"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">Password</label>
          <input
            className="border rounded w-full py-2 px-3"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded w-full" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
