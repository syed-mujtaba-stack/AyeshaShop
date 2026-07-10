"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  subscribeToAddresses,
  subscribeToOrders,
  subscribeToWishlist,
  subscribeToNotifications,
  addAddress,
  updateAddress,
  setDefaultAddress,
  deleteAddress,
  addToWishlist,
  removeFromWishlist,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  addOrder,
} from "@/lib/firestore";
import type { Address, Notification, Order } from "@/types";

export interface FirestoreWishlistItem {
  productId: string;
  addedAt: Date;
}

export function useFirestoreAddresses() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const unsub = subscribeToAddresses(user.uid, (data) => {
      setAddresses(data);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const add = useCallback(
    (address: Omit<Address, "id">) => {
      if (!user) return;
      return addAddress(user.uid, address);
    },
    [user]
  );

  const update = useCallback(
    (addressId: string, data: Partial<Address>) => {
      if (!user) return;
      return updateAddress(user.uid, addressId, data);
    },
    [user]
  );

  const setDefault = useCallback(
    (addressId: string) => {
      if (!user) return;
      return setDefaultAddress(user.uid, addressId);
    },
    [user]
  );

  const remove = useCallback(
    (addressId: string) => {
      if (!user) return;
      return deleteAddress(user.uid, addressId);
    },
    [user]
  );

  return { addresses, loading, add, update, setDefault, remove };
}

export function useFirestoreOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const unsub = subscribeToOrders(user.uid, (data) => {
      setOrders(data);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const add = useCallback(
    (order: Omit<Order, "id">) => {
      if (!user) return;
      return addOrder(user.uid, order);
    },
    [user]
  );

  return { orders, loading, add };
}

export function useFirestoreWishlist() {
  const { user } = useAuth();
  const [productIds, setProductIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const unsub = subscribeToWishlist(user.uid, (items) => {
      setProductIds(new Set(items.map((i) => i.productId)));
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const add = useCallback(
    (productId: string) => {
      if (!user) return;
      return addToWishlist(user.uid, productId);
    },
    [user]
  );

  const remove = useCallback(
    (productId: string) => {
      if (!user) return;
      return removeFromWishlist(user.uid, productId);
    },
    [user]
  );

  const has = useCallback(
    (productId: string) => productIds.has(productId),
    [productIds]
  );

  return { productIds, loading, add, remove, has };
}

export function useFirestoreNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const unsub = subscribeToNotifications(user.uid, (data) => {
      setNotifications(data);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const markRead = useCallback(
    (id: string) => {
      if (!user) return;
      return markNotificationRead(user.uid, id);
    },
    [user]
  );

  const markAllRead = useCallback(() => {
    if (!user) return;
    return markAllNotificationsRead(user.uid);
  }, [user]);

  const remove = useCallback(
    (id: string) => {
      if (!user) return;
      return deleteNotification(user.uid, id);
    },
    [user]
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, loading, unreadCount, markRead, markAllRead, remove };
}
