import { useState, useEffect } from "react";
import * as authService from "@models/authService";

export default function useAuthPresenter() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) setUser(storedUser);
    setIsLoading(false);
  }, []);

  function login({ email, password }) {
    setError("");
    const foundUser = authService.findUser(email, password);
    if (!foundUser) {
      setError("Invalid email or password");
      return false;
    }
    authService.saveCurrentUser(foundUser);
    setUser(foundUser);
    return true;
  }

  function signup({ email, password, confirmPassword }) {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    const users = authService.getStoredUsers();
    if (users.some((u) => u.email === email)) {
      setError("Email already registered");
      return false;
    }
    const newUser = { email, password };
    authService.saveUser(newUser);
    authService.saveCurrentUser(newUser);
    setUser(newUser);
    return true;
  }

  function logout() {
    authService.removeCurrentUser();
    setUser(null);
  }

  return {
    user,
    error,
    login,
    signup,
    logout,
    isLoading,
  };
}
