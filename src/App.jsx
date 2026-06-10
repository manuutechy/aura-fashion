import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { WishlistDrawer } from "./components/WishlistDrawer";
import { ToastContainer } from "./components/ToastContainer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { OurStory } from "./pages/OurStory";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-main selection:bg-accent-primary selection:text-bg-primary overflow-x-hidden">
      {/* Global Toast Alert Notifications */}
      <ToastContainer />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Slide-out Cart Panel overlay */}
      <CartDrawer />

      {/* Slide-out Wishlist Panel overlay */}
      <WishlistDrawer />

      {/* Page Content Viewport with transition wrapper */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
