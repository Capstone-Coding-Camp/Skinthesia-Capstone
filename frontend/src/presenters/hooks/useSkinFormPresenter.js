import { useSkinFormModel } from "@models/SkinFormModel";
import { useState, useCallback } from "react";

// Base URL API Anda
const API_BASE_URL = "https://skinthesia-backend.andzuru.space"; // Sesuaikan dengan port Hapi Anda

export default function useSkinFormPresenter() {
  const {
    steps,
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    onRadioChange,
    onCheckboxChange,
    onPriceChange,
  } = useSkinFormModel();

  // recommendationResult akan menampung seluruh objek respons API ({ products: [...], status: "success" })
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateStep = useCallback(() => {
    const currentStepData = steps[currentStep];
    const value = formData[currentStepData.name];

    if (currentStepData.type === 'custom') {
        if (!formData.age) {
            setError("Please select your age group.");
            return false;
        }
        if (formData.price_min < 0 || formData.price_max < 0) {
            setError("Price cannot be negative.");
            return false;
        }
        if (formData.price_max <= formData.price_min) {
            setError("Maximum price must be greater than minimum price.");
            return false;
        }
    } else {
        const isEmpty =
            (Array.isArray(value) && value.length === 0) ||
            (!Array.isArray(value) && value === "");

        if (isEmpty) {
            setError(`Please answer: "${currentStepData.question}"`);
            return false;
        }
    }
    setError(null);
    return true;
  }, [formData, currentStep, steps]);

  const goNext = () => {
    if (!validateStep()) return;

    // Reset error dan hasil jika berhasil ke langkah berikutnya
    setError(null);
    setRecommendationResult(null); // Penting untuk mereset hasil saat berpindah langkah

    setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 0);
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
      setRecommendationResult(null); // Penting untuk mereset hasil saat kembali
    }
  };

  const jumpToStep = (idx) => {
    setCurrentStep(idx);
    setError(null);
    setRecommendationResult(null); // Penting untuk mereset hasil saat lompat
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < steps.length; i++) {
        const stepData = steps[i];
        const value = formData[stepData.name];

        if (stepData.type === 'custom') {
            if (!formData.age || formData.price_max <= formData.price_min || formData.price_min < 0 || formData.price_max < 0) {
                setError("Please complete age and valid price range in the last step.");
                setCurrentStep(i);
                return;
            }
        } else {
            const isEmpty =
                (Array.isArray(value) && value.length === 0) ||
                (!Array.isArray(value) && value === "");
            if (isEmpty) {
                setError(`Please answer: "${stepData.question}"`);
                setCurrentStep(i);
                return;
            }
        }
    }

    setLoading(true);
    setError(null);
    setRecommendationResult(null); // Clear previous results before new request

    try {
      const formattedData = {
        "skin_type": `${formData.skin_type}`,
        // Mengambil elemen pertama dari array atau string kosong jika array kosong
        "skin_concern": `${formData.skin_concern.length > 0 ? formData.skin_concern[0] : ''}`,
        "skin_goal": `${formData.skin_goal.length > 0 ? formData.skin_goal[0] : ''}`,
        // Menggabungkan semua ingredient yang dipilih menjadi satu string dipisahkan koma
        "ingredient": `${formData.ingredient}`,
        // [
        //   ...formData.ingredient_category,
        //   ...formData.ingredient
        // ].filter(Boolean).join(', '), // Filter Boolean untuk menghapus nilai kosong
        "age": `${formData.age}`,
        "price_min": `${formData.price_min}`,
        "price_max": `${formData.price_max}`,
        "category": `${formData.category.length > 0 ? formData.category[0] : ''}`,
      };

      console.log("Sending recommendation request payload:", formattedData);

      const response = await fetch(`${API_BASE_URL}/api/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (data.errors && data.errors[0] && data.errors[0].msg) || "Failed to get recommendations from API.");
      }

      // Pastikan `data` memiliki properti `products` sebelum disimpan
      if (data.products) {
          setRecommendationResult(data); // Simpan seluruh objek respons API
          // console.log("Recommendations received:", data);
          console.log("Recommendations received and state set:", data); // Tambahkan log ini
      } else {
          // Jika `data.products` tidak ada atau kosong, mungkin API tidak mengembalikan rekomendasi
          setRecommendationResult({ products: [], status: "success" }); // Set sebagai kosong agar section muncul
          console.warn("API response did not contain 'products' array:", data);
      }

    } catch (err) {
      console.error("Error submitting recommendation form:", err);
      setError(err.message || "An error occurred while getting recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRecommendationResult(null);
    setCurrentStep(0);
    setError(null);
    setFormData({
      skin_type: '',
      skin_concern: [],
      skin_goal: [],
      ingredient: [],
      category: [],
      age: '',
      price_min: 0,
      price_max: 200000,
    });
  };

  return {
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
    resetForm,
    recommendationResult,
    loading,
    error,
  };
}
