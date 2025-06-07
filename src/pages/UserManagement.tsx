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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Shield,
  User,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  UserPlus,
  Settings,
  Lock,
  Unlock,
} from "lucide-react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const users = [
    {
      id: "1",
      name: "Administrator",
      email: "admin@baelangan.com",
      phone: "+62 812-3456-7890",
      role: "super_admin",
      status: "active",
      lastLogin: "2024-01-15 14:30",
      createdAt: "2024-01-01",
      permissions: ["all"],
    },
    {
      id: "2",
      name: "Sarah Manager",
      email: "sarah@baelangan.com",
      phone: "+62 813-7890-1234",
      role: "manager",
      status: "active",
      lastLogin: "2024-01-15 10:15",
      createdAt: "2024-01-05",
      permissions: ["orders", "themes", "customers"],
    },
    {
      id: "3",
      name: "Dika Designer",
      email: "dika@baelangan.com",
      phone: "+62 814-2345-6789",
      role: "designer",
      status: "active",
      lastLogin: "2024-01-14 16:45",
      createdAt: "2024-01-10",
      permissions: ["themes", "orders"],
    },
    {
      id: "4",
      name: "Budi Support",
      email: "budi@baelangan.com",
      phone: "+62 815-6789-0123",
      role: "support",
      status: "inactive",
      lastLogin: "2024-01-10 09:20",
      createdAt: "2024-01-08",
      permissions: ["customers", "orders"],
    },
    {
      id: "5",
      name: "Lisa Marketing",
      email: "lisa@baelangan.com",
      phone: "+62 816-3456-7890",
      role: "marketing",
      status: "active",
      lastLogin: "2024-01-15 08:30",
      createdAt: "2024-01-12",
      permissions: ["analytics", "customers"],
    },
  ];

  const roles = [
    {
      value: "super_admin",
      label: "Super Admin",
      color: "bg-red-100 text-red-800",
    },
    { value: "manager", label: "Manager", color: "bg-blue-100 text-blue-800" },
    {
      value: "designer",
      label: "Designer",
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "support",
      label: "Support",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "marketing",
      label: "Marketing",
      color: "bg-orange-100 text-orange-800",
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
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Tidak Aktif
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleInfo = roles.find((r) => r.value === role);
    return roleInfo ? (
      <Badge className={`${roleInfo.color} hover:${roleInfo.color}`}>
        {roleInfo.label}
      </Badge>
    ) : (
      <Badge variant="secondary">{role}</Badge>
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Manajemen User
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Kelola akses user dan permissions dalam sistem
            </p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Tambah User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah User Baru</DialogTitle>
                <DialogDescription>
                  Buat akun user baru dengan role dan permissions
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="new-name">Nama Lengkap</Label>
                  <Input id="new-name" placeholder="Masukkan nama lengkap" />
                </div>
                <div>
                  <Label htmlFor="new-email">Email</Label>
                  <Input
                    id="new-email"
                    type="email"
                    placeholder="user@baelangan.com"
                  />
                </div>
                <div>
                  <Label htmlFor="new-phone">Nomor Telepon</Label>
                  <Input id="new-phone" placeholder="+62 812-3456-7890" />
                </div>
                <div>
                  <Label htmlFor="new-role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="new-password">Password Sementara</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Password akan dikirim via email"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Batal
                </Button>
                <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  Buat User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Users
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {users.length}
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-blue-100 dark:bg-blue-900">
                  <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Active Users
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {users.filter((u) => u.status === "active").length}
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-green-100 dark:bg-green-900">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Roles
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {roles.length}
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-purple-100 dark:bg-purple-900">
                  <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Admins
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {
                      users.filter(
                        (u) => u.role === "super_admin" || u.role === "manager",
                      ).length
                    }
                  </p>
                </div>
                <div className="rounded-lg p-3 bg-red-100 dark:bg-red-900">
                  <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari nama atau email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Role</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors dark:border-gray-700"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {user.name.split(" ")[0][0]}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {user.name}
                          </h3>
                          {getRoleBadge(user.role)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>Last login: {user.lastLogin}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Status
                        </p>
                        <div className="mt-1">
                          {getStatusBadge(user.status)}
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Permissions
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {user.permissions.length} modules
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Detail
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detail User</DialogTitle>
                              <DialogDescription>
                                Informasi lengkap dan permissions{" "}
                                {selectedUser?.name}
                              </DialogDescription>
                            </DialogHeader>

                            {selectedUser && (
                              <Tabs defaultValue="info" className="mt-6">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="info">
                                    Informasi
                                  </TabsTrigger>
                                  <TabsTrigger value="permissions">
                                    Permissions
                                  </TabsTrigger>
                                </TabsList>

                                <TabsContent value="info" className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label>Nama Lengkap</Label>
                                      <p className="font-medium">
                                        {selectedUser.name}
                                      </p>
                                    </div>
                                    <div>
                                      <Label>Email</Label>
                                      <p className="font-medium">
                                        {selectedUser.email}
                                      </p>
                                    </div>
                                    <div>
                                      <Label>Nomor Telepon</Label>
                                      <p className="font-medium">
                                        {selectedUser.phone}
                                      </p>
                                    </div>
                                    <div>
                                      <Label>Role</Label>
                                      <div className="mt-1">
                                        {getRoleBadge(selectedUser.role)}
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Status</Label>
                                      <div className="mt-1">
                                        {getStatusBadge(selectedUser.status)}
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Bergabung</Label>
                                      <p className="font-medium">
                                        {selectedUser.createdAt}
                                      </p>
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent
                                  value="permissions"
                                  className="space-y-4"
                                >
                                  <div className="space-y-3">
                                    <h4 className="font-medium">
                                      Module Access
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                      {[
                                        "dashboard",
                                        "orders",
                                        "themes",
                                        "customers",
                                        "analytics",
                                        "settings",
                                      ].map((module) => (
                                        <div
                                          key={module}
                                          className="flex items-center justify-between p-2 border rounded dark:border-gray-700"
                                        >
                                          <span className="text-sm capitalize">
                                            {module}
                                          </span>
                                          <Badge
                                            className={
                                              selectedUser.permissions.includes(
                                                module,
                                              ) ||
                                              selectedUser.permissions.includes(
                                                "all",
                                              )
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                            }
                                          >
                                            {selectedUser.permissions.includes(
                                              module,
                                            ) ||
                                            selectedUser.permissions.includes(
                                              "all",
                                            )
                                              ? "Allow"
                                              : "Deny"}
                                          </Badge>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>

                        {user.status === "active" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-orange-600 hover:text-orange-700"
                          >
                            <Lock className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                          >
                            <Unlock className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
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

export default UserManagement;
