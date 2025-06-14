// src/components/common/HeroView.jsx
import React from 'react';
import Marquee from '@components/marquee';

const HeroView = ({ primaryTitle }) => {
  return (
    <section id="hero" className="@container flex flex-wrap justify-center pt-28 pb-2 md:pb-6">
      <div className="flex flex-wrap justify-self-center w-full md:w-[80vw] mx-8 pt-6 lg:pt-8 pb-8 md:pb-10 xl:pb-14 2xl:pb-18">
        <div className="flex w-full md:w-[25%] justify-center md:justify-end-safe items-center px-4">
          <img
            src="/logo-skinthesia.svg"
            alt="Skinthesia"
            className="min-w-[55px] w-[40%] max-w-[85px]"
          />
        </div>
        <div className="flex flex-wrap w-full md:w-[75%] pl-4 pb-4 pt-6 justify-center md:justify-start items-center">
          <h1 className="font-serif w-full min-w-[100vw] md:w-auto md:min-w-[100%] text-center md:text-left align-baseline text-xl/8 md:text-2xl/9 lg:text-3xl/10 xl:text-4xl/11 font-stretch-expanded uppercase font-bold tracking-wider">
            {primaryTitle.primaryTitle.main}
          </h1>
          <h2 className="font-inter text-center w-full min-w-[100vw] md:w-auto md:min-w-[100%] md:text-left text-md/8 md:text-lg/9 lg:text-xl/10 xl:text-2xl/11 tracking-wide">
            {primaryTitle.primaryTitle.secondary}
          </h2>
        </div>
      </div>
      {/* Marquee */}
      <div className="w-full bg-pink text-white py-4 my-4 overflow-hidden">
        <Marquee text="AI-Powered Recommendations" />
      </div>
    </section>
  );
};

export default HeroView;