import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { formatPrice } from "../utils/format";
import { Check, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useStore();

  const [formData, setFormData] = useState({
    name: "",
    area: "",
    phone: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shippingCost = cartSubtotal > 0 ? 500 : 0;
  const orderTotal = cartSubtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.area || !formData.phone) return;

    setIsSubmitting(true);
    
    // Simulate API request processing
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    clearCart();
    navigate("/");
  };

  if (cart.length === 0 && !showSuccessModal) {
    return (
      <div className="bg-bg-primary min-h-screen pt-32 pb-24 text-center">
        <p className="font-display italic text-xl text-text-muted mb-6">
          Your shopping bag is empty.
        </p>
        <Link to="/shop" className="underline font-sans text-xs tracking-widest uppercase text-text-main font-bold">
          Go to Boutique Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen pt-32 pb-24 px-6 md:px-12 font-sans text-text-main">
      <div className="max-w-5xl mx-auto">
        
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-display font-light mb-12">
          Mock <span className="italic font-normal">Checkout</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Shipping Details Form */}
          <div className="lg:col-span-7">
            <h2 className="text-xs uppercase tracking-widest font-bold text-text-muted mb-8 border-b border-text-main/5 pb-2">
              Shipping & Delivery Information
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-sm">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name-field" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  id="name-field"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Amani Zawadi"
                  className="w-full bg-bg-secondary/50 border-b border-text-main/10 focus:border-accent-primary py-3 px-4 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="area-field" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Nairobi Area / Estate
                  </label>
                  <input
                    id="area-field"
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Kilimani, Runda, Karen"
                    className="w-full bg-bg-secondary/50 border-b border-text-main/10 focus:border-accent-primary py-3 px-4 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone-field" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    id="phone-field"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. +254 700 000 000"
                    className="w-full bg-bg-secondary/50 border-b border-text-main/10 focus:border-accent-primary py-3 px-4 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="notes-field" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Delivery Notes (Optional)
                </label>
                <textarea
                  id="notes-field"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Special instructions for the courier, estate gate codes, etc."
                  className="w-full bg-bg-secondary/50 border-b border-text-main/10 focus:border-accent-primary py-3 px-4 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Back to Cart link */}
              <div className="flex justify-between items-center mt-6">
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-muted hover:text-accent-primary transition-colors font-bold"
                >
                  <ArrowLeft className="w-4 h-4" /> Edit Bag
                </Link>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent-primary hover:bg-accent-hover disabled:bg-text-muted/40 text-bg-primary font-sans text-xs font-bold tracking-widest uppercase py-4 px-10 transition-colors shadow-md flex items-center justify-center min-w-[150px]"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5 bg-bg-secondary p-8 border border-text-main/5">
            <h2 className="text-xs uppercase tracking-widest font-bold text-text-main mb-6">
              Order Summary
            </h2>

            {/* List of items */}
            <div className="flex flex-col gap-4 max-h-60 overflow-y-auto pr-2 mb-6 border-b border-text-main/5 pb-6 no-scrollbar">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-3 items-center">
                  <div className="w-12 h-16 bg-bg-primary overflow-hidden flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-xs font-semibold text-text-main truncate">{item.product.name}</h4>
                    <p className="text-[10px] text-text-muted font-sans mt-0.5">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-accent-primary">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Totals calculations */}
            <div className="flex flex-col gap-3.5 text-xs text-text-muted mb-6 pb-6 border-b border-text-main/5">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-text-main">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Nairobi Flat Delivery</span>
                <span className="font-semibold text-text-main">{formatPrice(shippingCost)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-wider font-bold text-text-main">
                Total Due
              </span>
              <span className="text-lg font-bold text-accent-primary">
                {formatPrice(orderTotal)}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Success Animation Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#1C1917]"
            />
            {/* Modal Body */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="bg-bg-primary text-text-main w-full max-w-md p-10 text-center shadow-2xl relative"
              >
                {/* Circle Check Icon */}
                <div className="w-16 h-16 bg-bg-secondary text-accent-primary border border-accent-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>

                <span className="text-accent-primary text-[9px] tracking-[0.4em] uppercase font-bold font-sans">
                  Order Completed
                </span>
                
                <h3 className="text-2xl md:text-3.5xl font-display font-light mt-3 mb-4">
                  Thank you for <br />
                  your purchase
                </h3>
                
                <p className="text-sm text-text-muted font-sans font-light leading-relaxed mb-8">
                  Your Aura piece is being prepared in our Nairobi atelier. We will contact you at <span className="font-bold text-text-main">{formData.phone}</span> once the courier commences dispatch.
                </p>

                <button
                  onClick={handleCloseModal}
                  className="bg-accent-primary hover:bg-accent-hover text-bg-primary font-sans text-xs font-bold tracking-widest uppercase py-4 px-10 transition-colors w-full shadow-sm"
                >
                  Return to Boutique Home
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
