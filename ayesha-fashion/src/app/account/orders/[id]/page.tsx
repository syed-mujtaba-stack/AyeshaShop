"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { orders } from "@/data/orders";
import { formatPrice, getStatusColor, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Package,
  Truck,
  Check,
  Clock,
  CreditCard,
  MapPin,
  Phone,
  FileText,
  ShoppingBag,
} from "lucide-react";

const statusSteps: { key: string; label: string; icon: React.ElementType }[] = [
  { key: "pending", label: "Pending", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: Check },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Check },
];

function getActiveStepIndex(status: string): number {
  const orderStatusOrder = ["pending", "confirmed", "processing", "shipped", "delivered"];
  const idx = orderStatusOrder.indexOf(status);
  if (status === "cancelled") return -1;
  return idx;
}

const paymentLabels: Record<string, string> = {
  "credit-card": "Credit / Debit Card",
  cod: "Cash on Delivery",
  "bank-transfer": "Bank Transfer",
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Package className="w-16 h-16 text-light-gray mb-4" />
        <h2 className="font-heading text-xl font-semibold text-dark mb-2">Order not found</h2>
        <p className="text-medium-gray text-sm mb-6">The order you are looking for does not exist.</p>
        <Button variant="gold" onClick={() => router.push("/account/orders")}>
          Back to Orders
        </Button>
      </div>
    );
  }

  const activeStep = getActiveStepIndex(order.status);
  const isCancelled = order.status === "cancelled";

  const formattedDate = order.createdAt instanceof Date
    ? order.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1 text-sm text-medium-gray hover:text-dark transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <h1 className="font-heading text-2xl font-bold text-dark">
            Order {order.orderNumber}
          </h1>
          <p className="text-medium-gray text-sm">
            Placed on {formattedDate}
          </p>
        </div>
        <Badge className={cn("text-sm px-4 py-1.5", getStatusColor(order.status))}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      {!isCancelled && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {statusSteps.map((step, idx) => {
                const StepIcon = step.icon;
                const isCompleted = idx <= activeStep;
                const isCurrent = idx === activeStep;
                return (
                  <div key={step.key} className="flex flex-col items-center flex-1">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                        isCompleted
                          ? "bg-gold text-white shadow-md shadow-gold/20"
                          : "bg-lighter-gray text-medium-gray"
                      )}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <p
                      className={cn(
                        "text-xs mt-2 font-medium",
                        isCompleted ? "text-gold" : "text-medium-gray",
                        isCurrent && "font-bold"
                      )}
                    >
                      {step.label}
                    </p>
                    {idx < statusSteps.length - 1 && (
                      <div
                        className={cn(
                          "h-0.5 w-full mt-[-20px] ml-10 transition-all duration-500",
                          idx < activeStep ? "bg-gold" : "bg-light-gray"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold" />
                Items ({order.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-lighter-gray/50"
                >
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-dark">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-medium-gray mt-1">
                      {item.selectedColor.name} / {item.selectedSize.name} &middot; Qty:{" "}
                      {item.quantity}
                    </p>
                    <p className="text-sm font-semibold text-dark mt-2">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 text-sm text-medium-gray">
                <p className="font-medium text-dark">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <div className="flex items-center gap-1 mt-2 text-dark">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{order.shippingAddress.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-medium-gray">Subtotal</span>
                <span className="text-dark">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-medium-gray">Shipping</span>
                <span className="text-dark">
                  {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-medium-gray">Discount</span>
                  <span className="text-success">-{formatPrice(order.discount)}</span>
                </div>
              )}
              {order.tax > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-medium-gray">Tax</span>
                  <span className="text-dark">{formatPrice(order.tax)}</span>
                </div>
              )}
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-heading font-semibold text-dark">Total</span>
                <span className="font-heading font-bold text-lg text-gold">
                  {formatPrice(order.total)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gold" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-medium-gray">
                {paymentLabels[order.paymentMethod] || order.paymentMethod}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}