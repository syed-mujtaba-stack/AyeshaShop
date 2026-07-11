"use client";

import { useRef, useCallback, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Download, X, Smartphone, Zap, Wifi, Bell, Check, ChevronDown } from "lucide-react";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { useMediaQuery } from "@/hooks/use-media-query";

function InstallIcon() {
  return (
    <div className="relative w-20 h-20 mx-auto mb-6">
      <div className="absolute inset-0 rounded-2xl bg-gold/10 animate-pulse" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold-light to-gold flex items-center justify-center shadow-lg shadow-gold/20">
          <Smartphone className="h-8 w-8 text-white" />
        </div>
      </div>
      <motion.div
        className="absolute -top-1 -right-1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 500, damping: 15 }}
      >
        <div className="w-6 h-6 rounded-full bg-dark flex items-center justify-center">
          <Download className="h-3 w-3 text-white" />
        </div>
      </motion.div>
    </div>
  );
}

function BenefitItem({ icon: Icon, label, delay }: { icon: React.ComponentType<{ className?: string }>; label: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-3 py-2.5"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
    >
      <div className="w-9 h-9 rounded-lg bg-gold/8 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <span className="text-sm text-dark">{label}</span>
    </motion.div>
  );
}

function SuccessView({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="text-center py-8 px-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="w-16 h-16 rounded-full bg-success/10 mx-auto mb-5 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 15 }}
      >
        <Check className="h-8 w-8 text-success" />
      </motion.div>
      <h3 className="font-heading text-xl font-semibold text-dark mb-2">
        App Installed
      </h3>
      <p className="text-sm text-medium-gray mb-6 max-w-xs mx-auto">
        AYESHA is now on your home screen. Enjoy a faster, full-screen shopping experience.
      </p>
      <button
        onClick={onDone}
        className="px-6 py-2.5 bg-dark text-white text-sm font-medium rounded-xl hover:bg-dark-gray transition-colors"
      >
        Continue Shopping
      </button>
    </motion.div>
  );
}

function SwipeIndicator({ dragProgress }: { dragProgress: ReturnType<typeof useMotionValue<number>> }) {
  const opacity = useTransform(dragProgress, [0, -100], [1, 0]);
  return (
    <motion.div className="flex justify-center pt-2 pb-1" style={{ opacity }}>
      <ChevronDown className="h-5 w-5 text-medium-gray/50" />
    </motion.div>
  );
}

