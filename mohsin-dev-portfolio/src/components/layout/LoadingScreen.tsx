"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 120);

    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816]"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-500"
            />
            <div className="absolute inset-2 rounded-full bg-cyan-500/10 blur-md" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-[0.4em] text-cyan-400"
          >
            Initializing
          </motion.p>

          <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <p className="mt-4 text-xs text-gray-600">Mohsin Baig · Gameplay Programmer</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
