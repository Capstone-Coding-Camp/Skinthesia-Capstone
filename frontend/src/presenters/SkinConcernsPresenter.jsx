import { useState, useEffect } from "react";
import SkinConcernsView from "@views/LandingPage/sections/SkinConcerns";
import { skinConcerns } from "@models/skinConcernsModel";

export default function SkinConcernsPresenter() {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4); // default

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      // Perhatikan rentang ini, ada kesalahan logika di sini
      if (width < 768) {
        setVisibleCards(1);
      } else if (width >= 768 && width < 1024) { // Perbaiki logika rentang
        setVisibleCards(2);
      } else if (width >= 1024 && width < 1280) { // Perbaiki logika rentang
        setVisibleCards(3);
      } else if (width >= 1280 && width < 1536) { // Perbaiki logika rentang
        setVisibleCards(4);
      } else { // width >= 1536
        setVisibleCards(7);
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