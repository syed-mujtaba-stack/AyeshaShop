"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/constants";
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit Our Store",
    details: [
      "42 Gulberg Main Boulevard",
      "Lahore, Pakistan 54000",
      "Google Maps",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [
      "+92 300 1234567",
      "+92 42 35781234",
      "Mon–Sat, 10 AM – 8 PM",
    ],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [
      "hello@ayesha-fashion.com",
      "support@ayesha-fashion.com",
      "We respond within 24 hours",
    ],
  },
  {
    icon: Clock,
    title: "Store Hours",
    details: [
      "Monday – Saturday: 10 AM – 8 PM",
      "Sunday: 12 PM – 6 PM",
      "Public Holidays: 12 PM – 5 PM",
    ],
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1606741965429-c01b4e11c201?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block text-gold-light text-sm tracking-[0.3em] uppercase mb-4">Get in Touch</span>
            <h1 className="font-heading text-4xl md:text-6xl text-white font-bold mb-4">
              Contact Us
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              We would love to hear from you. Reach out with questions, feedback, or styling inquiries.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">Send a Message</span>
              <h2 className="font-heading text-3xl text-dark font-bold mt-3 mb-8">Drop Us a Line</h2>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-success/5 border border-success/20 rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="font-heading text-2xl text-dark font-semibold mb-2">Thank You!</h3>
                  <p className="text-medium-gray">Your message has been received. We will get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    label="Subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                  <div className="w-full">
                    <label className="block text-sm font-medium text-dark mb-1.5">Message</label>
                    <textarea
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-dark placeholder:text-medium-gray transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:border-gold hover:border-gold/30 resize-none"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg">
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-8">
                {contactDetails.map((item) => (
                  <div key={item.title} className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/5 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                        <item.icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-dark mb-2">{item.title}</h3>
                        {item.details.map((line) => (
                          <p key={line} className="text-medium-gray text-sm leading-relaxed">{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-border">
                <p className="text-medium-gray text-sm mb-3">Have questions before reaching out?</p>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1 text-gold font-medium text-sm hover:underline"
                >
                  Visit our FAQ <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
