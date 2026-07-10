import { Customer, Notification } from "@/types";
import { products } from "./products";
import { orders } from "./orders";

export const notifications: Notification[] = [
  {
    id: "notif-1",
    type: "order",
    title: "Order Confirmed",
    message: "Your order AF-2026-004 has been confirmed and is being processed.",
    read: false,
    createdAt: new Date("2026-02-14"),
  },
  {
    id: "notif-2",
    type: "order",
    title: "Order Shipped",
    message: "Your order AF-2026-002 has been shipped and is on its way!",
    read: false,
    createdAt: new Date("2026-02-03"),
  },
  {
    id: "notif-3",
    type: "order",
    title: "Order Delivered",
    message: "Your order AF-2026-001 has been delivered. We hope you love your items!",
    read: true,
    createdAt: new Date("2026-01-22"),
  },
  {
    id: "notif-4",
    type: "promo",
    title: "New Collection Alert",
    message: "Our Spring 2026 collection has arrived. Explore the latest luxury trends.",
    read: true,
    createdAt: new Date("2026-02-01"),
  },
  {
    id: "notif-5",
    type: "system",
    title: "Profile Updated",
    message: "Your profile information has been successfully updated.",
    read: true,
    createdAt: new Date("2026-01-10"),
  },
];

export const currentCustomer: Customer = {
  id: "c-1",
  email: "ayesha.khan@example.com",
  firstName: "Ayesha",
  lastName: "Khan",
  phone: "+92 300 1234567",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  dateOfBirth: new Date("1992-05-15"),
  addresses: [
    {
      id: "addr-1",
      fullName: "Ayesha Khan",
      phone: "+92 300 1234567",
      street: "12-B, Luxury Heights, Main Boulevard",
      city: "Lahore",
      state: "Punjab",
      zipCode: "54000",
      country: "Pakistan",
      isDefault: true,
    },
    {
      id: "addr-2",
      fullName: "Ayesha Khan",
      phone: "+92 300 7654321",
      street: "45, Sea View Apartments, Clifton",
      city: "Karachi",
      state: "Sindh",
      zipCode: "75600",
      country: "Pakistan",
      isDefault: false,
    },
  ],
  orders: orders,
  wishlist: [products[0], products[3], products[7], products[11]],
  notifications: notifications,
};
