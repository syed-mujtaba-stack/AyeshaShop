import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type {
  Address,
  Notification,
  Order,
  ProductColor,
  ProductSize,
} from "@/types";

// ── Firestore shapes ──────────────────────────────────────────────────────────
export interface FirestoreUserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  dateOfBirth: string | null;
  gender: string;
  memberSince: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestoreAddress
  extends Omit<Address, "id"> {
  id?: string;
}

export interface FirestoreOrder
  extends Omit<Order, "id" | "createdAt" | "updatedAt" | "items"> {
  id?: string;
  items: {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    selectedColor: ProductColor;
    selectedSize: ProductSize;
  }[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestoreNotification
  extends Omit<Notification, "id" | "createdAt"> {
  id?: string;
  createdAt: Timestamp;
}

export interface FirestoreWishlistItem {
  productId: string;
  addedAt: Timestamp;
}

// ── User Profile ──────────────────────────────────────────────────────────────
export function getUserProfile(uid: string) {
  return getDoc(doc(db, "users", uid));
}

export function setUserProfile(uid: string, data: Omit<FirestoreUserProfile, "memberSince" | "updatedAt">) {
  return setDoc(
    doc(db, "users", uid),
    {
      ...data,
      memberSince: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export function updateUserProfile(uid: string, data: Partial<FirestoreUserProfile>) {
  return updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ── Addresses ─────────────────────────────────────────────────────────────────
export function subscribeToAddresses(
  uid: string,
  cb: (addresses: Address[]) => void
) {
  const q = query(
    collection(db, "users", uid, "addresses"),
    orderBy("isDefault", "desc")
  );
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Address[]
    );
  });
}

export function addAddress(uid: string, address: Omit<Address, "id">) {
  const ref = doc(collection(db, "users", uid, "addresses"));
  return setDoc(ref, { ...address, id: ref.id });
}

export function updateAddress(uid: string, addressId: string, data: Partial<Address>) {
  return updateDoc(doc(db, "users", uid, "addresses", addressId), data);
}

export async function setDefaultAddress(uid: string, addressId: string) {
  const snap = await import("firebase/firestore").then((m) =>
    m.getDocs(query(collection(db, "users", uid, "addresses")))
  );
  const batch = writeBatch(db);
  snap.docs.forEach((d) => {
    batch.update(d.ref, { isDefault: d.id === addressId });
  });
  await batch.commit();
}

export function deleteAddress(uid: string, addressId: string) {
  return deleteDoc(doc(db, "users", uid, "addresses", addressId));
}

// ── Orders ────────────────────────────────────────────────────────────────────
export function subscribeToOrders(
  uid: string,
  cb: (orders: Order[]) => void
) {
  const q = query(
    collection(db, "users", uid, "orders"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() ?? new Date(),
          updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
          items: data.items ?? [],
        } as Order;
      })
    );
  });
}

export function subscribeToOrder(
  uid: string,
  orderId: string,
  cb: (order: Order | null) => void
) {
  return onSnapshot(doc(db, "users", uid, "orders", orderId), (snap) => {
    if (!snap.exists()) return cb(null);
    const data = snap.data();
    cb({
      id: snap.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
      updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
      items: data.items ?? [],
    } as Order);
  });
}

export function addOrder(uid: string, order: Omit<Order, "id">) {
  const ref = doc(collection(db, "users", uid, "orders"));
  return setDoc(ref, {
    ...order,
    id: ref.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function updateOrder(uid: string, orderId: string, data: Partial<Order>) {
  return updateDoc(doc(db, "users", uid, "orders", orderId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ── Wishlist ──────────────────────────────────────────────────────────────────
export function subscribeToWishlist(
  uid: string,
  cb: (items: FirestoreWishlistItem[]) => void
) {
  const q = query(
    collection(db, "users", uid, "wishlist"),
    orderBy("addedAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => ({
        productId: d.id,
        ...d.data(),
      })) as FirestoreWishlistItem[]
    );
  });
}

export function addToWishlist(uid: string, productId: string) {
  return setDoc(doc(db, "users", uid, "wishlist", productId), {
    productId,
    addedAt: serverTimestamp(),
  });
}

export function removeFromWishlist(uid: string, productId: string) {
  return deleteDoc(doc(db, "users", uid, "wishlist", productId));
}

// ── Notifications ─────────────────────────────────────────────────────────────
export function subscribeToNotifications(
  uid: string,
  cb: (notifications: Notification[]) => void
) {
  const q = query(
    collection(db, "users", uid, "notifications"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() ?? new Date(),
        } as Notification;
      })
    );
  });
}

export function addNotification(uid: string, notification: Omit<Notification, "id">) {
  const ref = doc(collection(db, "users", uid, "notifications"));
  return setDoc(ref, {
    ...notification,
    createdAt: serverTimestamp(),
  });
}

export function markNotificationRead(uid: string, notificationId: string) {
  return updateDoc(
    doc(db, "users", uid, "notifications", notificationId),
    { read: true }
  );
}

export function markAllNotificationsRead(uid: string) {
  return import("firebase/firestore").then(async (m) => {
    const snap = await m.getDocs(
      query(collection(db, "users", uid, "notifications"))
    );
    const batch = writeBatch(db);
    snap.docs.forEach((d) => {
      if (!d.data().read) batch.update(d.ref, { read: true });
    });
    await batch.commit();
  });
}

export function deleteNotification(uid: string, notificationId: string) {
  return deleteDoc(doc(db, "users", uid, "notifications", notificationId));
}

// ── Seed defaults ─────────────────────────────────────────────────────────────
export async function seedUserIfEmpty(uid: string, profile: { email: string; firstName: string; lastName: string; avatar?: string }) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) {
    await setUserProfile(uid, {
      uid,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: "",
      avatar: profile.avatar ?? "",
      dateOfBirth: null,
      gender: "",
    });
  }
}
