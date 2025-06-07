import React, { useState } from "react";
import { cn } from "@/lib/utils";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const location = useLocation();

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Here you would implement search functionality
    }
  };

  const markAsRead = (notificationId: number) => {
    // Here you would update the notification status
    console.log("Marking notification as read:", notificationId);
  };

  const markAllAsRead = () => {
    // Here you would mark all notifications as read
    console.log("Marking all notifications as read");
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="fixed inset-y-0 left-0 flex w-72 flex-col bg-white shadow-2xl">
          <div className="flex h-16 items-center justify-between px-6 bg-gradient-to-r from-red-500 to-orange-500">
            <h1 className="text-xl font-bold text-white">Baelangan Admin</h1>
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
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:scale-[1.02]",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 shadow-sm">
          <div className="flex h-16 shrink-0 items-center px-6 bg-gradient-to-r from-red-500 to-orange-500">
            <h1 className="text-xl font-bold text-white">Baelangan Admin</h1>
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
                        "group flex gap-x-3 rounded-xl p-3 text-sm font-medium leading-6 transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-100 hover:scale-[1.02]",
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
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
                className="block h-10 w-full border-gray-300 bg-white pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg"
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
                    className="relative hover:bg-gray-100 transition-colors"
                  >
                    <Bell className="h-5 w-5 text-gray-600" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white flex items-center justify-center">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Notifikasi</CardTitle>
                        {unreadCount > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs text-red-600 hover:text-red-700"
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
                                "flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4",
                                notification.unread
                                  ? "bg-blue-50/50 border-l-blue-500"
                                  : "border-l-transparent",
                              )}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div
                                className={cn(
                                  "rounded-full p-2 bg-gray-100",
                                  notification.color,
                                )}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p
                                    className={cn(
                                      "text-sm font-medium text-gray-900",
                                      notification.unread && "font-semibold",
                                    )}
                                  >
                                    {notification.title}
                                  </p>
                                  {notification.unread && (
                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
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

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-300" />

              {/* Profile */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-x-3 hover:bg-gray-100 transition-colors p-2"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        A
                      </span>
                    </div>
                    <span className="hidden lg:block text-sm font-semibold text-gray-900">
                      Admin
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="end">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="p-4 border-b">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">
                              A
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Administrator
                            </p>
                            <p className="text-sm text-gray-500">
                              admin@baelangan.com
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link to="/settings">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-gray-700"
                          >
                            <Settings className="h-4 w-4" />
                            Pengaturan
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
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
        <main className="py-6 lg:py-8">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
