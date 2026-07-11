"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Shield } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { CheckoutForm } from "@/components/forms/CheckoutForm";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getItemCount } = useCart();
  const itemCount = getItemCount();

  useEffect(() => {
    if (itemCount === 0) {
      router.replace("/cart");
    }
  }, [itemCount, router]);

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-gold" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-semibold text-dark">
                Checkout
              </h1>
              <p className="text-medium-gray text-sm mt-0.5">
                {itemCount} {itemCount === 1 ? "item" : "items"} &bull; Secure checkout
              </p>
            </div>
          </div>
        </div>

        <CheckoutForm />

        <div className="mt-12 mb-8 flex items-center justify-center gap-6 text-xs text-medium-gray">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v2" />
              <path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2" />
              <path d="M7 10h10" />
              <path d="M7 14h10" />
            </svg>
            <span>30-Day Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}