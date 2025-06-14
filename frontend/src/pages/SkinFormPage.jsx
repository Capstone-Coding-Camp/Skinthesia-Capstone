import SkinFormView from "@views/SkinForm/SkinForm";
// import SkinAnalysisResult from "@views/SkinForm/SkinAnalysisResult";
import useSkinFormPresenter from "@presenters/hooks/useSkinFormPresenter";

export default function SkinFormPage() {
  const {
    steps,
    currentStep,
    goNext,
    goPrev,
    jumpToStep,
    formData,
    onRadioChange,
    onCheckboxChange,
    onPriceChange,
    onSubmit,
    resetForm,
    recommendationResult, // Pastikan ini diterima dari hook presenter
    loading,
    error,
  } = useSkinFormPresenter();

  return (
    <div className="App">
      <SkinFormView
        steps={steps}
        currentStep={currentStep}
        goNext={goNext}
        goPrev={goPrev}
        jumpToStep={jumpToStep}
        formData={formData}
        onRadioChange={onRadioChange}
        onCheckboxChange={onCheckboxChange}
        onPriceChange={onPriceChange}
        onSubmit={onSubmit}
        recommendationResult={recommendationResult} // <--- PASTIKAN PROP INI DITERUSKAN DENGAN BENAR
        loading={loading}
        error={error}
      />
    </div>
  );

  // return (
  //   <SkinAnalysisResult analysisResult={analysisResult} onReset={resetForm} />
  // );
}
