import { useState } from "react";
import SkinConcernsView from "@views/LandingPage/sections/SkinConcerns";
import { skinConcerns } from "@models/skinConcernsModel";

export default function SkinConcernsPresenter() {
  const [index, setIndex] = useState(0);
  const visibleCards = 4;

  const next = () => {
    if (index + visibleCards < skinConcerns.length) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <SkinConcernsView
      skinConcerns={skinConcerns}
      index={index}
      visibleCards={visibleCards}
      onNext={next}
      onPrev={prev}
    />
  );
}
