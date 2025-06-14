// src/components/ScrollUpButtonPresenter.jsx
import React from 'react';
import useScrollProgress from './hooks/useScrollProgress'; 
import ScrollUpButtonView from '@components/scrollUpButton';

const ScrollUpButtonPresenter = () => {
  const scrollProgress = useScrollProgress();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ScrollUpButtonView
      scrollProgress={scrollProgress}
      onClick={handleScrollToTop}
    />
  );
};

export default ScrollUpButtonPresenter;