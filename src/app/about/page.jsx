"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-20
                     bg-gradient-to-r from-[#E8FFF1] via-[#D6FFE4] to-[#C4FFDA]">
      <motion.div
        className="max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Intro heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10">
          Hi, I’m Caroline 👋
        </h1>

        {/* Market photo (slightly smaller) */}
        <div className="max-w-2xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://res.cloudinary.com/djvweczd8/image/upload/v1761240057/IMG_3543_kxo9ot.jpg"
            alt="Caroline Schafer at a market"
            width={1000}
            height={700}
            className="w-full h-auto rounded-2xl"
            priority
          />
        </div>

        {/* Bio paragraphs */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          I’m a crochet enthusiast and maker behind{" "}
          <span className="font-semibold text-emerald-700">Infinite Loops</span>.
          What started as a hobby quickly turned into a creative passion for turning yarn into something beautiful
          and meaningful. Each piece I make is handcrafted with care.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          When I’m not crocheting, I’m probably coding, reading thrillers, or planning my next big project.
          I love bringing cozy, handmade energy into everything I do.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            className="bg-[#2F855A] hover:bg-[#38A169] text-white font-bold shadow-md transform hover:scale-105 transition-all duration-300"
          >
            <a href="/contact">Let’s Connect 💌</a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-[#2F855A] text-[#2F855A] hover:bg-[#E8FFF1] font-bold shadow-sm transform hover:scale-105 transition-all duration-300"
          >
            <a href="/products">Check Out My Products 🧶</a>
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
