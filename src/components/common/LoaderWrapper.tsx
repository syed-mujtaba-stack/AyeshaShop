"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PremiumLoader } from "@/components/common/PremiumLoader";

function waitForFonts(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  return document.fonts.ready.then(() => undefined);
}

function waitForHeroImages(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const images = Array.from(document.querySelectorAll<HTMLImageElement>("img[data-hero]"));
  if (images.length === 0) return Promise.resolve();
  return Promise.allSettled(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) return resolve();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          setTimeout(resolve, 4000);
        })
    )
  ).then(() => undefined);
}

function waitForCriticalAssets(): Promise<void> {
  return Promise.allSettled([waitForFonts(), waitForHeroImages()]).then(
    () => undefined
  );
}

export function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);
  const animDone = useRef(false);
  const assetsDone = useRef(false);
  const [, forceCheck] = useState(0);

  const checkReady = useCallback(() => {
    if (animDone.current && assetsDone.current) {
      setVisible(false);
      requestAnimationFrame(() => setLoaded(true));
    }
  }, []);

  const handleAnimComplete = useCallback(() => {
    animDone.current = true;
    forceCheck((n) => n + 1);
    checkReady();
  }, [checkReady]);

  useEffect(() => {
    waitForCriticalAssets().then(() => {
      assetsDone.current = true;
      forceCheck((n) => n + 1);
      checkReady();
    });
  }, [checkReady]);

  if (!visible && loaded) {
    return <>{children}</>;
  }

  return (
    <>
      {!loaded && (
        <PremiumLoader
          onComplete={handleAnimComplete}
        />
      )}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
