import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { formatPrice } from "../utils/format";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const navigate = useNavigate();
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart } = useStore();

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Dark Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 w-full md:max-w-md bg-bg-primary z-50 shadow-2xl flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-text-main/5 flex justify-between items-center bg-bg-primary">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-accent-primary" />
                <span className="font-sans font-bold tracking-widest text-xs uppercase text-text-main">
                  Your Aura Bag
                </span>
                <span className="text-xs text-text-muted font-sans font-light">
                  ({cart.reduce((count, item) => count + item.quantity, 0)})
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="text-text-main hover:text-accent-primary transition-colors focus:outline-none"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Cart items list */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <ShoppingBag className="w-12 h-12 text-text-muted/30 mb-4 stroke-1" />
                  <p className="font-display italic text-lg text-text-main mb-6">
                    Your shopping bag is empty.
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => setCartOpen(false)}
                    className="inline-block bg-accent-primary text-bg-primary font-sans text-xs tracking-widest uppercase py-3 px-8 hover:bg-accent-hover transition-colors duration-300 font-medium"
                  >
                    Explore Collection
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 border-b border-text-main/5 pb-6 last:border-0 last:pb-0"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 bg-bg-secondary flex-shrink-0 overflow-hidden">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-display text-text-main font-semibold leading-tight line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-xs text-text-muted hover:text-error transition-colors focus:outline-none"
                            aria-label="Remove item"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-text-muted font-sans mt-1">
                          Size: <span className="font-bold">{item.size}</span>
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex justify-between items-center mt-2">
                        {/* Qty selectors */}
                        <div className="flex items-center border border-text-main/10 bg-bg-secondary">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.quantity - 1)
                            }
                            className="px-2 py-1 text-text-muted hover:text-text-main hover:bg-text-main/5 transition-colors focus:outline-none"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-sans text-text-main font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.quantity + 1)
                            }
                            className="px-2 py-1 text-text-muted hover:text-text-main hover:bg-text-main/5 transition-colors focus:outline-none"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-sans font-bold text-accent-primary">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sticky Drawer Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-text-main/5 bg-bg-secondary/70 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-xs tracking-wider uppercase text-text-muted">
                    Subtotal
                  </span>
                  <span className="font-sans text-lg font-bold text-text-main">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                <p className="text-[11px] text-text-muted font-sans mb-4 leading-relaxed italic">
                  Shipping and taxes calculated at checkout.
                </p>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-accent-primary hover:bg-accent-hover text-bg-primary font-sans text-xs font-semibold tracking-widest uppercase py-4 transition-colors duration-300 shadow-md text-center"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/cart"
                  onClick={() => setCartOpen(false)}
                  className="block text-center text-xs text-text-muted hover:text-accent-primary mt-4 font-sans underline underline-offset-4"
                >
                  View Full Shopping Bag
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
