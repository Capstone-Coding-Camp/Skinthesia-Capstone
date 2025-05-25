import { useState } from "react";
import useActiveSection from "@presenters/hooks/useActiveSection";

export default function useHeaderPresenter(user, onLogin, onSignup, onLogout) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const activeSection = useActiveSection([
    "hero",
    "products",
    "testimonials",
    "contact",
  ]);

  const navLinkClass = (id) =>
    `${
      activeSection === id
        ? "text-skpink font-semibold underline"
        : "text-black font-normal"
    } hover:text-skpink hover:underline transition`;

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
    setIsOpen(false);
  };

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
    setIsOpen(false);
  };

  const closeLogin = () => setIsLoginOpen(false);
  const closeSignup = () => setIsSignupOpen(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return {
    isOpen,
    isLoginOpen,
    isSignupOpen,
    user,
    navLinkClass,
    openLogin,
    openSignup,
    closeLogin,
    closeSignup,
    toggleMenu,
    closeMenu,
    onLogin,
    onSignup,
    onLogout,
  };
}
