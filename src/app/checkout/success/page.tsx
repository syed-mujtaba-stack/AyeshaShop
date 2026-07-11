"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Package, Gift, ArrowRight, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OrderData {
  orderNumber: string;
  total: number;
  subtotal: number;
  shipping: number;
  paymentMethod: string;
  createdAt: string;
}

function readOrderSnapshot(): OrderData | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem("ayesha-last-order");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function subscribeOrder() {
  return () => {};
}

export default function CheckoutSuccessPage() {
  const order = useSyncExternalStore(subscribeOrder, readOrderSnapshot, () => null);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-2xl border border-border p-8 sm:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                }}
                className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-success" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
                transition={{ delay: 0.8, duration: 1.2, times: [0, 0.4, 1] }}
                className="absolute inset-0 w-20 h-20 rounded-full border-2 border-success/30"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-dark mb-2">
              Order Confirmed!
            </h1>
            <p className="text-medium-gray mb-6">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
          </motion.div>

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="bg-lighter-gray rounded-xl p-5 space-y-3 text-left mb-6"
            >
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-gold" />
                <span className="text-medium-gray">Order Number</span>
                <span className="font-semibold text-dark ml-auto">
                  {order.orderNumber}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Gift className="w-4 h-4 text-gold" />
                <span className="text-medium-gray">Total Charged</span>
                <span className="font-semibold text-dark ml-auto">
                  {formatPrice(order.total)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-gold" />
                <span className="text-medium-gray">Estimated Delivery</span>
                <span className="font-semibold text-dark ml-auto">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                  }).format(deliveryDate)}
                </span>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="space-y-3"
          >
            <p className="text-sm text-medium-gray mb-4">
              A confirmation email with your order details has been sent to your
              email address. You can track your order status in your account.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/account/orders">
                <Button variant="secondary" size="lg">
                  View Orders
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="primary" size="lg">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <Link
              href="/wishlist"
              className="inline-flex items-center gap-1.5 text-xs text-medium-gray hover:text-gold transition-colors mt-4"
            >
              <Heart className="w-3 h-3" />
              Save your favorites to your wishlist
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}