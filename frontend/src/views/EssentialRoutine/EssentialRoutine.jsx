// src/pages/HomePageView.jsx
import React from 'react';
import HeroView from '@components/EssentialRoutineComponents/hero';
import MainContentView from '@components/EssentialRoutineComponents/mainContent';
import BackToHomeButtonPresenter from '@presenters/BackToHomePresenter'
import FooterView from '@components/side-footer.jsx';

const HomePageView = ({ loading, error, morningRoutineSteps }) => {
  if (loading) {
    return <div className="p-4 text-center">Loading page content...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <>
      <BackToHomeButtonPresenter />
      <section className="@container relative w-full min-w-[100vw] mb-12">
        <HeroView primaryTitle={morningRoutineSteps}/>
        <MainContentView routineSteps={morningRoutineSteps} />
      </section>
      <FooterView />
    </>
  );
};

export default HomePageView;