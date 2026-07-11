"use client";

import { useState } from "react";
import { Save, Truck, Mail, Bell, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("store");

  const sections = [
    { id: "store", label: "Store Information", icon: Receipt },
    { id: "tax", label: "Tax Settings", icon: Receipt },
    { id: "shipping", label: "Shipping Settings", icon: Truck },
    { id: "email", label: "Email Settings", icon: Mail },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark">Settings</h1>
        <p className="text-medium-gray text-sm mt-1">Manage your store configuration and preferences.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? "bg-gold text-white"
                  : "bg-white text-dark border border-border hover:border-gold/30"
              }`}
            >
              <Icon className="h-4 w-4" />
              {section.label}
            </button>
          );
        })}
      </div>

      {activeSection === "store" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Store Name" defaultValue="AYESHA FASHION STYLE" />
              <Input label="Store Email" defaultValue="hello@ayesha-fashion.com" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Phone" defaultValue="+92 300 1234567" />
              <Input label="Currency" defaultValue="PKR" />
            </div>
            <Input label="Address" defaultValue="12-B, Luxury Heights, Main Boulevard, Lahore, Punjab, Pakistan" />
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Default Language</label>
              <Select
                options={[
                  { label: "English", value: "en" },
                  { label: "Urdu", value: "ur" },
                ]}
                placeholder="English"
              />
            </div>
            <div className="pt-4">
              <Button variant="gold">
                <Save className="h-4 w-4 mr-1" /> Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === "tax" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tax Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Tax Rate (%)" defaultValue="13" type="number" />
              <Input label="Tax Name" defaultValue="Sales Tax" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" defaultChecked id="tax-inclusive" className="rounded border-border text-gold focus:ring-gold/30" />
              <label htmlFor="tax-inclusive" className="text-sm text-dark">Prices include tax</label>
            </div>
            <div className="pt-4">
              <Button variant="gold">
                <Save className="h-4 w-4 mr-1" /> Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === "shipping" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shipping Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="Standard Shipping" defaultValue="499" type="number" prefix="PKR" />
              <Input label="Free Shipping Threshold" defaultValue="5000" type="number" prefix="PKR" />
              <Input label="Express Shipping" defaultValue="1499" type="number" prefix="PKR" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Shipping Zones</label>
              <Select
                options={[
                  { label: "Pakistan (All Cities)", value: "pk-all" },
                  { label: "Lahore Only", value: "pk-lahore" },
                  { label: "Karachi Only", value: "pk-karachi" },
                  { label: "Islamabad Only", value: "pk-islamabad" },
                ]}
                placeholder="Pakistan (All Cities)"
              />
            </div>
            <div className="pt-4">
              <Button variant="gold">
                <Save className="h-4 w-4 mr-1" /> Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === "email" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Sender Name" defaultValue="AYESHA FASHION" />
              <Input label="Sender Email" defaultValue="noreply@ayesha-fashion.com" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Order Confirmation</label>
                <Select
                  options={[
                    { label: "Enabled", value: "enabled" },
                    { label: "Disabled", value: "disabled" },
                  ]}
                  placeholder="Enabled"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Shipping Updates</label>
                <Select
                  options={[
                    { label: "Enabled", value: "enabled" },
                    { label: "Disabled", value: "disabled" },
                  ]}
                  placeholder="Enabled"
                />
              </div>
            </div>
            <div className="pt-4">
              <Button variant="gold">
                <Save className="h-4 w-4 mr-1" /> Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeSection === "notifications" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "new-order", label: "New Order", desc: "When a customer places a new order" },
              { id: "low-stock", label: "Low Stock Alert", desc: "When a product reaches low stock threshold" },
              { id: "new-customer", label: "New Customer", desc: "When a new customer registers" },
              { id: "order-cancelled", label: "Order Cancelled", desc: "When an order is cancelled" },
              { id: "review", label: "New Review", desc: "When a customer submits a review" },
            ].map((notif) => (
              <div key={notif.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-dark">{notif.label}</p>
                  <p className="text-xs text-medium-gray mt-0.5">{notif.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-medium-gray">Email</label>
                  <input type="checkbox" defaultChecked className="rounded border-border text-gold focus:ring-gold/30" />
                  <label className="text-xs text-medium-gray ml-2">Push</label>
                  <input type="checkbox" defaultChecked className="rounded border-border text-gold focus:ring-gold/30" />
                </div>
              </div>
            ))}
            <div className="pt-4">
              <Button variant="gold">
                <Save className="h-4 w-4 mr-1" /> Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}