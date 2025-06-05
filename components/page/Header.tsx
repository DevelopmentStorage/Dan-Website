"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-[#181c23] to-[#23272f] py-24 px-4 md:px-0 text-center min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 drop-shadow-[0_2px_24px_rgba(34,211,238,0.3)]"
      >
        <span className="relative inline-block px-4 py-2 text-white">
          Welcome to my{" "}
          <span className="border-b-4 border-cyan-400 pb-1">Work</span>
          <span className="absolute inset-0 pointer-events-none animate-glitch opacity-40" />
        </span>
      </motion.h1>
      <p className="mt-6 text-gray-300 max-w-xl mx-auto text-lg font-medium">
        Discover my{" "}
        <span className="text-cyan-400 font-semibold">video edits</span> and
        projects that showcase my skills in{" "}
        <span className="text-pink-400 font-semibold">Video Editing</span>.
      </p>
      <div className="mt-10 flex justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            className="flex items-center gap-2 px-7 py-3 rounded-full font-bold text-lg bg-cyan-500/80 hover:bg-cyan-400 shadow-[0_0_18px_2px_rgba(34,211,238,0.25)] transition-all duration-200 border-b-4 border-cyan-400/70 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onClick={() => (window.location.href = "mailto:dan@pushfwd.de")}
          >
            <Mail width={22} height={22} className="mr-1" /> Contact me
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
