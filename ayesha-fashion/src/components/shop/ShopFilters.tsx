"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronDown, RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatPrice } from "@/lib/utils";
import { CATEGORIES } from "@/constants";

const BRANDS = [
  { name: "Maison Luxe", slug: "maison-luxe" },
  { name: "Bella Couture", slug: "bella-couture" },
  { name: "Artisan Leather Co.", slug: "artisan-leather-co" },
  { name: "Éclat Jewels", slug: "eclat-jewels" },
  { name: "Opulence Atelier", slug: "opulence-atelier" },
  { name: "Parfums d'Élégance", slug: "parfums-delegance" },
  { name: "Luxe Footwear", slug: "luxe-footwear" },
  { name: "Luminous Skin", slug: "luminous-skin" },
];

const COLORS = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#ffffff" },
  { name: "Gold", hex: "#b8860b" },
  { name: "Silver", hex: "#c0c0c0" },
  { name: "Red", hex: "#cc0000" },
  { name: "Blue", hex: "#000080" },
  { name: "Green", hex: "#228b22" },
  { name: "Pink", hex: "#ffb6c1" },
  { name: "Nude", hex: "#e8c9b6" },
  { name: "Burgundy", hex: "#800020" },
];

const SIZES = [
  "XS", "S", "M", "L", "XL",
  "35", "36", "37", "38", "39", "40", "41",
  "Small", "Medium", "Large", "One Size",
];

const PRICE_PRESETS = [
  { label: "Under PKR 50,000", min: 0, max: 50000 },
  { label: "PKR 50K – PKR 150K", min: 50000, max: 150000 },
  { label: "PKR 150K – PKR 300K", min: 150000, max: 300000 },
  { label: "PKR 300K+", min: 300000, max: 600000 },
];

interface FilterState {
  categories: string[];
  brands: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  search: string;
}

interface ShopFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
  totalProducts: number;
  filteredCount: number;
}

