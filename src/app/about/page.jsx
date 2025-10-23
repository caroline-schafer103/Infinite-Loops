"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button";


export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-16 bg-gradient-to-b from-pink-50 to-white">
      <motion.div
        className="max-w-3xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-pink-300 shadow-md">
            <Image
              src="/caroline.jpg" // put your image in public/ as caroline.jpg
              alt="Caroline Schafer"
              fill
              className="object-cover"
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-800">Hi, I’m Caroline 👋</h1>
        </div>

        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          I’m a crochet enthusiast and maker behind <span className="font-semibold text-pink-600">Infinite Loops</span>.
          What started as a hobby quickly turned into a creative passion for turning yarn into something beautiful
          and meaningful. Each piece I make is handcrafted with care — and maybe a little too much coffee ☕.
        </p>

        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          When I’m not crocheting, I’m probably coding, reading thrillers, or planning my next big project.
          I love bringing cozy, handmade energy into everything I do.
        </p>

        <div className="flex justify-center">
          <Button asChild>
            <a href="/contact" className="text-white">
              Let’s Connect 💌
            </a>
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
