"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Gift,
  TicketPercent,
  Crown,
  Timer,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Star,
} from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface CouponOffer {
  id: string;
  code: string;
  discount: string;
  description: string;
  minPurchase: string;
  validUntil: string;
  isActive: boolean;
}

const activeCoupons: CouponOffer[] = [
  {
    id: "coup-1",
    code: "LUXE20",
    discount: "20% OFF",
    description: "On all luxury evening gowns and cocktail dresses",
    minPurchase: "Min. purchase PKR 50,000",
    validUntil: "August 15, 2026",
    isActive: true,
  },
  {
    id: "coup-2",
    code: "WELCOME15",
    discount: "15% OFF",
    description: "For new customers on your first order",
    minPurchase: "Min. purchase PKR 25,000",
    validUntil: "September 1, 2026",
    isActive: true,
  },
  {
    id: "coup-3",
    code: "FREESHIP",
    discount: "Free Shipping",
    description: "Complimentary shipping on all orders",
    minPurchase: "On orders above PKR 50,000",
    validUntil: "Ongoing",
    isActive: true,
  },
  {
    id: "coup-4",
    code: "JEWEL10",
    discount: "10% OFF",
    description: "On all fine jewelry and watch collections",
    minPurchase: "Min. purchase PKR 100,000",
    validUntil: "August 30, 2026",
    isActive: true,
  },
];

const tierBenefits = [
  {
    icon: Star,
    name: "Silver",
    minSpend: "PKR 100,000",
    color: "text-gray-400",
    bgColor: "bg-gray-50 border-gray-200",
    benefits: ["Early access to sales", "Birthday gift", "Free shipping"],
  },
  {
    icon: Crown,
    name: "Gold",
    minSpend: "PKR 300,000",
    color: "text-gold",
    bgColor: "bg-gold/5 border-gold/20",
    benefits: [
      "All Silver benefits",
      "15% birthday discount",
      "Personal stylist consultation",
      "Exclusive event invitations",
    ],
  },
  {
    icon: DiamondIcon,
    name: "Platinum",
    minSpend: "PKR 700,000",
    color: "text-blue-400",
    bgColor: "bg-blue-50 border-blue-200",
    benefits: [
      "All Gold benefits",
      "25% birthday discount",
      "Private shopping appointments",
      "Complimentary gift wrapping",
      "Priority access to new collections",
    ],
  },
];

function DiamondIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 8.88L4.1 15.1a1 1 0 0 0 .96.77h13.88a1 1 0 0 0 .96-.77l1.6-6.22Z" />
      <path d="M2.5 8.88h19" />
      <path d="M12 2.5v6.38" />
      <path d="M7.5 5.5l1.5 3.38" />
      <path d="M16.5 5.5l-1.5 3.38" />
    </svg>
  );
}

