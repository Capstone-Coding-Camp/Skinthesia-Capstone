// src/components/home/RoutineCardView.jsx
import React from 'react';

const RoutineCardView = ({ step, imageSrc, imageAlt, title, description, orderClass }) => {
  return (
    <div
      className={`md:min-h-[400px] min-w-full md:min-w-[235px] lg:min-w-[370px] xl:min-w-[450px] h-auto md:h-[400px] md:max-w-[260px] ${step === 4 || step === 5 ? "col-span-3" : "col-span-2"} ${orderClass}`}
    >
      <div className="flex flex-wrap justify-between lg:justify-center gap-2 md:gap-0 bg-white rounded-lg md:rounded-xl lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl p-4 lg:p-6">
        <div className="flex w-[23%] md:w-full h-auto justify-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="flex object-contain"
          />
        </div>
        <div className="flex flex-nowrap w-[72%] md:w-full h-full justify-between items-start pl-4">
          <div className={`flex justify-center items-start w-[10%] mr-6 md:mr-8 lg:mr-10 pb-6 ${step === 3 || step === 4 ? "md:pb-14" : "md:pb-8"} ${step === 3 ? "lg:pb-16" : step === 5 ? "lg:pb-8" : "lg:pb-10" }`}>
            <h1 className="font-serif text-center text-7xl/20 md:text-8xl/22 lg:text-9xl/24 text-primary-pink">
              {step}
            </h1>
          </div>
          <div className="flex flex-wrap w-[90%] justify-start items-center py-2">
            <h3 className="font-serif self-start text-tersier-pink w-full text-xl lg:text-2xl font-bold md:mt-4">
              {title}
            </h3>
            <p className="font-inter text-base lg:text-lg w-full md:mb-4">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineCardView;