"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      setLoading(true);
      setProgress(0);

      const t1 = setTimeout(() => setProgress(30), 50);
      const t2 = setTimeout(() => setProgress(60), 200);
      const t3 = setTimeout(() => setProgress(85), 500);
      timerRef.current.push(t1, t2, t3);
    }
    return () => timerRef.current.forEach(clearTimeout);
  }, [pathname]);

  useEffect(() => {
    if (loading && progress >= 85) {
      const t = setTimeout(() => {
        setProgress(100);
        const t2 = setTimeout(() => {
          setLoading(false);
          setProgress(0);
        }, 300);
        timerRef.current.push(t2);
      }, 100);
      timerRef.current.push(t);
    }
  }, [loading, progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[60]"
        >
          <div className="h-[3px] bg-gold/10">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                boxShadow: "0 0 10px rgba(184,134,11,0.5), 0 0 4px rgba(184,134,11,0.3)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
