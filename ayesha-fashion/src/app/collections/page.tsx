"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getAllProducts, getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  tag: string;
  productCount: number;
  products: ReturnType<typeof getAllProducts>;
}

const collections: Collection[] = [
  {
    id: "col-1",
    name: "The Evening Edit",
    slug: "evening-edit",
    description: "Red carpet-worthy gowns and cocktail ensembles",
    longDescription:
      "Curated for galas, soirées, and special occasions. Each piece is a masterpiece of craftsmanship, from hand-beaded bodices to flowing silk trains.",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=80",
    tag: "Evening Wear",
    productCount: 0,
    products: [],
  },
  {
    id: "col-2",
    name: "The Artisan Edit",
    slug: "artisan-edit",
    description: "Handcrafted accessories and leather goods",
    longDescription:
      "Celebrating the art of手工 craftsmanship. Each accessory tells a story through meticulous stitching, premium materials, and timeless design.",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80",
    tag: "Accessories",
    productCount: 0,
    products: [],
  },
  {
    id: "col-3",
    name: "The Radiance Collection",
    slug: "radiance-collection",
    description: "Fine jewelry and luminous beauty essentials",
    longDescription:
      "Designed to make you shine. From South Sea pearls to diamond-studded creations, this collection celebrates light, luster, and luxury.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80",
    tag: "Jewelry & Beauty",
    productCount: 0,
    products: [],
  },
  {
    id: "col-4",
    name: "The Signature Edit",
    slug: "signature-edit",
    description: "Iconic pieces that define modern luxury",
    longDescription:
      "Our most coveted designs — the pieces that have become synonymous with AYESHA elegance. Timeless, sophisticated, utterly unforgettable.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    tag: "Iconic",
    productCount: 0,
    products: [],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function CollectionsPage() {
  const allProducts = getAllProducts();
  const featured = getFeaturedProducts();

  const enrichedCollections = collections.map((col) => {
    let products: ReturnType<typeof getAllProducts> = [];
    switch (col.slug) {
      case "evening-edit":
        products = allProducts.filter(
          (p) =>
            p.tags.includes("evening") ||
            p.tags.includes("formal") ||
            p.tags.includes("gown")
        );
        break;
      case "artisan-edit":
        products = allProducts.filter(
          (p) => p.category.slug === "designer-bags" || p.tags.includes("leather")
        );
        break;
      case "radiance-collection":
        products = allProducts.filter(
          (p) =>
            p.category.slug === "fine-jewelry" ||
            p.category.slug === "premium-beauty" ||
            p.category.slug === "luxury-perfumes"
        );
        break;
      case "signature-edit":
        products = allProducts.filter((p) => p.isFeatured);
        break;
    }
    return { ...col, products, productCount: products.length };
  });

  return (
    <div className="min-h-screen bg-off-white">
      <div className="bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/80">Collections</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 rounded-full text-gold text-xs font-medium mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Curated Edits
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              Our Collections
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Thoughtfully curated edits that tell a story of timeless elegance
              and modern sophistication.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-20 md:space-y-28">
        {enrichedCollections.map((collection, i) => (
          <motion.section
            key={collection.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8 md:mb-10">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-medium rounded-full mb-3">
                  {collection.tag}
                </span>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-2">
                  {collection.name}
                </h2>
                <p className="text-white/70 text-sm md:text-base max-w-lg mb-1">
                  {collection.description}
                </p>
                <p className="text-white/50 text-xs md:text-sm">
                  {collection.productCount}{" "}
                  {collection.productCount === 1 ? "piece" : "pieces"}
                </p>
              </div>
            </div>

            <p className="text-medium-gray text-sm md:text-base leading-relaxed max-w-3xl mb-6">
              {collection.longDescription}
            </p>

            {collection.products.length > 0 ? (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                >
                  {collection.products.slice(0, 4).map((product, idx) => (
                    <motion.div key={product.id} variants={itemVariants}>
                      <ProductCard product={product} index={idx} />
                    </motion.div>
                  ))}
                </motion.div>
                <div className="mt-6 text-center">
                  <Link href={`/shop?collections=${collection.slug}`}>
                    <Button variant="gold" className="inline-flex items-center gap-2">
                      View Full Collection <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-light-gray">
                <p className="text-medium-gray text-sm">
                  Collection pieces coming soon.
                </p>
              </div>
            )}
          </motion.section>
        ))}
      </div>

      <div className="bg-dark mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4">
              Bespoke Curation Service
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto mb-8">
              Not sure where to start? Our style experts will curate a
              personalized edit tailored to your taste.
            </p>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-dark"
              >
                Book a Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
