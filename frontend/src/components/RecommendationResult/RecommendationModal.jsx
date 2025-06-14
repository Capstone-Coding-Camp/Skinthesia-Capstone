// src/components/ProductDetailModal.jsx
import React from 'react';
import { Star } from "lucide-react"; // Import ikon bintang

const ProductDetailModal = ({ isOpen, product, onCloseModal }) => {
  if (!isOpen || !product) return null;

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
    <section
      id="modal-product-detail"
      className="fixed inset-0 z-[1000] overflow-y-auto bg-gray-400/30 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative z-[2000] bg-white rounded-xl p-6 md:p-10 w-full h-auto max-w-[70vw] md:max-w-[60vw] shadow-lg animate-fade-in-up max-h-[80vh] overflow-y-auto m-4 md:m-8">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl md:text-4xl lg:text-5xl pb-2 text-skpink cursor-pointer hover:text-gray-400 transition-colors border-2 border-skpink w-10 h-10 flex items-center justify-center rounded-lg"
          onClick={onCloseModal}
          aria-label="Tutup Detail Produk"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row w-full justify-between items-start gap-6">
          {/* Product Image */}
          <div className="flex md:w-1/3 w-full h-auto self-center rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={product.image || 'https://placehold.co/300x300/E0E0E0/6C6C6C?text=No+Image'}
              alt={product.product_name}
              className="object-contain w-full h-full"
              onError={(e) => { // Handle error jika gambar tidak bisa dimuat
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/300x300/E0E0E0/6C6C6C?text=Image+Error';
              }}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col md:w-2/3 w-full justify-start items-center md:items-start mt-4 md:mt-0 text-center md:text-left">
            <h3 className="font-serif w-full text-2xl lg:text-3xl 2xl:text-4xl font-bold mb-2 text-gray-900">
              {product.product_name || 'Produk Tidak Diketahui'}
            </h3>
            <p className="font-sans text-lg text-gray-700 w-full mb-2">{product.brand || 'Merek Tidak Diketahui'}</p>

            {/* Rating */}
            <div className="flex justify-center md:justify-start w-full items-center gap-1 mb-2">
              {product.rating !== undefined && product.rating !== null ? (
                <>
                  {renderStars(product.rating)}
                  <p className="font-sans text-base lg:text-lg w-full tracking-wider text-gray-800">
                    ({product.rating.toFixed(1)} / 5)
                  </p>
                </>
              ) : (
                <p className="font-sans text-base lg:text-lg w-full tracking-wider text-gray-500">
                  No Rating Available
                </p>
              )}
            </div>
            {product.total_reviews !== undefined && product.total_reviews !== null && (
              <p className="font-sans text-sm text-gray-600 w-full mb-4">
                Total Reviews: {product.total_reviews.toLocaleString()}
              </p>
            )}

            {/* Price */}
            <p className="font-sans text-2xl font-bold text-skpink w-full mb-4">
              Harga: Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}
            </p>

            {/* Ingredients */}
            {product.ingredients && (
              <div className="w-full text-left mt-4 border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">Bahan-Bahan Utama:</h4>
                <p className="font-sans text-sm text-gray-700 leading-relaxed">{product.ingredients}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailModal;
