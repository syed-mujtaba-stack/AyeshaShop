"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/common/StarRating";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "compact" | "horizontal";
}

export function ProductCard({ product, index = 0, variant = "default" }: ProductCardProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const { addItem } = useCart();
  const inWishlist = isInWishlist(product.id);

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="flex gap-4 p-3 bg-white rounded-xl border border-border hover:shadow-md transition-all duration-300 group"
      >
        <Link
          href={`/product/${product.slug}`}
          className="w-24 h-28 rounded-lg bg-cover bg-center shrink-0"
          style={{ backgroundImage: `url(${product.images[0]})` }}
        />
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            <p className="text-xs text-medium-gray uppercase tracking-wider">
              {product.brand.name}
            </p>
            <Link
              href={`/product/${product.slug}`}
              className="text-sm font-medium text-dark hover:text-gold transition-colors line-clamp-1"
            >
              {product.name}
            </Link>
            <div className="flex items-center gap-1 mt-1">
              <StarRating rating={product.rating} count={product.reviewCount} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-dark">{formatPrice(product.price)}</span>
              {product.comparePrice && (
                <span className="text-xs text-medium-gray line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
            <button
              onClick={() => toggleItem(product)}
              className="p-1.5 hover:bg-lighter-gray rounded-full transition-colors"
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-4 w-4", inWishlist ? "text-gold fill-gold" : "text-medium-gray")} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link
          href={`/product/${product.slug}`}
          className="block group"
        >
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-lighter-gray mb-2">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url(${product.images[0]})` }}
            />
            {product.discount && (
              <Badge variant="sale" className="absolute top-2 left-2">
                -{product.discount}%
              </Badge>
            )}
          </div>
          <p className="text-xs text-medium-gray uppercase tracking-wider">{product.brand.name}</p>
          <p className="text-sm font-medium text-dark truncate group-hover:text-gold transition-colors">
            {product.name}
          </p>
          <p className="text-sm font-semibold text-dark mt-0.5">{formatPrice(product.price)}</p>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-lighter-gray mb-3 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-0.5">
        <Link href={`/product/${product.slug}`}>
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${product.images[0]})` }}
          />
        </Link>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.discount && <Badge variant="sale">-{product.discount}%</Badge>}
          {product.isBestSeller && !product.isNew && !product.discount && (
            <Badge variant="gold">Best Seller</Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={() => toggleItem(product)}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-sm transition-all"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-4 w-4", inWishlist ? "text-gold fill-gold" : "text-dark")} />
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-sm transition-all"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4 text-dark" />
          </Link>
        </div>

        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addItem(product, 1, product.colors[0], product.sizes[0])}
            className="w-full py-2.5 bg-dark text-white text-xs font-medium rounded-lg hover:bg-dark-gray transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Link href={`/product/${product.slug}`}>
        <p className="text-[11px] text-medium-gray uppercase tracking-[0.15em] mb-0.5">
          {product.brand.name}
        </p>
        <h3 className="text-sm font-medium text-dark group-hover:text-gold transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-1">
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-dark">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-xs text-medium-gray line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
