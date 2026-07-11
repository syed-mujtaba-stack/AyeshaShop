"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "@/constants";

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={closeDrawer}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <span className="font-semibold">Shopping Cart</span>
                <span className="text-sm text-medium-gray">({items.length})</span>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 hover:bg-lighter-gray rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-8">
                  <ShoppingBag className="h-16 w-16 text-light-gray mb-4" />
                  <p className="text-lg font-medium text-dark mb-1">Your cart is empty</p>
                  <p className="text-sm text-medium-gray mb-6">Discover our luxury collection</p>
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium rounded-lg gold-gradient text-white shadow-sm hover:shadow-lg hover:opacity-90 transition-all duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
                    <div className="bg-lighter-gray rounded-lg p-3 mb-3">
                      <div className="flex justify-between text-xs text-medium-gray mb-1.5">
                        <span>Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
                        <span>{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} away</span>
                      </div>
                      <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex gap-3 p-3 bg-white border border-border rounded-lg"
                    >
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={closeDrawer}
                        className="w-20 h-24 rounded-lg bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${item.product.images[0]})` }}
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeDrawer}
                          className="text-sm font-medium text-dark hover:text-gold transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-medium-gray mt-0.5">
                          {item.selectedColor.name} / {item.selectedSize.name}
                        </p>
                        <p className="text-sm font-semibold text-dark mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-lighter-gray transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-sm font-medium min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-lighter-gray transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-medium-gray hover:text-error transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-medium-gray">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {shipping > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-medium-gray">Shipping</span>
                    <span className="font-medium">{formatPrice(shipping)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-semibold border-t border-border pt-3">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="flex items-center justify-center h-12 w-full px-8 text-base font-medium rounded-lg gold-gradient text-white shadow-sm hover:shadow-lg hover:opacity-90 transition-all duration-300"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="flex items-center justify-center h-10 w-full px-5 text-sm font-medium rounded-lg bg-white text-dark border border-border hover:border-gold/30 hover:shadow-sm transition-all duration-300"
                >
                  View Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
