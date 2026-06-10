import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import { formatPrice } from "../utils/format";
import { Heart } from "lucide-react";

export function ProductCard({ product }) {
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);
  const isFavorite = wishlist.includes(product.id);

  // Default colors for interactive swatches
  const defaultColors = [
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Black', hex: '#111111' },
    { name: 'Ivory', hex: '#FAF9F6' },
  ];
  const colors = product.colors || defaultColors;
  const [activeColor, setActiveColor] = useState(colors[0]);

  // Handle dynamic hover state swapping images
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="group relative flex flex-col font-sans bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 overflow-hidden">
      <div 
        className="relative overflow-hidden bg-bg-secondary aspect-[4/5]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Link to={`/shop/${product.id}`} className="block w-full h-full">
          <img
            src={product.images && product.images[0] ? product.images[0] : "https://placehold.co/600x800/F8F9FA/D4AF37?text=AURA"}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${isHovering && product.images && product.images[1] ? 'opacity-0' : 'opacity-100'}`}
          />
          {product.images && product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} flat-lay`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out transform ${isHovering ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
            />
          )}
        </Link>

        {/* Wishlist Button Overlay */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className="absolute top-3 right-3 z-10 bg-white/90 p-2 rounded-full text-text-main shadow-md hover:text-accent-primary transition-colors focus:outline-none"
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? "fill-accent-primary text-accent-primary" : ""}`} />
        </button>

        {/* Labels */}
        {!product.inStock ? (
          <div className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full">
            Sold Out
          </div>
        ) : product.exclusivity ? (
          <div className="absolute top-3 left-3 z-10 bg-accent-primary text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full">
            {product.exclusivity}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col flex-grow p-4 md:p-5">
        {/* Color Swatches */}
        <div className="flex items-center gap-2 mb-3">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={(e) => { e.preventDefault(); setActiveColor(color); }}
              className={`w-4.5 h-4.5 rounded-full border-2 transition-all ${activeColor.hex === color.hex ? 'border-accent-primary scale-110' : 'border-transparent shadow-sm'}`}
              style={{ backgroundColor: color.hex }}
              aria-label={`Select color ${color.name}`}
              title={color.name}
            />
          ))}
          <span className="text-[10px] text-text-muted ml-1 font-medium">+{Math.floor(Math.random() * 3) + 1}</span>
        </div>

        {/* Info */}
        <Link to={`/shop/${product.id}`} className="text-sm md:text-base font-bold text-text-main hover:text-accent-primary transition-colors line-clamp-1 mb-1">
          {product.name}
        </Link>
        <span className="text-sm font-bold text-text-muted">
          {formatPrice(product.price)}
        </span>
        
        {/* Action Button - True Classic Style Conversion Focus */}
        {product.inStock ? (
          <button
            onClick={() => addToCart(product, product.sizes[0] || "O/S")}
            className="mt-4 w-full py-3 bg-text-main text-white text-xs font-bold uppercase hover:bg-accent-primary transition-colors rounded-md"
          >
            Add to Cart
          </button>
        ) : (
          <button className="mt-4 w-full py-3 bg-bg-secondary text-text-muted text-xs font-bold uppercase cursor-not-allowed rounded-md">
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}
