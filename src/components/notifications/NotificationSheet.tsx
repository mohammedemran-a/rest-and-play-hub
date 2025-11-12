import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";

interface NotificationSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}

export const NotificationSheet = ({ open, onOpenChange, showTrigger = true }: NotificationSheetProps) => {
  // Mock notifications data - replace with real data later
  const notifications = [
    { id: 1, title: "حجز جديد", message: "تم حجز الغرفة VIP بنجاح", time: "منذ 5 دقائق", read: false },
    { id: 2, title: "تأكيد الطلب", message: "تم تأكيد طلب الخدمة الإضافية", time: "منذ ساعة", read: false },
    { id: 3, title: "مباراة قادمة", message: "مباراة الريال ضد برشلونة غداً", time: "منذ ساعتين", read: true },
    { id: 4, title: "عرض خاص", message: "خصم 20% على جميع الغرف", time: "منذ يوم", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

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
      <SheetContent side="right" className="w-full sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>الإشعارات</span>
            {unreadCount > 0 && (
              <Badge variant="secondary">{unreadCount} جديد</Badge>
            )}
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          {notifications.length > 0 ? (
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-4 rounded-lg cursor-pointer transition-smooth hover:bg-muted ${
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
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary mt-1 shrink-0" />
                      )}
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
