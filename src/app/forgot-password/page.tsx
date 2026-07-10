"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_NAME, SITE_TAGLINE } from "@/constants";
import { useAuth } from "@/hooks/use-auth";

export default function ForgotPasswordPage() {
  const { loading, error, resetPassword, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const validate = () => {
    if (!email) { setFieldError("Email is required"); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setFieldError("Please enter a valid email"); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError("");
    clearError();
    if (!validate()) return;
    const success = await resetPassword(email);
    if (success) setIsSuccess(true);
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-dark via-dark-gray relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold rounded-full blur-[128px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-12"
        >
          <h2 className="font-heading text-5xl text-white mb-4 tracking-tight">{SITE_NAME}</h2>
          <p className="text-2xl font-light text-gold mb-6 font-heading italic">{SITE_TAGLINE}</p>
          <div className="w-16 h-px bg-gold/50 mx-auto mb-6" />
          <p className="text-white/60 max-w-sm mx-auto leading-relaxed">
            We&apos;ll help you get back to shopping luxury in no time.
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block mb-6">
              <h1 className="font-heading text-3xl tracking-[0.3em] text-gold">{SITE_NAME}</h1>
            </Link>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-heading text-3xl text-dark mb-1">Forgot Password?</h2>
                  <p className="text-dark-gray mb-8">
                    No worries. Enter your email and we&apos;ll send you a reset link.
                  </p>

                  {error && (
                    <div className="mb-5 p-3 rounded-lg bg-error/10 border border-error/20 text-sm text-error">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="your@email.com"
                      icon={<Mail className="h-4 w-4" />}
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setFieldError(""); clearError(); }}
                      error={fieldError}
                    />

                    <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                      Send Reset Link
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </form>

                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm text-dark-gray hover:text-gold transition-colors mt-6"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-success" />
                  </div>
                  <h2 className="font-heading text-3xl text-dark mb-2">Check Your Email</h2>
                  <p className="text-dark-gray mb-2 max-w-sm mx-auto">
                    We&apos;ve sent a password reset link to
                  </p>
                  <p className="font-medium text-dark mb-6">{email}</p>
                  <div className="w-12 h-px bg-border mx-auto mb-6" />
                  <p className="text-sm text-dark-gray mb-8">
                    Didn&apos;t receive the email? Check your spam folder or{" "}
                    <button
                      onClick={() => { setIsSuccess(false); setEmail(""); }}
                      className="text-gold hover:text-gold-dark underline-offset-4 hover:underline font-medium"
                    >
                      try another email
                    </button>
                  </p>
                  <Link href="/login">
                    <Button variant="secondary" className="px-8">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Login
                    </Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
