// src/components/ScrollUpButtonView.jsx
import React from 'react';

const ScrollUpButtonView = ({ scrollProgress, onClick }) => {
  const progressDeg = Math.round(scrollProgress * 360);
  const backgroundStyle = {
    background: `conic-gradient(#e48b8a ${progressDeg}deg, transparent ${progressDeg}deg)`,
  };

  return (
    <section id="scrollUpHome" className="fixed bottom-10 right-10 z-[9999]">
      <div className="relative w-[60px] h-[60px]">
        {/* Background progress ring */}
        <div
          id="scrollProgressCircle"
          className="absolute inset-0 rounded-full transition-[border-image] duration-300 ease-in-out"
          style={backgroundStyle}
        ></div>

        {/* Scroll button */}
        <button
          id="scrollUpBtn"
          onClick={onClick}
          className="absolute inset-1 bg-white rounded-full shadow-md flex justify-center items-center"
        >
          <div className="w-5 h-5 border-t-4 border-l-4 border-tersier-pink rotate-45 translate-y-[4px]"></div>
        </button>
      </div>
    </section>
  );
};

export default ScrollUpButtonView;