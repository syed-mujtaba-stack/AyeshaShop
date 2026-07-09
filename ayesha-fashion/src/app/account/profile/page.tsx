"use client";

import { useState } from "react";
import { currentCustomer } from "@/data/customers";
import { getInitials } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Calendar, Camera, Lock, Save } from "lucide-react";

const customer = currentCustomer;

export default function ProfilePage() {
  const [form, setForm] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    dateOfBirth: customer.dateOfBirth
      ? customer.dateOfBirth instanceof Date
        ? customer.dateOfBirth.toISOString().split("T")[0]
        : new Date(customer.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: customer.gender || "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-dark">Profile Settings</h1>
      </div>

      {/* Avatar Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center text-gold font-heading font-bold text-2xl overflow-hidden">
                {customer.avatar ? (
                  <img
                    src={customer.avatar}
                    alt={customer.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(`${customer.firstName} ${customer.lastName}`)
                )}
              </div>
              <button className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
            <div>
              <p className="font-heading font-semibold text-dark text-lg">
                {customer.firstName} {customer.lastName}
              </p>
              <p className="text-sm text-medium-gray">{customer.email}</p>
              <Button variant="secondary" size="sm" className="mt-2">
                <Camera className="w-4 h-4 mr-1.5" />
                Change Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Edit Profile Form */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-gold" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  icon={<User className="w-4 h-4" />}
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  icon={<User className="w-4 h-4" />}
                />
              </div>
              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                icon={<Mail className="w-4 h-4" />}
              />
              <Input
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                icon={<Phone className="w-4 h-4" />}
              />
              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
                icon={<Calendar className="w-4 h-4" />}
              />
              <div className="w-full">
                <label className="block text-sm font-medium text-dark mb-1.5">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:border-gold transition-all duration-200 hover:border-gold/30"
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <Button type="submit" variant="gold" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="w-5 h-5 text-gold" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="Current Password"
                name="current"
                type="password"
                value={passwords.current}
                onChange={handlePasswordChange}
                icon={<Lock className="w-4 h-4" />}
              />
              <Input
                label="New Password"
                name="new"
                type="password"
                value={passwords.new}
                onChange={handlePasswordChange}
                icon={<Lock className="w-4 h-4" />}
              />
              <Input
                label="Confirm New Password"
                name="confirm"
                type="password"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                icon={<Lock className="w-4 h-4" />}
              />
              <Button type="submit" variant="gold" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}