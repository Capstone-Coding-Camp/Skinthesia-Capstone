// src/models/skinFormDummyData.js
export const skinAnalysisResult = {
  summary: {
    skinCondition: "Combination (Like oily in T area and dry in other areas)",
    skinProblems: ["Acne", "Blackheads"],
    ageGroup: "Young Adult",
    skincareProducts: ["Toner", "Serum & Essense", "Sunscreen"],
  },
  recommendedIngredients: [
    "Salicylic Acid",
    "Niacinamide",
    "Hyaluronic Acid",
  ],
  recommendedProducts: [
    {
      id: 1,
      imageUrl: "/images/products/acne-control-toner.jpg",
      brand: "SkinCarePro",
      name: "Acne Control Toner",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 2,
      imageUrl: "/images/products/hydrating-serum.jpg",
      brand: "GlowUp",
      name: "Hydrating Serum",
      rating: 4.8,
      reviews: 250,
    },
    {
      id: 3,
      imageUrl: "/images/products/niacinamide-booster.jpg",
      brand: "PureSkin",
      name: "Niacinamide Booster",
      rating: 4.7,
      reviews: 190,
    },
    {
      id: 4,
      imageUrl: "/images/products/oil-free-moisturizer.jpg",
      brand: "ClearDerm",
      name: "Oil-Free Moisturizer",
      rating: 4.6,
      reviews: 210,
    },
    {
      id: 5,
      imageUrl: "/images/products/sunscreen-gel.jpg",
      brand: "SunProtect+",
      name: "Daily Sunscreen Gel SPF 50",
      rating: 4.9,
      reviews: 320,
    },
  ],
};
