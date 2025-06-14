// src/pages/HomePagePresenter.jsx
import React, { useState, useEffect } from 'react';
import HomePageView from '@views/EssentialRoutine/EssentialRoutine'; 
import { essentialRoutineModel } from '@models/essentialRoutineModel'

const NightRecoveryPresenter = () => {
  const [morningRoutineSteps, setMorningRoutineSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const rawData = essentialRoutineModel.map(essentialRoutine => ({
        id: essentialRoutine.id,
        primaryTitle: essentialRoutine.primaryTitle,
        heading: essentialRoutine.heading,
        section: essentialRoutine.section,
      }));
      console.log("Raw Data :", rawData);
      if(rawData.length === 0) {
        throw new error('No data found for your Essential Routine');
      }
      setMorningRoutineSteps(rawData[1]);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  return (
    <HomePageView
      loading={loading}
      error={error}
      morningRoutineSteps={morningRoutineSteps}
    />
  );
};

export default NightRecoveryPresenter;