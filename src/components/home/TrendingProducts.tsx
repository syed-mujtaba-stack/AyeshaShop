"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { ArrowRight, Heart, Eye } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";
import type { PanInfo } from "framer-motion";

function useMediaWidth() {
  const [width, setWidth] = useState(1280);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

export function TrendingProducts() {
  const products = getFeaturedProducts().slice(0, 6);
  const viewportRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { isInWishlist, toggleItem } = useWishlist();
  const router = useRouter();

  const scrollX = useMotionValue(0);
  const x = useTransform(scrollX, (v) => v);

  const speed = 35;
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const velocity = useRef(0);

  const vw = useMediaWidth();
  const cardW = vw < 640 ? 240 : vw < 1024 ? 270 : 300;
  const gap = vw < 640 ? 16 : 20;
  const singleSetW = products.length * (cardW + gap) - gap;

  const animate = useCallback(
    (time: number, delta: number) => {
      if (isDragging.current || isHovered.current || !marqueeRef.current) return;
      const dt = delta / 1000;
      let offset = scrollX.get() - speed * dt;
      if (Math.abs(offset) >= singleSetW) offset += singleSetW;
      scrollX.set(offset);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [singleSetW]
  );

  useAnimationFrame(animate);

  const handleDragStart = useCallback(
    (_: unknown, info: PanInfo) => {
      isDragging.current = true;
      lastPointerX.current = info.point.x;
      lastPointerTime.current = performance.now();
      velocity.current = 0;
    },
    []
  );

  const handleDrag = useCallback(
    (_: unknown, info: PanInfo) => {
      const now = performance.now();
      const dt = (now - lastPointerTime.current) / 1000;
      if (dt > 0) velocity.current = (info.point.x - lastPointerX.current) / dt;
      lastPointerX.current = info.point.x;
      lastPointerTime.current = now;
      let offset = scrollX.get() + info.delta.x;
      if (offset < -singleSetW) offset += singleSetW;
      if (offset > 0) offset -= singleSetW;
      scrollX.set(offset);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [singleSetW]
  );

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
    const v = velocity.current;
    velocity.current = 0;
    const momentumOffset = v * 0.15;
    let offset = scrollX.get() + momentumOffset;
    if (offset < -singleSetW) offset += singleSetW;
    if (offset > 0) offset -= singleSetW;
    scrollX.set(offset);
  }, [scrollX, singleSetW]);

  return (
    <section className="py-14 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
              The Edit
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-dark">
              Curated for You
            </h2>
          </div>
          <Link
            href="/shop"
            className="group hidden sm:flex items-center gap-2 text-xs font-medium text-dark/50 hover:text-gold transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      <div
        ref={viewportRef}
        className="relative cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={() => { isHovered.current = false; }}
      >
        <motion.div
          ref={marqueeRef}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          className="flex w-max will-change-transform"
        >
          {[...products, ...products].map((product, i) => (
            <motion.div
              key={`${product.id}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % products.length) * 0.08, duration: 0.5 }}
              className="shrink-0 px-2 sm:px-2.5 lg:px-2.5"
              style={{ width: cardW }}
            >
              <Link href={`/product/${product.slug}`} className="block group">
                <div
                  className="relative rounded-xl overflow-hidden bg-lighter-gray mb-3 transition-all duration-500 group-hover:shadow-xl"
                  style={{ aspectRatio: "3/4" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-[600ms] group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-400 group-hover:ring-2 group-hover:ring-gold/20 rounded-xl" />

                  {product.isNew && (
                    <span className="absolute top-3 left-3 text-[10px] font-semibold text-white bg-dark/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      New
                    </span>
                  )}

                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <button
                      className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                      onClick={(e) => { e.preventDefault(); toggleItem(product); }}
                    >
                      <Heart className={`h-3.5 w-3.5 ${isInWishlist(product.id) ? "text-gold fill-gold" : "text-dark"}`} />
                    </button>
                    <button
                      className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      aria-label="Quick view"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/product/${product.slug}`); }}
                    >
                      <Eye className="h-3.5 w-3.5 text-dark" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="block w-full py-2 bg-white/90 backdrop-blur-md text-dark text-[10px] font-semibold uppercase tracking-wider text-center rounded-lg">
                      Quick View
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-medium-gray uppercase tracking-[0.15em] mb-0.5">
                  {product.brand.name}
                </p>
                <h3 className="text-sm font-medium text-dark group-hover:text-gold transition-colors truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm font-semibold text-dark">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-[11px] text-medium-gray line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-7 sm:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-dark/10 rounded-full text-xs font-medium text-dark/50 hover:border-gold hover:text-gold transition-all"
        >
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </section>
  );
}
