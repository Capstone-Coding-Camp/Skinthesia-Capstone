// src/pages/TopBrandPagePresenter.jsx
import React, { useState, useEffect } from 'react';
import TopBrandPageView from '@views/BestSellerDetail/BestSellerDetail'; // Import komponen View
import { bestSellerModel } from '@models/bestSellerDetailModel';

const SerumPresenter = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    try {
      const rawData = bestSellerModel.map(bestSellerModel => ({
        hero: bestSellerModel.hero,
        products: bestSellerModel.products,
      }));
      console.log("Raw Data :", rawData[3]);
      console.log("Hero Data :", rawData[3].hero);
      const checkProduct = rawData[3].products.map(product => ({
        id: product.id,
        imageSrc: product.imageSrc,
        imageAlt: product.imageAlt,
        title: product.title,
        rating: product.rating,
        totalRatings: product.totalRatings,
        description: product.description
      }));
      console.log("Product Data :", checkProduct);
      if(rawData.length === 0) {
        throw new error('No data found for your Essential Routine');
      }
      setPageData(rawData[3]);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
    // fetch('/data/top-facial-washes.json') // Pastikan path ini benar!
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     setPageData(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setError(err);
    //     setLoading(false);
    //   });
  }, []);

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
      heroData={pageData ? pageData.hero : null}
      products={pageData ? pageData.products : []}
      isModalOpen={isModalOpen}
      selectedProduct={selectedProduct}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
    />
  );
};

export default SerumPresenter;