// src/components/home/MainContentView.jsx
import React from 'react';
import RoutineCardView from './routineCard';

const MainContentView = ({ routineSteps }) => {
  const orderClasses = {
    1: "order-1",
    2: "order-2",
    3: "order-3",
    4: "order-4 justify-self-end lg:mr-10 xl:mr-18 2xl:mr-26",
    5: "order-5 justify-self-start lg:ml-10 xl:ml-18 2xl:ml-26"
  };

  return (
    <main className="@container flex flex-wrap justify-center items-center">
      <div className="flex w-full justify-center items-center">
        <div className="flex w-[95vw] md:w-[75vw] p-4">
          <p className="font-inter text-justify md:text-center text-wrap text-base/9 lg:text-lg/10 w-full">
            {routineSteps.heading}
          </p>
        </div>
      </div>
      <div className="flex w-full min-w-[100vw]">
        <div className="grid grid-rows-5 w-full min-w-[100vw] grid-cols-1 md:grid-cols-6 md:gap-4 md:grid-rows-2 px-6 md:px-4 py-8 justify-items-center items-start auto-rows-max grid-flow-col md:grid-flow-row auto-cols-max">
          {routineSteps.section.map((stepData) => (
            <RoutineCardView
              key={stepData.id}
              step={stepData.id}
              imageSrc={stepData.imageSrc}
              imageAlt={stepData.imageAlt}
              title={stepData.title}
              description={stepData.description}
              orderClass={orderClasses[stepData.id]}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainContentView;