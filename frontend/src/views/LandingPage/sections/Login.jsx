import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function LoginView({ onLogin, onOpenSignup, error, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Modal dengan animasi scale + fade */}
      <motion.div 
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Login Form">
          <h2 className="text-2xl py-4 mb-8 font-semibold text-center">Sign In</h2>
          {error && <p className="text-red-600 text-center">{error}</p>}

          <div>
            <label htmlFor="login-email" className="block mb-1 text-black">Email</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                id="login-email"
                type="email"
                placeholder="skinthesia@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 mb-2 py-2 border border-pink rounded-sm focus:outline-hidden focus:ring-2 focus:ring-skpink"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block mb-1 text-black">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 mb-8 border border-pink rounded-sm focus:outline-hidden focus:ring-2 focus:ring-skpink"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-skpink text-white py-2 rounded-sm hover:bg-pink transition"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={onOpenSignup}
            className="w-full text-center text-skpink underline"
          >
            Don't have an account? Signup
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
