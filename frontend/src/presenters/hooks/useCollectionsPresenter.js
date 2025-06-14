import { useEffect, useState } from "react";
import { collections } from "@models/collectionsModel";

export default function useCollectionsPresenter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(2);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxIndex = collections.length - visibleCards;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= maxIndex;

  return {
    collections,
    currentIndex,
    visibleCards,
    handlePrev,
    handleNext,
    isPrevDisabled,
    isNextDisabled,
  };
}
