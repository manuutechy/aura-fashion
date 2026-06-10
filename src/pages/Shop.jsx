import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data";
import { ProductCard } from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam.toLowerCase());
    } else {
      setActiveCategory("all");
    }
  }, [categoryParam]);

  const categories = ["all", "dresses", "tops", "bottoms", "knitwear", "resortwear", "footwear", "accessories", "beauty"];

  const handleCategoryChange = (category) => {
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
    setActiveCategory(category);
  };

  const filteredProducts = products.filter((product) => {
    if (activeCategory === "all") return true;
    return product.category.toLowerCase() === activeCategory;
  });

  return (
    <div className="bg-bg-primary min-h-screen pt-28 pb-24 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col items-center mb-10 text-center border-b border-black/5 pb-8">
          <span className="font-cursive text-accent-primary text-3xl md:text-4xl mb-1 block">Aura Wardrobe</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-text-main mb-4">
            The Collection
          </h1>
          <p className="text-text-muted text-lg max-w-2xl font-medium">
            Elevate your everyday with our signature styles. Designed for comfort, tailored for confidence.
          </p>
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`text-xs font-bold uppercase tracking-wider py-2.5 px-6 border-2 transition-colors ${
                activeCategory === category
                  ? "bg-text-main border-text-main text-white"
                  : "bg-transparent border-bg-secondary text-text-main hover:border-text-main"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Live Items Count */}
        <div className="flex justify-between items-center mb-6 text-sm font-bold text-text-muted uppercase tracking-wider border-b-2 border-bg-secondary pb-4">
          <p>{filteredProducts.length} Results</p>
          <div className="hidden sm:flex gap-4">
            <span className="text-emerald">★ Perfect Fit</span>
            <span>Free Shipping Over $100</span>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-bg-secondary mt-6">
            <p className="font-bold text-lg text-text-muted uppercase tracking-widest">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
