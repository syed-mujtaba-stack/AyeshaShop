"use client";

import { create } from "zustand";
import { Product } from "@/types";

interface UIStore {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isMobileFilterOpen: boolean;
  isMegaMenuOpen: boolean;
  activeMegaMenu: string | null;
  recentlyViewed: Product[];
  openSearch: () => void;
  closeSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileFilter: () => void;
  closeMobileFilter: () => void;
  openMegaMenu: (label: string) => void;
  closeMegaMenu: () => void;
  addToRecentlyViewed: (product: Product) => void;
}

export const useUI = create<UIStore>()((set, get) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isMobileFilterOpen: false,
  isMegaMenuOpen: false,
  activeMegaMenu: null,
  recentlyViewed: [],
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileFilter: () =>
    set((state) => ({ isMobileFilterOpen: !state.isMobileFilterOpen })),
  closeMobileFilter: () => set({ isMobileFilterOpen: false }),
  openMegaMenu: (label) =>
    set({ isMegaMenuOpen: true, activeMegaMenu: label }),
  closeMegaMenu: () =>
    set({ isMegaMenuOpen: false, activeMegaMenu: null }),
  addToRecentlyViewed: (product) => {
    const existing = get().recentlyViewed.filter((p) => p.id !== product.id);
    set({ recentlyViewed: [product, ...existing].slice(0, 6) });
  },
}));
