import { useState, useCallback } from 'react';

export function useLoginPresenter(onLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setError('');
  }, []);

  const handleSubmit = useCallback((e) => {
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
  }, [email, password, onLogin]);

  return {
    email,
    password,
    error,
    setEmail,
    setPassword,
    handleSubmit,
    resetForm,
  };
}
