import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const addToast = useStore((state) => state.addToast);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      addToast(`Thank you for subscribing! Welcome to the world of Aura.`, "success");
      setEmail("");
    }
  };

  const handleInfoToast = (feature) => {
    addToast(`${feature} guide is coming soon!`, "info");
  };

  return (
    <footer className="bg-bg-secondary text-text-main border-t border-text-main/5 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <span className="text-xl font-display font-bold tracking-[0.2em]">AURA</span>
          <p className="text-sm text-text-muted leading-relaxed max-w-xs">
            Blending metropolitan chic with warm, organic earth tones. Modern Kenyan elegance, designed in Nairobi and worn globally.
          </p>
        </div>

        {/* Shop links */}
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold text-text-main mb-6">
            The Boutique
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-text-muted">
            <li>
              <a href="/shop" className="hover:text-accent-primary transition-colors">All Pieces</a>
            </li>
            <li>
              <a href="/shop?category=dresses" className="hover:text-accent-primary transition-colors">Dresses</a>
            </li>
            <li>
              <a href="/shop?category=tops" className="hover:text-accent-primary transition-colors">Tops & Knitwear</a>
            </li>
            <li>
              <a href="/shop?category=accessories" className="hover:text-accent-primary transition-colors">Artisanal Accessories</a>
            </li>
            <li>
              <a href="/shop?category=beauty" className="hover:text-accent-primary transition-colors">Aura Beauty & Skincare</a>
            </li>
          </ul>
        </div>

        {/* Customer Care Links */}
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold text-text-main mb-6">
            Customer Care
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-text-muted">
            <li>
              <button onClick={() => handleInfoToast("Shipping & Returns")} className="hover:text-accent-primary transition-colors text-left focus:outline-none">
                Shipping & Returns
              </button>
            </li>
            <li>
              <button onClick={() => handleInfoToast("Sizing Guide")} className="hover:text-accent-primary transition-colors text-left focus:outline-none">
                Sizing Guide
              </button>
            </li>
            <li>
              <button onClick={() => handleInfoToast("Sustainability & Craftsmanship")} className="hover:text-accent-primary transition-colors text-left focus:outline-none">
                Sustainability
              </button>
            </li>
            <li>
              <button onClick={() => handleInfoToast("Contact Us")} className="hover:text-accent-primary transition-colors text-left focus:outline-none">
                Contact & Bespoke Services
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold text-text-main mb-6">
            Newsletter
          </h4>
          <p className="text-sm text-text-muted leading-relaxed mb-4">
            Subscribe to receive editorial stories, private collection launches, and event invitations.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-text-main py-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent text-sm placeholder-text-muted/50 focus:outline-none pr-8 text-text-main"
            />
            <button
              type="submit"
              className="absolute right-0 text-text-main hover:text-accent-primary transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Social icons */}
          <div className="flex gap-4 mt-8 text-text-muted">
            <button onClick={() => handleInfoToast("Instagram")} aria-label="Instagram link" className="hover:text-accent-primary transition-colors focus:outline-none">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </button>
            <button onClick={() => handleInfoToast("Facebook")} aria-label="Facebook link" className="hover:text-accent-primary transition-colors focus:outline-none">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </button>
            <button onClick={() => handleInfoToast("Twitter")} aria-label="Twitter link" className="hover:text-accent-primary transition-colors focus:outline-none">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 border-t border-text-main/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted font-light">
        <p>© {new Date().getFullYear()} AURA NAIROBI. All Rights Reserved.</p>
        <p>Inspired by the warmth of Kenya. Designed for the global citizen.</p>
      </div>
    </footer>
  );
}
