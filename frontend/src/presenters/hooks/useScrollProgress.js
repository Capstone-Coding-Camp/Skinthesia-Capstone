// src/hooks/useScrollProgress.js
import { useState, useEffect } from 'react';

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      let percent = 0;
      if (docHeight > 0) { 
        percent = scrollTop / docHeight;
      }
      percent = Math.max(0, Math.min(1, percent));
      setScrollProgress(percent);
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return scrollProgress;
};

export default useScrollProgress;