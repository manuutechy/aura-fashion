import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../data";
import { ArrowRight, ShieldCheck, Sparkles, Truck, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "../components/ProductCard";

const InstagramIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Home() {
  const featuredProducts = products.slice(0, 5); // Best Sellers
  const featuredItem = products[0]; // Signature
  const impressiveDesigns = products.slice(1, 9); // Confident woman items (8 items)

  // -- Explore Categories State --
  const exploreCategories = [
    { title: "Dresses", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600" },
    { title: "Tops", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=600" },
    { title: "Knitwear", img: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&q=80&w=600" },
    { title: "Accessories", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600" },
    { title: "Beauty", img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=600" }
  ];
  const [activeExploreCat, setActiveExploreCat] = useState(exploreCategories[0].title);
  
  const exploreProducts = useMemo(() => {
    let matches = products.filter(p => p.category.toLowerCase() === activeExploreCat.toLowerCase());
    if (matches.length === 0) matches = products.slice(0, 5);
    return matches.slice(0, 5);
  }, [activeExploreCat]);

  // -- Mini Shop State --
  const [miniCategory, setMiniCategory] = useState("All");
  const [miniSort, setMiniSort] = useState(null);
  const [miniFilter, setMiniFilter] = useState({
    newArrivals: true,
    bestSellers: false,
    limited: false
  });

  const miniShopProducts = useMemo(() => {
    let filtered = [...products];
    if (miniCategory !== "All") filtered = filtered.filter(p => p.category.toLowerCase() === miniCategory.toLowerCase());
    if (miniFilter.bestSellers) filtered = filtered.filter((_, i) => i % 2 !== 0);
    if (miniFilter.limited) filtered = filtered.filter((_, i) => i % 3 === 0);
    if (miniSort === "low-high") filtered.sort((a, b) => a.price - b.price);
    else if (miniSort === "high-low") filtered.sort((a, b) => b.price - a.price);
    return filtered.slice(0, 6);
  }, [miniCategory, miniSort, miniFilter]);

  const toggleFilter = (key) => setMiniFilter(prev => ({ ...prev, [key]: !prev[key] }));

  // -- Confident Woman Carousel State & Auto-Scroll --
  const [confidentIdx, setConfidentIdx] = useState(0);
  const itemsPerView = 4; // Show 4 small items per view
  const maxConfidentIdx = Math.max(0, impressiveDesigns.length - itemsPerView);

  const nextConfident = () => setConfidentIdx(p => Math.min(p + 1, maxConfidentIdx));
  const prevConfident = () => setConfidentIdx(p => Math.max(p - 1, 0));

  useEffect(() => {
    const timer = setInterval(() => {
      setConfidentIdx(prev => (prev >= maxConfidentIdx ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [maxConfidentIdx]);

  const valueProps = [
    { icon: <ShieldCheck className="w-6 h-6 text-accent-primary" />, title: "Perfect Fit Guarantee", desc: "Designed to flatter every curve." },
    { icon: <Sparkles className="w-6 h-6 text-accent-primary" />, title: "Premium Fabrics", desc: "Luxurious, breathable materials." },
    { icon: <Truck className="w-6 h-6 text-accent-primary" />, title: "Fast Shipping", desc: "Delivered straight to your door." }
  ];

  const socialProof = [
    {
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200",
      quote: "The fit is absolutely incredible. Finally, a brand that understands a woman's body.",
      author: "Sarah J."
    },
    {
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=200",
      quote: "These are the most flattering staples I own. Vibrant and incredibly rich.",
      author: "Michelle K."
    },
    {
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=200",
      quote: "I live in these tops. The fabric quality is unmatched for the price point.",
      author: "Amanda R."
    },
    {
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
      quote: "Every piece feels custom made. I get compliments whenever I wear Aura.",
      author: "Jessica T."
    }
  ];

  const instagramImages = [
    "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary pt-14 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="w-full flex flex-col md:flex-row items-center pt-20 pb-12 px-6 max-w-[90rem] mx-auto gap-8 md:gap-16">
        <div className="w-full md:w-1/2 flex flex-col items-start text-left z-20 order-2 md:order-1 mt-10 md:mt-0">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-cursive text-accent-primary text-3xl md:text-4xl mb-2 block">
              Welcome to Aura
            </span>
            <h1 className="text-text-main text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-6">
              Modern.<br/>
              <span className="text-accent-primary">Luxurious.</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl mb-10 font-medium leading-relaxed max-w-lg">
              Elevate your wardrobe with premium essentials crafted in Nairobi. Uncompromising quality and the perfect fit.
            </p>
            <Link to="/shop" className="bg-black hover:bg-accent-primary text-white text-sm md:text-base font-bold uppercase py-4 px-10 rounded-xl transition-all shadow-lg inline-flex items-center gap-2">
              Shop The Collection <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 h-[50vh] md:h-[75vh] relative rounded-3xl overflow-hidden shadow-xl order-1 md:order-2 group">
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=1200"
            alt="Aura Fashion Model"
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[2000ms]"
          />
        </div>
      </section>

      {/* 2. VALUE PROPS */}
      <section className="bg-black text-white py-12 px-6 w-full relative z-30 mt-6 rounded-3xl max-w-[90rem] mx-auto shadow-lg mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {valueProps.map((prop, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">{prop.icon}</div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-accent-primary">{prop.title}</h4>
                <p className="text-white/70 text-sm mt-1">{prop.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRENDING NOW */}
      <section className="py-12 px-6 max-w-[90rem] mx-auto w-full mb-8">
        <div className="flex flex-col items-center mb-10 border-b border-black/5 pb-6 text-center">
          <span className="font-cursive text-accent-primary text-3xl md:text-4xl mb-1 block">Most Loved</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-text-main">Trending Now</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-8 gap-y-10 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link to="/shop" className="border-2 border-black hover:border-accent-primary text-black hover:text-accent-primary text-sm font-bold uppercase py-3.5 px-10 rounded-full transition-colors inline-flex items-center gap-2">
            View All Pieces <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. EXPLORE CATEGORIES (Halo Card Output) */}
      <section className="py-16 px-6 max-w-[90rem] mx-auto w-full mb-16">
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="font-cursive text-accent-primary text-3xl md:text-4xl mb-1 block">Discover</span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-text-main mb-3">Explore Categories</h2>
          <div className="w-16 h-1 bg-accent-primary mx-auto rounded-full" />
        </div>
        
        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 relative z-20">
          {exploreCategories.map((cat, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveExploreCat(cat.title)}
              className={`group relative overflow-hidden aspect-[16/9] md:aspect-[4/3] bg-bg-secondary flex items-end justify-center rounded-2xl shadow-sm border transition-all duration-300 ${activeExploreCat === cat.title ? 'border-accent-primary ring-2 ring-accent-primary/20 scale-[1.05] shadow-lg shadow-accent-primary/20 z-10' : 'border-black/5 hover:border-black/20'}`}
            >
              <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className={`absolute inset-0 transition-opacity duration-300 ${activeExploreCat === cat.title ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent' : 'bg-black/60 group-hover:bg-black/40'}`} />
              <div className="relative z-10 w-full p-3 text-center">
                <h3 className="text-white text-sm md:text-base font-bold uppercase tracking-widest">{cat.title}</h3>
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Halo Card Connecting Downward */}
        <div className="relative mt-6 pt-10 pb-8 px-6 md:px-12 bg-white rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-accent-primary/30 z-10 overflow-hidden">
          {/* Subtle Halo Texture Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-primary/5 via-transparent to-transparent opacity-80" />
          
          <div className="relative z-10 min-h-[400px]">
            <div className="text-center mb-8">
              <span className="font-cursive text-accent-primary text-2xl block">Handpicked {activeExploreCat}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExploreCat}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-10"
              >
                {exploreProducts.map((p) => (
                  <ProductCard key={`${activeExploreCat}-${p.id}`} product={p} />
                ))}
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-12 border-t border-black/5 pt-8">
              <Link to="/shop" className="bg-black hover:bg-accent-primary text-white text-xs font-bold uppercase tracking-widest py-3.5 px-8 rounded-full transition-colors inline-flex items-center gap-2 shadow-md">
                 Explore All Categories <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED ITEM SPOTLIGHT */}
      <section className="py-16 px-6 max-w-[90rem] mx-auto w-full mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-bg-secondary rounded-3xl shadow-sm border border-black/5 overflow-hidden group">
          <div className="aspect-square md:aspect-auto md:h-full relative overflow-hidden">
            <img src={featuredItem?.images[0]} alt={featuredItem?.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-xs font-bold uppercase tracking-wider text-black">Aura Signature</div>
          </div>
          <div className="p-8 md:p-12 lg:p-20 flex flex-col justify-center">
            <span className="font-cursive text-accent-primary text-3xl md:text-4xl mb-2 block">Our Masterpiece</span>
            <div className="flex items-center gap-2 text-accent-primary text-sm font-bold mb-3">
              <Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" />
              <span className="text-text-main ml-1 font-medium">(2.4k Reviews)</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-text-main leading-tight mb-4">{featuredItem?.name || "Signature Dress"}</h2>
            <p className="text-text-muted text-lg mb-6 leading-relaxed max-w-xl">{featuredItem?.description || "An elegant piece designed for all."}</p>
            <div className="flex flex-col gap-4">
              <Link to={`/shop/${featuredItem?.id}`} className="w-full md:w-auto text-center bg-black hover:bg-accent-primary text-white text-sm font-bold uppercase py-4 px-10 rounded-xl transition-all shadow-md inline-block max-w-sm">
                Shop The Signature — $125.00
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOR THE CONFIDENT WOMAN (Auto-scrolling Carousel) */}
      <section className="py-20 px-6 max-w-[90rem] mx-auto w-full mb-12">
        <div className="text-center mb-10">
          <span className="font-cursive text-accent-primary text-4xl md:text-5xl mb-2 block">Elegance</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-text-main mb-4">For the Confident Woman in You</h2>
        </div>
        
        <div className="relative">
          {confidentIdx > 0 && (
            <button onClick={prevConfident} className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white p-3 rounded-full shadow-lg border border-black/5 text-black hover:text-accent-primary transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {confidentIdx < maxConfidentIdx && (
            <button onClick={nextConfident} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white p-3 rounded-full shadow-lg border border-black/5 text-black hover:text-accent-primary transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className="overflow-hidden px-2 pb-8 pt-4">
            <motion.div 
              className="flex gap-4 md:gap-6"
              animate={{ x: `calc(-${confidentIdx * (100 / itemsPerView)}% - ${confidentIdx * 1.5}rem)` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {impressiveDesigns.map((product) => (
                <div key={product.id} className="min-w-[70vw] md:min-w-[calc(25%-1.125rem)] transform hover:-translate-y-2 transition-transform duration-500">
                  <ProductCard product={product} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-4">
            {Array.from({ length: maxConfidentIdx + 1 }).map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setConfidentIdx(idx)}
                className={`transition-all duration-300 rounded-full ${idx === confidentIdx ? 'bg-accent-primary w-6 h-2' : 'bg-black/20 w-2 h-2 hover:bg-accent-primary/50'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. SMART CASUAL (Real Image) */}
      <section className="py-12 px-6 max-w-6xl mx-auto w-full mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg border border-black/5 overflow-hidden min-h-[400px]">
          <div className="p-8 md:p-12 flex flex-col justify-center bg-bg-secondary">
             <span className="font-cursive text-accent-primary text-3xl mb-3 block">Smart Casual</span>
             <h2 className="text-3xl md:text-4xl font-black uppercase text-text-main leading-tight mb-4 tracking-tight">
                When class meets <br/><span className="text-accent-primary">bold</span>
             </h2>
             <div className="relative mt-4">
               <blockquote className="text-lg font-display italic text-text-muted leading-relaxed border-l-2 border-accent-primary pl-4 py-1">
                  "Elegance is not standing out, but being remembered. Boldness is the vehicle, class is the destination."
               </blockquote>
             </div>
          </div>
          <div className="h-64 md:h-auto relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1000" 
              alt="Smart Casual Style" 
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>
      </section>

      {/* 8. MINI SHOP */}
      <section className="py-16 px-6 max-w-[90rem] mx-auto w-full bg-white rounded-3xl shadow-sm border border-black/5 mb-24">
        <div className="text-center mb-10">
           <span className="font-cursive text-accent-primary text-3xl md:text-4xl mb-1 block">Curated Just For You</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 p-4 md:p-8">
           <div className="w-full lg:w-1/4">
              <h3 className="text-xl font-black uppercase tracking-tight text-text-main mb-6">Filter By</h3>
              <div className="flex flex-col gap-4 text-sm font-medium text-text-muted">
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <input type="checkbox" checked={miniFilter.newArrivals} onChange={() => toggleFilter('newArrivals')} className="w-4 h-4 accent-black" />
                   <span className="group-hover:text-black transition-colors">New Arrivals</span>
                 </label>
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <input type="checkbox" checked={miniFilter.bestSellers} onChange={() => toggleFilter('bestSellers')} className="w-4 h-4 accent-black" />
                   <span className="group-hover:text-black transition-colors">Best Sellers</span>
                 </label>
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <input type="checkbox" checked={miniFilter.limited} onChange={() => toggleFilter('limited')} className="w-4 h-4 accent-black" />
                   <span className="group-hover:text-black transition-colors">Limited Edition</span>
                 </label>
                 <div className="w-full h-px bg-black/5 my-2" />
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <input type="radio" name="sort" checked={miniSort === "low-high"} onChange={() => setMiniSort("low-high")} className="w-4 h-4 accent-black" />
                   <span className="group-hover:text-black transition-colors">Price: Low to High</span>
                 </label>
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <input type="radio" name="sort" checked={miniSort === "high-low"} onChange={() => setMiniSort("high-low")} className="w-4 h-4 accent-black" />
                   <span className="group-hover:text-black transition-colors">Price: High to Low</span>
                 </label>
                 {miniSort && (
                   <button onClick={() => setMiniSort(null)} className="text-xs text-accent-primary uppercase tracking-wider text-left mt-2 hover:underline">Clear Sort</button>
                 )}
              </div>
           </div>
           
           <div className="w-full lg:w-3/4 flex flex-col">
              <div className="flex flex-wrap gap-3 mb-8">
                 {["All", "Dresses", "Tops", "Bottoms", "Accessories"].map((cat) => (
                    <button key={cat} onClick={() => setMiniCategory(cat)} className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all ${miniCategory === cat ? "bg-black text-white" : "border border-black/10 text-text-main hover:border-accent-primary hover:text-accent-primary"}`}>
                       {cat}
                    </button>
                 ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 min-h-[400px]">
                 <AnimatePresence mode="popLayout">
                   {miniShopProducts.length > 0 ? (
                     miniShopProducts.map(p => (
                       <motion.div key={`mini-${p.id}`} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                         <ProductCard product={p} />
                       </motion.div>
                     ))
                   ) : (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full flex flex-col items-center justify-center py-20 text-text-muted">
                       <Sparkles className="w-12 h-12 mb-4 text-black/20" />
                       <p className="text-lg font-medium">No pieces found matching your filters.</p>
                       <button onClick={() => {setMiniCategory("All"); setMiniFilter({newArrivals:true, bestSellers:false, limited:false}); setMiniSort(null);}} className="mt-4 text-accent-primary uppercase text-xs font-bold hover:underline">
                         Reset Filters
                       </button>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </section>

      {/* 9. RECTANGULAR CUSTOMER REVIEWS */}
      <section className="bg-bg-secondary py-20 px-6 w-full">
        <div className="max-w-[80rem] mx-auto">
          <div className="text-center mb-12">
            <span className="font-cursive text-accent-primary text-3xl md:text-4xl mb-1 block">Loved by all</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-text-main">
              Real Women, Real Fit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {socialProof.map((proof, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-black/5 flex items-center gap-5 hover:shadow-md transition-shadow duration-300">
                <img src={proof.image} alt={proof.author} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col flex-grow">
                  <div className="flex gap-1 text-accent-primary mb-1">
                    <Star className="fill-current w-3 h-3" /><Star className="fill-current w-3 h-3" /><Star className="fill-current w-3 h-3" /><Star className="fill-current w-3 h-3" /><Star className="fill-current w-3 h-3" />
                  </div>
                  <p className="text-text-main font-medium text-sm mb-2 leading-snug">"{proof.quote}"</p>
                  <p className="text-text-muted text-xs font-bold uppercase tracking-wider">{proof.author}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 flex justify-center">
            <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-black/5 flex items-center gap-3">
              <div className="flex items-center justify-center bg-blue-50 text-blue-600 font-bold text-lg w-8 h-8 rounded-full">G</div>
              <div>
                <p className="text-sm font-bold text-text-main leading-none">4.9/5 Rating</p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Based on 1,200+ Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. INSTAGRAM FEED */}
      <section className="pt-20 pb-10 w-full overflow-hidden bg-white">
        <div className="max-w-[90rem] mx-auto px-6 mb-10 flex flex-col items-center text-center">
          <span className="font-cursive text-accent-primary text-3xl md:text-4xl mb-1 block">Join the community</span>
          <InstagramIcon className="w-8 h-8 text-text-main mb-4" />
          <h2 className="text-3xl font-black uppercase tracking-tight text-text-main">Follow Us On Instagram</h2>
          <a href="#" className="text-accent-primary font-bold hover:text-text-main transition-colors mt-2 text-lg">@AuraNairobi</a>
        </div>
        
        <div className="flex w-full overflow-x-auto snap-x scrollbar-none pb-4">
          {instagramImages.map((img, idx) => (
            <a key={idx} href="#" className="group relative w-[60vw] md:w-[20vw] flex-shrink-0 snap-center aspect-square overflow-hidden bg-black">
              <img src={img} alt="Instagram feed" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <InstagramIcon className="w-8 h-8 text-white" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 11. ENDING QUOTE CARD */}
      <section className="py-20 w-full px-6 flex justify-center pb-32 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-bg-secondary p-12 md:p-20 rounded-3xl shadow-xl max-w-4xl text-center relative overflow-hidden border border-accent-primary/20"
        >
          {/* Subtle Halo Texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-primary via-transparent to-transparent pointer-events-none" />
          
          <span className="font-cursive text-accent-primary text-4xl md:text-5xl mb-6 block relative z-10">Style is Eternal</span>
          <blockquote className="text-2xl md:text-4xl font-display italic text-text-main leading-relaxed relative z-10">
            "Fashion fades, only style remains the same. Dress like you are already famous."
          </blockquote>
        </motion.div>
      </section>

    </div>
  );
}
