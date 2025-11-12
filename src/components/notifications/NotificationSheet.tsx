import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bell, Check, X } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

interface NotificationSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}

export const NotificationSheet = ({ open, onOpenChange, showTrigger = true }: NotificationSheetProps) => {
  const { notifications, markAsRead, deleteNotification, markAllAsRead, unreadCount } = useNotifications();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[10px] sm:text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
        </SheetTrigger>
      )}
      <SheetContent side="left" className="w-full sm:w-[400px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <span>الإشعارات</span>
              {unreadCount > 0 && (
                <Badge variant="secondary">{unreadCount} جديد</Badge>
              )}
            </SheetTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                تعليم الكل كمقروء
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          {notifications.length > 0 ? (
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-4 rounded-lg transition-smooth hover:bg-muted ${
                      !notification.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">{notification.title}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {!notification.read ? (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => markAsRead(notification.id)}
                              title="تعليم كمقروء"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </>
                        ) : null}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => deleteNotification(notification.id)}
                          title="حذف الإشعار"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>لا توجد إشعارات</p>
            </div>
          )}
        </ScrollArea>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
          <Button variant="ghost" size="sm" className="w-full">
            عرض جميع الإشعارات
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
