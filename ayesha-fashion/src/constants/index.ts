export const SITE_NAME = "AYESHA";
export const SITE_FULL_NAME = "AYESHA FASHION STYLE";
export const SITE_TAGLINE = "Luxury Redefined";
export const SITE_DESCRIPTION = "Premium Luxury Women's Fashion Ecommerce Platform";
export const SITE_URL = "https://ayesha-fashion.com";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Luxury Collection", href: "/luxury-collection" },
  { label: "Offers", href: "/offers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export const CATEGORIES = [
  { name: "Luxury Dresses", slug: "luxury-dresses", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=85" },
  { name: "Designer Bags", slug: "designer-bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=85" },
  { name: "Fine Jewelry", slug: "fine-jewelry", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85" },
  { name: "Premium Beauty", slug: "premium-beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=85" },
  { name: "Luxury Perfumes", slug: "luxury-perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=85" },
  { name: "Designer Shoes", slug: "designer-shoes", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=85" },
];

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
  { label: "Most Popular", value: "popular" },
];

export const PRICE_RANGES = [
  { label: "Under PKR 5,000", min: 0, max: 5000 },
  { label: "PKR 5,000 - PKR 15,000", min: 5000, max: 15000 },
  { label: "PKR 15,000 - PKR 30,000", min: 15000, max: 30000 },
  { label: "PKR 30,000 - PKR 50,000", min: 30000, max: 50000 },
  { label: "Above PKR 50,000", min: 50000, max: Infinity },
];

export const SHIPPING_COST = 499;
export const FREE_SHIPPING_THRESHOLD = 5000;

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export const PAYMENT_METHODS = [
  { id: "credit-card", label: "Credit / Debit Card", icon: "credit-card" },
  { id: "cod", label: "Cash on Delivery", icon: "banknote" },
  { id: "bank-transfer", label: "Bank Transfer", icon: "building-bank" },
] as const;
