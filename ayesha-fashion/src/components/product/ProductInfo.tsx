"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Check,
  Minus,
  Plus,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Truck,
  ShieldCheck,
  RotateCcw,
  MessageSquare,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types";
import { formatPrice, cn, getDiscountedPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes.find((s) => s.inStock) ?? product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const discountedPrice = product.discount
    ? getDiscountedPrice(product.price, product.discount)
    : product.price;

  const handleAddToCart = useCallback(() => {
    if (!selectedSize.inStock) {
      toast.error("This size is out of stock");
      return;
    }
    setAddingToCart(true);
    setTimeout(() => {
      addItem(product, quantity, selectedColor, selectedSize);
      setAddingToCart(false);
    }, 600);
  }, [addItem, product, quantity, selectedColor, selectedSize]);

  const handleShare = useCallback(
    (platform: "facebook" | "twitter" | "copy") => {
      const url = window.location.href;
      const text = `Check out ${product.name} at AYESHA Fashion!`;
      switch (platform) {
        case "facebook":
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
          break;
        case "twitter":
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
          break;
        case "copy":
          navigator.clipboard.writeText(url).then(() => {
            toast.success("Link copied to clipboard");
          });
          break;
      }
    },
    [product.name]
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb - mobile only */}
      <nav className="flex items-center gap-2 text-xs text-medium-gray md:hidden">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.category.slug}`} className="hover:text-gold transition-colors">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-dark truncate max-w-[120px]">{product.name}</span>
      </nav>

      {/* Brand & Title */}
      <div>
        <Link
          href={`/brand/${product.brand.slug}`}
          className="text-xs uppercase tracking-[0.2em] text-gold font-medium hover:underline"
        >
          {product.brand.name}
        </Link>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-dark mt-1 leading-tight">
          {product.name}
        </h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                "w-4 h-4",
                i < Math.round(product.rating) ? "text-gold" : "text-light-gray"
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <Link href="#reviews" className="text-sm text-medium-gray hover:text-gold transition-colors">
          {product.rating} ({product.reviewCount} reviews)
        </Link>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-dark font-heading">
          {formatPrice(discountedPrice)}
        </span>
        {product.comparePrice && (
          <span className="text-lg text-medium-gray line-through">
            {formatPrice(product.comparePrice)}
          </span>
        )}
        {product.discount && (
          <Badge variant="sale" size="lg">-{product.discount}%</Badge>
        )}
      </div>

      {/* Short Description */}
      <p className="text-medium-gray leading-relaxed">{product.shortDescription}</p>

      {/* Color Selection */}
      {product.colors.length > 1 && (
        <div>
          <p className="text-sm font-medium text-dark mb-3">
            Color: <span className="text-medium-gray font-normal">{selectedColor.name}</span>
          </p>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <motion.button
                key={color.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "relative w-10 h-10 rounded-full border-2 transition-all duration-200",
                  selectedColor.name === color.name
                    ? "border-gold shadow-md shadow-gold/20 scale-110"
                    : "border-light-gray hover:border-medium-gray"
                )}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.name}`}
                title={color.name}
              >
                {selectedColor.name === color.name && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check className={cn(
                      "h-5 w-5",
                      ["#ffffff", "#f5f5dc", "#f7e7ce", "#fffdd0", "#f5deb3", "#e8c9b6", "#ffb6c1", "#e6e6fa", "#f5f5dc"].includes(color.hex)
                        ? "text-dark"
                        : "text-white"
                    )} />
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes.length > 1 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-dark">
              Size: <span className="text-medium-gray font-normal">{selectedSize.name}</span>
            </p>
            <button className="text-xs text-gold hover:underline">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <motion.button
                key={size.name}
                whileHover={size.inStock ? { scale: 1.05 } : undefined}
                whileTap={size.inStock ? { scale: 0.95 } : undefined}
                onClick={() => size.inStock && setSelectedSize(size)}
                disabled={!size.inStock}
                className={cn(
                  "min-w-[3rem] px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200",
                  selectedSize.name === size.name && size.inStock
                    ? "border-gold bg-gold text-white shadow-md shadow-gold/20"
                    : size.inStock
                      ? "border-border text-dark hover:border-gold/50 hover:shadow-sm"
                      : "border-border text-light-gray bg-lighter-gray cursor-not-allowed line-through"
                )}
              >
                {size.name}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="flex items-stretch gap-3 pt-2">
        <div className="flex items-center border border-border rounded-lg overflow-hidden shrink-0">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-12 h-12 flex items-center justify-center text-dark hover:bg-lighter-gray transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-14 text-center font-medium text-dark text-sm tabular-nums">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stockQuantity, q + 1))}
            className="w-12 h-12 flex items-center justify-center text-dark hover:bg-lighter-gray transition-colors"
            disabled={quantity >= product.stockQuantity}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="flex-1 h-12 text-base"
          onClick={handleAddToCart}
          loading={addingToCart}
          disabled={!selectedSize.inStock}
        >
          <AnimatePresence mode="wait">
            {addingToCart ? (
              <motion.span
                key="adding"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Adding...
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {selectedSize.inStock ? "Add to Cart" : "Out of Stock"}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleItem(product)}
          className={cn(
            "w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-300 shrink-0",
            inWishlist
              ? "border-gold/30 bg-gold/5 text-gold"
              : "border-border text-medium-gray hover:border-gold/50 hover:text-gold hover:shadow-sm"
          )}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-5 w-5", inWishlist && "fill-gold")} />
        </motion.button>
      </div>

      {/* Share */}
      <div className="relative">
        <div className="flex items-center gap-4 pt-1">
          <span className="text-xs text-medium-gray uppercase tracking-wider">Share</span>
          <button
            onClick={() => handleShare("facebook")}
            className="text-medium-gray hover:text-[#1877F2] transition-colors"
            aria-label="Share on Facebook"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="text-medium-gray hover:text-[#1DA1F2] transition-colors"
            aria-label="Share on Twitter"
          >
            <Send className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleShare("copy")}
            className="text-medium-gray hover:text-gold transition-colors"
            aria-label="Copy link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Description with Read More */}
      <div className="border-t border-border pt-6">
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-heading text-lg font-semibold text-dark">Description</h3>
          {showFullDescription ? (
            <ChevronUp className="h-5 w-5 text-medium-gray" />
          ) : (
            <ChevronDown className="h-5 w-5 text-medium-gray" />
          )}
        </button>
        <AnimatePresence initial={false}>
          <motion.div
            key="description"
            initial={{ height: 0, opacity: 0 }}
            animate={showFullDescription ? { height: "auto", opacity: 1 } : { height: 80, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={cn("pt-3", !showFullDescription && "line-clamp-3")}>
              <p className="text-medium-gray leading-relaxed">{product.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        {!showFullDescription && (
          <button
            onClick={() => setShowFullDescription(true)}
            className="text-sm text-gold hover:underline mt-1"
          >
            Read more
          </button>
        )}
      </div>

      {/* Specifications */}
      {(product.material || product.careInstructions || product.sku) && (
        <div className="border-t border-border pt-6">
          <h3 className="font-heading text-lg font-semibold text-dark mb-4">
            Specifications
          </h3>
          <div className="space-y-3">
            {product.sku && (
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-sm text-medium-gray">SKU</span>
                <span className="text-sm text-dark font-medium">{product.sku}</span>
              </div>
            )}
            {product.material && (
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-sm text-medium-gray">Material</span>
                <span className="text-sm text-dark font-medium">{product.material}</span>
              </div>
            )}
            {product.careInstructions && (
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-sm text-medium-gray">Care Instructions</span>
                <span className="text-sm text-dark font-medium text-right max-w-[60%]">
                  {product.careInstructions}
                </span>
              </div>
            )}
            {product.category && (
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-sm text-medium-gray">Category</span>
                <span className="text-sm text-dark font-medium">{product.category.name}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shipping Info */}
      <div className="border-t border-border pt-6 space-y-4">
        <div className="flex items-center gap-3 p-3 bg-lighter-gray rounded-lg">
          <Truck className="h-5 w-5 text-gold shrink-0" />
          <div>
            <p className="text-sm font-medium text-dark">Free Shipping</p>
            <p className="text-xs text-medium-gray">On orders over PKR 5,000. Estimated 3-5 business days.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-lighter-gray rounded-lg">
          <ShieldCheck className="h-5 w-5 text-gold shrink-0" />
          <div>
            <p className="text-sm font-medium text-dark">Authenticity Guaranteed</p>
            <p className="text-xs text-medium-gray">100% genuine products with authenticity certificate.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-lighter-gray rounded-lg">
          <RotateCcw className="h-5 w-5 text-gold shrink-0" />
          <div>
            <p className="text-sm font-medium text-dark">Easy Returns</p>
            <p className="text-xs text-medium-gray">30-day return policy. Free returns on all orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
