import { Star } from "lucide-react"; // Untuk ikon bintang

export default function SkinAnalysisResult({ recommendationResult, onReset }) {
  // `recommendationResult` diharapkan adalah objek langsung dari API, contoh: { products: [...], status: "success" }
  const products = recommendationResult?.products || [];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="inline-block text-yellow-400 fill-yellow-400" />);
    }
    // Render half star
    if (halfStar) {
      stars.push(
        <Star
          key="half"
          className="inline-block text-yellow-400 fill-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }} // Menggunakan clipPath untuk setengah bintang
        />
      );
    }
    // Render empty stars (opsional, untuk mengisi total 5 bintang)
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="inline-block text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl border border-skpink shadow-lg min-h-screen font-sans mt-32">
      <h2 className="text-4xl font-serif font-bold text-skpink mb-8 text-center">
        Your Cosmetic Recommendations
      </h2>

      {products.length > 0 ? (
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Recommended Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"> {/* Menyesuaikan grid untuk 5 kolom di layar besar */}
            {products.map((product, index) => (
              <div
                key={index} // Menggunakan index sebagai key karena tidak ada ID unik dalam data contoh
                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
              >
                <img
                  src={product.image || 'https://placehold.co/210x210/E0E0E0/6C6C6C?text=No+Image'} // Fallback image jika tidak ada
                  alt={product.product_name}
                  className="w-full h-48 object-cover"
                  onError={(e) => { // Handle error jika gambar tidak bisa dimuat
                    e.target.onerror = null; // Mencegah loop error
                    e.target.src = 'https://placehold.co/210x210/E0E0E0/6C6C6C?text=Image+Error';
                  }}
                />
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-sm text-gray-500 mb-1">{product.brand || 'No Brand'}</p>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900 flex-grow">{product.product_name || 'Unknown Product'}</h4>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-1">
                    {product.rating !== undefined && product.rating !== null ? (
                      <>
                        {renderStars(product.rating)}
                        <span className="text-yellow-500 font-semibold ml-1">
                          {product.rating.toFixed(1)}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500 text-sm">No Rating</span>
                    )}
                    {product.total_reviews !== undefined && product.total_reviews !== null && (
                      <p className="text-sm text-gray-600 ml-2">
                        ({product.total_reviews.toLocaleString()} reviews)
                      </p>
                    )}
                  </div>
                  
                  {/* Price */}
                  <p className="text-lg font-bold text-skpink mt-2">
                    Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}
                  </p>

                  {/* Ingredients (optional, could be in a modal or tooltip) */}
                  {product.ingredients && (
                    <p className="text-xs text-gray-500 mt-2 italic">
                      Ingredients: {product.ingredients.slice(0, 50)}{product.ingredients.length > 50 ? '...' : ''}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-700 font-semibold mb-4">
            Tidak ada rekomendasi yang ditemukan untuk kriteria Anda.
          </p>
          <p className="text-gray-600">
            Coba sesuaikan pilihan Anda dan coba lagi.
          </p>
        </div>
      )}

      <div className="mt-10 text-center">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-skpink text-white rounded-md font-semibold hover:shadow-lg transition"
        >
          Back to Recommendation Form
        </button>
      </div>
    </div>
  );
}
