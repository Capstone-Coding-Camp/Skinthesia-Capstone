import { useEffect, useRef, useState } from 'react';
import { User, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginModal({ isOpen, onClose, onLogin, onOpenSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const focusableElementsString = `
      a[href], area[href], input:not([disabled]),
      select:not([disabled]), textarea:not([disabled]),
      button:not([disabled]), iframe, object, embed,
      *[tabindex]:not([tabindex="-1"]), *[contenteditable=true]
    `;
    const modalNode = modalRef.current;
    const focusableElements = modalNode.querySelectorAll(focusableElementsString);
    if (focusableElements.length) {
      firstFocusableRef.current = focusableElements[0];
      lastFocusableRef.current = focusableElements[focusableElements.length - 1];
      firstFocusableRef.current.focus();
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current.focus();
        }
      }
    }

    modalNode.addEventListener('keydown', handleKeyDown);
    return () => modalNode.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }
    if (!email.includes('@')) {
      setError('Invalid email format.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    onLogin({ email, password });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
          aria-describedby="login-modal-desc"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            key="login-modal"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            onClick={e => e.stopPropagation()}
            ref={modalRef}
          >
            <h2 id="login-modal-title" className="text-2xl font-semibold mb-4">Login</h2>
            <p id="login-modal-desc" className="mb-6 text-gray-600">
              Enter your email and password to log in.
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="login-email" className="block mb-2 font-medium">Email</label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-[20px] -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  id="login-email"
                  className="w-full border border-gray-300 rounded px-10 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-skpink"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <label htmlFor="login-password" className="block mb-2 font-medium">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-[20px] -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  id="login-password"
                  className="w-full border border-gray-300 rounded px-10 py-2 mb-16 focus:outline-none focus:ring-2 focus:ring-skpink"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-red-600 mb-4" role="alert" aria-live="assertive">{error}</p>
              )}

              <div className="flex justify-between items-center">
                <button type="submit" className="bg-skpink text-white px-4 py-2 rounded hover:bg-pink-600 transition">Login</button>
                <button type="button" onClick={onClose} className="text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition">Close</button>
              </div>

              <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSignup();
                  }}
                  className="text-skpink font-semibold hover:underline focus:outline-none"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
