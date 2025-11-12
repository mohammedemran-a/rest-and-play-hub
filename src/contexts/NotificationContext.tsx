import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  markAsRead: (id: number) => void;
  deleteNotification: (id: number) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "حجز جديد", message: "تم حجز الغرفة VIP بنجاح", time: "منذ 5 دقائق", read: false },
    { id: 2, title: "تأكيد الطلب", message: "تم تأكيد طلب الخدمة الإضافية", time: "منذ ساعة", read: false },
    { id: 3, title: "مباراة قادمة", message: "مباراة الريال ضد برشلونة غداً", time: "منذ ساعتين", read: true },
    { id: 4, title: "عرض خاص", message: "خصم 20% على جميع الغرف", time: "منذ يوم", read: true },
  ]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    toast({
      title: "تم التحديث",
      description: "تم تعليم الإشعار كمقروء",
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف الإشعار",
      variant: "destructive",
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    toast({
      title: "تم التحديث",
      description: "تم تعليم جميع الإشعارات كمقروءة",
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        markAsRead,
        deleteNotification,
        markAllAsRead,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
};
