import React, { useState } from "react";
import { X, Check, Scissors } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BespokeModal({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    height: "",
    bust: "",
    waist: "",
    hips: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate tailor logging
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      height: "",
      bust: "",
      waist: "",
      hips: "",
      notes: "",
    });
    setShowSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-[#1C1917]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-bg-primary text-text-main w-full max-w-xl p-8 md:p-10 shadow-2xl relative border border-text-main/5"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-text-muted hover:text-text-main transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!showSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="text-center mb-4">
                    <div className="w-10 h-10 bg-bg-secondary text-accent-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <span className="text-accent-primary text-[9px] tracking-[0.4em] uppercase font-bold font-sans">
                      Aura Private Atelier
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-light text-text-main mt-1">
                      Bespoke Tailoring Request
                    </h3>
                    <p className="text-xs text-text-muted font-sans mt-2 font-light">
                      Customize the <span className="font-semibold text-text-main">{product.name}</span> to your exact measurements.
                    </p>
                  </div>

                  {/* General Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="bespoke-name" className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
                        Full Name
                      </label>
                      <input
                        id="bespoke-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-bg-secondary/40 border-b border-text-main/10 focus:border-accent-primary py-2 px-3 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="bespoke-phone" className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
                        Phone / WhatsApp
                      </label>
                      <input
                        id="bespoke-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="bg-bg-secondary/40 border-b border-text-main/10 focus:border-accent-primary py-2 px-3 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="bespoke-email" className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
                        Email Address
                      </label>
                      <input
                        id="bespoke-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-bg-secondary/40 border-b border-text-main/10 focus:border-accent-primary py-2 px-3 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Measurements */}
                  <div className="border-t border-text-main/5 pt-4 mt-2">
                    <h4 className="text-[11px] uppercase tracking-widest font-bold text-text-main mb-3 text-center md:text-left">
                      Your Measurements (in cm)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="bespoke-height" className="text-[9px] uppercase tracking-wider font-bold text-text-muted">
                          Height (cm)
                        </label>
                        <input
                          id="bespoke-height"
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. 172"
                          className="bg-bg-secondary/40 border-b border-text-main/10 focus:border-accent-primary py-2 px-3 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="bespoke-bust" className="text-[9px] uppercase tracking-wider font-bold text-text-muted">
                          Bust (cm)
                        </label>
                        <input
                          id="bespoke-bust"
                          type="number"
                          name="bust"
                          value={formData.bust}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. 90"
                          className="bg-bg-secondary/40 border-b border-text-main/10 focus:border-accent-primary py-2 px-3 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="bespoke-waist" className="text-[9px] uppercase tracking-wider font-bold text-text-muted">
                          Waist (cm)
                        </label>
                        <input
                          id="bespoke-waist"
                          type="number"
                          name="waist"
                          value={formData.waist}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. 72"
                          className="bg-bg-secondary/40 border-b border-text-main/10 focus:border-accent-primary py-2 px-3 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="bespoke-hips" className="text-[9px] uppercase tracking-wider font-bold text-text-muted">
                          Hips (cm)
                        </label>
                        <input
                          id="bespoke-hips"
                          type="number"
                          name="hips"
                          value={formData.hips}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. 98"
                          className="bg-bg-secondary/40 border-b border-text-main/10 focus:border-accent-primary py-2 px-3 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 mt-2">
                    <label htmlFor="bespoke-notes" className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
                      Special Requests / Length adjustments
                    </label>
                    <textarea
                      id="bespoke-notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="e.g. Add 5cm to hemline, prefer custom brown silk ties, etc."
                      className="bg-bg-secondary/40 border-b border-text-main/10 focus:border-accent-primary py-2 px-3 text-xs focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary hover:bg-accent-hover disabled:bg-text-muted/40 text-bg-primary font-sans text-xs font-bold tracking-widest uppercase py-4 shadow-sm transition-colors text-center cursor-pointer mt-4"
                  >
                    {isSubmitting ? "Submitting to Atelier..." : "Submit Tailoring Details"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="w-14 h-14 bg-bg-secondary text-accent-primary border border-accent-primary/20 rounded-full flex items-center justify-center mb-5">
                    <Check className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  
                  <span className="text-accent-primary text-[9px] tracking-[0.4em] uppercase font-bold font-sans">
                    Request Logged
                  </span>
                  
                  <h3 className="text-2xl md:text-3.5xl font-display font-light mt-3 mb-4">
                    atelier consult <br />
                    <span className="italic">initiated.</span>
                  </h3>
                  
                  <p className="text-sm text-text-muted font-sans font-light leading-relaxed max-w-sm mb-8">
                    Your custom measurements for the <span className="font-semibold text-text-main">{product.name}</span> have been received. Our lead atelier tailor, <span className="font-bold text-text-main">Wanjiku</span>, will contact you at <span className="font-bold text-text-main">{formData.phone}</span> via WhatsApp/SMS within 2 hours to confirm your custom fit.
                  </p>

                  <button
                    onClick={handleClose}
                    className="bg-accent-primary hover:bg-accent-hover text-bg-primary font-sans text-xs font-bold tracking-widest uppercase py-4 px-10 transition-colors w-full shadow-sm cursor-pointer"
                  >
                    Return to Product Details
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
