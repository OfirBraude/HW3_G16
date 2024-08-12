import React, { useState } from 'react';

/**
 * Login Component
 * 
 * A simple login form where users can input their name to log in.
 * 
 * @param {function} onLogin - Callback function to handle the login process.
 */
const Login = ({ onLogin }) => {
  const [name, setName] = useState('');

  /**
   * Handles form submission by invoking the onLogin callback
   * with the entered name.
   * 
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(name);
  };

  return (
    <div className="flex items-center justify-center max-w-3000 min-h-screen bg-gray-1000 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="p-20 rounded-lg shadow-md w-full max-w-md bg-white dark:bg-gray-800 border border-gray-600 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Enter Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white text-black border-gray-300 dark:border-gray-600 focus:outline-none"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
