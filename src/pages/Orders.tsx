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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Eye,
  Edit,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Banknote,
  User,
  MapPin,
} from "lucide-react";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const orders = [
    {
      id: "#001",
      customer: {
        name: "Sarah & Ahmad",
        email: "sarah.ahmad@email.com",
        phone: "+62 812-3456-7890",
        address: "Jakarta Selatan",
      },
      template: "Golden Elegance",
      package: "Premium",
      status: "in-progress",
      amount: "Rp 199,000",
      date: "2024-01-15",
      weddingDate: "2024-03-20",
      progress: 75,
      notes: "Pelanggan meminta revisi warna tema menjadi lebih soft",
    },
    {
      id: "#002",
      customer: {
        name: "Dika & Rina",
        email: "dika.rina@email.com",
        phone: "+62 813-7890-1234",
        address: "Bandung",
      },
      template: "Rose Garden",
      package: "Exclusive",
      status: "completed",
      amount: "Rp 399,000",
      date: "2024-01-14",
      weddingDate: "2024-02-14",
      progress: 100,
      notes: "Pesanan selesai, pelanggan sangat puas",
    },
    {
      id: "#003",
      customer: {
        name: "Budi & Sari",
        email: "budi.sari@email.com",
        phone: "+62 814-2345-6789",
        address: "Surabaya",
      },
      template: "Modern Minimal",
      package: "Basic",
      status: "pending",
      amount: "Rp 99,000",
      date: "2024-01-13",
      weddingDate: "2024-04-15",
      progress: 0,
      notes: "Menunggu konfirmasi pembayaran",
    },
    {
      id: "#004",
      customer: {
        name: "Andi & Lisa",
        email: "andi.lisa@email.com",
        phone: "+62 815-6789-0123",
        address: "Yogyakarta",
      },
      template: "Classic Traditional",
      package: "Premium",
      status: "revision",
      amount: "Rp 199,000",
      date: "2024-01-12",
      weddingDate: "2024-05-10",
      progress: 50,
      notes: "Revisi ke-2, menunggu approval dari pelanggan",
    },
    {
      id: "#005",
      customer: {
        name: "Maya & Rizki",
        email: "maya.rizki@email.com",
        phone: "+62 816-3456-7890",
        address: "Medan",
      },
      template: "Romantic Sunset",
      package: "Premium",
      status: "in-progress",
      amount: "Rp 199,000",
      date: "2024-01-11",
      weddingDate: "2024-06-01",
      progress: 30,
      notes: "Sedang proses design awal",
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
      case "revision":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Revisi
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 25) return "bg-orange-500";
    return "bg-gray-300";
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.template.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manajemen Pesanan
          </h1>
          <p className="mt-2 text-gray-600">
            Kelola semua pesanan undangan digital dari pelanggan
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Pesanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari pesanan, nama pelanggan, atau template..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="in-progress">Proses</SelectItem>
                  <SelectItem value="revision">Revisi</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pesanan ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {order.customer.name.split(" ")[0][0]}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {order.customer.name}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {order.id}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {order.template} • {order.package}
                        </p>
                        <p className="text-xs text-gray-500">
                          Pesanan: {order.date} • Nikah: {order.weddingDate}
                        </p>
                      </div>
                    </div>

                    {/* Progress & Status */}
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Progress</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(order.progress)}`}
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">
                            {order.progress}%
                          </span>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-500">Status</p>
                        <div className="mt-1">
                          {getStatusBadge(order.status)}
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-500">Nilai</p>
                        <p className="font-semibold text-gray-900 mt-1">
                          {order.amount}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Detail
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              Detail Pesanan {selectedOrder?.id}
                            </DialogTitle>
                            <DialogDescription>
                              Informasi lengkap pesanan dari{" "}
                              {selectedOrder?.customer.name}
                            </DialogDescription>
                          </DialogHeader>

                          {selectedOrder && (
                            <Tabs defaultValue="info" className="mt-6">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="info">
                                  Informasi
                                </TabsTrigger>
                                <TabsTrigger value="progress">
                                  Progress
                                </TabsTrigger>
                                <TabsTrigger value="communication">
                                  Komunikasi
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent value="info" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Data Pelanggan
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">
                                          {selectedOrder.customer.name}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">
                                          {selectedOrder.customer.email}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">
                                          {selectedOrder.customer.phone}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">
                                          {selectedOrder.customer.address}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <Banknote className="h-5 w-5" />
                                        Detail Pesanan
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Template:
                                        </span>
                                        <span className="font-medium">
                                          {selectedOrder.template}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Paket:
                                        </span>
                                        <span className="font-medium">
                                          {selectedOrder.package}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Tanggal Pesanan:
                                        </span>
                                        <span className="font-medium">
                                          {selectedOrder.date}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Tanggal Nikah:
                                        </span>
                                        <span className="font-medium">
                                          {selectedOrder.weddingDate}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Total:
                                        </span>
                                        <span className="font-bold text-lg">
                                          {selectedOrder.amount}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </TabsContent>

                              <TabsContent value="progress">
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Timeline Progress</CardTitle>
                                    <CardDescription>
                                      Tracking progress pengerjaan pesanan
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-4">
                                        <div className="h-4 w-4 rounded-full bg-green-500"></div>
                                        <div>
                                          <p className="font-medium">
                                            Pesanan Diterima
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {selectedOrder.date}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <div
                                          className={`h-4 w-4 rounded-full ${selectedOrder.progress >= 25 ? "bg-green-500" : "bg-gray-300"}`}
                                        ></div>
                                        <div>
                                          <p className="font-medium">
                                            Design Awal
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            Sedang dikerjakan
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <div
                                          className={`h-4 w-4 rounded-full ${selectedOrder.progress >= 50 ? "bg-green-500" : "bg-gray-300"}`}
                                        ></div>
                                        <div>
                                          <p className="font-medium">
                                            Review Pelanggan
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            Menunggu feedback
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <div
                                          className={`h-4 w-4 rounded-full ${selectedOrder.progress >= 75 ? "bg-green-500" : "bg-gray-300"}`}
                                        ></div>
                                        <div>
                                          <p className="font-medium">
                                            Revisi & Finalisasi
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            Belum dimulai
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <div
                                          className={`h-4 w-4 rounded-full ${selectedOrder.progress === 100 ? "bg-green-500" : "bg-gray-300"}`}
                                        ></div>
                                        <div>
                                          <p className="font-medium">
                                            Selesai & Delivered
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            Belum selesai
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </TabsContent>

                              <TabsContent value="communication">
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Riwayat Komunikasi</CardTitle>
                                    <CardDescription>
                                      Catatan dan komunikasi dengan pelanggan
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      <div className="p-4 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                          <MessageSquare className="h-4 w-4 text-blue-500" />
                                          <span className="font-medium text-blue-900">
                                            Catatan Internal
                                          </span>
                                          <span className="text-sm text-blue-600">
                                            Admin • {selectedOrder.date}
                                          </span>
                                        </div>
                                        <p className="text-blue-800">
                                          {selectedOrder.notes}
                                        </p>
                                      </div>

                                      <div className="flex gap-2">
                                        <Button
                                          size="sm"
                                          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                                        >
                                          <Phone className="h-4 w-4 mr-2" />
                                          Hubungi Pelanggan
                                        </Button>
                                        <Button variant="outline" size="sm">
                                          <Mail className="h-4 w-4 mr-2" />
                                          Kirim Email
                                        </Button>
                                        <Button variant="outline" size="sm">
                                          <MessageSquare className="h-4 w-4 mr-2" />
                                          Tambah Catatan
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </TabsContent>
                            </Tabs>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
