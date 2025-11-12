import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Home, DoorOpen, Briefcase, Trophy, Phone, User, Bot, Settings, Bell } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { CartSheet } from "@/components/cart/CartSheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();

  // Mock notifications data - replace with real data later
  const notifications = [
    { id: 1, title: "حجز جديد", message: "تم حجز الغرفة VIP بنجاح", time: "منذ 5 دقائق", read: false },
    { id: 2, title: "تأكيد الطلب", message: "تم تأكيد طلب الخدمة الإضافية", time: "منذ ساعة", read: false },
    { id: 3, title: "مباراة قادمة", message: "مباراة الريال ضد برشلونة غداً", time: "منذ ساعتين", read: true },
    { id: 4, title: "عرض خاص", message: "خصم 20% على جميع الغرف", time: "منذ يوم", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { name: "الرئيسية", path: "/", icon: Home },
    { name: "الغرف", path: "/rooms", icon: DoorOpen },
    { name: "الخدمات", path: "/services", icon: Briefcase },
    { name: "المباريات", path: "/matches", icon: Trophy },
    { name: "البوت", path: "/bot", icon: Bot },
    { name: "تواصل معنا", path: "/contact", icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - Responsive */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 animate-fade-in-right shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-elegant">
              <span className="text-primary-foreground font-bold text-lg sm:text-xl">ا</span>
            </div>
            <span className="text-base sm:text-xl font-bold bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent hidden sm:inline-block">
              نظام استراحة بي إن إيدريم
            </span>
            <span className="text-sm font-bold bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent sm:hidden">
              بي إن إيدريم
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile and tablet */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center mx-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Button
                  variant={isActive(link.path) ? "default" : "ghost"}
                  size="sm"
                  className="gap-2 transition-smooth hover-lift"
                >
                  <link.icon className="h-4 w-4" />
                  <span className="hidden xl:inline">{link.name}</span>
                </Button>
              </Link>
            ))}
            <Link to="/admin" className="animate-fade-in">
              <Button
                variant={isActive("/admin") ? "default" : "outline"}
                size="sm"
                className="gap-2 transition-smooth hover-lift"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden xl:inline">لوحة التحكم</span>
              </Button>
            </Link>
          </div>

          {/* Desktop Right Side - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-2 animate-fade-in-left shrink-0">
            <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold text-lg">الإشعارات</h3>
                  {unreadCount > 0 && (
                    <Badge variant="secondary">{unreadCount} جديد</Badge>
                  )}
                </div>
                <ScrollArea className="h-[400px]">
                  {notifications.length > 0 ? (
                    <div className="p-2">
                      {notifications.map((notification, index) => (
                        <div key={notification.id}>
                          <div
                            className={`p-3 rounded-lg cursor-pointer transition-smooth hover:bg-muted ${
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
                          {index < notifications.length - 1 && <Separator className="my-1" />}
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
                <div className="p-3 border-t">
                  <Button variant="ghost" size="sm" className="w-full">
                    عرض جميع الإشعارات
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <CartSheet />
            <ThemeToggle />
            <Link to="/">
              <Button size="sm" className="gap-2 shadow-elegant">
                <User className="h-4 w-4" />
                <span className="hidden xl:inline">تسجيل الدخول</span>
              </Button>
            </Link>
          </div>

          {/* Mobile/Tablet Right Side */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative p-2">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold text-lg">الإشعارات</h3>
                  {unreadCount > 0 && (
                    <Badge variant="secondary">{unreadCount} جديد</Badge>
                  )}
                </div>
                <ScrollArea className="h-[400px]">
                  {notifications.length > 0 ? (
                    <div className="p-2">
                      {notifications.map((notification, index) => (
                        <div key={notification.id}>
                          <div
                            className={`p-3 rounded-lg cursor-pointer transition-smooth hover:bg-muted ${
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
                          {index < notifications.length - 1 && <Separator className="my-1" />}
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
                <div className="p-3 border-t">
                  <Button variant="ghost" size="sm" className="w-full">
                    عرض جميع الإشعارات
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <CartSheet />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-smooth active:scale-95"
              aria-label="القائمة"
            >
              {isOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Menu - Smooth slide animation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-3 sm:py-4 space-y-1.5 sm:space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <Button
                  variant={isActive(link.path) ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start gap-2 transition-smooth hover-lift active:scale-[0.98]"
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Button>
              </Link>
            ))}
            <Link to="/admin" onClick={() => setIsOpen(false)} className="block">
              <Button
                variant={isActive("/admin") ? "default" : "outline"}
                size="sm"
                className="w-full justify-start gap-2 transition-smooth hover-lift active:scale-[0.98]"
              >
                <Settings className="h-4 w-4" />
                لوحة التحكم
              </Button>
            </Link>
            <div className="pt-2 border-t border-border/50">
              <Link to="/" onClick={() => setIsOpen(false)} className="block">
                <Button size="sm" className="w-full gap-2 shadow-elegant active:scale-[0.98]">
                  <User className="h-4 w-4" />
                  تسجيل الدخول
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
