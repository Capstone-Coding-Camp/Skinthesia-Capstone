import { useState, useEffect } from "react";
import SkinConcernsView from "@views/LandingPage/sections/SkinConcerns";
import { skinConcerns } from "@models/skinConcernsModel";

export default function SkinConcernsPresenter() {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4); // default

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, skinConcerns.length - visibleCards);

  const next = () => {
    setIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const prev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const isPrevDisabled = index === 0;
  const isNextDisabled = index >= maxIndex;

  return (
    <SkinConcernsView
      skinConcerns={skinConcerns}
      index={index}
      visibleCards={visibleCards}
      onNext={next}
      onPrev={prev}
      isPrevDisabled={isPrevDisabled}
      isNextDisabled={isNextDisabled}
    />
  );
}