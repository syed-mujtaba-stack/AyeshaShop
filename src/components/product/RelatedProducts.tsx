"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { ProductCard } from "@/components/common/ProductCard";

interface RelatedProductsProps {
  currentProduct: Product;
  relatedProducts: Product[];
  title?: string;
}

export function RelatedProducts({
  currentProduct,
  relatedProducts,
  title = "You May Also Like",
}: RelatedProductsProps) {
  const filtered = useMemo(
    () => relatedProducts.filter((p) => p.id !== currentProduct.id).slice(0, 4),
    [relatedProducts, currentProduct.id]
  );

  if (filtered.length === 0) return null;

  return (
    <section className="pt-12 border-t border-border mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading text-2xl font-bold text-dark">{title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <ProductCard product={product} index={index} variant="compact" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