const PRICE_MIN = 0;
const PRICE_MAX = 600000;

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-light-gray/50 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3.5 text-left group"
      >
        <span className="text-xs font-semibold text-dark uppercase tracking-[0.15em]">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-medium-gray transition-transform duration-300 group-hover:text-dark",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-1.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ShopFilters({
  filters,
  onFilterChange,
  onClose,
  isMobile,
  totalProducts,
  filteredCount,
}: ShopFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const [pricePreset, setPricePreset] = useState<string | null>(null);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const updateFilter = useCallback(
    (key: keyof FilterState, value: unknown) => {
      onFilterChange({ ...filters, [key]: value });
    },
    [filters, onFilterChange]
  );

  const toggleArrayFilter = useCallback(
    (key: "categories" | "brands" | "colors" | "sizes", value: string) => {
      const current = filters[key];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateFilter(key, updated);
    },
    [filters, updateFilter]
  );

  const clearAllFilters = () => {
    const reset: FilterState = {
      categories: [],
      brands: [],
      colors: [],
      sizes: [],
      priceRange: [PRICE_MIN, PRICE_MAX],
      search: "",
    };
    onFilterChange(reset);
    setSearchInput("");
    setPricePreset(null);
  };

  const handlePricePreset = (preset: { label: string; min: number; max: number }) => {
    setPricePreset(preset.label);
    updateFilter("priceRange", [preset.min, preset.max]);
  };

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    filters.sizes.length +
    (filters.priceRange[0] > PRICE_MIN || filters.priceRange[1] < PRICE_MAX ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-light-gray/50 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold text-dark uppercase tracking-[0.15em]">
            Filters
          </span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-gold text-white text-[9px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-[10px] text-gold hover:text-gold-dark transition-colors font-medium"
            >
              <RotateCcw className="h-3 w-3" />
              Clear
            </button>
          )}
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-lighter-gray rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-dark" />
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="px-5 pt-4 pb-2 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-medium-gray" />
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateFilter("search", searchInput);
            }}
            onBlur={() => updateFilter("search", searchInput)}
            className="w-full h-9 pl-9 pr-8 text-xs bg-lighter-gray rounded-lg border-0 text-dark placeholder:text-medium-gray/60 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput("");
                updateFilter("search", "");
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2"
            >
              <X className="h-3 w-3 text-medium-gray hover:text-dark" />
            </button>
          )}
        </div>
      </div>

      {/* Product count */}
      <div className="px-5 pb-3 shrink-0">
        <p className="text-[10px] text-medium-gray">
          <span className="text-dark font-medium">{filteredCount}</span> results
        </p>
      </div>

      {/* Filter sections */}
      <div className="flex-1 overflow-y-auto px-5 scrollbar-none" style={{ scrollbarWidth: "none" }}>
        <FilterSection title="Category">
          <div className="space-y-1">
            {CATEGORIES.map((cat) => (
              <Checkbox
                key={cat.slug}
                id={`cat-${cat.slug}`}
                checked={filters.categories.includes(cat.slug)}
                onCheckedChange={() => toggleArrayFilter("categories", cat.slug)}
                label={cat.name}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Brand">
          <div className="space-y-1">
            {BRANDS.map((brand) => (
              <Checkbox
                key={brand.slug}
                id={`brand-${brand.slug}`}
                checked={filters.brands.includes(brand.slug)}
                onCheckedChange={() => toggleArrayFilter("brands", brand.slug)}
                label={brand.name}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price Range">
          <div className="space-y-1.5">
            {PRICE_PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePricePreset(preset)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-200",
                  pricePreset === preset.label
                    ? "bg-dark text-white font-medium"
                    : "text-dark/70 hover:bg-lighter-gray hover:text-dark"
                )}
              >
                {preset.label}
              </button>
            ))}
            <button
              onClick={() => {
                setPricePreset(null);
                updateFilter("priceRange", [PRICE_MIN, PRICE_MAX]);
              }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-200",
                pricePreset === null && (filters.priceRange[0] === PRICE_MIN && filters.priceRange[1] === PRICE_MAX)
                  ? "bg-dark text-white font-medium"
                  : "text-dark/70 hover:bg-lighter-gray hover:text-dark"
              )}
            >
              All Prices
            </button>
          </div>
        </FilterSection>

        <FilterSection title="Color">
          <div className="flex flex-wrap gap-2.5">
            {COLORS.map((color) => {
              const isSelected = filters.colors.includes(color.name.toLowerCase());
              return (
                <button
                  key={color.name}
                  onClick={() => toggleArrayFilter("colors", color.name.toLowerCase())}
                  className={cn(
                    "relative w-7 h-7 rounded-full border-2 transition-all duration-200",
                    isSelected
                      ? "border-gold scale-110 shadow-md"
                      : "border-border hover:border-medium-gray"
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                >
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={color.name.toLowerCase() === "white" ? "#1a1a1a" : "white"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {COLORS.map((color) => {
              const isSelected = filters.colors.includes(color.name.toLowerCase());
              return (
                <button
                  key={color.name}
                  onClick={() => toggleArrayFilter("colors", color.name.toLowerCase())}
                  className={cn(
                    "text-[10px] px-2 py-1 rounded-md transition-all",
                    isSelected
                      ? "bg-dark text-white font-medium"
                      : "text-medium-gray hover:text-dark hover:bg-lighter-gray"
                  )}
                >
                  {color.name}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Size">
          <div className="flex flex-wrap gap-1.5">
            {SIZES.map((size) => {
              const isSelected = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => toggleArrayFilter("sizes", size)}
                  className={cn(
                    "min-w-[2.2rem] h-8 px-2.5 text-[10px] font-medium rounded-lg border transition-all duration-200",
                    isSelected
                      ? "bg-dark text-white border-dark"
                      : "bg-white text-dark/70 border-border hover:border-gold/30 hover:bg-lighter-gray"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </FilterSection>
      </div>

      {isMobile && (
        <div className="p-4 border-t border-light-gray/50 shrink-0">
          <button
            onClick={onClose}
            className="w-full h-10 bg-dark text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-dark-gray transition-all duration-300"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
