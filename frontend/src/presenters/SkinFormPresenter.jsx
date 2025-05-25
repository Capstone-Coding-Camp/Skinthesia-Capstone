import SkinFormView from "@views/SkinForm/SkinForm";
import { useSkinFormModel } from "@models/SkinFormModel";

export default function SkinFormPresenter() {
  const {
    steps,
    currentStep,
    setCurrentStep,
    formData,
    onRadioChange,
    onCheckboxChange,
  } = useSkinFormModel();

const goNext = () => {
  const currentStepData = steps[currentStep];
  const value = formData[currentStepData.name];

  const isEmpty =
    (Array.isArray(value) && value.length === 0) ||
    (!Array.isArray(value) && value === "");

  if (isEmpty) {
    alert(`Please answer: "${currentStepData.question}"`);
    return;
  }

  setTimeout(() => {
    setCurrentStep(currentStep + 1);
  }, 0);
};


  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const jumpToStep = (idx) => {
    setCurrentStep(idx);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    for (const step of steps) {
      const value = formData[step.name];
      const isEmpty =
        (Array.isArray(value) && value.length === 0) ||
        (!Array.isArray(value) && value === "");
      if (isEmpty) {
        alert(`Please answer: "${step.question}"`);
        return;
      }
    }

    console.log("Form data submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <SkinFormView
      steps={steps}
      currentStep={currentStep}
      goNext={goNext}
      goPrev={goPrev}
      jumpToStep={jumpToStep}
      formData={formData}
      onRadioChange={onRadioChange}
      onCheckboxChange={onCheckboxChange}
      onSubmit={onSubmit}
    />
  );
}
