"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_NAME, SITE_TAGLINE } from "@/constants";
import { useAuth } from "@/hooks/use-auth";

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading, error, signUp, signInWithGoogle, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) router.push("/account");
  }, [user, router]);

  useEffect(() => {
    clearError();
  }, [form.email, form.password, clearError]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Please enter a valid email";
    if (!form.phone) errs.phone = "Phone number is required";
    else if (!/^[\d\s\-+()]{7,}$/.test(form.phone)) errs.phone = "Please enter a valid phone number";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8) errs.password = "Password must be at least 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password))
      errs.password = "Must include uppercase, lowercase, and a number";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!agreedToTerms) return;
    const displayName = `${form.firstName} ${form.lastName}`;
    const success = await signUp(form.email, form.password, displayName);
    if (success) router.push("/account");
  };

  const handleGoogleSignIn = async () => {
    const success = await signInWithGoogle();
    if (success) router.push("/account");
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-dark via-dark-gray relative items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-80 h-80 bg-gold rounded-full blur-[128px]" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-gold/30 rounded-full blur-[128px]" />
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
              Join an exclusive community of fashion connoisseurs. Discover elegance that transcends time.
            </p>
            <div className="mt-10 space-y-4 text-left max-w-xs mx-auto">
              {["Exclusive member-only collections", "Early access to new arrivals", "Complimentary personal styling", "Priority worldwide shipping"].map(
                (benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-gold" />
                    </div>
                    <span className="text-sm text-white/70">{benefit}</span>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
          <div className="w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="inline-block mb-6">
                <h1 className="font-heading text-3xl tracking-[0.3em] text-gold">{SITE_NAME}</h1>
              </Link>

              <h2 className="font-heading text-3xl text-dark mb-1">Create Account</h2>
              <p className="text-dark-gray mb-8">Join the world of luxury fashion</p>

              {error && (
                <div className="mb-5 p-3 rounded-lg bg-error/10 border border-error/20 text-sm text-error">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="Jane"
                    icon={<User className="h-4 w-4" />}
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    error={errors.firstName}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    icon={<User className="h-4 w-4" />}
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    error={errors.lastName}
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="jane@example.com"
                  icon={<Mail className="h-4 w-4" />}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+92 337 6031141"
                  icon={<Phone className="h-4 w-4" />}
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={errors.phone}
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    icon={<Lock className="h-4 w-4" />}
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    error={errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-medium-gray hover:text-dark transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    icon={<Lock className="h-4 w-4" />}
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    error={errors.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[38px] text-medium-gray hover:text-dark transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-border text-gold focus:ring-gold/30 accent-gold"
                  />
                  <span className="text-sm text-dark-gray">
                    I agree to the{" "}
                    <Link href="/terms" className="text-gold hover:text-gold-dark underline-offset-4 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-gold hover:text-gold-dark underline-offset-4 hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={!agreedToTerms}
                  className="w-full mt-2"
                >
                  Create Account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-medium-gray">or</span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign up with Google
                </Button>
              </div>

              <p className="mt-8 text-center text-sm text-dark-gray">
                Already have an account?{" "}
                <Link href="/login" className="text-gold hover:text-gold-dark font-medium underline-offset-4 hover:underline transition-all">
                  Sign In
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
