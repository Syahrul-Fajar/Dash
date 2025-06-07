import React from "react";
import { DashboardLayout } from "@/components/admin/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Palette,
  Users,
  TrendingUp,
  Eye,
  Banknote,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Pesanan",
      value: "156",
      change: "+12%",
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Tema Aktif",
      value: "43",
      change: "+5%",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Pelanggan Baru",
      value: "28",
      change: "+18%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pendapatan",
      value: "Rp 45.2M",
      change: "+25%",
      icon: Banknote,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  const recentOrders = [
    {
      id: "#001",
      customer: "Sarah & Ahmad",
      template: "Golden Elegance",
      status: "in-progress",
      amount: "Rp 199K",
      date: "2024-01-15",
    },
    {
      id: "#002",
      customer: "Dika & Rina",
      template: "Rose Garden",
      status: "completed",
      amount: "Rp 299K",
      date: "2024-01-14",
    },
    {
      id: "#003",
      customer: "Budi & Sari",
      template: "Modern Minimal",
      status: "pending",
      amount: "Rp 149K",
      date: "2024-01-13",
    },
    {
      id: "#004",
      customer: "Andi & Lisa",
      template: "Classic Traditional",
      status: "in-progress",
      amount: "Rp 399K",
      date: "2024-01-12",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Selesai
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Proses
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Menunggu
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Selamat datang kembali! Berikut ringkasan aktivitas hari ini.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-green-600">
                        {stat.change} dari bulan lalu
                      </p>
                    </div>
                    <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>Akses fitur yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link to="/orders">
                <Button className="w-full h-20 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  <div className="text-center">
                    <ShoppingBag className="h-6 w-6 mx-auto mb-2" />
                    <span>Kelola Pesanan</span>
                  </div>
                </Button>
              </Link>
              <Link to="/themes">
                <Button variant="outline" className="w-full h-20">
                  <div className="text-center">
                    <Palette className="h-6 w-6 mx-auto mb-2" />
                    <span>Buat Tema Baru</span>
                  </div>
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="outline" className="w-full h-20">
                  <div className="text-center">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                    <span>Lihat Analitik</span>
                  </div>
                </Button>
              </Link>
              <Link to="/users">
                <Button variant="outline" className="w-full h-20">
                  <div className="text-center">
                    <Users className="h-6 w-6 mx-auto mb-2" />
                    <span>Manajemen User</span>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pesanan Terbaru</CardTitle>
                <CardDescription>
                  Pesanan yang masuk dalam 7 hari terakhir
                </CardDescription>
              </div>
              <Link to="/orders">
                <Button variant="outline" size="sm">
                  Lihat Semua
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {order.customer.split(" ")[0][0]}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.customer}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.template}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {order.amount}
                      </p>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Update terkini dari sistem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      Pesanan #001 telah diselesaikan
                    </p>
                    <p className="text-xs text-gray-500">2 jam yang lalu</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <ShoppingBag className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      Pesanan baru dari Sarah & Ahmad
                    </p>
                    <p className="text-xs text-gray-500">4 jam yang lalu</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Palette className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      Tema "Romantic Sunset" telah dipublikasi
                    </p>
                    <p className="text-xs text-gray-500">6 jam yang lalu</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Users className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      3 pelanggan baru mendaftar
                    </p>
                    <p className="text-xs text-gray-500">8 jam yang lalu</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      Backup otomatis telah selesai
                    </p>
                    <p className="text-xs text-gray-500">12 jam yang lalu</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
