import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import { products } from "../data";
import { formatPrice } from "../utils/format";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setWishlistOpen, toggleWishlist, addToCart } = useStore();

  // Map wishlist IDs to full product objects
  const likedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product) => {
    // Determine default size (O/S or M or first available size)
    const defaultSize = product.sizes.includes("O/S") ? "O/S" : (product.sizes.includes("M") ? "M" : product.sizes[0]);
    addToCart(product, defaultSize);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Drawer Sidebar (Slides in from Left) */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed inset-y-0 left-0 w-full md:max-w-md bg-bg-primary z-50 shadow-2xl flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-text-main/5 flex justify-between items-center bg-bg-primary">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent-primary fill-accent-primary" />
                <span className="font-sans font-bold tracking-widest text-xs uppercase text-text-main">
                  Your Curation
                </span>
                <span className="text-xs text-text-muted font-sans font-light">
                  ({likedProducts.length} items)
                </span>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="text-text-main hover:text-accent-primary transition-colors focus:outline-none"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable list */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar">
              {likedProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <Heart className="w-12 h-12 text-text-muted/30 mb-4 stroke-1" />
                  <p className="font-display italic text-lg text-text-main mb-6">
                    Your wishlist is empty.
                  </p>
                  <button
                    onClick={() => setWishlistOpen(false)}
                    className="bg-accent-primary hover:bg-accent-hover text-bg-primary font-sans text-xs tracking-widest uppercase py-3 px-8 transition-colors duration-300 font-medium cursor-pointer"
                  >
                    Browse Boutique
                  </button>
                </div>
              ) : (
                likedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 border-b border-text-main/5 pb-6 last:border-0 last:pb-0"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-24 bg-bg-secondary flex-shrink-0 overflow-hidden">
                      <Link to={`/shop/${product.id}`} onClick={() => setWishlistOpen(false)}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>

                    {/* Meta info */}
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            to={`/shop/${product.id}`}
                            onClick={() => setWishlistOpen(false)}
                            className="text-sm font-display text-text-main font-semibold hover:text-accent-primary transition-colors leading-tight line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-text-muted hover:text-error transition-colors focus:outline-none"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-text-muted font-sans uppercase tracking-widest mt-1">
                          {product.category}
                        </p>
                        <p className="text-xs font-sans font-bold text-accent-primary mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      {/* Add to Cart button */}
                      <div className="mt-3 flex gap-2">
                        {product.inStock ? (
                          <button
                            onClick={() => handleMoveToCart(product)}
                            className="flex-grow flex items-center justify-center gap-1.5 bg-accent-primary hover:bg-accent-hover text-bg-primary text-[10px] font-sans font-bold tracking-widest uppercase py-2 transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3 h-3" /> Add to Cart
                          </button>
                        ) : (
                          <button
                            disabled
                            className="flex-grow bg-text-muted/10 text-text-muted/50 text-[10px] font-sans font-bold tracking-widest uppercase py-2 cursor-not-allowed"
                          >
                            Sold Out
                          </button>
                        )}
                        <Link
                          to={`/shop/${product.id}`}
                          onClick={() => setWishlistOpen(false)}
                          className="px-3 border border-text-main/10 text-text-main hover:border-accent-primary hover:text-accent-primary text-[10px] font-sans font-bold tracking-widest uppercase py-2 transition-colors flex items-center justify-center"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Panel */}
            {likedProducts.length > 0 && (
              <div className="p-6 border-t border-text-main/5 bg-bg-secondary/40">
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="w-full border border-text-main/20 hover:border-text-main hover:bg-text-main hover:text-bg-primary text-text-main font-sans text-xs font-semibold tracking-widest uppercase py-4 transition-all duration-300 text-center"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
