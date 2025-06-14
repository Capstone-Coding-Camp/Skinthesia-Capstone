// src/components/common/ModalView.jsx
import React from 'react';

const ModalView = ({ isOpen, product, onCloseModal }) => {
  if (!isOpen || !product) return null;

  const renderStars = (rating, total) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg
          key={`modal-filled-${i}`}
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
          key={`modal-empty-${i}`}
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
    <section
      id="modal"
      className="fixed inset-0 z-[1000] overflow-y-auto bg-gray-400/30 backdrop-blur-sm flex items-center justify-center py-8"
      style={{ alignItems: "flex-start" }} // Tambahkan ini agar modal muncul dari atas
    >
      <div className="relative z-[2000] bg-white rounded-xl p-12 w-[750px] md:w-[800px] overflow-y-auto mt-8">
        <button
          className="absolute top-4 right-4 cursor-pointer text-primary-pink text-2xl md:text-4xl lg:text-5xl pb-[7px] md:pb-[12px] rounded-lg hover:text-tersier-pink transition-colors border-2 border-primary-pink w-10 h-10 flex items-center justify-center"
          onClick={onCloseModal}
        >
          &times;
        </button>
        <div className="flex flex-wrap w-full justify-between items-start">
          <div className="flex md:min-w-full w-full h-auto self-center rounded-lg md:rounded-t-xl xl:rounded-t-2xl 2xl:rounded-t-3xl">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="object-contain"
            />
          </div>
          <div className="flex flex-wrap md:w-[72%] w-full h-auto justify-start items-center mt-4 md:mt-0">
            <h3 className="font-playfair-display w-full text-xl lg:text-2xl 2xl:text-3xl font-bold my-2">
              {product.title}
            </h3>
            <div className="flex justify-start w-full max-h-[1.5rem] content-center mb-2 gap-1">
              {renderStars(product.rating, product.totalRatings)}
              <p className="font-inter text-base h-full flex self-center lg:text-lg xl:text-xl w-full tracking-wider">
                ({product.rating}/{product.totalRatings})
              </p>
            </div>
            <p className="font-inter text-base/7 lg:text-lg/8 xl:text-xl/9 w-full mb-2 md:mb-4 text-wrap">
              {product.description} A soothing cleanser for sensitive skin. A soothing cleanser for sensitive skin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalView;