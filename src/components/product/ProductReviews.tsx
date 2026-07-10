"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ThumbsUp, Flag, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Review } from "@/types";
import { formatDate, cn } from "@/lib/utils";

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
}

type SortOption = "newest" | "oldest" | "highest" | "lowest";

export function ProductReviews({ reviews, averageRating }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        counts[r.rating as keyof typeof counts]++;
      }
    });
    return counts;
  }, [reviews]);

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "oldest":
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case "highest":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  }, [reviews, sortBy]);

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 4);
  const totalReviews = reviews.length;

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (totalReviews === 0) {
    return (
      <section id="reviews" className="scroll-mt-24">
        <h2 className="font-heading text-2xl font-bold text-dark mb-8">Reviews</h2>
        <div className="text-center py-16 bg-lighter-gray rounded-xl">
          <p className="text-medium-gray">No reviews yet. Be the first to review this product!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="scroll-mt-24">
      <h2 className="font-heading text-2xl font-bold text-dark mb-8">
        Customer Reviews ({totalReviews})
      </h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 p-6 bg-lighter-gray rounded-xl">
        {/* Average Rating */}
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-5xl font-bold text-dark font-heading">{averageRating}</span>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={cn("w-5 h-5", i < Math.round(averageRating) ? "text-gold" : "text-light-gray")}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-medium-gray mt-1">{totalReviews} {totalReviews === 1 ? "review" : "reviews"}</p>
        </div>

        {/* Rating Breakdown */}
        <div className="md:col-span-2 space-y-2">
          {([5, 4, 3, 2, 1] as const).map((star) => {
            const count = ratingCounts[star];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm text-medium-gray w-8 shrink-0">{star} stars</span>
                <div className="flex-1 h-2.5 bg-light-gray rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gold rounded-full"
                  />
                </div>
                <span className="text-sm text-medium-gray w-8 text-right shrink-0">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-dark font-medium">
          {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="review-sort" className="text-sm text-medium-gray">Sort by:</label>
          <select
            id="review-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white text-dark focus:outline-none focus:border-gold"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {displayedReviews.map((review, index) => {
            const isExpanded = expandedReviews.has(review.id);
            const isLongComment = review.comment.length > 200;

            return (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-border rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {review.userAvatar ? (
                      <Image
                        src={review.userAvatar}
                        alt={review.userName}
                        width={44}
                        height={44}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-gold">
                          {review.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-dark text-sm">{review.userName}</p>
                        {review.verified && (
                          <span className="text-xs text-success flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={cn(
                                "w-3.5 h-3.5",
                                i < review.rating ? "text-gold" : "text-light-gray"
                              )}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-medium-gray">{formatDate(review.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {review.title && (
                  <h4 className="font-medium text-dark mb-2">{review.title}</h4>
                )}

                <div>
                  <p className={cn(
                    "text-medium-gray text-sm leading-relaxed",
                    !isExpanded && isLongComment && "line-clamp-3"
                  )}>
                    {review.comment}
                  </p>
                  {isLongComment && (
                    <button
                      onClick={() => toggleExpand(review.id)}
                      className="text-sm text-gold hover:underline mt-1 flex items-center gap-1"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                  )}
                </div>

                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {review.images.map((img, i) => (
                      <div key={i} className="w-16 h-16 rounded-lg overflow-hidden bg-lighter-gray">
                        <Image
                          src={img}
                          alt={`Review image ${i + 1}`}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Helpful / Report */}
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/50">
                  <button className="flex items-center gap-1.5 text-xs text-medium-gray hover:text-gold transition-colors">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Helpful
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-medium-gray hover:text-error transition-colors">
                    <Flag className="h-3.5 w-3.5" />
                    Report
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Show More */}
      {sortedReviews.length > 4 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 text-gold font-medium hover:underline"
          >
            {showAll ? "Show less" : `Show all ${totalReviews} reviews`}
            {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      )}
    </section>
  );
}
