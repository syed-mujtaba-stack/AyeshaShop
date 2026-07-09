"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-media-query";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imageRef.current || isMobile) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
    },
    [isMobile]
  );

  const handleImageNav = useCallback(
    (direction: "prev" | "next") => {
      setActiveIndex((prev) => {
        if (direction === "prev") return prev === 0 ? images.length - 1 : prev - 1;
        return prev === images.length - 1 ? 0 : prev + 1;
      });
    },
    [images.length]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart === null) return;
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        handleImageNav(diff > 0 ? "next" : "prev");
      }
      setTouchStart(null);
    },
    [touchStart, handleImageNav]
  );

  const scrollThumbnailIntoView = useCallback((index: number) => {
    const container = thumbnailContainerRef.current;
    if (!container) return;
    const thumb = container.children[index] as HTMLElement;
    if (thumb) {
      thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, []);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4">
      {/* Thumbnails - Vertical on desktop, horizontal scroll on mobile */}
      <div
        ref={thumbnailContainerRef}
        className={cn(
          "flex gap-2 overflow-auto scrollbar-hide",
          "md:flex-col md:w-20 md:shrink-0",
          "flex-row w-full"
        )}
      >
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              scrollThumbnailIntoView(index);
            }}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200",
              "w-16 h-16 md:w-20 md:h-20",
              index === activeIndex
                ? "border-gold shadow-md shadow-gold/20"
                : "border-transparent hover:border-gold/50 opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt={`${productName} - Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative">
        <div
          ref={imageRef}
          className={cn(
            "relative overflow-hidden rounded-xl bg-lighter-gray",
            "aspect-[4/5] md:aspect-[3/4] w-full",
            "cursor-crosshair"
          )}
          onMouseEnter={() => !isMobile && setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex]}
                alt={`${productName} - Image ${activeIndex + 1}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && !isMobile && (
            <>
              <button
                onClick={() => handleImageNav("prev")}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-dark" />
              </button>
              <button
                onClick={() => handleImageNav("next")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-dark" />
              </button>
            </>
          )}

          {/* Dots for mobile */}
          {images.length > 1 && isMobile && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === activeIndex ? "bg-white w-4" : "bg-white/50"
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Zoom Lens */}
        {showZoom && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 left-[calc(100%+1rem)] w-[400px] h-[400px] rounded-xl overflow-hidden border border-border shadow-2xl bg-white z-50 hidden xl:block"
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${images[activeIndex]})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: "250%",
                backgroundRepeat: "no-repeat",
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
