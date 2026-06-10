import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function OurStory() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="bg-bg-primary min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-accent-primary text-[10px] tracking-[0.4em] uppercase font-bold">
            The Narrative
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-light text-text-main mt-3 leading-tight">
            Designed in Nairobi. <br />
            <span className="italic font-normal">Worn Globally.</span>
          </h1>
          <div className="w-12 h-[1.5px] bg-accent-primary/60 mx-auto mt-8" />
        </div>

        {/* Narrative Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Narrative Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="lg:col-span-7 flex flex-col gap-6 text-base md:text-lg text-text-muted leading-relaxed font-light"
          >
            <p className="font-display italic text-text-main text-xl md:text-2xl leading-relaxed">
              Aura Nairobi was born out of a desire to create a visual dialogue between contemporary, minimalist design and the rich tactile heritage of East Africa.
            </p>
            <p>
              Founded in Kenya's cosmopolitan capital, Aura represents a clean aesthetic that doesn't scream for attention, but commands it through precise cuts, fluid silhouettes, and exceptional craftsmanship. We believe in clothes that feel like a second skin—moving naturally with the body from sunlit afternoons to city nights.
            </p>
            <p>
              Each piece is designed and assembled in our Nairobi atelier. We work hand-in-hand with local artisans who hand-forge our signature brass hardware, select organic cotton and linen, and weave the subtle colors of the Kenyan landscape—the deep browns of the Savannah, the warm beige of linen, and the rich ochres of the earth—into each thread.
            </p>
          </motion.div>

          {/* Visual Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-bg-secondary aspect-[4/5] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=800"
              alt="Linen creation process"
              className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-700"
            />
          </motion.div>
        </div>

        {/* The Artisan Craft Block */}
        <div className="bg-bg-secondary py-20 px-8 md:px-16 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800"
              alt="Artisan workspace"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <span className="text-accent-primary text-[10px] tracking-[0.4em] uppercase font-bold">
              Ethical Sourcing
            </span>
            <h3 className="text-2xl md:text-3.5xl font-display font-light text-text-main leading-tight">
              Honoring local craft, <br />
              <span className="italic font-normal">supporting local hands.</span>
            </h3>
            <p className="text-sm text-text-muted leading-relaxed font-light">
              We source our raw fibers from organic cotton collectives and sustainable flax farms. Our brass collars, cuff closures, and buckles are individually sand-cast and hand-burnished by brass craftsmen in Rongai and Kibera, ensuring that every purchase directly supports heritage art forms and local livelihoods.
            </p>
            <p className="text-sm text-text-muted leading-relaxed font-light">
              Aura doesn't produce in high volumes. We make micro-runs of garments to minimize waste and ensure each piece is built to endure, carrying the spirit of Kenyan warmth and luxury for years to come.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center py-12 max-w-xl mx-auto">
          <h4 className="text-xl md:text-2xl font-display italic font-light mb-6 text-text-main">
            "For the woman who commands the room without saying a word."
          </h4>
          <Link
            to="/shop"
            className="bg-accent-primary hover:bg-accent-hover text-bg-primary font-sans text-xs font-bold tracking-widest uppercase py-4 px-10 transition-colors shadow-md inline-flex items-center gap-2"
          >
            Explore The Pieces <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
