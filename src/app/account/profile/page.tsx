"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getUserProfile, updateUserProfile } from "@/lib/firestore";
import type { FirestoreUserProfile } from "@/lib/firestore";
import { getInitials } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Calendar, Camera, Lock, Save, Loader2 } from "lucide-react";
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<FirestoreUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!user) return;
    getUserProfile(user.uid).then((snap) => {
      if (snap.exists()) {
        const data = snap.data() as FirestoreUserProfile;
        setProfile(data);
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          dateOfBirth: data.dateOfBirth || "",
          gender: data.gender || "",
        });
      } else {
        const dn = user.displayName || "";
        const [first = "", ...rest] = dn.split(" ");
        setForm({
          firstName: first,
          lastName: rest.join(" "),
          email: user.email || "",
          phone: "",
          dateOfBirth: "",
          gender: "",
        });
      }
      setLoading(false);
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await updateUserProfile(user.uid, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        dateOfBirth: form.dateOfBirth || null,
        gender: form.gender,
      });
      await updateProfile(user, {
        displayName: `${form.firstName} ${form.lastName}`.trim(),
      });
      setSuccess("Profile updated successfully.");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;
    if (passwords.new !== passwords.confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (passwords.new.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setPasswordSaving(true);
    setPasswordError("");
    setPasswordSuccess("");
    try {
      const credential = EmailAuthProvider.credential(user.email, passwords.current);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwords.new);
      setPasswordSuccess("Password updated successfully.");
      setPasswords({ current: "", new: "", confirm: "" });
      setTimeout(() => setPasswordSuccess(""), 3000);
    } catch {
      setPasswordError("Incorrect current password. Please try again.");
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const displayName = `${form.firstName} ${form.lastName}`.trim() || "User";
  const avatar = user?.photoURL || profile?.avatar || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-dark">Profile Settings</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center text-gold font-heading font-bold text-2xl overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  getInitials(displayName)
                )}
              </div>
              <button className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
            <div>
              <p className="font-heading font-semibold text-dark text-lg">{displayName}</p>
              <p className="text-sm text-medium-gray">{form.email}</p>
              <Button variant="secondary" size="sm" className="mt-2">
                <Camera className="w-4 h-4 mr-1.5" />
                Change Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
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
                <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} icon={<User className="w-4 h-4" />} />
                <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} icon={<User className="w-4 h-4" />} />
              </div>
              <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} icon={<Mail className="w-4 h-4" />} />
              <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} icon={<Phone className="w-4 h-4" />} />
              <Input label="Date of Birth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} icon={<Calendar className="w-4 h-4" />} />
              <div className="w-full">
                <label className="block text-sm font-medium text-dark mb-1.5">Gender</label>
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
              {error && <p className="text-sm text-error">{error}</p>}
              {success && <p className="text-sm text-success">{success}</p>}
              <Button type="submit" variant="gold" className="flex items-center gap-2" disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="w-5 h-5 text-gold" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input label="Current Password" name="current" type="password" value={passwords.current} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords((p) => ({ ...p, current: e.target.value }))} icon={<Lock className="w-4 h-4" />} />
              <Input label="New Password" name="new" type="password" value={passwords.new} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords((p) => ({ ...p, new: e.target.value }))} icon={<Lock className="w-4 h-4" />} />
              <Input label="Confirm New Password" name="confirm" type="password" value={passwords.confirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} icon={<Lock className="w-4 h-4" />} />
              {passwordError && <p className="text-sm text-error">{passwordError}</p>}
              {passwordSuccess && <p className="text-sm text-success">{passwordSuccess}</p>}
              <Button type="submit" variant="gold" className="flex items-center gap-2" disabled={passwordSaving}>
                {passwordSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {passwordSaving ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
