"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Landmark,
  Banknote,
  ArrowRight,
  ChevronRight,
  Shield,
  MapPin,
  Check,
  Truck,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentMethod } from "@/types";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "@/constants";

type FormStep = "shipping" | "payment" | "review";

interface FormData {
  email: string;
  billingFullName: string;
  billingPhone: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  sameAsBilling: boolean;
  shippingFullName: string;
  shippingPhone: string;
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
  notes: string;
}

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  label: string;
  icon: typeof CreditCard;
  description: string;
}[] = [
  {
    id: "credit-card",
    label: "Credit / Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, and local cards",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: Banknote,
    description: "Pay when your order arrives",
  },
  {
    id: "bank-transfer",
    label: "Bank Transfer",
    icon: Landmark,
    description: "Direct transfer to our account",
  },
];

const defaultForm: FormData = {
  email: "",
  billingFullName: "",
  billingPhone: "",
  billingStreet: "",
  billingCity: "",
  billingState: "",
  billingZip: "",
  billingCountry: "Pakistan",
  sameAsBilling: true,
  shippingFullName: "",
  shippingPhone: "",
  shippingStreet: "",
  shippingCity: "",
  shippingState: "",
  shippingZip: "",
  shippingCountry: "Pakistan",
  paymentMethod: "credit-card",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvc: "",
  notes: "",
};

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const [step, setStep] = useState<FormStep>("shipping");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>(defaultForm);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handlePlaceOrder() {
    setLoading(true);
    setTimeout(() => {
      const orderNumber = `AF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`;
      clearCart();
      setLoading(false);
      sessionStorage.setItem(
        "ayesha-last-order",
        JSON.stringify({
          orderNumber,
          total,
          subtotal,
          shipping,
          paymentMethod: form.paymentMethod,
          createdAt: new Date().toISOString(),
        })
      );
      router.push("/checkout/success");
    }, 2000);
  }

  const steps: { key: FormStep; label: string }[] = [
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
  ];

  const stepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          {steps.map((s, i) => {
            const done = i < stepIndex;
            const active = i === stepIndex;
            return (
              <div key={s.key} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (i <= stepIndex) setStep(s.key);
                  }}
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer",
                    active ? "text-gold" : done ? "text-success" : "text-medium-gray"
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold border-2 transition-colors",
                      active
                        ? "border-gold bg-gold text-white"
                        : done
                        ? "border-success bg-success text-white"
                        : "border-light-gray text-medium-gray"
                    )}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={cn("w-8 h-px mx-1", done ? "bg-success" : "bg-light-gray")}
                  />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {step === "shipping" && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-xl border border-border p-6 space-y-5"
            >
              <h3 className="font-heading text-lg font-semibold text-dark flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                Billing Address
              </h3>

              <Input
                label="Email Address"
                type="email"
                placeholder="ayesha@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Ayesha Khan"
                  value={form.billingFullName}
                  onChange={(e) => update("billingFullName", e.target.value)}
                />
                <Input
                  label="Phone Number"
                  placeholder="+92 300 1234567"
                  value={form.billingPhone}
                  onChange={(e) => update("billingPhone", e.target.value)}
                />
              </div>

              <Input
                label="Street Address"
                placeholder="12-B, Luxury Heights, Main Boulevard"
                value={form.billingStreet}
                onChange={(e) => update("billingStreet", e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="City"
                  placeholder="Lahore"
                  value={form.billingCity}
                  onChange={(e) => update("billingCity", e.target.value)}
                />
                <Input
                  label="State"
                  placeholder="Punjab"
                  value={form.billingState}
                  onChange={(e) => update("billingState", e.target.value)}
                />
                <Input
                  label="ZIP Code"
                  placeholder="54000"
                  value={form.billingZip}
                  onChange={(e) => update("billingZip", e.target.value)}
                />
              </div>

              <Input
                label="Country"
                value={form.billingCountry}
                onChange={(e) => update("billingCountry", e.target.value)}
              />

              <div className="border-t border-border pt-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.sameAsBilling}
                    onChange={(e) => update("sameAsBilling", e.target.checked)}
                    className="w-4 h-4 rounded border-light-gray text-gold focus:ring-gold/30"
                  />
                  <span className="text-sm text-dark group-hover:text-gold transition-colors">
                    Ship to same address
                  </span>
                </label>
              </div>

              {!form.sameAsBilling && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="border-t border-border pt-5 space-y-5"
                >
                  <h3 className="font-heading text-lg font-semibold text-dark flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gold" />
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="Ayesha Khan"
                      value={form.shippingFullName}
                      onChange={(e) => update("shippingFullName", e.target.value)}
                    />
                    <Input
                      label="Phone Number"
                      placeholder="+92 300 1234567"
                      value={form.shippingPhone}
                      onChange={(e) => update("shippingPhone", e.target.value)}
                    />
                  </div>
                  <Input
                    label="Street Address"
                    placeholder="12-B, Luxury Heights, Main Boulevard"
                    value={form.shippingStreet}
                    onChange={(e) => update("shippingStreet", e.target.value)}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      placeholder="Lahore"
                      value={form.shippingCity}
                      onChange={(e) => update("shippingCity", e.target.value)}
                    />
                    <Input
                      label="State"
                      placeholder="Punjab"
                      value={form.shippingState}
                      onChange={(e) => update("shippingState", e.target.value)}
                    />
                    <Input
                      label="ZIP Code"
                      placeholder="54000"
                      value={form.shippingZip}
                      onChange={(e) => update("shippingZip", e.target.value)}
                    />
                  </div>
                  <Input
                    label="Country"
                    value={form.shippingCountry}
                    onChange={(e) => update("shippingCountry", e.target.value)}
                  />
                </motion.div>
              )}

              <div className="flex justify-end pt-2">
                <Button variant="primary" size="lg" onClick={() => setStep("payment")}>
                  Continue to Payment
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-xl border border-border p-6 space-y-6"
            >
              <h3 className="font-heading text-lg font-semibold text-dark flex items-center gap-2">
                <Shield className="w-4 h-4 text-gold" />
                Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PAYMENT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const selected = form.paymentMethod === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => update("paymentMethod", opt.id)}
                      className={cn(
                        "relative flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                        selected
                          ? "border-gold bg-gold/5 shadow-sm"
                          : "border-border bg-white hover:border-gold/30 hover:bg-lighter-gray"
                      )}
                    >
                      {selected && (
                        <span className="absolute top-2 right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </span>
                      )}
                      <Icon className={cn("w-6 h-6 mb-2", selected ? "text-gold" : "text-medium-gray")} />
                      <span className={cn("text-xs font-medium", selected ? "text-gold" : "text-dark")}>
                        {opt.label}
                      </span>
                      <span className="text-[10px] text-medium-gray mt-1 leading-tight">
                        {opt.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              {form.paymentMethod === "credit-card" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 pt-2"
                >
                  <Input
                    label="Card Number"
                    placeholder="4242 4242 4242 4242"
                    value={form.cardNumber}
                    onChange={(e) => update("cardNumber", e.target.value)}
                  />
                  <Input
                    label="Cardholder Name"
                    placeholder="Ayesha Khan"
                    value={form.cardName}
                    onChange={(e) => update("cardName", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={form.cardExpiry}
                      onChange={(e) => update("cardExpiry", e.target.value)}
                    />
                    <Input
                      label="CVC"
                      placeholder="123"
                      value={form.cardCvc}
                      onChange={(e) => update("cardCvc", e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {form.paymentMethod === "bank-transfer" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-lighter-gray rounded-xl p-4 space-y-1 text-sm"
                >
                  <p className="font-medium text-dark">Bank Account Details</p>
                  <p className="text-medium-gray">Bank: HBL Pakistan</p>
                  <p className="text-medium-gray">Account: 1234-5678-9012-3456</p>
                  <p className="text-medium-gray">IBAN: PK36 HBLB 1234 5678 9012 3456</p>
                </motion.div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep("shipping")}
                  className="text-sm text-medium-gray hover:text-dark transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to shipping
                </button>
                <Button variant="primary" size="lg" onClick={() => setStep("review")}>
                  Review Order
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-xl border border-border p-6 space-y-6"
            >
              <h3 className="font-heading text-lg font-semibold text-dark">Review Your Order</h3>

              <div className="bg-lighter-gray rounded-xl p-4 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-dark">{form.billingFullName || "Full Name"}</p>
                    <p className="text-medium-gray">{form.billingStreet}</p>
                    <p className="text-medium-gray">
                      {form.billingCity}, {form.billingState} {form.billingZip}
                    </p>
                    <p className="text-medium-gray">{form.billingCountry}</p>
                    <p className="text-medium-gray">{form.billingPhone}</p>
                  </div>
                </div>
                {!form.sameAsBilling && (
                  <div className="border-t border-border pt-2 mt-2">
                    <p className="text-xs text-medium-gray font-medium uppercase tracking-wider">
                      Shipping Address
                    </p>
                    <p className="text-medium-gray mt-1">
                      {form.shippingFullName}, {form.shippingStreet}, {form.shippingCity}
                    </p>
                    <p className="text-medium-gray">
                      {form.shippingState} {form.shippingZip}, {form.shippingCountry}
                    </p>
                    <p className="text-medium-gray">{form.shippingPhone}</p>
                  </div>
                )}
              </div>

              <div className="text-sm space-y-1">
                <p className="text-medium-gray">
                  Email: <span className="text-dark">{form.email}</span>
                </p>
                <p className="text-medium-gray">
                  Payment:{" "}
                  <span className="text-dark">
                    {PAYMENT_OPTIONS.find((o) => o.id === form.paymentMethod)?.label}
                  </span>
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <label className="block text-sm text-medium-gray mb-2">Order Notes (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Special delivery instructions..."
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-dark placeholder:text-medium-gray transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:border-gold hover:border-gold/30 resize-none"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep("payment")}
                  className="text-sm text-medium-gray hover:text-dark transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to payment
                </button>
                <Button variant="primary" size="lg" loading={loading} onClick={handlePlaceOrder}>
                  Place Order &mdash; {formatPrice(total)}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl border border-border p-6 sticky top-24 space-y-4">
          <h3 className="font-heading text-lg font-semibold text-dark">Order Summary</h3>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div
                  className="w-14 h-16 rounded-lg bg-cover bg-center shrink-0 border border-border"
                  style={{ backgroundImage: `url(${item.product.images[0]})` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-dark truncate">{item.product.name}</p>
                  <p className="text-[10px] text-medium-gray">
                    {item.selectedColor.name} / {item.selectedSize.name}
                  </p>
                  <p className="text-xs font-semibold text-dark mt-0.5">
                    {formatPrice(item.product.price)} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-medium-gray">Subtotal</span>
              <span className="font-medium text-dark">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-medium-gray">Shipping</span>
              <span className={cn("font-medium", shipping === 0 ? "text-success" : "text-dark")}>
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold border-t border-border pt-2">
              <span className="text-dark">Total</span>
              <span className="text-gold">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-medium-gray pt-1">
            <Shield className="w-3 h-3" />
            <span>Secure checkout with SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}