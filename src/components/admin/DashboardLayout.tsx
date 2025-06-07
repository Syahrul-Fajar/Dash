import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  ShoppingBag,
  Palette,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserPlus,
  DollarSign,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Pesanan", href: "/orders", icon: ShoppingBag },
  { name: "Tema", href: "/themes", icon: Palette },
  { name: "Pelanggan", href: "/customers", icon: Users },
  { name: "Pengaturan", href: "/settings", icon: Settings },
];

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "order",
    title: "Pesanan Baru",
    message: "Sarah & Ahmad memesan template Golden Elegance",
    time: "2 menit lalu",
    unread: true,
    icon: ShoppingBag,
    color: "text-blue-600",
  },
  {
    id: 2,
    type: "payment",
    title: "Pembayaran Diterima",
    message: "Pembayaran Rp 199K dari Dika & Rina telah dikonfirmasi",
    time: "15 menit lalu",
    unread: true,
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    id: 3,
    type: "review",
    title: "Review Baru",
    message: "Budi & Sari memberikan rating 5 bintang",
    time: "1 jam lalu",
    unread: false,
    icon: Heart,
    color: "text-red-600",
  },
  {
    id: 4,
    type: "system",
    title: "Backup Selesai",
    message: "Backup database harian telah selesai",
    time: "2 jam lalu",
    unread: false,
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 5,
    type: "user",
    title: "Pelanggan Baru",
    message: "Maya & Rizki telah mendaftar",
    time: "3 jam lalu",
    unread: false,
    icon: UserPlus,
    color: "text-purple-600",
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { settings, isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    settings.sidebarCompact,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const location = useLocation();

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const markAsRead = (notificationId: number) => {
    console.log("Marking notification as read:", notificationId);
  };

  const markAllAsRead = () => {
    console.log("Marking all notifications as read");
  };

  // Dynamic styles based on theme settings
  const sidebarWidth = sidebarCollapsed ? "w-16" : "w-72";
  const sidebarWidthClass = sidebarCollapsed ? "lg:pl-16" : "lg:pl-72";

  const borderRadiusClass = {
    none: "rounded-none",
    small: "rounded",
    medium: "rounded-lg",
    large: "rounded-xl",
  }[settings.borderRadius];

  const transitionClass =
    settings.animationSpeed !== "none"
      ? `transition-all duration-[var(--transition-duration)] ease-in-out`
      : "";

  const sidebarStyleClasses = {
    default: "bg-white border-r border-gray-200",
    modern:
      "bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg",
    minimal: "bg-white border-r border-gray-100",
  }[settings.sidebarStyle];

  return (
    <div
      className={cn(
        "min-h-screen",
        isDark ? "bg-gray-900" : "bg-gray-50",
        `text-[var(--base-font-size)]`,
      )}
    >
      {/* Mobile sidebar overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          sidebarOpen ? "block" : "hidden",
        )}
      >
        <div
          className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={cn(
            "fixed inset-y-0 left-0 flex flex-col shadow-2xl",
            sidebarWidth,
            isDark ? "bg-gray-800" : "bg-white",
            transitionClass,
          )}
        >
          <div
            className="flex h-16 items-center justify-between px-6"
            style={{
              background: "var(--gradient-bg)",
            }}
          >
            <h1 className="text-xl font-bold text-white">
              {settings.businessName}
            </h1>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 px-6 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium",
                    borderRadiusClass,
                    transitionClass,
                    isActive
                      ? "text-white shadow-lg"
                      : isDark
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-700 hover:bg-gray-100",
                    !sidebarCollapsed && "justify-start",
                    sidebarCollapsed && "justify-center",
                  )}
                  style={isActive ? { background: "var(--gradient-bg)" } : {}}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col",
          sidebarWidth,
        )}
      >
        <div
          className={cn(
            "flex grow flex-col gap-y-5 overflow-y-auto shadow-sm",
            sidebarStyleClasses,
            transitionClass,
          )}
        >
          <div
            className="flex h-16 shrink-0 items-center justify-between px-6"
            style={{
              background: "var(--gradient-bg)",
            }}
          >
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold text-white">
                {settings.businessName}
              </h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          <nav className="flex flex-1 flex-col px-6 pb-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "group flex gap-x-3 p-3 text-sm font-medium leading-6",
                        borderRadiusClass,
                        transitionClass,
                        isActive
                          ? "text-white shadow-lg"
                          : isDark
                            ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                            : "text-gray-700 hover:bg-gray-100",
                        sidebarCollapsed && "justify-center",
                      )}
                      style={
                        isActive ? { background: "var(--gradient-bg)" } : {}
                      }
                      title={sidebarCollapsed ? item.name : undefined}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!sidebarCollapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(sidebarWidthClass, transitionClass)}>
        {/* Top header */}
        <div
          className={cn(
            "flex h-16 shrink-0 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8",
            settings.stickyHeader ? "sticky top-0 z-40" : "",
            isDark
              ? "bg-gray-800/95 border-gray-700"
              : "bg-white/95 border-gray-200",
            "backdrop-blur-sm",
            transitionClass,
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            {/* Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex flex-1 items-center max-w-md"
            >
              <Search className="pointer-events-none absolute left-3 h-5 w-5 text-gray-400" />
              <Input
                className={cn(
                  "block h-10 w-full pl-10 pr-3 focus:ring-2 focus:border-opacity-0",
                  borderRadiusClass,
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400",
                  transitionClass,
                )}
                style={{
                  focusRingColor: "var(--primary-color)",
                  borderColor: isDark ? "#4b5563" : "#d1d5db",
                }}
                placeholder="Cari pesanan, tema, atau pelanggan..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <Popover
                open={notificationOpen}
                onOpenChange={setNotificationOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "relative transition-colors",
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-100",
                    )}
                  >
                    <Bell
                      className={cn(
                        "h-5 w-5",
                        isDark ? "text-gray-300" : "text-gray-600",
                      )}
                    />
                    {unreadCount > 0 && (
                      <Badge
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs text-white flex items-center justify-center"
                        style={{ backgroundColor: "var(--primary-color)" }}
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <Card
                    className={cn(
                      "border-0 shadow-lg",
                      isDark ? "bg-gray-800" : "bg-white",
                    )}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle
                          className={cn(
                            "text-lg",
                            isDark ? "text-gray-100" : "text-gray-900",
                          )}
                        >
                          Notifikasi
                        </CardTitle>
                        {unreadCount > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs hover:text-opacity-80"
                            style={{ color: "var(--primary-color)" }}
                          >
                            Tandai semua dibaca
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 max-h-80 overflow-y-auto">
                      <div className="space-y-1">
                        {notifications.map((notification) => {
                          const Icon = notification.icon;
                          return (
                            <div
                              key={notification.id}
                              className={cn(
                                "flex items-start gap-3 p-4 cursor-pointer transition-colors border-l-4",
                                isDark
                                  ? "hover:bg-gray-700"
                                  : "hover:bg-gray-50",
                                notification.unread
                                  ? isDark
                                    ? "bg-gray-700/50 border-l-blue-400"
                                    : "bg-blue-50/50 border-l-blue-500"
                                  : "border-l-transparent",
                              )}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div
                                className={cn(
                                  "rounded-full p-2",
                                  isDark ? "bg-gray-600" : "bg-gray-100",
                                  notification.color,
                                )}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p
                                    className={cn(
                                      "text-sm font-medium",
                                      isDark
                                        ? "text-gray-100"
                                        : "text-gray-900",
                                      notification.unread && "font-semibold",
                                    )}
                                  >
                                    {notification.title}
                                  </p>
                                  {notification.unread && (
                                    <div
                                      className="h-2 w-2 rounded-full"
                                      style={{
                                        backgroundColor: "var(--primary-color)",
                                      }}
                                    />
                                  )}
                                </div>
                                <p
                                  className={cn(
                                    "text-sm mt-1",
                                    isDark ? "text-gray-300" : "text-gray-600",
                                  )}
                                >
                                  {notification.message}
                                </p>
                                <p
                                  className={cn(
                                    "text-xs mt-1 flex items-center gap-1",
                                    isDark ? "text-gray-400" : "text-gray-400",
                                  )}
                                >
                                  <Clock className="h-3 w-3" />
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </PopoverContent>
              </Popover>

              <div
                className={cn(
                  "hidden lg:block lg:h-6 lg:w-px",
                  isDark ? "bg-gray-600" : "bg-gray-300",
                )}
              />

              {/* Profile */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-x-3 transition-colors p-2",
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-100",
                    )}
                  >
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center"
                      style={{ background: "var(--gradient-bg)" }}
                    >
                      <span className="text-sm font-semibold text-white">
                        A
                      </span>
                    </div>
                    <span
                      className={cn(
                        "hidden lg:block text-sm font-semibold",
                        isDark ? "text-gray-100" : "text-gray-900",
                      )}
                    >
                      Admin
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="end">
                  <Card
                    className={cn(
                      "border-0 shadow-lg",
                      isDark ? "bg-gray-800" : "bg-white",
                    )}
                  >
                    <CardContent className="p-0">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 rounded-full flex items-center justify-center"
                            style={{ background: "var(--gradient-bg)" }}
                          >
                            <span className="text-sm font-semibold text-white">
                              A
                            </span>
                          </div>
                          <div>
                            <p
                              className={cn(
                                "font-medium",
                                isDark ? "text-gray-100" : "text-gray-900",
                              )}
                            >
                              Administrator
                            </p>
                            <p
                              className={cn(
                                "text-sm",
                                isDark ? "text-gray-400" : "text-gray-500",
                              )}
                            >
                              admin@baelangan.com
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link to="/settings">
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start gap-2",
                              isDark
                                ? "text-gray-300 hover:bg-gray-700"
                                : "text-gray-700 hover:bg-gray-100",
                            )}
                          >
                            <Settings className="h-4 w-4" />
                            Pengaturan
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-2 hover:text-opacity-80",
                            isDark
                              ? "text-red-400 hover:bg-red-900/20"
                              : "text-red-600 hover:bg-red-50",
                          )}
                          onClick={() => console.log("Logout clicked")}
                        >
                          <LogOut className="h-4 w-4" />
                          Keluar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main
          className={cn("py-6 lg:py-8", settings.denseTables && "py-4 lg:py-6")}
        >
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
