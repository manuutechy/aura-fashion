import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data";
import { useStore } from "../store/useStore";
import { formatPrice } from "../utils/format";
import { Heart, ChevronDown, ChevronUp, ShoppingBag, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FitQuizModal } from "../components/FitQuizModal";
import { BespokeModal } from "../components/BespokeModal";

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);
  const setCartOpen = useStore((state) => state.setCartOpen);
  const addToast = useStore((state) => state.addToast);

  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [openSection, setOpenSection] = useState(null); // 'fabric' or 'shipping' or null
  const [isFitQuizOpen, setIsFitQuizOpen] = useState(false);
  const [isBespokeOpen, setIsBespokeOpen] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      // Reset selections
      setSelectedSize("");
      setSizeError(false);
      setIsAdded(false);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="bg-bg-primary min-h-screen pt-32 pb-24 text-center">
        <p className="font-display italic text-xl text-text-muted mb-6">
          Piece not found in our collection.
        </p>
        <Link to="/shop" className="underline font-sans text-xs tracking-widest uppercase text-text-main font-bold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const isFavorite = wishlist.includes(product.id);

  const handleAddToCart = () => {
    // If sizing is required and none is selected
    if (!product.sizes.includes("O/S") && !selectedSize) {
      setSizeError(true);
      addToast("Please select a size.", "error");
      return;
    }

    setSizeError(false);
    setIsAdded(true);
    
    // Perform state action
    addToCart(product, selectedSize);

    // Reset button after 1.5 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="bg-bg-primary min-h-screen pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Back link */}
      <div className="mb-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-muted hover:text-accent-primary transition-colors font-sans font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>
      </div>

      {/* Main 50/50 Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Sticky Image Gallery */}
        <div className="lg:sticky lg:top-28 flex flex-col md:flex-row-reverse gap-4">
          
          {/* Main Visual Display */}
          <div className="relative flex-grow bg-bg-secondary overflow-hidden aspect-[3/4]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Out of Stock Label */}
            {!product.inStock && (
              <div className="absolute top-4 left-4 z-10 bg-error text-bg-primary text-xs font-sans font-bold tracking-widest uppercase px-3 py-1">
                Sold Out
              </div>
            )}
          </div>

          {/* Alternate Thumbnail Selectors */}
          <div className="flex md:flex-col gap-3 md:w-20 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none flex-shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-20 bg-bg-secondary flex-shrink-0 overflow-hidden border transition-all duration-300 ${
                  activeImage === img
                    ? "border-accent-primary scale-[1.03]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`Select photo angle ${idx + 1}`}
              >
                <img src={img} alt="Angle view thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details & Options */}
        <div className="flex flex-col gap-8 lg:max-w-xl">
          
          {/* Product Identification */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-accent-primary text-[10px] tracking-[0.4em] uppercase font-bold font-sans">
                {product.category}
              </span>
              {product.exclusivity && (
                <span className="bg-bg-secondary border border-accent-primary/20 text-accent-primary text-[9px] font-sans font-bold tracking-widest uppercase px-2 py-0.5">
                  {product.exclusivity}
                </span>
              )}
            </div>
            <div className="flex justify-between items-baseline gap-4 mt-2">
              <h1 className="text-3xl md:text-5xl font-display font-light text-text-main leading-tight">
                {product.name}
              </h1>
              <button
                onClick={() => toggleWishlist(product)}
                className="bg-bg-secondary hover:bg-bg-primary border border-text-main/10 p-2.5 rounded-full text-text-main hover:text-error transition-colors focus:outline-none flex-shrink-0"
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-error text-error" : ""}`} />
              </button>
            </div>
            
            {/* Price display */}
            <p className="text-xl md:text-2xl font-sans font-bold text-accent-primary mt-4">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Narrative Story */}
          <div className="border-t border-b border-text-main/5 py-6">
            <h4 className="text-xs uppercase tracking-widest text-text-muted font-sans font-bold mb-3">
              The Story
            </h4>
            <p className="font-display italic text-base md:text-lg text-text-main/80 leading-relaxed font-light">
              "{product.story}"
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-muted font-sans font-bold mb-3">
              Details
            </h4>
            <p className="text-sm font-sans text-text-muted leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Sizing selection with validation */}
          {product.inStock && !product.sizes.includes("O/S") && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <label className="text-xs uppercase tracking-widest text-text-muted font-sans font-bold">
                  {product.category === "beauty" ? "Select Volume" : "Select Size"}
                </label>
                <div className="flex gap-4">
                  {product.category !== "beauty" && (
                    <button
                      type="button"
                      onClick={() => setIsFitQuizOpen(true)}
                      className="text-xs text-accent-primary underline underline-offset-4 cursor-pointer hover:text-accent-hover transition-colors font-sans font-semibold focus:outline-none"
                    >
                      Find Your Fit
                    </button>
                  )}
                  {product.category !== "beauty" && (
                    <span className="text-xs text-text-muted underline underline-offset-4 cursor-pointer hover:text-accent-primary transition-colors">
                      Sizing Guide
                    </span>
                  )}
                </div>
              </div>

              {/* Pill selection container with shake animation */}
              <motion.div
                animate={sizeError ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap gap-2.5 mt-1"
              >
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      setSelectedSize(sz);
                      setSizeError(false);
                    }}
                    className={`font-sans text-xs tracking-wider uppercase min-w-[50px] h-10 px-4 flex items-center justify-center border transition-all duration-300 font-semibold ${
                      selectedSize === sz
                        ? "bg-accent-primary border-accent-primary text-bg-primary shadow-xs"
                        : "bg-transparent border-text-main/15 text-text-main hover:border-text-main"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </motion.div>
              
              {sizeError && (
                <p className="text-xs text-error font-sans font-medium mt-1">
                  Please select a size to continue.
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div>
            {product.inStock ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-grow font-sans text-xs font-bold tracking-widest uppercase py-4.5 transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                    isAdded
                      ? "bg-text-main text-bg-primary cursor-default"
                      : "bg-accent-primary hover:bg-accent-hover text-bg-primary cursor-pointer"
                  }`}
                >
                  {isAdded ? (
                    <>Added!</>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>
                {product.category !== "beauty" && (
                  <button
                    onClick={() => setIsBespokeOpen(true)}
                    className="border border-accent-primary/45 hover:border-accent-primary text-accent-primary hover:bg-bg-secondary/40 font-sans text-xs font-bold tracking-widest uppercase py-4.5 px-6 transition-all duration-300 cursor-pointer shadow-xs flex-shrink-0 text-center"
                  >
                    Bespoke Tailoring
                  </button>
                )}
              </div>
            ) : (
              <button
                disabled
                className="w-full bg-text-muted/20 text-text-muted/60 font-sans text-xs font-bold tracking-widest uppercase py-4.5 cursor-not-allowed flex items-center justify-center gap-2"
              >
                Sold Out
              </button>
            )}
          </div>

          {/* Accordions (Fabric / Shipping) */}
          <div className="border-t border-text-main/5 pt-4">
            
            {/* Accordion 1: Fabric & Care or Ingredients */}
            <div className="border-b border-text-main/5 py-4">
              <button
                onClick={() => toggleSection("fabric")}
                className="w-full flex justify-between items-center text-xs uppercase tracking-widest text-text-main hover:text-accent-primary transition-colors focus:outline-none font-sans font-bold"
              >
                <span>{product.category === "beauty" ? "Ingredients & Care" : "Fabric & Care"}</span>
                {openSection === "fabric" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <AnimatePresence initial={false}>
                {openSection === "fabric" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 text-xs text-text-muted font-sans leading-relaxed flex flex-col gap-2">
                      {product.category === "beauty" ? (
                        <>
                          <p>• 100% Organic marula, jojoba, and rosehip seed botanical extracts.</p>
                          <p>• Sourced ethically from sustainable small-holder farming networks in Kenya.</p>
                          <p>• Cruelty-free, paraben-free, and formulated without synthetic colorants.</p>
                          <p>• Store in a cool, dark environment away from direct sunlight.</p>
                        </>
                      ) : (
                        <>
                          <p>• 100% Organic Linen or Pure Mulberry Silk depending on the piece.</p>
                          <p>• Dyed with eco-friendly pigments inspired by Kenyan landscapes.</p>
                          <p>• Dry clean recommended to preserve fiber luster and shape.</p>
                          <p>• Hand wash cold with mild detergent, flat dry. Do not tumble dry.</p>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: Shipping & Returns */}
            <div className="border-b border-text-main/5 py-4">
              <button
                onClick={() => toggleSection("shipping")}
                className="w-full flex justify-between items-center text-xs uppercase tracking-widest text-text-main hover:text-accent-primary transition-colors focus:outline-none font-sans font-bold"
              >
                <span>Shipping & Returns</span>
                {openSection === "shipping" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <AnimatePresence initial={false}>
                {openSection === "shipping" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 text-xs text-text-muted font-sans leading-relaxed flex flex-col gap-2">
                      <p>• Complimentary express courier delivery within Nairobi (1-2 business days).</p>
                      <p>• Flat rate shipping to the rest of Kenya (2-4 business days).</p>
                      <p>• Worldwide shipping available via DHL Express (calculated at checkout).</p>
                      <p>• Return or exchange request eligible within 7 days of delivery for unworn items with tags intact.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Product Reviews Section */}
          <div className="border-t border-text-main/5 mt-16 pt-12">
            <h3 className="text-xl md:text-2xl font-display font-light text-text-main mb-8">
              Atelier <span className="italic">Notes & Feedback</span>
            </h3>
            
            {/* Mock Reviews List */}
            <div className="flex flex-col gap-8">
              <div className="border-b border-text-main/5 pb-8 last:border-0 last:pb-0">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div>
                    <span className="text-xs font-bold font-sans uppercase tracking-widest block text-text-main">Amina O.</span>
                    <span className="text-[10px] text-accent-primary font-semibold tracking-wider font-sans mt-0.5 block">Verified Drape Purchase • Size S</span>
                  </div>
                  <span className="text-xs text-text-muted font-sans font-light">October 24, 2025</span>
                </div>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-light italic">
                  "The weight of this linen is absolute perfection. The drape has an organic, fluid quality that makes it incredibly comfortable. I requested a slight 3cm adjustment on the hem via their bespoke service and the length is spot-on. Nairobi luxury at its absolute finest."
                </p>
              </div>
              
              <div className="border-b border-text-main/5 pb-8 last:border-0 last:pb-0">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div>
                    <span className="text-xs font-bold font-sans uppercase tracking-widest block text-text-main">Sarah W.</span>
                    <span className="text-[10px] text-accent-primary font-semibold tracking-wider font-sans mt-0.5 block">Verified Drape Purchase • Size M</span>
                  </div>
                  <span className="text-xs text-text-muted font-sans font-light">November 12, 2025</span>
                </div>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans font-light italic">
                  "I was hesitant about which size to get, but the Fit Finder advised size M and it fits like a glove. The hand-crafted details make this piece feel highly exclusive. Highly recommend the bespoke option if you have custom fit preferences."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sizing advisor modal */}
      <FitQuizModal
        isOpen={isFitQuizOpen}
        onClose={() => setIsFitQuizOpen(false)}
        product={product}
        onApplySize={(sz) => setSelectedSize(sz)}
      />

      {/* Bespoke tailoring modal */}
      <BespokeModal
        isOpen={isBespokeOpen}
        onClose={() => setIsBespokeOpen(false)}
        product={product}
      />
    </div>
  );
}
