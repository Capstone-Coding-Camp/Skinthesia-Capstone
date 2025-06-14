// src/components/top-brand/TopBrandHeroView.jsx
import React from 'react';
import Marquee from '../Marquee';

const TopBrandHeroView = ({ titlePrefix, titleHighlight, titleSuffix, imageSrc, imageAlt }) => {
  return (
    <section
      id="hero"
      className="@container flex flex-wrap justify-center items-center pt-28 pb-2 md:pb-6"
    >
      <div className="flex w-[80vw] flex-wrap justify-between items-center pt-6 lg:pt-8 pb-8 md:pb-18 xl:pb-22 2xl:pb-26">
        <div className="flex w-full md:w-[60%] justify-center md:justify-start items-center">
          <h1 className="font-serif text-center md:text-left align-baseline text-3xl/10 md:text-4xl/11 lg:text-5xl/16 xl:text-6xl/20 font-stretch-expanded uppercase font-bold tracking-wider">
            {titlePrefix}
            <strong className="font-serif inline-block align-baseline text-5xl/10 md:text-6xl/11 lg:text-7/16 xl:text-8xl/20 font-bold tracking-wider text-primary-pink">
              {titleHighlight}
            </strong>
            <br />
            {titleSuffix}
          </h1>
        </div>
        <div className="flex w-full md:w-[35%] h-[28vh] md:h-[50%] my-6 max-h-[550px] justify-center items-center">
          <div className="relative">
            <div className="static z-20 border-4 overflow-hidden h-[240px] w-[240px] md:h-[280px] md:w-[280px] lg:h-[320px] lg:w-[320px] max-h-[550px] max-w-[550px] border-tersier-pink rounded-[30px] lg:rounded-[45px] 3xl:rounded-[60px]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="object-contain"
              />
            </div>
            <div className="absolute -z-10 h-[240px] w-[240px] md:h-[280px] md:w-[280px] lg:h-[320px] lg:w-[320px] max-h-[550px] max-w-[550px] top-0 left-0 rounded-[30px] lg:rounded-[45px] 3xl:rounded-[60px] bg-transparent border-tersier-pink border-4 translate-x-[8%] translate-y-[10%]"></div>
          </div>
        </div>
      </div>
      {/* Marquee */}
      <div className="w-full bg-pink text-white py-4 my-4 overflow-hidden">
        <Marquee text="AI-Powered Recommendations" />
      </div>
    </section>
  );
};

export default TopBrandHeroView;