// src/components/RecommendationCard.jsx
import React from 'react';
import { Star } from "lucide-react"; // Import ikon bintang

const RecommendationCard = ({ product, onOpenModal }) => {
  // Fungsi untuk merender ikon bintang berdasarkan rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    // Bintang penuh
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="inline-block text-yellow-400 fill-yellow-400" />);
    }
    // Setengah bintang
    if (halfStar) {
      stars.push(
        <Star
          key="half"
          className="inline-block text-yellow-400 fill-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      );
    }
    // Bintang kosong (untuk melengkapi hingga 5 bintang)
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="inline-block text-gray-300" />);
    }
    return stars;
  };

  return (
    // Mengadaptasi styling dari productCard.jsx
    <button onClick={() => onOpenModal(product)}  className="flex flex-wrap justify-between gap-2 md:gap-0 bg-white border-2 border-skpink rounded-lg md:rounded-xl lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl mb-4 md:mb-14 p-4 lg:p-6 w-full md:min-h-full md:min-w-[240px] md:min-w-[240px] 2xl:max-w-[330px] flex-shrink-0">
      <div className="flex w-[23%] md:w-full h-auto rounded-lg md:rounded-t-xl xl:rounded-t-2xl 2xl:rounded-t-3xl">
        <img
          src={product.image || 'https://placehold.co/210x210/E0E0E0/6C6C6C?text=No+Image'}
          alt={product.product_name}
          className="object-contain"
          onError={(e) => { // Penanganan error jika gambar tidak bisa dimuat
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/210x210/E0E0E0/6C6C6C?text=Image+Error';
          }}
        />
      </div>
      <div className="flex flex-wrap w-[72%] md:w-full h-auto justify-start items-center">
        <h3 className="font-serif flex justify-start truncate w-full text-xl lg:text-2xl font-bold md:mt-4 md:mb-2">
          {product.product_name || 'Produk Tidak Diketahui'}
        </h3>
        <p className="font-sans flex justify-start text-sm text-gray-500 w-full mb-1">{product.brand || 'Merek Tidak Diketahui'}</p>
        
        {/* Bagian Rating */}
        <div className="flex justify-start w-full max-h-[1.5rem] content-center gap-1 mb-2">
          {product.rating !== undefined && product.rating !== null ? (
            <>
              {renderStars(product.rating)}
              <p className="font-sans text-base h-full flex self-center lg:text-lg w-full tracking-wider">
                ({product.rating.toFixed(1)})
              </p>
            </>
          ) : (
            <p className="font-sans text-base h-full flex self-center lg:text-lg w-full tracking-wider text-gray-500">
              No Rating
            </p>
          )}
        </div>
        
        {/* Jumlah Review */}
        {product.total_reviews !== undefined && product.total_reviews !== null && (
          <p className="font-sans flex justify-start text-sm text-gray-600 w-full mb-4">
            ({product.total_reviews.toLocaleString()} reviews)
          </p>
        )}

        {/* Harga */}
        <p className="font-sans flex justify-start text-lg font-bold text-skpink w-full mb-4">
          Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}
        </p>
        
        {/* Ingredients (opsional, bisa ditampilkan lebih detail di modal jika ada) */}
        {product.ingredients && (
          <p className="font-sans flex justify-start text-xs text-gray-500 w-full italic truncate">
            Ingredients: {product.ingredients}
          </p>
        )}
        
        {/* Tombol View Details tidak diperlukan untuk rekomendasi sederhana, atau bisa diaktifkan jika ada modal detail */}
        {/* <button
          className="bg-tersier-pink w-[8rem] md:w-full text-white px-4 py-2 mt-4 rounded-lg md:rounded-xl lg:rounded-xl 2xl:rounded-2xl hover:bg-secondary-pink transition-colors"
          // onClick={() => onOpenModal(product)} // Jika ada modal detail
        >
          View Details
        </button> */}
      </div>
    </button>
  );
};

export default RecommendationCard;
