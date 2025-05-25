import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from '@components/Header';
import useHeaderPresenter from '@presenters/hooks/useHeaderPresenter';
import LoginView from '@views/LandingPage/sections/Login';
import SignupView from '@views/LandingPage/sections/Signup';
import LandingPagePresenter from '@presenters/LandingPagePresenter';
import SkinFormPresenter from '@presenters/SkinFormPresenter';
import useAuthPresenter from '@presenters/hooks/useAuthPresenter';

export default function AppRoutes() {
  const { user, error, login, signup, logout, isLoading } = useAuthPresenter();

  const {
    isOpen,
    isLoginOpen,
    isSignupOpen,
    navLinkClass,
    openLogin,
    closeLogin,
    openSignup,
    closeSignup,
    toggleMenu,
    closeMenu,
    onLogin,
    onSignup,
    onLogout,
  } = useHeaderPresenter(user, login, signup, logout);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl font-medium animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Header
        user={user}
        isOpen={isOpen}
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        navLinkClass={navLinkClass}
        openLogin={openLogin}
        closeLogin={closeLogin}
        openSignup={openSignup}
        closeSignup={closeSignup}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
      />

      {isLoginOpen && (
        <LoginView
          onLogin={(data) => {
            const success = login(data);
            if (success) closeLogin();
          }}
          onOpenSignup={() => {
            closeLogin();
            openSignup();
          }}
          error={error}
          onClose={closeLogin}
        />
      )}

      {isSignupOpen && (
        <SignupView
          onSignup={(data) => {
            const success = signup(data);
            if (success) closeSignup();
          }}
          onOpenLogin={() => {
            closeSignup();
            openLogin();
          }}
          error={error}
          onClose={closeSignup}
        />
      )}

      <Routes>
        <Route path="/" element={<LandingPagePresenter user={user} />} />
        <Route
          path="/skinform"
          element={user ? <SkinFormPresenter user={user} /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}
