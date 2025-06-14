import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function SignupView({ onSignup, onOpenLogin, error, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSignup({ email, password, confirmPassword });
  }

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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

        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Signup Form">
          <h2 className="text-2xl font-semibold py-2 mb-8 text-center">Signup</h2>
          {error && <p className="text-red-600 text-center">{error}</p>}

          <div>
            <label htmlFor="signup-email" className="block mb-1 text-black">Email</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                id="signup-email"
                type="email"
                placeholder="janedoe@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 mb-2 border border-pink rounded-sm focus:outline-hidden focus:ring-2 focus:ring-skpink"
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-password" className="block mb-1 text-black">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 mb-2 border border-pink rounded-sm focus:outline-hidden focus:ring-2 focus:ring-skpink"
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-confirm" className="block mb-1 text-black">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="signup-confirm"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 mb-8 border border-pink rounded-sm focus:outline-hidden focus:ring-2 focus:ring-skpink"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink text-white py-2 rounded-sm hover:bg-skpink transition"
          >
            Signup
          </button>

          <button
            type="button"
            onClick={onOpenLogin}
            className="w-full text-center text-skpink underline"
          >
            Already have an account? Login
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
