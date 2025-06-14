// src/hooks/useBackToHomeVisibility.js
import { useState, useEffect } from 'react';

const useBackToHomeVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset ===  0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isVisible;
};

export default useBackToHomeVisibility;