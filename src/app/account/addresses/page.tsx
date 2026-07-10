"use client";

import { useState } from "react";
import { useFirestoreAddresses } from "@/hooks/use-firestore-user";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Home, Phone, Edit, Trash2, Plus, Check, X, Loader2 } from "lucide-react";
import type { Address } from "@/types";

const emptyAddress: Omit<Address, "id"> = {
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "Pakistan",
  isDefault: false,
};

export default function AddressesPage() {
  const { addresses, loading, add, update, setDefault, remove } = useFirestoreAddresses();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Address, "id">>(emptyAddress);
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyAddress);
    setShowForm(true);
  };

  const openEdit = (address: Address) => {
    setEditingId(address.id);
    setForm({
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await update(editingId, form);
      } else {
        await add(form);
      }
      setShowForm(false);
      setForm(emptyAddress);
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await remove(id);
  };

  const handleSetDefault = async (id: string) => {
    await setDefault(id);
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
        <Button variant="gold" size="sm" className="flex items-center gap-2" onClick={openAdd}>
          <Plus className="w-4 h-4" />
          Add Address
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-dark">
                {editingId ? "Edit Address" : "New Address"}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="p-1 rounded-lg hover:bg-lighter-gray transition-colors"
              >
                <X className="w-5 h-5 text-medium-gray" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} icon={<Phone className="w-4 h-4" />} />
                <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} icon={<Phone className="w-4 h-4" />} />
              </div>
              <Input label="Street Address" name="street" value={form.street} onChange={handleChange} icon={<Home className="w-4 h-4" />} />
              <div className="grid sm:grid-cols-3 gap-4">
                <Input label="City" name="city" value={form.city} onChange={handleChange} />
                <Input label="State" name="state" value={form.state} onChange={handleChange} />
                <Input label="ZIP Code" name="zipCode" value={form.zipCode} onChange={handleChange} />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" variant="gold" size="sm" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Check className="w-4 h-4 mr-1.5" />}
                  {editingId ? "Save Changes" : "Add Address"}
                </Button>
                <Button type="button" variant="secondary" size="sm" onClick={() => { setShowForm(false); setEditingId(null); }}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-border bg-white p-5 space-y-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-lighter-gray" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-lighter-gray rounded w-24" />
                  <div className="h-2 bg-lighter-gray rounded w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : addresses.length === 0 ? (
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
            <Button variant="gold" className="flex items-center gap-2" onClick={openAdd}>
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
                      onClick={() => handleSetDefault(address.id)}
                      className="text-xs"
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Set Default
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-xs text-gold" onClick={() => openEdit(address)}>
                    <Edit className="w-3.5 h-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-error"
                    onClick={() => handleDelete(address.id)}
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
