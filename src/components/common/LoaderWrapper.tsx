"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumLoader } from "@/components/common/PremiumLoader";
import { LoaderContext } from "@/components/common/LoaderContext";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1440&q=80",
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1440&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1440&q=80",
];

function preloadImages(urls: string[]): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  return Promise.allSettled(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
          setTimeout(resolve, 5000);
        })
    )
  ).then(() => undefined);
}

function waitForFonts(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  return document.fonts.ready.then(() => undefined);
}

function waitForCriticalAssets(): Promise<void> {
  return Promise.allSettled([waitForFonts(), preloadImages(HERO_IMAGES)]).then(
    () => undefined
  );
}

export function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [animDone, setAnimDone] = useState(false);
  const [assetsDone, setAssetsDone] = useState(false);

  const handleAnimComplete = useCallback(() => {
    setAnimDone(true);
  }, []);

  useEffect(() => {
    waitForCriticalAssets().then(() => {
      setAssetsDone(true);
    });
  }, []);

  const loading = !(animDone && assetsDone);

  return (
    <LoaderContext.Provider value={!loading}>
      {/* Children always render — painted behind the loader from frame one.
          CSS transition on opacity creates cross-fade with loader exit. */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1)",
        }}
      >
        {children}
      </div>

      {/* Loader overlay — fades out via AnimatePresence when loading becomes false */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader-overlay"
            className="fixed inset-0 z-[9999]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
            style={{ willChange: "opacity" }}
          >
            <PremiumLoader onComplete={handleAnimComplete} ready={assetsDone} />
          </motion.div>
        )}
      </AnimatePresence>
    </LoaderContext.Provider>
  );
}
