"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Percent,
  Gift,
  Shield,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "@/constants";

const VALID_COUPONS: Record<string, { discount: number; label: string }> = {
  AYESHA10: { discount: 10, label: "10% off" },
  LUXURY20: { discount: 20, label: "20% off" },
  FREESHIP: { discount: 0, label: "Free shipping" },
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } = useCart();
  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    label: string;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [shippingEstimate, setShippingEstimate] = useState<{
    cost: number;
    label: string;
  } | null>(null);

  const discountAmount = appliedCoupon
    ? appliedCoupon.discount === 0
      ? shipping
      : Math.round(subtotal * (appliedCoupon.discount / 100))
    : 0;

  const effectiveShipping =
    appliedCoupon?.code === "FREESHIP" ? 0 : shippingEstimate?.cost ?? shipping;

  const total = subtotal - discountAmount + effectiveShipping;

  function handleApplyCoupon() {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }
    const coupon = VALID_COUPONS[code];
    if (!coupon) {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon({ code, ...coupon });
    setCouponError("");
    setCouponCode("");
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
  }

  function handleEstimateShipping() {
    if (!zipCode.trim()) return;
    const cost = zipCode.trim().startsWith("5") ? 299 : SHIPPING_COST;
    setShippingEstimate({ cost, label: `Shipping to ${zipCode}` });
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center justify-center text-center py-24">
            <div className="w-20 h-20 bg-lighter-gray rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-light-gray" />
            </div>
            <h1 className="font-heading text-2xl font-semibold text-dark mb-2">
              Your cart is empty
            </h1>
            <p className="text-medium-gray mb-8 max-w-md">
              Browse our luxury collection and discover pieces that speak to you.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Shop Our Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-semibold text-dark">
            Shopping Cart
          </h1>
          <p className="text-medium-gray mt-1">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-border p-4 flex gap-4"
              >
                <Link
                  href={`/product/${item.product.slug}`}
                  className="w-24 h-32 rounded-lg bg-cover bg-center shrink-0 border border-border"
                  style={{ backgroundImage: `url(${item.product.images[0]})` }}
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-heading text-base font-semibold text-dark hover:text-gold transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-medium-gray hover:text-error transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-medium-gray mt-0.5">
                      {item.selectedColor.name} / {item.selectedSize.name}
                    </p>
                    <p className="text-lg font-semibold text-dark mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-lighter-gray transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-sm font-medium min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-lighter-gray transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-dark">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-heading text-lg font-semibold text-dark">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-medium-gray">Subtotal</span>
                  <span className="font-medium text-dark">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-medium-gray">Shipping</span>
                  <span
                    className={cn(
                      "font-medium",
                      effectiveShipping === 0 ? "text-success" : "text-dark"
                    )}
                  >
                    {effectiveShipping === 0
                      ? "Free"
                      : formatPrice(effectiveShipping)}
                  </span>
                </div>
                {appliedCoupon && discountAmount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>
                      Coupon ({appliedCoupon.label})
                    </span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                {appliedCoupon?.code === "FREESHIP" && (
                  <div className="flex justify-between text-success">
                    <span>Coupon (Free shipping)</span>
                    <span>-{formatPrice(shipping)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4 flex justify-between text-base font-semibold">
                <span className="text-dark">Total</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>

              <Link href="/checkout" className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <div className="flex items-center gap-2 text-xs text-medium-gray pt-1">
                <Shield className="w-3 h-3" />
                <span>Secure checkout</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-gold" />
                <h3 className="font-heading text-sm font-semibold text-dark">
                  Coupon Code
                </h3>
              </div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-gold/5 border border-gold/20 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-gold" />
                    <div>
                      <p className="text-xs font-medium text-gold">
                        {appliedCoupon.code}
                      </p>
                      <p className="text-[10px] text-medium-gray">
                        {appliedCoupon.label}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs text-medium-gray hover:text-error transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleApplyCoupon();
                    }}
                    error={couponError || undefined}
                    className="text-sm"
                  />
                  <Button
                    variant="gold"
                    size="default"
                    onClick={handleApplyCoupon}
                    className="shrink-0"
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-border p-6 space-y-3">
              <div className="flex items-center gap-2">
                <TruckIcon className="w-4 h-4 text-gold" />
                <h3 className="font-heading text-sm font-semibold text-dark">
                  Shipping Estimator
                </h3>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="ZIP Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="text-sm"
                />
                <Button
                  variant="secondary"
                  size="default"
                  onClick={handleEstimateShipping}
                  className="shrink-0"
                >
                  Estimate
                </Button>
              </div>
              {shippingEstimate && (
                <p className="text-xs text-medium-gray">
                  {shippingEstimate.label}:{" "}
                  <span className="font-medium text-dark">
                    {shippingEstimate.cost === 0
                      ? "Free"
                      : formatPrice(shippingEstimate.cost)}
                  </span>
                </p>
              )}
              <p className="text-xs text-medium-gray">
                Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
              </p>
            </div>

            <Link
              href="/shop"
              className="flex items-center justify-center gap-1 text-sm text-medium-gray hover:text-dark transition-colors py-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.11a1 1 0 0 0-.37-.77l-3.83-3.06A1 1 0 0 0 17 9.6V18" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}