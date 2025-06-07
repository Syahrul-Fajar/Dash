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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Mail,
  Database,
  Globe,
  Save,
  Upload,
  Key,
  CreditCard,
  Smartphone,
} from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    customerMessages: true,
    systemAlerts: false,
    emailNotifications: true,
    smsNotifications: false,
  });

  const [generalSettings, setGeneralSettings] = useState({
    businessName: "Baelangan Digital Invitation",
    businessEmail: "admin@baelangan.com",
    businessPhone: "+62 21-1234-5678",
    businessAddress: "Jakarta, Indonesia",
    timezone: "Asia/Jakarta",
    currency: "IDR",
    language: "id",
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
          <p className="mt-2 text-gray-600">
            Kelola pengaturan sistem dan preferensi admin
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Umum</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifikasi</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Keamanan</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Tampilan</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Sistem</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Informasi Bisnis
                  </CardTitle>
                  <CardDescription>
                    Pengaturan dasar informasi bisnis Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="business-name">Nama Bisnis</Label>
                    <Input
                      id="business-name"
                      value={generalSettings.businessName}
                      onChange={(e) =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          businessName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-email">Email Bisnis</Label>
                    <Input
                      id="business-email"
                      type="email"
                      value={generalSettings.businessEmail}
                      onChange={(e) =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          businessEmail: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-phone">Nomor Telepon</Label>
                    <Input
                      id="business-phone"
                      value={generalSettings.businessPhone}
                      onChange={(e) =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          businessPhone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-address">Alamat</Label>
                    <Textarea
                      id="business-address"
                      value={generalSettings.businessAddress}
                      onChange={(e) =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          businessAddress: e.target.value,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferensi Regional</CardTitle>
                  <CardDescription>
                    Pengaturan zona waktu, mata uang, dan bahasa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="timezone">Zona Waktu</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          timezone: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Jakarta">
                          WIB (GMT+7)
                        </SelectItem>
                        <SelectItem value="Asia/Makassar">
                          WITA (GMT+8)
                        </SelectItem>
                        <SelectItem value="Asia/Jayapura">
                          WIT (GMT+9)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Mata Uang</Label>
                    <Select
                      value={generalSettings.currency}
                      onValueChange={(value) =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          currency: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IDR">
                          Indonesian Rupiah (IDR)
                        </SelectItem>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Bahasa</Label>
                    <Select
                      value={generalSettings.language}
                      onValueChange={(value) =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          language: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-4">
                    <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Pengaturan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profil Admin
                  </CardTitle>
                  <CardDescription>
                    Kelola informasi profil administrator
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-white">
                        A
                      </span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Foto
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG up to 2MB
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label htmlFor="admin-name">Nama Lengkap</Label>
                    <Input id="admin-name" defaultValue="Administrator" />
                  </div>
                  <div>
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      defaultValue="admin@baelangan.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-phone">Nomor Telepon</Label>
                    <Input id="admin-phone" defaultValue="+62 812-3456-7890" />
                  </div>
                  <div>
                    <Label htmlFor="admin-role">Role</Label>
                    <Input
                      id="admin-role"
                      defaultValue="Super Administrator"
                      disabled
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informasi Akun</CardTitle>
                  <CardDescription>
                    Status dan riwayat akun administrator
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status Akun</span>
                    <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Terakhir Login
                    </span>
                    <span className="text-sm font-medium">Hari ini, 14:30</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Dibuat</span>
                    <span className="text-sm font-medium">1 Januari 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Login</span>
                    <span className="text-sm font-medium">247 kali</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Permission</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          ✓ Kelola Pesanan
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          ✓ Kelola Tema
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          ✓ Kelola Pelanggan
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          ✓ Pengaturan Sistem
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifikasi In-App
                  </CardTitle>
                  <CardDescription>
                    Pengaturan notifikasi dalam aplikasi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pesanan Baru</p>
                      <p className="text-sm text-gray-500">
                        Notifikasi saat ada pesanan baru masuk
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newOrders}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          newOrders: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Update Pesanan</p>
                      <p className="text-sm text-gray-500">
                        Notifikasi saat status pesanan berubah
                      </p>
                    </div>
                    <Switch
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          orderUpdates: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pesan Pelanggan</p>
                      <p className="text-sm text-gray-500">
                        Notifikasi saat ada pesan dari pelanggan
                      </p>
                    </div>
                    <Switch
                      checked={notifications.customerMessages}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          customerMessages: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alert Sistem</p>
                      <p className="text-sm text-gray-500">
                        Notifikasi sistem dan maintenance
                      </p>
                    </div>
                    <Switch
                      checked={notifications.systemAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          systemAlerts: checked,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Notifikasi External
                  </CardTitle>
                  <CardDescription>
                    Pengaturan notifikasi via email dan SMS
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifikasi</p>
                      <p className="text-sm text-gray-500">
                        Terima notifikasi via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          emailNotifications: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifikasi</p>
                      <p className="text-sm text-gray-500">
                        Terima notifikasi via SMS
                      </p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          smsNotifications: checked,
                        }))
                      }
                    />
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="email-frequency">Frekuensi Email</Label>
                    <Select defaultValue="instant">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant">Langsung</SelectItem>
                        <SelectItem value="hourly">Setiap Jam</SelectItem>
                        <SelectItem value="daily">Harian</SelectItem>
                        <SelectItem value="weekly">Mingguan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quiet-hours">Jam Tenang</Label>
                    <p className="text-sm text-gray-500 mb-2">
                      Tidak ada notifikasi pada jam ini
                    </p>
                    <div className="flex gap-2">
                      <Input placeholder="22:00" />
                      <span className="flex items-center">-</span>
                      <Input placeholder="07:00" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Password & Login
                  </CardTitle>
                  <CardDescription>
                    Kelola password dan pengaturan login
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Password Saat Ini</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">Password Baru</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">
                      Konfirmasi Password Baru
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                    Update Password
                  </Button>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">
                          Tambahan keamanan dengan 2FA
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Login Alerts</p>
                        <p className="text-sm text-gray-500">
                          Notifikasi saat login dari device baru
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Login</CardTitle>
                  <CardDescription>Aktivitas login terbaru</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-medium">Chrome - Jakarta</p>
                          <p className="text-sm text-gray-500">
                            Saat ini • 192.168.1.100
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Aktif
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                        <div>
                          <p className="font-medium">Safari - iPhone</p>
                          <p className="text-sm text-gray-500">
                            2 jam lalu • 10.0.0.50
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Logout
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                        <div>
                          <p className="font-medium">Firefox - Bandung</p>
                          <p className="text-sm text-gray-500">
                            1 hari lalu • 192.168.2.15
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">Expired</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Tema & Tampilan
                  </CardTitle>
                  <CardDescription>
                    Kustomisasi tampilan dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Mode Tema</Label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div className="border rounded-lg p-3 text-center cursor-pointer bg-white">
                        <div className="h-8 w-full bg-gray-100 rounded mb-2"></div>
                        <span className="text-sm">Light</span>
                      </div>
                      <div className="border rounded-lg p-3 text-center cursor-pointer">
                        <div className="h-8 w-full bg-gray-800 rounded mb-2"></div>
                        <span className="text-sm">Dark</span>
                      </div>
                      <div className="border rounded-lg p-3 text-center cursor-pointer">
                        <div className="h-8 w-full bg-gradient-to-r from-gray-100 to-gray-800 rounded mb-2"></div>
                        <span className="text-sm">Auto</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Warna Aksen</Label>
                    <div className="flex gap-2 mt-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 border-2 border-gray-300 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-pink-500 cursor-pointer"></div>
                    </div>
                  </div>

                  <div>
                    <Label>Ukuran Font</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Kecil</SelectItem>
                        <SelectItem value="medium">Sedang</SelectItem>
                        <SelectItem value="large">Besar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sidebar Compact</p>
                      <p className="text-sm text-gray-500">
                        Gunakan sidebar yang lebih kecil
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Layout Preferences</CardTitle>
                  <CardDescription>
                    Pengaturan tata letak dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sticky Header</p>
                      <p className="text-sm text-gray-500">
                        Header tetap di atas saat scroll
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-hide Sidebar</p>
                      <p className="text-sm text-gray-500">
                        Sidebar hilang otomatis di mobile
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dense Tables</p>
                      <p className="text-sm text-gray-500">
                        Tampilkan lebih banyak data dalam tabel
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div>
                    <Label>Items per Page</Label>
                    <Select defaultValue="20">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 items</SelectItem>
                        <SelectItem value="20">20 items</SelectItem>
                        <SelectItem value="50">50 items</SelectItem>
                        <SelectItem value="100">100 items</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Reset ke Default</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System */}
          <TabsContent value="system">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Sistem & Database
                  </CardTitle>
                  <CardDescription>
                    Informasi sistem dan maintenance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Versi Aplikasi
                    </span>
                    <Badge variant="outline">v1.0.0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Database Status
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      Online
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Backup</span>
                    <span className="text-sm font-medium">2 jam lalu</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Storage Used</span>
                    <span className="text-sm font-medium">2.3 GB / 10 GB</span>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Database className="h-4 w-4 mr-2" />
                      Backup Database
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Integrasi & API
                  </CardTitle>
                  <CardDescription>
                    Pengaturan integrasi external
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Gateway</p>
                      <p className="text-sm text-gray-500">
                        Midtrans Integration
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Connected
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">WhatsApp API</p>
                      <p className="text-sm text-gray-500">
                        Untuk notifikasi customer
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Connected
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Service</p>
                      <p className="text-sm text-gray-500">
                        SMTP Configuration
                      </p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Pending
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Google Analytics</p>
                      <p className="text-sm text-gray-500">
                        Tracking & Analytics
                      </p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">
                      Disabled
                    </Badge>
                  </div>

                  <Separator />

                  <Button variant="outline" className="w-full">
                    <Key className="h-4 w-4 mr-2" />
                    Manage API Keys
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
