"use client";

import { AnimatedBorder } from "@/components/effects/AnimatedBorder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { showcaseItems } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand, FaPlay, FaXmark } from "react-icons/fa6";

function getMediaLabel(type: (typeof showcaseItems)[number]["type"]) {
  return type === "video" ? "Video" : type === "gif" ? "GIF" : "Image";
}

type MediaCardProps = {
  index: number;
  featured?: boolean;
  onOpen: (index: number) => void;
};

function MediaCard({ index, featured = false, onOpen }: MediaCardProps) {
  const item = showcaseItems[index];
  const mediaRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (item.type !== "video" || !item.videoUrl) {
      return;
    }

    const node = mediaRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "220px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [item.type, item.videoUrl]);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="group relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-xl transition-colors hover:border-cyan-400/30"
      aria-label={`Open ${item.title}`}
    >
      <div
        ref={mediaRef}
        className={`relative min-w-0 overflow-hidden ${featured ? "aspect-video sm:min-h-[320px]" : "aspect-[4/3]"}`}
      >
        <Image
          src={item.src}
          alt={item.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={featured ? "(max-width: 1280px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />

        {item.type === "video" && item.videoUrl && shouldLoadVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={item.videoUrl}
            poster={item.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}

        {item.type === "video" && !item.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050816]/35">
            <div className="rounded-2xl border border-dashed border-cyan-400/40 bg-[#050816]/70 px-4 py-3 text-center text-sm text-gray-200 backdrop-blur-md">
              <p className="font-semibold text-cyan-300">Image preview</p>
              <p className="mt-1 text-xs text-gray-400">A video capture is not available for this showcase item.</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent" />

        <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-[#050816]/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-200 backdrop-blur-md">
          {getMediaLabel(item.type)}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5">
              {featured ? "Featured capture" : "Gallery frame"}
            </span>
            {item.type === "video" && !item.videoUrl && <span>Placeholder ready</span>}
          </div>

          <h3 className="max-w-[90%] text-lg font-bold text-white transition-colors group-hover:text-cyan-300 sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-1 flex items-center gap-2 text-sm text-gray-300/90">
            <FaPlay className="h-3.5 w-3.5 text-cyan-300" />
            Open lightbox for a closer view.
          </p>
        </div>

        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-cyan-400/5" />
          <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/30 bg-[#050816]/80 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-md">
            <FaExpand className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

type LightboxProps = {
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

function Lightbox({ activeIndex, onClose, onNext, onPrevious }: LightboxProps) {
  const item = showcaseItems[activeIndex];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#02040bcc] px-4 py-6 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.98, y: 16 }}
        transition={{ duration: 0.22 }}
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#08101f] shadow-[0_0_80px_rgba(0,0,0,0.65)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
              {getMediaLabel(item.type)} preview
            </p>
            <h3 className="mt-2 text-lg font-bold text-white sm:text-2xl">{item.title}</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
            aria-label="Close lightbox"
          >
            <FaXmark className="h-4 w-4" />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/20 px-3 py-3 sm:px-6 sm:py-6">
          <button
            type="button"
            onClick={onPrevious}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#050816]/80 text-white/90 backdrop-blur-md transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
            aria-label="Previous media"
          >
            <FaChevronLeft className="h-4 w-4" />
          </button>

          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#050816]">
            <div className="relative aspect-video max-h-[72vh] w-full">
              {item.type === "video" && item.videoUrl ? (
                <video
                  className="h-full w-full object-contain"
                  src={item.videoUrl}
                  poster={item.src}
                  controls
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />
              ) : (
                <>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                  {item.type === "video" && !item.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#050816]/60 px-6 text-center">
                      <div className="max-w-md rounded-2xl border border-dashed border-cyan-400/40 bg-[#050816]/80 p-6 text-gray-200">
                        <p className="text-lg font-semibold text-cyan-300">Placeholder video slot</p>
                        <p className="mt-2 text-sm text-gray-400">
                          Replace the poster-only state by adding a videoUrl in the data file.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#050816]/80 text-white/90 backdrop-blur-md transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
            aria-label="Next media"
          >
            <FaChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-4 text-sm text-gray-400 sm:px-6">
          <p>
            {activeIndex + 1} of {showcaseItems.length}
          </p>
          <p>Videos are configured in data and can be swapped later without changing this layout.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function GameplayShowcase() {
  const featuredIndices = showcaseItems
    .map((item, index) => (item.type === "video" ? index : -1))
    .filter((index) => index !== -1)
    .slice(0, 2);
  const galleryIndices = showcaseItems
    .map((_, index) => index)
    .filter((index) => !featuredIndices.includes(index));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % showcaseItems.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + showcaseItems.length) % showcaseItems.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);
  const goNext = () => setActiveIndex((current) => (current + 1) % showcaseItems.length);
  const goPrevious = () =>
    setActiveIndex((current) => (current - 1 + showcaseItems.length) % showcaseItems.length);

  return (
    <section
      id="showcase"
      className="relative py-28 px-4 sm:px-6 lg:px-8"
      aria-labelledby="showcase-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_28%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.07),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Gameplay Showcase"
          title="Systems in Motion"
          description="Large gameplay captures, image and GIF-ready galleries, and lightbox previews built for future video swaps."
        />

        <AnimatedBorder>
          <div className="space-y-6 p-4 md:p-6">
            <div className="grid min-w-0 gap-6 xl:grid-cols-2">
              {featuredIndices.map((index) => (
                <MediaCard key={showcaseItems[index].id} index={index} featured onOpen={openLightbox} />
              ))}
            </div>

            <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {galleryIndices.map((index) => (
                <MediaCard key={showcaseItems[index].id} index={index} onOpen={openLightbox} />
              ))}
            </div>
          </div>
        </AnimatedBorder>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            activeIndex={activeIndex}
            onClose={closeLightbox}
            onNext={goNext}
            onPrevious={goPrevious}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
