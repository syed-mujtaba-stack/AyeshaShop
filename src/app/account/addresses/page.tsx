"use client";

import { useState } from "react";
import { currentCustomer } from "@/data/customers";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, Phone, Edit, Trash2, Plus, Check } from "lucide-react";
import type { Address } from "@/types";

const initialAddresses = currentCustomer.addresses;

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);

  const setDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-dark">Saved Addresses</h1>
          <p className="text-medium-gray text-sm mt-1">
            {addresses.length} address{addresses.length !== 1 && "es"}
          </p>
        </div>
        <Button variant="gold" size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <MapPin className="w-10 h-10 text-blue-300" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-dark mb-1">
              No addresses saved
            </h3>
            <p className="text-medium-gray text-sm mb-6 text-center max-w-sm">
              Add a shipping address to make checkout faster and easier.
            </p>
            <Button variant="gold" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card
              key={address.id}
              className={cn(
                "relative transition-all duration-300",
                address.isDefault && "border-gold/40 ring-1 ring-gold/20"
              )}
            >
              <CardContent className="p-5">
                {address.isDefault && (
                  <span className="absolute top-3 right-3 bg-gold/10 text-gold text-[10px] font-semibold px-2 py-0.5 rounded-full border border-gold/20 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Default
                  </span>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-lighter-gray flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Home className="w-5 h-5 text-medium-gray" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-dark">
                      {address.fullName}
                    </p>
                    <p className="text-sm text-medium-gray mt-1">
                      {address.street}
                    </p>
                    <p className="text-sm text-medium-gray">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="text-sm text-medium-gray">
                      {address.country}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-dark mt-2">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{address.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDefault(address.id)}
                      className="text-xs"
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Set Default
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-xs text-gold">
                    <Edit className="w-3.5 h-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-error"
                    onClick={() => deleteAddress(address.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}