import { useState } from 'react';

// Define the recommendation criteria options
const recommendationSteps = [
  {
    label: 'Skin Type',
    name: 'skin_type',
    question: 'What is your general skin type?',
    subtext: 'Choose one that fits your skin best',
    type: 'radio',
    options: [
      'combination',
      'oily',
      'normal',
      'dry',
    ],
  },
  {
    label: 'Skin Concern',
    name: 'skin_concern',
    question: 'What skin concerns are you currently experiencing?',
    subtext: 'Select all that apply',
    type: 'checkbox',
    options: [
      'acne',
      'blackheads',
      'sensitive',
      'irritation',
      'redness',
      'pores',
      'dryness',
      'fine lines',
      'wrinkles',
      'oiliness',
      'hyperpigmentation',
      'tiny bumps',
      'dark spots',
      'whiteheads',
      'dull skin',
    ],
  },
  {
    label: 'Skin Goal',
    name: 'skin_goal',
    question: 'What is your primary skin goal?',
    subtext: 'Select all that apply (for now, choose one as API expects single value, will adjust for multiple if needed later)',
    type: 'checkbox', // Changed to checkbox to allow multiple selections, but API expects single string. Will handle conversion in presenter.
    options: [
      'brightening',
      'hydrating',
      'smoothing',
      'calming',
      'fast-absorbing',
      'pore-minimizing',
      'barrier-repair',
      'tone-evening',
      'glowing',
      'oil-control',
      'non-comedogenic',
      'nourishing',
      'scar-fading',
      'refreshing',
      'regenerating',
      'plumping',
      'healthy',
      'lightweight',
      'anti-aging',
      'firming',
    ],
  },
  // {
  //   label: 'Ingredient Category',
  //   name: 'ingredient_category',
  //   question: 'What ingredient category are you interested in?',
  //   subtext: 'Select all that apply',
  //   type: 'checkbox',
  //   options: [
  //     'acne',
  //     'brightening',
  //     'calming',
  //     'exfoliant',
  //     'hydrating',
  //     'anti_aging',
  //   ],
  // },
  {
    label: 'Specific Ingredients',
    name: 'ingredient', // API expects a single 'ingredient' string
    question: 'Are there any specific ingredients you prefer or avoid?',
    subtext: 'Select all that apply (will be concatenated for API)',
    type: 'checkbox',
    options: [
      'niacinamide',
      'glycerin',
      'vitamin c',
      'bha',
      'aha',
      'retinol',
      'salicylic acid',
      'hyaluronic acid',
      'centella asiatica',
      'aloe vera',
      'tea tree',
      'ceramide',
      'green tea',
      'zinc',
      'licorice',
      'pha',
      'arbutin',
      'glycolic acid',
      'lactic acid',
      'vitamin e',
      'mandelic acid',
    ],
  },
  {
    label: 'Product Category',
    name: 'category',
    question: 'What product category are you looking for?',
    subtext: 'Select all that apply',
    type: 'checkbox',
    options: [
      'Moisturizer Gel',
      'Moisturizer Lotion',
      'Moisturizer Cream',
      'Sun Protection',
      'Facial Wash',
      'Toner',
      'Serum & Essence',
      'Peeling',
      'Exfoliator',
      'Acne treatment',
    ],
  },
  {
    label: 'Age Group & Price Range',
    name: 'age_price', // Grouping age and price into one step for UI flow
    question: 'What is your age group and preferred price range?',
    subtext: 'Please select your age and enter your budget.',
    type: 'custom', // This step will have custom inputs (radio for age, number for price)
    options: { // Custom options for this step
        ages: [
            'under 18',
            '19 - 24',
            '25 - 29',
            '30 - 34',
            '35 - 39',
        ],
    }
  },
];

export function useSkinFormModel() {
  const [currentStep, setCurrentStep] = useState(0);

  // Initialize formData with default values that match API's expected types
  const [formData, setFormData] = useState({
    skin_type: '',
    skin_concern: [], // Checkbox
    skin_goal: [], // Checkbox, will convert to single string for API
    // ingredient_category: [], // Checkbox
    ingredient: [], // Checkbox, will concatenate for API
    category: [], // Checkbox
    age: '', // Radio for age group in the last step
    price_min: 0,
    price_max: 200000,
  });

  const onRadioChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onCheckboxChange = (name, value) => {
    setFormData((prev) => {
      const currentArray = prev[name];
      if (currentArray.includes(value)) {
        return {
          ...prev,
          [name]: currentArray.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [name]: [...currentArray, value],
        };
      }
    });
  };

  const onPriceChange = (name, value) => {
    setFormData((prev) => ({
        ...prev,
        [name]: Number(value), // Ensure price is a number
    }));
  };

  return {
    steps: recommendationSteps, // Use the new steps
    currentStep,
    setCurrentStep,
    formData,
    setFormData, // Expose setFormData for custom handling (e.g., price input)
    onRadioChange,
    onCheckboxChange,
    onPriceChange,
  };
}