function MobileBottomSheet({ state, install, dismiss }: { state: string; install: () => void; dismiss: () => void }) {
  const dragY = useMotionValue(0);
  const sheetOpacity = useTransform(dragY, [0, -200], [1, 0]);
  const isInstalling = state === "installing";
  const showSuccess = state === "installed";

  const handleDragEnd = useCallback((_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y < -80 || info.velocity.y < -300) {
      dismiss();
    }
  }, [dismiss]);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-[100] p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 300 }}
      role="dialog"
      aria-label="Install AYESHA app"
      aria-modal="true"
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl shadow-dark/15 border border-light-gray/50 overflow-hidden"
        style={{ y: dragY, opacity: sheetOpacity }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.4}
        onDragEnd={handleDragEnd}
      >
        <SwipeIndicator dragProgress={dragY} />

        <div className="px-5 pt-2 pb-6">
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-lighter-gray flex items-center justify-center hover:bg-light-gray transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5 text-medium-gray" />
          </button>

          {showSuccess ? (
            <SuccessView onDone={dismiss} />
          ) : (
            <>
              <InstallIcon />

              <div className="text-center mb-5">
                <h3 className="font-heading text-xl font-semibold text-dark mb-1.5">
                  Install AYESHA
                </h3>
                <p className="text-sm text-medium-gray leading-relaxed">
                  Get the full luxury experience — faster, offline, and always accessible.
                </p>
              </div>

              <div className="space-y-0.5 mb-6">
                <BenefitItem icon={Zap} label="Lightning-fast access to your favorites" delay={0.15} />
                <BenefitItem icon={Wifi} label="Browse offline — no internet needed" delay={0.25} />
                <BenefitItem icon={Bell} label="Exclusive alerts on new collections" delay={0.35} />
                <BenefitItem icon={Smartphone} label="Full-screen, app-like experience" delay={0.45} />
              </div>

              <button
                onClick={install}
                disabled={isInstalling}
                className="w-full py-3.5 bg-gold hover:bg-gold-dark text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md shadow-gold/20 hover:shadow-lg hover:shadow-gold/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isInstalling ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Installing...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Install App
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-medium-gray/60 mt-3">
                Free &middot; No signup required &middot; ~2 MB
              </p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function DesktopModal({ state, install, dismiss }: { state: string; install: () => void; dismiss: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const isInstalling = state === "installing";
  const showSuccess = state === "installed";

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) dismiss();
  }, [dismiss]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dismiss]);

  return (
    <motion.div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-label="Install AYESHA app"
      aria-modal="true"
    >
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl shadow-dark/20 w-full max-w-md overflow-hidden"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-lighter-gray flex items-center justify-center hover:bg-light-gray transition-colors z-10"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4 text-medium-gray" />
        </button>

        <div className="h-32 bg-gradient-to-br from-dark via-dark-gray to-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=70')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold-light to-gold flex items-center justify-center shadow-lg shadow-gold/30"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 15 }}
            >
              <Smartphone className="h-8 w-8 text-white" />
            </motion.div>
          </div>
        </div>

        <div className="px-7 pt-6 pb-7">
          {showSuccess ? (
            <SuccessView onDone={dismiss} />
          ) : (
            <>
              <div className="text-center mb-5">
                <h3 className="font-heading text-2xl font-semibold text-dark mb-2">
                  Install AYESHA
                </h3>
                <p className="text-sm text-medium-gray leading-relaxed">
                  Experience luxury fashion at its finest — with faster load times, offline browsing, and instant access.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <BenefitItem icon={Zap} label="Lightning-fast loading" delay={0.1} />
                <BenefitItem icon={Wifi} label="Works offline" delay={0.18} />
                <BenefitItem icon={Bell} label="Collection alerts" delay={0.26} />
                <BenefitItem icon={Smartphone} label="Full-screen mode" delay={0.34} />
              </div>

              <button
                onClick={install}
                disabled={isInstalling}
                className="w-full py-3.5 bg-gold hover:bg-gold-dark text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md shadow-gold/20 hover:shadow-lg hover:shadow-gold/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isInstalling ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Installing...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Install App
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-medium-gray/60 mt-3">
                Free &middot; No signup required &middot; ~2 MB
              </p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function UnsupportedView({ dismiss }: { dismiss: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-label="Installation not available"
      aria-modal="true"
    >
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl shadow-dark/20 w-full max-w-sm p-7 text-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-lighter-gray flex items-center justify-center hover:bg-light-gray transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4 text-medium-gray" />
        </button>

        <div className="w-14 h-14 rounded-full bg-lighter-gray mx-auto mb-5 flex items-center justify-center">
          <Smartphone className="h-7 w-7 text-medium-gray" />
        </div>

        <h3 className="font-heading text-lg font-semibold text-dark mb-2">
          Installation Not Available
        </h3>
        <p className="text-sm text-medium-gray leading-relaxed mb-5">
          Your browser doesn&apos;t support app installation. You can still add AYESHA to your bookmarks for quick access.
        </p>
        <button
          onClick={dismiss}
          className="px-6 py-2.5 bg-dark text-white text-sm font-medium rounded-xl hover:bg-dark-gray transition-colors"
        >
          Got it
        </button>
      </motion.div>
    </motion.div>
  );
}

const SUBSCRIBE_NOOP = () => () => {};

export function PWAInstall() {
  const { state, install, dismiss } = usePWAInstall();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const mounted = useSyncExternalStore(SUBSCRIBE_NOOP, () => true, () => false);

  if (!mounted) return null;

  const shouldShow = state === "available" || state === "installing" || state === "installed" || state === "unsupported";

  return (
    <AnimatePresence>
      {shouldShow && state === "unsupported" ? (
        <UnsupportedView key="unsupported" dismiss={dismiss} />
      ) : shouldShow && isMobile ? (
        <MobileBottomSheet key="mobile" state={state} install={install} dismiss={dismiss} />
      ) : shouldShow ? (
        <DesktopModal key="desktop" state={state} install={install} dismiss={dismiss} />
      ) : null}
    </AnimatePresence>
  );
}
