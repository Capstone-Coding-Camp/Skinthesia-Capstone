import React, { useState, useEffect } from 'react';
import SkinConcernEduPageView from '../../views/SkinConcernEdu/SkinConcernEdu';
import { skinConcernModel } from '../../models/skinConcernEduModel';

const InflamedSkinPagePresenter = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const rawData = skinConcernModel.map(skinConcern => ({
        id: skinConcern.id,
        title: skinConcern.title,
        imageUrl: skinConcern.imageUrl,
        imageAlt: skinConcern.imageAlt,
        sections: skinConcern.sections,
        faqSection: skinConcern.faqSection,
      }));
      console.log("Raw Data:", rawData);
      if (rawData.length === 0) {
        throw new Error('No data found for Dry Skin');
      }
      setPageData(rawData[3]);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pageData) {
      console.log("Processed Data:", pageData);
    }
  }, [pageData]);

  return (
    <SkinConcernEduPageView
      pageData={pageData}
      loading={loading}
      error={error}
    />
  );
};

export default InflamedSkinPagePresenter;