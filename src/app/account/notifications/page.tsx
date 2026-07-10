"use client";

import { useFirestoreNotifications } from "@/hooks/use-firestore-user";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell, Package, Megaphone, Settings, CheckCheck, Trash2 } from "lucide-react";

const notificationIcons = {
  order: Package,
  promo: Megaphone,
  system: Settings,
};

export default function NotificationsPage() {
  const { notifications, loading, unreadCount, markRead, markAllRead, remove } =
    useFirestoreNotifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-dark">Notifications</h1>
          <p className="text-medium-gray text-sm mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => markAllRead()}
            className="flex items-center gap-2"
          >
            <CheckCheck className="w-4 h-4" />
            Mark All Read
          </Button>
        )}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-border bg-white p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-lighter-gray" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-lighter-gray rounded w-40" />
                  <div className="h-2 bg-lighter-gray rounded w-56" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-full bg-gold/5 flex items-center justify-center mb-4">
            <Bell className="w-10 h-10 text-gold/40" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-dark mb-1">
            No notifications
          </h3>
          <p className="text-medium-gray text-sm text-center max-w-sm">
            You&apos;re all up to date! We&apos;ll notify you when something new arrives.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => {
            const Icon = notificationIcons[notification.type];

            return (
              <div
                key={notification.id}
                className={cn(
                  "rounded-xl p-4 border transition-all duration-200",
                  notification.read
                    ? "bg-white border-border hover:shadow-sm"
                    : "bg-gold/[0.03] border-gold/15 shadow-sm"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      notification.type === "order"
                        ? "bg-blue-50 text-blue-600"
                        : notification.type === "promo"
                        ? "bg-error/5 text-error"
                        : "bg-purple-50 text-purple-600"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={cn(
                          "text-sm",
                          notification.read
                            ? "text-medium-gray"
                            : "font-semibold text-dark"
                        )}
                      >
                        {notification.title}
                      </p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-medium-gray whitespace-nowrap">
                          {notification.createdAt instanceof Date
                            ? notification.createdAt.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : new Date(notification.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                        </span>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-medium-gray mt-0.5 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-gold h-7 px-2"
                          onClick={() => markRead(notification.id)}
                        >
                          <CheckCheck className="w-3.5 h-3.5 mr-1" />
                          Mark Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-error h-7 px-2"
                        onClick={() => remove(notification.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
