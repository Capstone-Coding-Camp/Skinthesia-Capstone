import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from '@components/Header';
import useHeaderPresenter from '@presenters/hooks/useHeaderPresenter';
import LoginView from '@views/LandingPage/sections/Login';
import SignupView from '@views/LandingPage/sections/Signup';
import LandingPagePresenter from '@presenters/LandingPagePresenter';
import SkinFormPresenter from '@presenters/SkinFormPresenter';
import useAuthPresenter from '@presenters/hooks/useAuthPresenter';
import DrySkinPagePresenter from '@presenters/SkinConcernPresenters/DrySkinPresenter';
import OilySkinPagePresenter from '@presenters/SkinConcernPresenters/OilySkinPresenter';
import AcneProneSkinPagePresenter from '@presenters/SkinConcernPresenters/AcneProneSkinPresenter';
import BlackheadSkinPagePresenter from '@presenters/SkinConcernPresenters/BlackheadSkinPresenter';
import InflamedSkinPagePresenter from '@presenters/SkinConcernPresenters/InflamedSkinPresenter';
import DullSkinPagePresenter from '@presenters/SkinConcernPresenters/DullSkinPresenter';
import MorningRoutinePresenter from '@presenters/EssentialRoutinePresenters/MorningRoutinePresenter';
import NightRecoveryPresenter from '@presenters/EssentialRoutinePresenters/NightRecoveryPresenter';
import AcneDefenseKitPresenter from '@presenters/EssentialRoutinePresenters/AcneDefenseKitPresenter';
import FacialWashPresenter from '@presenters/bestSellerDetailPresenters/FacialWashPresenter';
import TonerPresenter from '@presenters/bestSellerDetailPresenters/TonerPresenter'
import EssensePresenter from '@presenters/bestSellerDetailPresenters/EssensePresenter'
import MoisturizerPresenter from '@presenters/bestSellerDetailPresenters/MoisturizerPresenter'
import SerumPresenter from '@presenters/bestSellerDetailPresenters/SerumPresenter'
import SunscreenPresenter from '@presenters/bestSellerDetailPresenters/SunscreenPresenter'
import ScrollUpButtonPresenter from '@presenters/ScrollUpButtonPresenter';

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

      <ScrollUpButtonPresenter />

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
        <Route
          path="/dry-skin"
          element={
            user ? <DrySkinPagePresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/oily-skin"
          element={
            user ? <OilySkinPagePresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/acne-prone-skin"
          element={
            user ? <AcneProneSkinPagePresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/inflamed-skin"
          element={
            user ? <InflamedSkinPagePresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/blackhead-skin"
          element={
            user ? <BlackheadSkinPagePresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/dull-skin"
          element={
            user ? <DullSkinPagePresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/morning-routine"
          element={
            user ? <MorningRoutinePresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/night-recovery"
          element={
            user ? <NightRecoveryPresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/acne-defense-kit"
          element={
            user ? <AcneDefenseKitPresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/best-facial-wash"
          element={
            user ? <FacialWashPresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/best-toner"
          element={
            user ? <TonerPresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/best-essense"
          element={
            user ? <EssensePresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/best-moisturizer"
          element={
            user ? <MoisturizerPresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/best-serum"
          element={
            user ? <SerumPresenter user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/best-sunscreen"
          element={
            user ? <SunscreenPresenter user={user} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </>
  );
}
