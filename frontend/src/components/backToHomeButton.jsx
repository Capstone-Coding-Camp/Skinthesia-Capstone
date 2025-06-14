// src/components/BackToHomeButtonView.jsx
import React from 'react';

const BackToHomeButtonView = ({ isVisible, homeUrl = "/" }) => {
  const visibilityClass = isVisible ? '' : 'hidden';

  return (
    <section id="backToHome" className={`fixed left-10 top-30 xl:top-35 z-[9999] ${visibilityClass}`}>
      <div className="relative w-[60px] h-[60px]">
        <div className="absolute inset-0 rounded-full bg-tersier-pink"></div>
        <a href={homeUrl} className="absolute inset-1 bg-white rounded-full shadow-md flex justify-center items-center">
          <div className="w-5 h-5 border-l-4 border-b-4 border-tersier-pink rotate-45 translate-y-[1px] translate-x-[4px]"></div>
        </a>
      </div>
    </section>
  );
};

export default BackToHomeButtonView;