function CouponCard({ coupon }: { coupon: CouponOffer }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative bg-white rounded-xl border border-light-gray overflow-hidden group hover:shadow-md transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-medium-gray uppercase tracking-wider mb-1">
              Coupon Code
            </p>
            <p className="font-heading text-xl md:text-2xl font-bold text-dark">
              {coupon.discount}
            </p>
          </div>
          <Badge variant="new" size="sm">
            Active
          </Badge>
        </div>
        <p className="text-sm text-dark mb-3">{coupon.description}</p>
        <div className="flex items-center gap-1 text-xs text-medium-gray mb-4">
          <Timer className="h-3 w-3" />
          <span>Valid until {coupon.validUntil}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 bg-lighter-gray rounded-lg px-3 py-2 flex items-center justify-between">
            <code className="text-sm font-mono font-bold text-dark tracking-wider">
              {coupon.code}
            </code>
            <button
              onClick={handleCopy}
              className="text-gold hover:text-gold-dark transition-colors"
              aria-label={copied ? "Copied" : "Copy code"}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <p className="text-xs text-medium-gray mt-2">{coupon.minPurchase}</p>
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function OffersPage() {
  const featured = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-off-white">
      <div className="relative overflow-hidden bg-gradient-to-br from-dark via-dark to-dark-gray">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/80 to-dark/90" />
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
              <span className="text-white/80">Offers</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 rounded-full text-gold text-xs font-medium mb-4">
              <Gift className="h-3.5 w-3.5" />
              Exclusive Deals
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              Offers & Promotions
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Discover exclusive offers, limited-time promotions, and loyalty
              rewards reserved for our esteemed clientele.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl border border-gold/20 p-6 md:p-10"
        >
          <div className="flex items-start md:items-center gap-4 md:gap-6 flex-col md:flex-row">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold/20 shrink-0">
              <TicketPercent className="h-7 w-7 text-gold" />
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-dark mb-1">
                Summer Luxury Sale
              </h2>
              <p className="text-medium-gray text-sm">
                Enjoy up to 30% off on select collections. Use code{" "}
                <span className="font-mono font-bold text-gold bg-gold/10 px-1.5 py-0.5 rounded">
                  SUMMER30
                </span>{" "}
                at checkout. Limited time only.
              </p>
            </div>
            <Link href="/shop">
              <Button variant="gold" size="lg" className="shrink-0">
                Shop the Sale
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark">
            Active Coupons
          </h2>
          <p className="text-medium-gray text-sm mt-1">
            Apply these codes at checkout to unlock exclusive savings
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {activeCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </section>

      <section className="border-t border-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <Crown className="h-6 w-6 text-gold" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark">
                AYESHA Loyalty Program
              </h2>
            </div>
            <p className="text-medium-gray text-sm max-w-xl">
              Join our exclusive loyalty program and unlock a world of
              privileges, from early access to personal styling sessions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {tierBenefits.map((tier) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`rounded-xl border p-6 ${tier.bgColor}`}
              >
                <tier.icon
                  className={`h-8 w-8 mb-4 ${tier.color}`}
                />
                <h3 className="font-heading text-xl font-bold text-dark mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-medium-gray mb-4">
                  Min. annual spend: {tier.minSpend}
                </p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-sm text-dark"
                    >
                      <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center bg-white rounded-2xl border border-light-gray p-8 md:p-12"
          >
            <p className="text-sm text-medium-gray mb-2">Already a member?</p>
            <p className="text-dark text-sm mb-6">
              Sign in to check your tier status and available rewards.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/account">
                <Button variant="primary">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary">Join Now</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-dark/70" />
            <div className="relative p-8 md:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="gold" size="lg" className="mb-4">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Limited Time
                </Badge>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-3">
                  Free Shipping on Orders Over {formatPrice(50000)}
                </h2>
                <p className="text-white/60 text-sm md:text-base max-w-lg mb-6">
                  Enjoy complimentary shipping on all orders above the threshold.
                  No code needed — we apply it automatically at checkout.
                </p>
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <ShoppingBag className="h-4 w-4 text-gold" />
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <CreditCard className="h-4 w-4 text-gold" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Star className="h-4 w-4 text-gold" />
                    <span>Premium packaging</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark">
              Featured on Offers
            </h2>
            <p className="text-medium-gray text-sm mt-1">
              Exclusive pieces available at special promotional prices
            </p>
          </motion.div>
          {featured.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {featured.slice(0, 4).map((product, index) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-medium-gray text-sm py-12">
              No promotional items at the moment. Check back soon.
            </p>
          )}
          <div className="mt-8 text-center">
            <Link href="/shop">
              <Button variant="gold" size="lg">
                View All Offers <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gold/5 to-gold/10 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <TicketPercent className="h-10 w-10 text-gold mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">
              Refer a Friend
            </h2>
            <p className="text-medium-gray text-sm md:text-base max-w-md mx-auto mb-8">
              Share the luxury. When you refer a friend who makes their first
              purchase, you both receive 15% off your next order.
            </p>
            <Button variant="primary" size="lg">
              Share Your Referral Link
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
