import React, { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Users,
  ShoppingBag,
  Banknote,
  Calendar,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const overviewStats = [
    {
      title: "Total Pesanan",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pendapatan",
      value: "Rp 247.8M",
      change: "+18.3%",
      trend: "up",
      icon: Banknote,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pelanggan Aktif",
      value: "892",
      change: "+8.7%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Conversion Rate",
      value: "4.2%",
      change: "-2.1%",
      trend: "down",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const topThemes = [
    {
      name: "Golden Elegance",
      orders: 156,
      revenue: "Rp 31.2M",
      growth: "+15%",
    },
    { name: "Rose Garden", orders: 124, revenue: "Rp 24.8M", growth: "+12%" },
    { name: "Modern Minimal", orders: 98, revenue: "Rp 9.8M", growth: "+8%" },
    {
      name: "Classic Traditional",
      orders: 87,
      revenue: "Rp 34.8M",
      growth: "+22%",
    },
    { name: "Romantic Sunset", orders: 76, revenue: "Rp 15.2M", growth: "+5%" },
  ];

  const monthlyData = [
    { month: "Jan", orders: 65, revenue: 12.8 },
    { month: "Feb", orders: 78, revenue: 15.6 },
    { month: "Mar", orders: 92, revenue: 18.4 },
    { month: "Apr", orders: 108, revenue: 21.6 },
    { month: "May", orders: 124, revenue: 24.8 },
    { month: "Jun", orders: 156, revenue: 31.2 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Analytics Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Analisis performa bisnis dan insight data pelanggan
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 hari terakhir</SelectItem>
                <SelectItem value="30d">30 hari terakhir</SelectItem>
                <SelectItem value="90d">90 hari terakhir</SelectItem>
                <SelectItem value="1y">1 tahun terakhir</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendIcon
                          className={`h-4 w-4 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                        />
                        <p
                          className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                        >
                          {stat.change} dari periode sebelumnya
                        </p>
                      </div>
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

        {/* Charts Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="themes">Tema Populer</TabsTrigger>
            <TabsTrigger value="customers">Pelanggan</TabsTrigger>
            <TabsTrigger value="revenue">Pendapatan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Orders Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Pesanan Bulanan
                  </CardTitle>
                  <CardDescription>
                    Trend pesanan dalam 6 bulan terakhir
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2 px-4">
                    {monthlyData.map((data, index) => (
                      <div
                        key={data.month}
                        className="flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-8 bg-gradient-to-t from-red-500 to-orange-500 rounded-t transition-all hover:opacity-80"
                          style={{ height: `${(data.orders / 156) * 200}px` }}
                          title={`${data.orders} pesanan`}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {data.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Distribusi Pendapatan
                  </CardTitle>
                  <CardDescription>
                    Pendapatan berdasarkan tier paket
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <div className="relative">
                      {/* Simple pie chart representation */}
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 relative">
                        <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-sm font-semibold">Total</p>
                            <p className="text-xs text-gray-500">Rp 247.8M</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-8 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Exclusive (60%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-sm">Premium (30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Basic (10%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="themes">
            <Card>
              <CardHeader>
                <CardTitle>Tema Paling Populer</CardTitle>
                <CardDescription>
                  Ranking tema berdasarkan jumlah pesanan dan pendapatan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topThemes.map((theme, index) => (
                    <div
                      key={theme.name}
                      className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {theme.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {theme.orders} pesanan
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {theme.revenue}
                        </p>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">
                            {theme.growth}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Segmentasi Pelanggan</CardTitle>
                  <CardDescription>
                    Distribusi pelanggan berdasarkan tier
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Premium Customers
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="w-3/4 bg-red-500 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Regular Customers
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="w-1/2 bg-orange-500 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        New Customers
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="w-1/12 bg-yellow-500 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lokasi Pelanggan</CardTitle>
                  <CardDescription>
                    Top 5 kota dengan pesanan terbanyak
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { city: "Jakarta", count: 342, percentage: 45 },
                      { city: "Surabaya", count: 156, percentage: 20 },
                      { city: "Bandung", count: 124, percentage: 16 },
                      { city: "Medan", count: 89, percentage: 12 },
                      { city: "Yogyakarta", count: 67, percentage: 7 },
                    ].map((location) => (
                      <div
                        key={location.city}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {location.city}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {location.count}
                          </span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                              style={{ width: `${location.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Analisis Pendapatan</CardTitle>
                <CardDescription>
                  Detail breakdown pendapatan dan proyeksi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Rp 247.8M
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Pendapatan
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+18.3%</span>
                    </div>
                  </div>
                  <div className="text-center p-6 border rounded-lg dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Rp 4.1M
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Rata-rata per Bulan
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+12.1%</span>
                    </div>
                  </div>
                  <div className="text-center p-6 border rounded-lg dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Rp 325M
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Proyeksi Tahun Ini
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-600">Target</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
