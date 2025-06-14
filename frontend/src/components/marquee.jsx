// src/components/Marquee.jsx
import React from 'react';

const Marquee = ({ text }) => {
  return (
    <div className="whitespace-nowrap flex animate-marquee">
      {Array(10).fill(0).map((_, i) => (
        <span key={i} className="font-serif mx-3 text-base sm:text-lg md:text-xl flex items-center gap-4">
          {text} <span className="text-2xl">✦</span>
        </span>
      ))}
    </div>
  );
};

export default Marquee;