import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from '@views/LandingPage/sections/Header';
import useHeaderPresenter from '@presenters/hooks/useHeaderPresenter';
import LandingPagePresenter from '@presenters/LandingPagePresenter';
import SkinFormPresenter from '@presenters/SkinFormPresenter';

export default function AppRoutes() {
  const [user, setUser] = useState(null);

  const handleLogin = (data) => {
    setUser({ name: data.username || 'User' });
  };

  const handleSignup = (data) => {
    setUser({ name: data.username || 'User' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const headerProps = useHeaderPresenter(user, handleLogin, handleSignup, handleLogout);

  return (
    <>
      <Header {...headerProps} />
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
