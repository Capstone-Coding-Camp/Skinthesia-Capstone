import { useState } from "react";
import { collections } from "@models/collectionsModel";

export default function useCollectionsPresenter() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
  };

  return { collections, currentIndex, handlePrev, handleNext };
}
