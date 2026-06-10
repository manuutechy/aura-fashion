import React, { useState } from "react";
import { X, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FitQuizModal({ isOpen, onClose, product, onApplySize }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    typicalSize: "",
    heightRange: "",
    fitPreference: "",
  });

  const sizesList = ["XS", "S", "M", "L", "XL"];
  const heightsList = [
    { label: "Petite (Under 5'4\")", value: "petite" },
    { label: "Regular (5'4\" - 5'7\")", value: "regular" },
    { label: "Tall (Over 5'7\")", value: "tall" },
  ];
  const fitsList = [
    { label: "Sculpted & Fitted", value: "sculpted" },
    { label: "Standard & Tailored", value: "standard" },
    { label: "Relaxed & Flowing", value: "relaxed" },
  ];

  const handleSelectAnswer = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const calculateRecommendation = () => {
    const { typicalSize, fitPreference } = answers;
    if (!typicalSize) return "M";
    
    const sizeIdx = sizesList.indexOf(typicalSize);
    let recommendedIdx = sizeIdx;

    if (fitPreference === "sculpted") {
      recommendedIdx = Math.max(0, sizeIdx - 1);
    } else if (fitPreference === "relaxed") {
      recommendedIdx = Math.min(sizesList.length - 1, sizeIdx + 1);
    }

    const calculatedSize = sizesList[recommendedIdx];
    
    // Check if product actually supports this size, otherwise fallback to closest
    if (product.sizes.includes(calculatedSize)) {
      return calculatedSize;
    }
    return product.sizes[0] || "M";
  };

  const handleApply = () => {
    const recommended = calculateRecommendation();
    onApplySize(recommended);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({
      typicalSize: "",
      heightRange: "",
      fitPreference: "",
    });
  };

  const recommendedSize = calculateRecommendation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#1C1917]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-bg-primary text-text-main w-full max-w-lg p-8 md:p-10 shadow-2xl relative flex flex-col min-h-[420px] justify-between border border-text-main/5"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-text-muted hover:text-text-main transition-colors focus:outline-none"
                aria-label="Close fit finder"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress dots */}
              <div className="flex gap-2 justify-center mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      step === i ? "w-6 bg-accent-primary" : "w-2 bg-text-muted/20"
                    }`}
                  />
                ))}
              </div>

              {/* Step Contents */}
              <div className="flex-grow flex flex-col justify-center">
                {step === 1 && (
                  <div>
                    <h3 className="text-xl font-display font-light text-text-main text-center mb-6">
                      What is your <span className="italic">typical size</span>?
                    </h3>
                    <div className="flex flex-wrap gap-3 justify-center mb-6">
                      {sizesList.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => handleSelectAnswer("typicalSize", sz)}
                          className={`font-sans text-xs tracking-wider uppercase w-12 h-12 flex items-center justify-center border transition-all duration-300 font-semibold ${
                            answers.typicalSize === sz
                              ? "bg-accent-primary border-accent-primary text-bg-primary shadow-xs"
                              : "bg-transparent border-text-main/15 text-text-main hover:border-text-main"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-xl font-display font-light text-text-main text-center mb-6">
                      Select your <span className="italic">height range</span>
                    </h3>
                    <div className="flex flex-col gap-3 max-w-xs mx-auto mb-6">
                      {heightsList.map((h) => (
                        <button
                          key={h.value}
                          onClick={() => handleSelectAnswer("heightRange", h.value)}
                          className={`py-3 px-6 text-xs text-center border transition-all duration-300 font-semibold tracking-wider uppercase ${
                            answers.heightRange === h.value
                              ? "bg-accent-primary border-accent-primary text-bg-primary"
                              : "bg-transparent border-text-main/15 text-text-main hover:border-text-main"
                          }`}
                        >
                          {h.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="text-xl font-display font-light text-text-main text-center mb-6">
                      How do you prefer the <span className="italic">fit</span>?
                    </h3>
                    <div className="flex flex-col gap-3 max-w-xs mx-auto mb-6">
                      {fitsList.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => handleSelectAnswer("fitPreference", f.value)}
                          className={`py-3 px-6 text-xs text-center border transition-all duration-300 font-semibold tracking-wider uppercase ${
                            answers.fitPreference === f.value
                              ? "bg-accent-primary border-accent-primary text-bg-primary"
                              : "bg-transparent border-text-main/15 text-text-main hover:border-text-main"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="text-center py-4 flex flex-col items-center">
                    <div className="w-12 h-12 bg-bg-secondary border border-accent-primary/20 text-accent-primary rounded-full flex items-center justify-center mb-4">
                      <Check className="w-6 h-6" />
                    </div>
                    <span className="text-accent-primary text-[9px] tracking-[0.4em] uppercase font-bold font-sans">
                      Our Recommendation
                    </span>
                    <h3 className="text-3xl md:text-4.5xl font-display font-light text-text-main mt-2 mb-4">
                      Size <span className="italic font-normal">{recommendedSize}</span>
                    </h3>
                    <p className="text-xs text-text-muted font-sans leading-relaxed max-w-xs mb-6 font-light">
                      Based on your choices, size <span className="font-bold text-text-main">{recommendedSize}</span> will give you the ideal {answers.fitPreference} fit.
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-8 border-t border-text-main/5 pt-6">
                {step > 1 && step < 4 ? (
                  <button
                    onClick={handleBack}
                    className="text-xs uppercase tracking-widest text-text-muted hover:text-text-main font-sans font-bold flex items-center gap-1.5 focus:outline-none"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    disabled={
                      (step === 1 && !answers.typicalSize) ||
                      (step === 2 && !answers.heightRange)
                    }
                    className="bg-accent-primary hover:bg-accent-hover disabled:bg-text-muted/30 text-bg-primary text-xs font-bold tracking-widest uppercase py-3 px-6 shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                ) : step === 3 ? (
                  <button
                    onClick={handleNext}
                    disabled={!answers.fitPreference}
                    className="bg-accent-primary hover:bg-accent-hover text-bg-primary text-xs font-bold tracking-widest uppercase py-3 px-8 shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    Calculate <Check className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleApply}
                    className="bg-accent-primary hover:bg-accent-hover text-bg-primary text-xs font-bold tracking-widest uppercase py-3.5 w-full shadow-sm transition-colors text-center cursor-pointer"
                  >
                    Apply Size {recommendedSize}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
