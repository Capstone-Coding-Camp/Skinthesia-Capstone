import React from 'react';

const Heading = ({ level, text }) => {
  const Tag = `h${level}`;
  
  const getHeadingClass = (level) => {
    switch (level) {
      case 1: return "flex w-[75vw] mt-2 md:mt-6 mb-2 pt-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans font-bold text-tersier-pink";
      case 2: return "flex w-[75vw] mt-2 md:mt-6 mb-2 pt-4 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-sans font-bold text-tersier-pink";
      case 3: return "flex w-[75vw] mt-2 md:mt-6 mb-2 pt-4 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-tersier-pink";
      default: return "flex w-[75vw] mt-2 md:mt-6 mb-2 pt-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans font-bold text-tersier-pink";
    }
  };

  return (
    <Tag className={getHeadingClass(level)}>
      {text}
    </Tag>
  );
};

export default Heading;