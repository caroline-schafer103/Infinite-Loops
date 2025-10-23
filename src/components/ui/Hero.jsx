import Image from "next/image";
import { Antic_Didone } from "next/font/google";
import { Button } from "@/components/ui/button";

// Load font
const headerFont = Antic_Didone({ weight: ["400"], subsets: ["latin"] });

export default function Hero() {
  return (
    <section className="relative py-40 px-6 text-center flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/djvweczd8/image/upload/v1761101674/CaroCrochet-009_uqixwt.jpg"
          alt="Crochet market background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Solid overlay for better contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1
          className={`text-6xl md:text-8xl mb-6 tracking-wide text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] ${headerFont.className} animate-slide-up`}
        >
          Infinite Loops
        </h1>

        <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mb-12 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] animate-slide-up">
          Handmade crochet, crafted with love and care for your cozy moments.
        </p>

        <Button
          size="lg"
          className="bg-[#2F855A] hover:bg-[#38A169] text-white font-bold text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-all duration-300 animate-slide-up"
          asChild
        >
          <a href="/products">Shop Now</a>
        </Button>
      </div>
    </section>
  );
}
