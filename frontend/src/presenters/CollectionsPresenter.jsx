import useCollectionsPresenter from "@presenters/hooks/useCollectionsPresenter";
import CollectionsView from "@views/LandingPage/sections/Collections";

export default function CollectionsPresenter() {
  const {
    collections,
    currentIndex,
    visibleCards,
    handlePrev,
    handleNext,
    isPrevDisabled,
    isNextDisabled,
  } = useCollectionsPresenter();

  return (
    <CollectionsView
      collections={collections}
      currentIndex={currentIndex}
      visibleCards={visibleCards}
      onPrev={handlePrev}
      onNext={handleNext}
      isPrevDisabled={isPrevDisabled}
      isNextDisabled={isNextDisabled}
    />
  );
}
