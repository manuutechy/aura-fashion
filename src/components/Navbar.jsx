import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useStore } from "../store/useStore";
import { Search, User, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const setCartOpen = useStore((state) => state.setCartOpen);
  const setWishlistOpen = useStore((state) => state.setWishlistOpen);
  const addToast = useStore((state) => state.addToast);

  const promos = [
    "LIMITED ATELIER RUN: SELECT PIECES PRODUCED IN BATCHES OF 15",
    "COMPLIMENTARY EXPRESS COURIER DELIVERY WITHIN NAIROBI",
    "USE CODE 'AURA10' FOR 10% OFF YOUR FIRST ORDER"
  ];
  const [promoIdx, setPromoIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIdx((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Total quantity of items in the cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToast(`Searching for "${searchQuery}"... Feature coming soon!`, "info");
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Dynamic Luxury Promo Ticker Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#111111] text-[#FAF9F6] py-2.5 px-4 text-[9px] md:text-xs tracking-[0.25em] uppercase text-center font-sans font-bold flex justify-center items-center h-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={promoIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="block text-center"
          >
            {promos[promoIdx]}
          </motion.span>
        </AnimatePresence>
      </div>

      <header
        className={`fixed z-40 transition-all duration-500 rounded-full ${
          isScrolled
            ? "top-14 left-4 right-4 md:left-12 md:right-12 liquid-glass py-3 shadow-lg"
            : "top-14 left-0 right-0 bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          
          {/* Left Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase font-sans font-medium">
            <NavLink
              to="/shop"
              end
              className={({ isActive }) =>
                `transition-colors duration-300 hover:text-accent-primary ${
                  isActive && !location.search.includes("category=beauty") ? "text-accent-primary font-bold" : "text-text-main"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/shop?category=beauty"
              className={() =>
                `transition-colors duration-300 hover:text-accent-primary ${
                  location.search.includes("category=beauty") ? "text-accent-primary font-bold" : "text-text-main"
                }`
              }
            >
              Beauty
            </NavLink>
            <NavLink
              to="/our-story"
              className={({ isActive }) =>
                `transition-colors duration-300 hover:text-accent-primary ${
                  isActive ? "text-accent-primary font-bold" : "text-text-main"
                }`
              }
            >
              Our Story
            </NavLink>
          </nav>

          {/* Mobile Menu Button (Left) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-text-main hover:text-accent-primary transition-colors focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo (Centered) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-display font-black tracking-[0.25em] text-text-main hover:text-accent-primary transition-colors"
            >
              AURA
            </Link>
          </div>

          {/* Right Navigation Icons */}
          <div className="flex items-center gap-4 md:gap-6 text-text-main">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-accent-primary transition-colors focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-5 h-5 md:w-[22px] md:h-[22px]" />
            </button>

            {/* Wishlist Icon (Opens Wishlist Drawer) */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative hover:text-accent-primary transition-colors focus:outline-none cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 md:w-[22px] md:h-[22px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent-primary text-[#FAF9F6] text-[9px] font-sans font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account Icon */}
            <button
              onClick={() => addToast("Customer portal coming soon. Stay tuned!", "info")}
              className="hover:text-accent-primary transition-colors focus:outline-none"
              aria-label="Account"
            >
              <User className="w-5 h-5 md:w-[22px] md:h-[22px]" />
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative hover:text-accent-primary transition-colors focus:outline-none"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 md:w-[22px] md:h-[22px]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-1.5 -right-1.5 bg-accent-primary text-[#FAF9F6] text-[9px] font-sans font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-bg-primary z-50 shadow-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-16">
                  <span className="text-xl font-display font-bold tracking-[0.2em]">AURA</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-text-main hover:text-accent-primary transition-colors focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex flex-col gap-5 text-base tracking-widest uppercase font-sans font-medium overflow-y-auto max-h-[60vh] pr-2">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-2 border-b border-bg-secondary"
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-2 border-b border-bg-secondary font-bold"
                  >
                    Shop All
                  </Link>
                  
                  {/* Category subsets */}
                  <Link
                    to="/shop?category=dresses"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-1 pl-3 text-sm text-text-muted"
                  >
                    — Dresses
                  </Link>
                  <Link
                    to="/shop?category=tops"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-1 pl-3 text-sm text-text-muted"
                  >
                    — Tops
                  </Link>
                  <Link
                    to="/shop?category=knitwear"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-1 pl-3 text-sm text-text-muted"
                  >
                    — Knitwear
                  </Link>
                  <Link
                    to="/shop?category=bottoms"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-1 pl-3 text-sm text-text-muted"
                  >
                    — Bottoms
                  </Link>
                  <Link
                    to="/shop?category=resortwear"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-1 pl-3 text-sm text-text-muted"
                  >
                    — Resortwear
                  </Link>
                  <Link
                    to="/shop?category=footwear"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-1 pl-3 text-sm text-text-muted"
                  >
                    — Footwear
                  </Link>
                  <Link
                    to="/shop?category=accessories"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-1 pl-3 text-sm text-text-muted"
                  >
                    — Accessories
                  </Link>
                  
                  <Link
                    to="/shop?category=beauty"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-2 border-b border-bg-secondary mt-2"
                  >
                    Aura Beauté
                  </Link>
                  <Link
                    to="/our-story"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-2 border-b border-bg-secondary"
                  >
                    Our Story
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent-primary transition-colors py-2 border-b border-bg-secondary"
                  >
                    Shopping Bag ({cartCount})
                  </Link>
                </nav>
              </div>

              <div className="text-xs text-text-muted font-sans tracking-wider leading-relaxed">
                <p>Designed in Nairobi. Worn globally.</p>
                <p className="mt-1">© {new Date().getFullYear()} AURA NAIROBI.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full Screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg-primary/95 flex items-center justify-center p-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-text-main hover:text-accent-primary transition-colors focus:outline-none"
              aria-label="Close search"
            >
              <X className="w-8 h-8" />
            </button>

            <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl text-center">
              <label htmlFor="search-input" className="block text-xs uppercase tracking-widest text-text-muted mb-4 font-sans font-bold">
                What are you looking for?
              </label>
              <div className="relative border-b-2 border-text-main py-2 flex items-center">
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search dress, tops, linen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xl md:text-3xl font-display font-light placeholder-text-muted/40 focus:outline-none text-text-main"
                  autoFocus
                />
                <button type="submit" className="text-text-main hover:text-accent-primary transition-colors" aria-label="Submit search">
                  <Search className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
              <p className="text-xs text-text-muted font-sans mt-3 italic">
                Press Enter to search
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
