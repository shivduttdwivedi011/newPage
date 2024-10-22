import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully authenticated
        console.log('Login successful:', data); // Log the token or user info if needed
        navigate('/dashboard'); // Redirect to the dashboard on successful login
      } else {
        // Handle error responses
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Network error. Please try again later.'); // Handle network errors
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
          Login
        </button>
        <p className="mt-4 text-center">
        Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
      </p>
      </form>
    </div>
  );
};

export default LoginPage;
