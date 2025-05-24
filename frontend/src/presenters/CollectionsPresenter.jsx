import useCollectionsPresenter from "@presenters/hooks/useCollectionsPresenter";
import CollectionsView from "@views/LandingPage/sections/Collections";

export default function CollectionsPresenter() {
  const { collections, currentIndex, handlePrev, handleNext } = useCollectionsPresenter();

  return (
    <CollectionsView
      collections={collections}
      currentIndex={currentIndex}
      onPrev={handlePrev}
      onNext={handleNext}
    />
  );
}
