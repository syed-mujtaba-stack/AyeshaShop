"use client";

import { useState } from "react";
import Link from "next/link";
import { currentCustomer } from "@/data/customers";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ShoppingBag, Star } from "lucide-react";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(currentCustomer.wishlist);

  const removeItem = (productId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-dark">My Wishlist</h1>
          <p className="text-medium-gray text-sm mt-1">
            {wishlistItems.length} item{wishlistItems.length !== 1 && "s"}
          </p>
        </div>
        <Link href="/shop">
          <Button variant="gold" size="sm" className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-error/5 flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-error/40" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-dark mb-1">
              Your wishlist is empty
            </h3>
            <p className="text-medium-gray text-sm mb-6 text-center max-w-sm">
              Save your favorite items and come back to them later.
            </p>
            <Link href="/shop">
              <Button variant="gold">Explore Products</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {wishlistItems.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="relative aspect-[4/5] overflow-hidden bg-lighter-gray">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.discount && product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-error text-white text-xs font-semibold px-2 py-1 rounded-lg">
                    -{product.discount}%
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeItem(product.id);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-error hover:bg-white transition-all shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-medium-gray uppercase tracking-wide">
                  {product.brand.name}
                </p>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-heading font-semibold text-dark mt-0.5 hover:text-gold transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span className="text-xs text-medium-gray">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="font-heading font-bold text-dark">
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-xs text-medium-gray line-through ml-2">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>
                  <Link href={`/products/${product.slug}`}>
                    <Button variant="gold" size="icon-sm">
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}