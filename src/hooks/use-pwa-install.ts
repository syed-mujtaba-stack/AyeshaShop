"use client";

import { useState, useEffect, useCallback } from "react";

const DISMISS_KEY = "ayesha-pwa-install-dismissed";
const INSTALLED_KEY = "ayesha-pwa-installed";
const DISMISS_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

type InstallState = "idle" | "available" | "installing" | "installed" | "dismissed" | "unsupported";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isDismissedRecently(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const ts = Number(localStorage.getItem(DISMISS_KEY)) || 0;
    return ts > 0 && Date.now() - ts < DISMISS_EXPIRY_MS;
  } catch {
    return false;
  }
}

function isAlreadyInstalled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(INSTALLED_KEY) === "1") return true;
  } catch {
    // ignore
  }
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  if ("standalone" in window.navigator) return true;
  return false;
}

function getInitialInstallState(): InstallState {
  if (typeof window === "undefined") return "idle";
  if (isAlreadyInstalled()) return "installed";
  if (isDismissedRecently()) return "dismissed";
  return "idle";
}

function setDismissTimestamp() {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

export function usePWAInstall() {
  const [state, setState] = useState<InstallState>(getInitialInstallState);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (state === "installed" || state === "dismissed") return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setState("available");
    };

    window.addEventListener("beforeinstallprompt", handler);

    const appInstalledHandler = () => {
      setState("installed");
      try {
        localStorage.setItem(INSTALLED_KEY, "1");
      } catch {
        // ignore
      }
    };
    window.addEventListener("appinstalled", appInstalledHandler);

    const mmQuery = window.matchMedia("(display-mode: standalone)");
    const modeHandler = () => {
      if (mmQuery.matches) {
        setState("installed");
        try {
          localStorage.setItem(INSTALLED_KEY, "1");
        } catch {
          // ignore
        }
      }
    };
    mmQuery.addEventListener("change", modeHandler);

    if (!window.matchMedia("(display-mode: standalone)").matches && !("standalone" in window.navigator)) {
      const timer = setTimeout(() => {
        setState((prev) => (prev === "idle" ? "unsupported" : prev));
      }, 3000);
      return () => {
        window.removeEventListener("beforeinstallprompt", handler);
        window.removeEventListener("appinstalled", appInstalledHandler);
        mmQuery.removeEventListener("change", modeHandler);
        clearTimeout(timer);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", appInstalledHandler);
      mmQuery.removeEventListener("change", modeHandler);
    };
  }, [state]);

  const install = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) return false;
    setState("installing");
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setState("installed");
        try {
          localStorage.setItem(INSTALLED_KEY, "1");
        } catch {
          // ignore
        }
        return true;
      }
      setState("available");
      return false;
    } catch {
      setState("available");
      return false;
    }
  }, [deferredPrompt]);

  const dismiss = useCallback(() => {
    setState("dismissed");
    setDismissTimestamp();
  }, []);

  const resetDismiss = useCallback(() => {
    try {
      localStorage.removeItem(DISMISS_KEY);
    } catch {
      // ignore
    }
    setState("idle");
  }, []);

  return { state, install, dismiss, resetDismiss };
}
