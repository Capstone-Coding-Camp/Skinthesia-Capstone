// src/components/RecommendationList.jsx
import React from 'react';
import RecommendationCard from './RecommendationCard'; // Import RecommendationCard

const RecommendationList = ({ products, onOpenModal }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 grid-flow-row-dense gap-6 justify-items-center"> {/* Mengadaptasi grid dari productList.jsx */}
      {products.map((product, index) => (
        <RecommendationCard key={index} product={product} onOpenModal={onOpenModal} />
      ))}
    </div>
  );
};

export default RecommendationList;



