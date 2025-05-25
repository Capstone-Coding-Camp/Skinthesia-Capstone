import { useState } from "react";

const steps = [
  {
    label: "Skin Condition",
    options: [
      "Oily",
      "Dry",
      "Combination (Like oily in T area and dry in other areas)",
    ],
    type: "radio",
    name: "skinCondition",
    question: "What is your general skin condition?",
    subtext: "Choose one that fits your skin best",
  },
  {
    label: "Skin Problems",
    options: [
      "No special problems",
      "Blackheads",
      "Acne",
      "Dull skin",
      "Blackish acne scars",
    ],
    type: "checkbox",
    name: "skinProblems",
    question:
      "What skin problems are you currently experiencing or would like to address?",
    subtext: "Select all that apply",
  },
  {
    label: "Age Group",
    options: ["Teen", "Young Adult", "Adult"],
    type: "radio",
    name: "ageGroup",
    question: "How old are you?",
    subtext: "Choose your age group",
  },
  {
    label: "Skincare Products",
    options: [
      "Face wash",
      "Moisturizer",
      "Sunscreen",
      "Toner",
      "Serum",
      "Essense",
    ],
    type: "checkbox",
    name: "skincareProducts",
    question: "What kind of skincare products are you looking for?",
    subtext: "Select all that apply",
  },
];

export function useSkinFormModel() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    skinCondition: "",
    skinProblems: [],
    ageGroup: "",
    skincareProducts: [],
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

  return {
    steps,
    currentStep,
    setCurrentStep,
    formData,
    onRadioChange,
    onCheckboxChange,
  };
}
