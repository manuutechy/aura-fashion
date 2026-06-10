import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { formatPrice } from "../utils/format";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

export function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useStore();

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="bg-bg-primary min-h-screen pt-32 pb-24 px-6 md:px-12 font-sans text-text-main">
      <div className="max-w-5xl mx-auto">
        
        {/* Editorial Title */}
        <h1 className="text-3xl md:text-5xl font-display font-light mb-12">
          Your Shopping <span className="italic font-normal">Bag</span>
        </h1>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="text-center py-24 border border-text-main/5 bg-bg-secondary/40 flex flex-col items-center">
            <ShoppingBag className="w-16 h-16 text-text-muted/20 mb-6 stroke-1" />
            <p className="font-display italic text-lg text-text-muted mb-8">
              There are no pieces in your bag currently.
            </p>
            <Link
              to="/shop"
              className="bg-accent-primary hover:bg-accent-hover text-bg-primary text-xs font-bold tracking-widest uppercase py-4 px-10 transition-colors shadow-sm"
            >
              Start Exploring
            </Link>
          </div>
        ) : (
          /* Cart Grid Content */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Items list */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-text-main/5 last:border-0"
                >
                  {/* Miniature Image */}
                  <div className="w-28 h-36 bg-bg-secondary overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Metadata and Controls */}
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-lg font-display text-text-main font-semibold">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-text-muted capitalize mt-1 italic">
                            Category: {item.product.category}
                          </p>
                        </div>
                        <span className="text-base font-sans font-bold text-accent-primary">
                          {formatPrice(item.product.price)}
                        </span>
                      </div>
                      
                      <p className="text-xs text-text-muted mt-2 font-medium">
                        Size: <span className="text-text-main font-bold">{item.size}</span>
                      </p>
                    </div>

                    {/* Quantity selectors & delete action */}
                    <div className="flex justify-between items-center mt-6">
                      <div className="flex items-center border border-text-main/10 bg-bg-secondary">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="p-2 text-text-muted hover:text-text-main hover:bg-text-main/5 transition-colors focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-2 text-text-muted hover:text-text-main hover:bg-text-main/5 transition-colors focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-text-muted hover:text-error transition-colors flex items-center gap-1.5 text-xs font-semibold focus:outline-none"
                        aria-label="Delete item from cart"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-muted hover:text-accent-primary transition-colors font-bold"
                >
                  <ArrowLeft className="w-4 h-4" /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right side: Summary panel */}
            <div className="lg:col-span-4 bg-bg-secondary p-8 border border-text-main/5">
              <h2 className="text-xs uppercase tracking-widest font-bold text-text-main mb-6">
                Order Summary
              </h2>
              
              <div className="flex flex-col gap-4 text-sm mb-6 pb-6 border-b border-text-main/5">
                <div className="flex justify-between text-text-muted">
                  <span>Total Items</span>
                  <span>{cartCount}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-main">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Shipping</span>
                  <span className="italic">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-8">
                <span className="text-xs uppercase tracking-wider font-bold text-text-main">
                  Estimated Total
                </span>
                <span className="text-xl font-bold text-text-main">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-accent-primary hover:bg-accent-hover text-bg-primary font-sans text-xs font-bold tracking-widest uppercase py-4 shadow-sm transition-colors text-center"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
