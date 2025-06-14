// src/components/top-brand/ProductCardView.jsx
import React from 'react';

const ProductCardView = ({ product, onOpenModal }) => {
  const renderStars = (rating, total) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg
          key={`filled-${i}`}
          fill="#FFC850"
          viewBox="0 0 24 24"
          width="35"
          height="35"
          xmlns="http://www.w3.org/2000/svg"
          className="icon flat-color flex self-center"
        >
          <path d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z" />
        </svg>
      );
    }
    for (let i = rating; i < total; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          fill="#D9D9D9"
          viewBox="0 0 24 24"
          width="35"
          height="35"
          xmlns="http://www.w3.org/2000/svg"
          className="icon flat-color flex self-center"
        >
          <path d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-wrap justify-between gap-2 md:gap-0 bg-white border-2 border-tersier-pink rounded-lg md:rounded-xl lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl mb-8 p-4 lg:p-6 w-full h-[15%] md:h-[25%] md:min-h-[400px] lg:min-h-[570px] lg:max-h-[570px] md:w-[28vw] md:max-w-[330px]">
      <div className="flex w-[23%] md:w-full h-auto rounded-lg md:rounded-t-xl xl:rounded-t-2xl 2xl:rounded-t-3xl">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="object-contain"
        />
      </div>
      <div className="flex flex-wrap w-[72%] md:w-full h-auto justify-start items-center">
        <h3 className="font-serif truncate w-full text-xl lg:text-2xl font-bold md:mt-4 md:mb-2">
          {product.title}
        </h3>
        <div className="flex justify-start w-full max-h-[1.5rem] content-center gap-1">
          {renderStars(product.rating, product.totalRatings)}
          <p className="font-sans text-base h-full flex self-center lg:text-lg w-full tracking-wider">
            ({product.rating}/{product.totalRatings})
          </p>
        </div>
        <p className="font-sans truncate text-base lg:text-lg w-full md:mb-4">
          {product.description}
        </p>
        <button
          className="bg-tersier-pink w-[8rem] md:w-full text-white px-4 py-2 mt-4 rounded-lg md:rounded-xl lg:rounded-xl 2xl:rounded-2xl hover:bg-secondary-pink transition-colors"
          onClick={() => onOpenModal(product)} // Pass product data to openModal
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCardView;