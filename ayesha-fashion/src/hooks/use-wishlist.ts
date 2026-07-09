"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";
import { toast } from "sonner";

interface WishlistStore {
  items: Product[];
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        const exists = get().items.find((item) => item.id === product.id);
        if (exists) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== product.id),
          }));
          toast.success("Removed from wishlist");
        } else {
          set((state) => ({ items: [...state.items, product] }));
          toast.success("Added to wishlist");
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      clearWishlist: () => set({ items: [] }),
    }),
    { name: "ayesha-wishlist" }
  )
);
