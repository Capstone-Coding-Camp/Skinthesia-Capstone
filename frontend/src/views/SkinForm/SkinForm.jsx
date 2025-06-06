import { motion } from "framer-motion";
import {
  Droplets,
  AlertCircle,
  Smile,
  PackageSearch,
} from "lucide-react";

const stepIcons = [
  <Droplets size={50} />,
  <AlertCircle size={50} />,
  <Smile size={50} />,
  <PackageSearch size={50} />,
];

export default function SkinFormView({
  steps,
  currentStep,
  goNext,
  goPrev,
  jumpToStep,
  formData,
  onRadioChange,
  onCheckboxChange,
  onSubmit,
}) {
  const step = steps[currentStep];

  return (
    <div className="bg-white py-10 font-sans min-h-screen relative overflow-hidden">
      {/* Background twinkle stars */}
      <div className="absolute top-[100px] right-[500px] text-skpink text-3xl animate-twinkle delay-[0ms]">✦</div>
      <div className="absolute top-[200px] right-[300px] text-skpink text-3xl animate-twinkle delay-300">✦</div>
      <div className="absolute top-[100px] left-[500px]  text-skpink text-3xl animate-twinkle delay-600">✦</div>
      <div className="absolute top-[250px] left-[300px]  text-skpink text-3xl animate-twinkle delay-900">✦</div>

      {/* Header */}
      <header className="text-center mb-8">
        <img
          src="/images/logo-skinthesia.svg"
          alt="Logo"
          className="mx-auto w-16 object-contain mb-8"
        />
        <h1 className="text-5xl font-serif font-bold text-skpink tracking-wide">
          Skinthesia
        </h1>

        {/* Scrolling Banner */}
        <div className="w-full bg-pink text-white sm:py-7 overflow-hidden mt-16 md:mt-16">
          <div className="whitespace-nowrap flex animate-marquee">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <span
                  key={i}
                  className="font-serif mx-3 text-base sm:text-lg md:text-xl flex items-center gap-4"
                >
                  AI-Powered Recommendations <span className="text-base">✦</span>
                </span>
              ))}
          </div>
        </div>
      </header>

      {/* Note */}
      <p className="text-sm text-black italic text-center py-8 mb-12 max-w-xl mx-auto">
        * Please answer the questions provided to get a preference of the content
        of beauty and skin care products that are suitable for your facial care
        according to your skin characteristics. *
      </p>

      {/* Step Progress */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-4 text-gray-500 text-sm">
          Step {currentStep + 1} of {steps.length}
        </div>
        <div className="relative w-full bg-gray-200 h-2 rounded-full mb-10">
          <div
            className="absolute top-0 left-0 h-2 bg-skpink rounded-full transition-all"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-5xl mx-auto px-6 md:px-16 py-12 border border-skpink rounded-xl shadow-xl"
      >
        {/* Stepper */}
        <div className="flex justify-center gap-8 mb-12">
          {steps.map((stepItem, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;
            return (
              <button
                key={stepItem.label}
                type="button"
                onClick={() => jumpToStep(idx)}
                className={`
                  w-10 h-10 rounded-full border-2 flex items-center justify-center
                  transition
                  ${
                    isActive
                      ? "bg-skpink border-pink-600 text-white font-bold"
                      : isCompleted
                      ? "bg-skpink border-pink-400 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }
                  hover:border-skpink hover:text-skpink
                `}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${idx + 1}: ${stepItem.label}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-lg mb-10"
        >
          <div className="flex items-start gap-6 mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-skpink"
            >
              {stepIcons[currentStep]}
            </motion.div>
            <div>
              <h3 className="font-serif font-semibold text-2xl text-slate-800">
                {step.question}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{step.subtext}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            {step.options.map((option, i) => {
              const inputId = `${step.name}-${i}`;
              const isSelected =
                step.type === "radio"
                  ? formData[step.name] === option
                  : formData[step.name]?.includes(option);
              return (
                <label
                  key={i}
                  htmlFor={inputId}
                  className={`block p-4 border rounded-lg cursor-pointer transition
                    ${
                      isSelected
                        ? "bg-white border-skpink text-skpink shadow-md"
                        : "bg-gray-50 border-gray-300 hover:border-skpink"
                    }
                  `}
                >
                  <input
                    id={inputId}
                    type={step.type}
                    name={step.name}
                    className="hidden"
                    value={option}
                    checked={isSelected}
                    onChange={() =>
                      step.type === "radio"
                        ? onRadioChange(step.name, option)
                        : onCheckboxChange(step.name, option)
                    }
                    required={step.type === "radio"}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </motion.div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-md font-semibold transition ${
              currentStep === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-skpink text-white hover:shadow-lg"
            }`}
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="px-6 py-3 rounded-md font-semibold bg-skpink text-white hover:shadow-lg"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-8 py-3 rounded-md font-bold text-white bg-skpink border border-skpink hover:shadow-lg"
            >
              SkinAnalysis
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
