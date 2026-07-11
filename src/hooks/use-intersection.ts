"use client";

import { useEffect, useRef, useState } from "react";

export function useIntersection(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const optionsRef = useRef<IntersectionObserverInit | undefined>(options);

  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, optionsRef.current);

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
