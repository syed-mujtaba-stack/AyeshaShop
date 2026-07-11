import Link from "next/link";
import { SITE_NAME } from "@/constants";
import { ArrowLeft, Search, ShoppingBag } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <span className="font-heading text-[150px] md:text-[200px] leading-none text-gold/10 font-bold select-none">
            404
          </span>
        </div>

        <h1 className="font-heading text-4xl md:text-5xl text-dark font-bold mb-4">
          Page Not Found
        </h1>

        <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />

        <p className="text-medium-gray text-lg mb-8 max-w-md mx-auto leading-relaxed">
          The page you are looking for may have been moved, deleted, or never existed.
          Let us help you find your way.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-lg font-medium hover:bg-dark-gray transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-lg font-medium hover:bg-gold-dark transition-colors"
          >
            <ShoppingBag className="w-4 h-4" /> Shop Collections
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-white text-dark border border-border px-6 py-3 rounded-lg font-medium hover:border-gold/30 hover:text-gold transition-colors"
          >
            <Search className="w-4 h-4" /> Search
          </Link>
        </div>

        <div className="pt-8 border-t border-border">
          <Link href="/" className="inline-block">
            <span className="font-heading text-2xl text-dark font-bold tracking-widest">{SITE_NAME}</span>
          </Link>
          <p className="text-xs text-medium-gray mt-2">Luxury Redefined</p>
        </div>
      </div>
    </div>
  );
}
