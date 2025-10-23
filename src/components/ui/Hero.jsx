// src/app/Hero.jsx
import { Antic_Didone } from 'next/font/google';
import { Quicksand } from 'next/font/google';
import { Button } from '@/components/ui/button';

// Load fonts
const headerFont = Antic_Didone({ weight: ['400'], subsets: ['latin'] });
// const bodyFont = Quicksand({ weight: ['400', '700'], subsets: ['latin'] });

export default function Hero() {
  return (
    <section className="relative py-32 px-6 text-center flex flex-col items-center justify-center
                        bg-gradient-to-r from-[#E8FFF1] via-[#D6FFE4] to-[#C4FFDA]">
      
      {/* Header */}
      <h1 className={`text-6xl md:text-7xl mb-6 tracking-wide ${headerFont.className} animate-slide-up`}>
        Infinite Loops
      </h1>

      {/* Tagline */}
      <p className={`text-lg md:text-xl text-gray-700 max-w-2xl mb-12  animate-slide-up`}>
        Handmade crochet, crafted with love and care for your cozy moments.
      </p>

      {/* Call-to-Action */}
      <Button
        size="lg"
        className="bg-[#2F855A] hover:bg-[#38A169] text-white font-bold shadow-md transform hover:scale-105 transition-all duration-300 animate-slide-up"
        asChild
      >
        <a href="/products">Shop Now</a>
      </Button>
    </section>
  );
}
