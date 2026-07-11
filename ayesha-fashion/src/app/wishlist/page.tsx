"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowLeft, ChevronLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, cn } from "@/lib/utils";
import { SITE_NAME } from "@/constants";
import { Product } from "@/types";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, toggleItem } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product, 1, product.colors[0], product.sizes[0]);
    removeItem(product.id);
  };

  const handleMoveAllToCart = () => {
    items.forEach((product) => {
      addItem(product, 1, product.colors[0], product.sizes[0]);
    });
    clearWishlist();
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
      title: `My ${SITE_NAME} Wishlist`,
      text: `Check out my wishlist from ${SITE_NAME}!`,
      url: window.location.href,
      });
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-dark-gray hover:text-gold transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl text-dark tracking-tight">My Wishlist</h1>
              <p className="text-dark-gray mt-1">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
            </div>

            {items.length > 0 && (
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-1.5" />
                  Share
                </Button>
                <Button variant="gold" size="sm" onClick={handleMoveAllToCart}>
                  <ShoppingBag className="h-4 w-4 mr-1.5" />
                  Move All to Cart
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Empty State */}
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-16 sm:py-24"
          >
            <div className="w-20 h-20 rounded-full bg-lighter-gray flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-medium-gray" />
            </div>
            <h2 className="font-heading text-2xl text-dark mb-2">Your wishlist is empty</h2>
            <p className="text-dark-gray mb-8 max-w-sm mx-auto">
              Save your favorite pieces and they&apos;ll appear here. Start exploring our luxury collection.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Discover Our Collection
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Wishlist Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="group bg-white rounded-xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-lighter-gray">
                <Link href={`/product/${product.slug}`}>
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                </Link>

                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && <Badge variant="new">New</Badge>}
                  {product.discount && <Badge variant="sale">-{product.discount}%</Badge>}
                </div>

                <button
                  onClick={() => toggleItem(product)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-sm transition-all"
                  aria-label="Remove from wishlist"
                >
                  <Heart className="h-4 w-4 text-gold fill-gold" />
                </button>
              </div>

              <div className="p-4 sm:p-5">
                <Link href={`/product/${product.slug}`}>
                  <p className="text-xs text-medium-gray uppercase tracking-wider mb-1">
                    {product.brand.name}
                  </p>
                  <h3 className="font-heading text-base text-dark group-hover:text-gold transition-colors line-clamp-1 mb-2">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={cn("w-3 h-3", i < Math.round(product.rating) ? "text-gold" : "text-light-gray")}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-medium-gray ml-1">({product.reviewCount})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-dark">{formatPrice(product.price)}</span>
                    {product.comparePrice && (
                      <span className="text-xs text-medium-gray line-through">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="p-1.5 hover:bg-lighter-gray rounded-full transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4 text-medium-gray hover:text-error transition-colors" />
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="default"
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {/* Bottom navigation */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-dark-gray hover:text-gold transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <button
              onClick={clearWishlist}
              className="text-sm text-dark-gray hover:text-error transition-colors"
            >
              Clear Wishlist
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}