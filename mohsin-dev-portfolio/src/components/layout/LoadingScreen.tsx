"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816]"
          aria-live="polite"
          aria-busy="true"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="mb-6 h-14 w-14 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
          />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-semibold tracking-widest text-cyan-400"
          >
            LOADING
          </motion.p>
          <p className="mt-2 text-sm text-gray-500">Mohsin Baig Portfolio</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
