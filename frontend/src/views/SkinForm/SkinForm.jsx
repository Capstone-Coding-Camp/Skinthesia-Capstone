// src/components/SkinForm.jsx
import React, { useState } from 'react'; // Import useState
import { useEffect } from 'react';
import anime from 'animejs';
import { motion } from "framer-motion";
import {
  Droplets,
  AlertCircle,
  Smile,
  Microscope,
  FlaskConical,
  PackageSearch,
  UserRound,
} from "lucide-react";

// Import komponen RecommendationList yang baru
import RecommendationList from '@components/RecommendationResult/RecommendationList';
// Import komponen ProductDetailModal yang baru
import ProductDetailModal from '@components/RecommendationResult/RecommendationModal';
import Marquee from '@components/Marquee';


const stepIcons = [
  <Droplets size={50} />,
  <AlertCircle size={50} />,
  <Smile size={50} />,
  <Microscope size={50} />,
  <FlaskConical size={50} />,
  <PackageSearch size={50} />,
  <UserRound size={50} />,
];

export default function SkinFormView({
  steps,
  currentStep,
  goNext,
  goPrev,
  jumpToStep,
  formData,
  onRadioChange,
  onCheckboxChange,
  onPriceChange,
  onSubmit,
  recommendationResult, // Prop yang diterima dari presenter
  loading,
  error,
}) {
  const step = steps[currentStep];

  // --- State untuk Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fungsi untuk membuka modal dan menyimpan produk yang dipilih
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Bersihkan produk yang dipilih
  };

  useEffect(() => {
    const STAR_COUNT = 50;
    const sky = document.getElementById('hero-form');

    if (!sky) return; // Ensure sky element exists

    // Add mousemove event listener
    const handleMouseMove = (e) => {
      const stars = document.querySelectorAll('#star');
      const skyRect = sky.getBoundingClientRect();
      const centerX = skyRect.left + skyRect.width / 2;
      const centerY = skyRect.top + skyRect.height / 2;

      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;

      stars.forEach(star => {
        const depth = star.dataset.depth;
        const movementX = offsetX * 20 * depth;
        const movementY = offsetY * 20 * depth;

        star.style.transform = `translate(${movementX}px, ${movementY}px) scale(${star.dataset.scale})`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // SVG path for the star
    const starPath = `
      <svg width="34" height="42" viewBox="0 0 34 42" fill="#E16463" xmlns="http://www.w3.org/2000/svg" id="star" class="-z-10 absolute">
        <path d="M17 0L20.7265 16.2184L34 20.7716L20.7265 25.3248L17 41.5432L13.2735 25.3248L0 20.7716L13.2735 16.2184L17 0Z" fill="#E16463"/>
      </svg>
    `;

    // Create stars
    for (let i = 0; i < STAR_COUNT; i++) {
      const div = document.createElement('div');
      div.innerHTML = starPath;
      const star = div.firstElementChild;

      // Get dimensions of the hero section
      const heroWidth = sky.offsetWidth;
      const heroHeight = sky.offsetHeight;

      // Random position within the hero section
      const x = Math.random() * heroWidth;
      const y = Math.random() * heroHeight;
      const depth = Math.random(); // 0.0 - 1.0
      const sizer = Math.random() + Math.random() - 0.3; // 0.0 - 1.0
      const scale = 0.5 + Math.random() * 0.8;

      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.dataset.depth = depth.toFixed(2);
      star.dataset.scale = scale.toFixed(2);

      sky.appendChild(star);


      // Random delay so stars don't all twinkle at the same time
      const delay = Math.random() * 20000;

      anime({
        targets: star,
        scale: [
          { value: 0, duration: 0 },
          { value: sizer, duration: 1600 },
          { value: 0, duration: 800 }
        ],
        easing: 'easeInOutSine',
        loop: true,
        delay: delay
      });
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      const stars = document.querySelectorAll('#star');
      stars.forEach(star => star.remove());
    };
  }, []);

  return (
    <div id="hero-form" className="pt-22 pb-10 font-sans min-h-screen relative overflow-hidden">
      

      {/* Header */}
      <header className="text-center mb-8">
        <img
          src="/logo-skinthesia.svg"
          alt="Logo Skinthesia"
          className="mx-auto w-16 object-contain mb-4 mt-12"
        />
        <h1 className="text-5xl font-serif pb-10 font-bold text-skpink tracking-wide">
          Skinthesia
        </h1>

        {/* Marquee */}
        <div className="w-full bg-pink text-white py-4 mt-12 overflow-hidden">
          <Marquee text="AI-Powered Recommendations" />
        </div>
      </header>

      {/* Note */}
      <p className="text-sm text-black italic text-center py-8 mb-12 max-w-xl mx-auto">
        * Please answer the questions to get personalized cosmetic product recommendations suitable for your skin characteristics and goals. *
      </p>

      {/* Step Progress */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-4 text-gray-500 text-sm">
          Step {currentStep + 1} of {steps.length}
        </div>
        <div className="relative w-full bg-gray-200 h-2 rounded-full mb-10">
          <div
            className="absolute top-0 left-0 h-2 bg-skpink rounded-full transition-all"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Error Display (for form validation or API errors) */}
      {error && (
        <div className="w-full max-w-5xl mx-auto px-6 md:px-16 py-4 mb-8 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
          {error}
        </div>
      )}

      {/* Form or Recommendation Results */}
      {recommendationResult ? ( // Kondisi utama: Tampilkan hasil jika recommendationResult ada
        <div className="w-full max-w-5xl mx-auto px-6 md:px-16 py-8 mt-12 border border-skpink rounded-xl shadow-xl bg-white">
          <h2 className="text-4xl font-serif font-bold text-skpink text-center mt-6 mb-12">Your Cosmetic Recommendations</h2>
          
          {/* Inner conditional: Tampilkan RecommendationList jika products ada dan tidak kosong */}
          {recommendationResult.products && recommendationResult.products.length > 0 ? (
            <section className="mb-12">
              {/* Render RecommendationList di sini, teruskan handleOpenModal */}
              <RecommendationList 
                products={recommendationResult.products} 
                onOpenModal={handleOpenModal} // Teruskan fungsi untuk membuka modal
              />
            </section>
          ) : (
            // Pesan jika produk kosong
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-700 font-semibold mb-4">
                Tidak ada rekomendasi yang ditemukan untuk kriteria Anda.
              </p>
              <p className="text-gray-600">
                Coba sesuaikan pilihan Anda dan coba lagi.
              </p>
            </div>
          )}

          {/* Back to form button */}
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                jumpToStep(0); // Kembali ke langkah pertama
                // resetForm(); // Jika Anda ingin mereset data form juga, panggil ini dari presenter
              }}
              className="px-8 py-3 bg-skpink text-white rounded-md font-semibold hover:shadow-lg transition"
            >
              Back to Form
            </button>
          </div>
        </div>
      ) : ( // Jika recommendationResult null, tampilkan formulir
        <form
          onSubmit={onSubmit}
          className="w-full max-w-5xl mx-auto px-6 md:px-16 py-12 border border-skpink rounded-xl shadow-xl"
        >
          {/* Stepper (navigation buttons) */}
          <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 mb-12 flex-wrap">
            {steps.map((stepItem, idx) => {
              const isActive = idx === currentStep;
              const isCompleted = idx < currentStep;
              return (
                <button
                  key={stepItem.label}
                  type="button"
                  onClick={() => jumpToStep(idx)}
                  className={`
                    w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center
                    transition text-sm md:text-base
                    ${
                      isActive
                        ? "bg-skpink border-pink-600 text-white font-bold"
                        : isCompleted
                        ? "bg-skpink border-pink-400 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }
                    hover:border-skpink hover:text-skpink
                  `}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Step ${idx + 1}: ${stepItem.label}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-lg mb-10"
          >
            <div className="flex items-start gap-6 mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-skpink"
              >
                {stepIcons[currentStep]}
              </motion.div>
              <div>
                <h3 className="font-serif font-semibold text-2xl text-slate-800">
                  {step.question}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{step.subtext}</p>
              </div>
            </div>

            {/* Conditional rendering for different step types */}
            {step.type === 'custom' ? (
              // Custom step for Age and Price Range
              <div className="space-y-6">
                {/* Age Group */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Your Age Group:</h4>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                    {step.options.ages.map((option, i) => {
                      const inputId = `age-${i}`;
                      const isSelected = formData.age === option;
                      return (
                        <label
                          key={inputId}
                          htmlFor={inputId}
                          className={`block p-4 border rounded-lg cursor-pointer transition
                            ${
                              isSelected
                                ? "bg-white border-skpink text-skpink shadow-md"
                                : "bg-gray-50 border-gray-300 hover:border-skpink"
                            }
                          `}
                        >
                          <input
                            id={inputId}
                            type="radio"
                            name="age" // Name for the age radio group
                            className="hidden"
                            value={option}
                            checked={isSelected}
                            onChange={() => onRadioChange('age', option)} // Use onRadioChange for age
                            required
                          />
                          {option}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Preferred Price Range (IDR):</h4>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label htmlFor="price_min" className="block text-gray-700 text-sm font-semibold mb-2">
                        Minimum Price
                      </label>
                      <input
                        type="number"
                        id="price_min"
                        name="price_min"
                        value={formData.price_min}
                        onChange={(e) => onPriceChange('price_min', e.target.value)}
                        min="0"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skpink"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="price_max" className="block text-gray-700 text-sm font-semibold mb-2">
                        Maximum Price
                      </label>
                      <input
                        type="number"
                        id="price_max"
                        name="price_max"
                        value={formData.price_max}
                        onChange={(e) => onPriceChange('price_max', e.target.value)}
                        min="0"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skpink"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Default rendering for radio/checkbox steps
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {step.options.map((option, i) => {
                  const inputId = `${step.name}-${i}`;
                  const isSelected =
                    step.type === "radio"
                      ? formData[step.name] === option
                      : formData[step.name]?.includes(option);
                  return (
                    <label
                      key={inputId}
                      htmlFor={inputId}
                      className={`block p-4 border rounded-lg cursor-pointer transition
                        ${
                          isSelected
                            ? "bg-white border-skpink text-skpink shadow-md"
                            : "bg-gray-50 border-gray-300 hover:border-skpink"
                        }
                      `}
                    >
                      <input
                        id={inputId}
                        type={step.type}
                        name={step.name}
                        className="hidden"
                        value={option}
                        checked={isSelected}
                        onChange={() =>
                          step.type === "radio"
                            ? onRadioChange(step.name, option)
                            : onCheckboxChange(step.name, option)
                        }
                        required={step.type === "radio"}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentStep === 0 || loading}
              className={`px-6 py-3 rounded-md font-semibold transition ${
                currentStep === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-skpink text-white hover:shadow-lg"
              } disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              Previous
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={loading}
                className="px-6 py-3 rounded-md font-semibold bg-skpink text-white hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-md font-bold text-white bg-skpink border border-skpink hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
              </button>
            )}
          </div>
        </form>
      )}

      {/* Render ProductDetailModal */}
      <ProductDetailModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onCloseModal={handleCloseModal}
      />
    </div>
  );
}
