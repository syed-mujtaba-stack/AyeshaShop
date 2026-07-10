"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/faq";
import { Search, ChevronDown, ChevronRight, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const categories = useMemo(() => {
    const cats = [...new Set(faqs.map((f) => f.category))];
    return ["All", ...cats];
  }, []);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <>
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block text-gold-light text-sm tracking-[0.3em] uppercase mb-4">Help Center</span>
            <h1 className="font-heading text-4xl md:text-6xl text-white font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Everything you need to know about shopping with us.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 h-12 rounded-xl border border-border bg-white text-sm text-dark placeholder:text-medium-gray transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:border-gold hover:border-gold/30"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gold text-white shadow-md"
                    : "bg-lighter-gray text-dark hover:bg-gold/10 hover:text-gold border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-medium-gray/30 mx-auto mb-4" />
              <h3 className="font-heading text-xl text-dark font-semibold mb-2">No results found</h3>
              <p className="text-medium-gray">Try a different search term or browse all categories.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openItems.has(faq.id);
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    className="border border-border rounded-xl bg-white overflow-hidden hover:border-gold/20 transition-colors"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="text-dark font-medium pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="px-6 pb-5 pt-0 text-medium-gray leading-relaxed text-sm border-t border-border">
                        <div className="pt-4">{faq.answer}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          <div className="mt-16 text-center bg-off-white rounded-2xl p-10 border border-border">
            <h3 className="font-heading text-2xl text-dark font-semibold mb-3">Still have questions?</h3>
            <p className="text-medium-gray mb-6 max-w-md mx-auto">
              Our customer service team is available to help you with any additional inquiries.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Contact Support <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
