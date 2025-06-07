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
import {
  Search,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  Star,
  User,
} from "lucide-react";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const customers = [
    {
      id: "1",
      name: "Sarah & Ahmad",
      email: "sarah.ahmad@email.com",
      phone: "+62 812-3456-7890",
      address: "Jakarta Selatan",
      joinDate: "2024-01-15",
      status: "active",
      totalOrders: 2,
      totalSpent: "Rp 398,000",
      lastOrder: "2024-01-15",
      rating: 4.8,
      weddingDate: "2024-03-20",
    },
    {
      id: "2",
      name: "Dika & Rina",
      email: "dika.rina@email.com",
      phone: "+62 813-7890-1234",
      address: "Bandung",
      joinDate: "2024-01-10",
      status: "active",
      totalOrders: 1,
      totalSpent: "Rp 399,000",
      lastOrder: "2024-01-14",
      rating: 5.0,
      weddingDate: "2024-02-14",
    },
    {
      id: "3",
      name: "Budi & Sari",
      email: "budi.sari@email.com",
      phone: "+62 814-2345-6789",
      address: "Surabaya",
      joinDate: "2024-01-08",
      status: "pending",
      totalOrders: 1,
      totalSpent: "Rp 99,000",
      lastOrder: "2024-01-13",
      rating: 0,
      weddingDate: "2024-04-15",
    },
    {
      id: "4",
      name: "Andi & Lisa",
      email: "andi.lisa@email.com",
      phone: "+62 815-6789-0123",
      address: "Yogyakarta",
      joinDate: "2024-01-05",
      status: "active",
      totalOrders: 3,
      totalSpent: "Rp 597,000",
      lastOrder: "2024-01-12",
      rating: 4.7,
      weddingDate: "2024-05-10",
    },
    {
      id: "5",
      name: "Maya & Rizki",
      email: "maya.rizki@email.com",
      phone: "+62 816-3456-7890",
      address: "Medan",
      joinDate: "2023-12-20",
      status: "inactive",
      totalOrders: 1,
      totalSpent: "Rp 199,000",
      lastOrder: "2024-01-11",
      rating: 4.5,
      weddingDate: "2024-06-01",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Aktif
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Tidak Aktif
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manajemen Pelanggan
          </h1>
          <p className="mt-2 text-gray-600">
            Kelola data dan riwayat pesanan pelanggan
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Pelanggan
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {customers.length}
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-blue-100">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pelanggan Aktif
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {customers.filter((c) => c.status === "active").length}
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-green-100">
                  <User className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Pesanan
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-purple-100">
                  <ShoppingBag className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Rata-rata Rating
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">4.6</p>
                </div>
                <div className="rounded-lg p-3 bg-yellow-100">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Pelanggan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari nama, email, atau nomor telepon..."
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
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customers List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pelanggan ({filteredCustomers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Customer Info */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {customer.name.split(" ")[0][0]}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {customer.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-500">Total Pesanan</p>
                        <p className="font-semibold text-gray-900">
                          {customer.totalOrders}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Total Pengeluaran
                        </p>
                        <p className="font-semibold text-gray-900">
                          {customer.totalSpent}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rating</p>
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-semibold text-gray-900">
                            {customer.rating > 0 ? customer.rating : "-"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <div className="mt-1">
                          {getStatusBadge(customer.status)}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedCustomer(customer)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Detail
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detail Pelanggan</DialogTitle>
                            <DialogDescription>
                              Informasi lengkap pelanggan{" "}
                              {selectedCustomer?.name}
                            </DialogDescription>
                          </DialogHeader>

                          {selectedCustomer && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">
                                      Informasi Pribadi
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <User className="h-4 w-4 text-gray-500" />
                                      <span className="font-medium">
                                        {selectedCustomer.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">
                                        {selectedCustomer.email}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">
                                        {selectedCustomer.phone}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">
                                        {selectedCustomer.address}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">
                                        Bergabung: {selectedCustomer.joinDate}
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">
                                      Statistik Pesanan
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Total Pesanan:
                                      </span>
                                      <span className="font-medium">
                                        {selectedCustomer.totalOrders}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Total Pengeluaran:
                                      </span>
                                      <span className="font-medium">
                                        {selectedCustomer.totalSpent}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Pesanan Terakhir:
                                      </span>
                                      <span className="font-medium">
                                        {selectedCustomer.lastOrder}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Tanggal Nikah:
                                      </span>
                                      <span className="font-medium">
                                        {selectedCustomer.weddingDate}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Rating:
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                        <span className="font-medium">
                                          {selectedCustomer.rating > 0
                                            ? selectedCustomer.rating
                                            : "Belum ada rating"}
                                        </span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <div className="flex justify-end gap-2">
                                <Button variant="outline">
                                  <Phone className="h-4 w-4 mr-2" />
                                  Hubungi
                                </Button>
                                <Button variant="outline">
                                  <Mail className="h-4 w-4 mr-2" />
                                  Kirim Email
                                </Button>
                                <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                                  <ShoppingBag className="h-4 w-4 mr-2" />
                                  Lihat Pesanan
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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

export default Customers;
