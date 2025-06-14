// src/components/BackToHomeButtonPresenter.jsx
import React from 'react';
import useBackToHomeVisibility from './hooks/useBackToHome'; 
import BackToHomeButtonView from '@components/backToHomeButton';

const BackToHomeButtonPresenter = () => {
  const isVisible = useBackToHomeVisibility();

  const homeUrl = "/"; 

  return (
    <BackToHomeButtonView
      isVisible={isVisible}
      homeUrl={homeUrl}
    />
  );
};

export default BackToHomeButtonPresenter;