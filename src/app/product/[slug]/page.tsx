"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Eye, Clock } from "lucide-react";
import { getProductBySlug, getProductsByCategory, getReviewsByProductId } from "@/data";
import { useUI } from "@/hooks/use-ui";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToRecentlyViewed, recentlyViewed } = useUI();

  const product = useMemo(() => (slug ? getProductBySlug(slug) : undefined), [slug]);

  const reviews = useMemo(
    () => (product ? getReviewsByProductId(product.id) : []),
    [product]
  );

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return product?.rating ?? 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews, product]);

  const relatedProducts = useMemo(
    () => (product ? getProductsByCategory(product.category.slug) : []),
    [product]
  );

  const recentlyViewedFiltered = useMemo(
    () => recentlyViewed.filter((p) => p.id !== product?.id).slice(0, 4),
    [recentlyViewed, product?.id]
  );

  useEffect(() => {
    if (product && slug) {
      addToRecentlyViewed(product);
    }
  }, [product, slug, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Eye className="h-16 w-16 text-light-gray mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold text-dark mb-2">Product Not Found</h1>
          <p className="text-medium-gray mb-6 max-w-md">
            The product you are looking for does not exist or might have been removed.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Breadcrumb - Desktop */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:flex items-center gap-2 text-sm text-medium-gray mb-6"
      >
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/category/${product.category.slug}`}
          className="hover:text-gold transition-colors"
        >
          {product.category.name}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-dark truncate max-w-[200px]">{product.name}</span>
      </motion.nav>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductGallery images={product.images} productName={product.name} />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ProductInfo product={product} />
        </motion.div>
      </div>

      {/* Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mt-16 md:mt-20"
      >
        <ProductReviews reviews={reviews} averageRating={averageRating} />
      </motion.div>

      {/* Related Products */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <RelatedProducts currentProduct={product} relatedProducts={relatedProducts} />
      </motion.div>

      {/* Recently Viewed */}
      {recentlyViewedFiltered.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="pt-12 mt-12"
        >
          <div className="flex items-center gap-2 mb-8">
            <Clock className="h-5 w-5 text-gold" />
            <h2 className="font-heading text-2xl font-bold text-dark">Recently Viewed</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recentlyViewedFiltered.map((rvProduct, index) => (
              <motion.div
                key={rvProduct.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard product={rvProduct} index={index} variant="compact" />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
