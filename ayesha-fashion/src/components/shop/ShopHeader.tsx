"use client";

import { motion } from "framer-motion";
import { Grid3X3, List, SlidersHorizontal, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS } from "@/constants";

interface ShopHeaderProps {
  sort: string;
  onSortChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  totalProducts: number;
  filteredCount: number;
  onToggleFilters: () => void;
  activeFilterCount: number;
  showFilters: boolean;
}

export function ShopHeader({
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalProducts,
  filteredCount,
  onToggleFilters,
  activeFilterCount,
  showFilters,
}: ShopHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-medium-gray mb-4">
        <span className="hover:text-dark transition-colors cursor-default">Home</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-dark font-medium">Shop</span>
      </nav>

      {/* Title row */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-gold/60" />
            <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase">
              Curated Selection
            </p>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-dark leading-tight">
            Luxury Collection
          </h1>
        </div>
        <p className="hidden sm:block text-xs text-medium-gray pb-2">
          <span className="text-dark font-medium">{filteredCount}</span> of{" "}
          <span className="text-dark font-medium">{totalProducts}</span> products
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 py-3 border-y border-light-gray/60">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleFilters}
            className={cn(
              "flex items-center gap-2 h-9 px-4 rounded-lg border transition-all duration-300 text-xs font-medium",
              showFilters
                ? "bg-dark text-white border-dark"
                : "bg-white text-dark/60 border-border hover:border-gold/40 hover:text-gold"
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-gold text-white text-[9px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center border border-light-gray rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange("grid")}
              className={cn(
                "p-2 transition-all duration-300",
                viewMode === "grid"
                  ? "bg-dark text-white"
                  : "bg-white text-medium-gray hover:text-dark"
              )}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={cn(
                "p-2 transition-all duration-300",
                viewMode === "list"
                  ? "bg-dark text-white"
                  : "bg-white text-medium-gray hover:text-dark"
              )}
              aria-label="List view"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-medium-gray hidden sm:block">
            Sort by:
          </span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-9 px-3 text-xs bg-white border border-light-gray rounded-lg text-dark appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all min-w-[130px]"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="sm:hidden text-xs text-medium-gray mt-3">
        Showing <span className="text-dark font-medium">{filteredCount}</span> of{" "}
        <span className="text-dark font-medium">{totalProducts}</span> products
      </p>
    </motion.div>
  );
}
