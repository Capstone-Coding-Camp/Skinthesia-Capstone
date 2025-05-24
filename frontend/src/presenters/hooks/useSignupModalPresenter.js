import { useEffect, useRef, useState } from 'react';

export function useSignupModalPresenter({ isOpen, onClose, onSignup, onOpenLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    const focusableElements = modalNode?.querySelectorAll(focusableElementsString);
    if (focusableElements?.length) {
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

    modalNode?.addEventListener('keydown', handleKeyDown);
    return () => modalNode?.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    onSignup({ email, password });
  }

  return {
    modalRef,
    email,
    password,
    confirmPassword,
    error,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
    onClose,
    onOpenLogin,
  };
}
