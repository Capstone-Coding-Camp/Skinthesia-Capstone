// src/pages/BestSellerPresenter.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBrandPageView from '@views/BestSellerDetail/BestSellerDetail';
import { bestSellerModel } from '@models/bestSellerDetailModel';

const BestSellerDetailPresenter = () => {
  const location = useLocation();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    try {
      const pathId = location.pathname.replace('/', ''); 
      const selectedData = bestSellerModel.find(item => item.id === pathId);

      if (!selectedData) {
        throw new Error(`No data found for ${pathId}`);
      }

      setPageData({
        hero: selectedData.hero,
        products: selectedData.products
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [location.pathname]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <TopBrandPageView
      loading={loading}
      error={error}
      heroData={pageData?.hero || null}
      products={pageData?.products || []}
      isModalOpen={isModalOpen}
      selectedProduct={selectedProduct}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
    />
  );
};

export default BestSellerDetailPresenter;
