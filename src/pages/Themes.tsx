import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { Textarea } from "@/components/ui/textarea";
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
  Eye,
  Edit,
  Star,
  Heart,
  Palette,
  Image,
  Settings,
  Upload,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

const Themes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const themes = [
    {
      id: "1",
      name: "Golden Elegance",
      category: "Elegant",
      description: "Template elegan dengan nuansa emas dan putih yang mewah",
      status: "published",
      usage: 45,
      rating: 4.8,
      image: "/placeholder.svg",
      colors: ["#D4AF37", "#FFFFFF", "#F5F5DC"],
      features: ["Animasi Smooth", "Background Music", "RSVP Form", "Gallery"],
      price: "Premium",
      createdDate: "2024-01-10",
    },
    {
      id: "2",
      name: "Rose Garden",
      category: "Floral",
      description: "Template romantis dengan motif bunga mawar yang cantik",
      status: "published",
      usage: 32,
      rating: 4.9,
      image: "/placeholder.svg",
      colors: ["#FF69B4", "#FFB6C1", "#FFFFFF"],
      features: [
        "Parallax Effect",
        "Interactive Gallery",
        "Love Story Timeline",
      ],
      price: "Premium",
      createdDate: "2024-01-08",
    },
    {
      id: "3",
      name: "Modern Minimal",
      category: "Modern",
      description: "Design minimalis yang clean dan profesional",
      status: "published",
      usage: 28,
      rating: 4.7,
      image: "/placeholder.svg",
      colors: ["#2C3E50", "#FFFFFF", "#ECF0F1"],
      features: ["Fast Loading", "Mobile Optimized", "Simple Animation"],
      price: "Basic",
      createdDate: "2024-01-05",
    },
    {
      id: "4",
      name: "Classic Traditional",
      category: "Traditional",
      description: "Template klasik dengan sentuhan tradisional Indonesia",
      status: "draft",
      usage: 0,
      rating: 0,
      image: "/placeholder.svg",
      colors: ["#8B4513", "#DAA520", "#F5DEB3"],
      features: ["Cultural Elements", "Traditional Music", "Batik Patterns"],
      price: "Exclusive",
      createdDate: "2024-01-15",
    },
    {
      id: "5",
      name: "Romantic Sunset",
      category: "Romantic",
      description: "Template romantis dengan tema sunset yang hangat",
      status: "published",
      usage: 18,
      rating: 4.6,
      image: "/placeholder.svg",
      colors: ["#FF6B35", "#F7931E", "#FFE135"],
      features: ["Gradient Backgrounds", "Sunset Animation", "Love Quotes"],
      price: "Premium",
      createdDate: "2024-01-12",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Published
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Draft
          </Badge>
        );
      case "archived":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Archived
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriceBadge = (price: string) => {
    switch (price) {
      case "Basic":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Basic
          </Badge>
        );
      case "Premium":
        return (
          <Badge
            variant="outline"
            className="text-purple-600 border-purple-600"
          >
            Premium
          </Badge>
        );
      case "Exclusive":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Exclusive
          </Badge>
        );
      default:
        return <Badge variant="secondary">{price}</Badge>;
    }
  };

  const filteredThemes = themes.filter((theme) => {
    const matchesSearch =
      theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theme.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      theme.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Tema</h1>
            <p className="mt-2 text-gray-600">
              Kelola dan buat tema undangan digital yang menarik
            </p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Buat Tema Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Buat Tema Baru</DialogTitle>
                <DialogDescription>
                  Buat template undangan digital yang unik untuk pelanggan
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="basic" className="mt-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="features">Fitur</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="theme-name">Nama Tema</Label>
                        <Input
                          id="theme-name"
                          placeholder="Masukkan nama tema..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="theme-category">Kategori</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="elegant">Elegant</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="traditional">
                              Traditional
                            </SelectItem>
                            <SelectItem value="floral">Floral</SelectItem>
                            <SelectItem value="romantic">Romantic</SelectItem>
                            <SelectItem value="minimalist">
                              Minimalist
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="theme-price">Tier Harga</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tier harga" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">
                              Basic (Rp 99K)
                            </SelectItem>
                            <SelectItem value="premium">
                              Premium (Rp 199K)
                            </SelectItem>
                            <SelectItem value="exclusive">
                              Exclusive (Rp 399K)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="theme-description">Deskripsi</Label>
                        <Textarea
                          id="theme-description"
                          placeholder="Jelaskan tema ini..."
                          className="h-32"
                        />
                      </div>
                      <div>
                        <Label htmlFor="theme-image">Upload Thumbnail</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-500">
                            Drag & drop atau klik untuk upload
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG up to 2MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="design" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Palette className="h-5 w-5" />
                          Color Palette
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Primary Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-8 h-8 rounded border border-gray-300 bg-red-500"></div>
                            <Input value="#FF0000" className="flex-1" />
                          </div>
                        </div>
                        <div>
                          <Label>Secondary Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-8 h-8 rounded border border-gray-300 bg-orange-500"></div>
                            <Input value="#FFA500" className="flex-1" />
                          </div>
                        </div>
                        <div>
                          <Label>Accent Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-8 h-8 rounded border border-gray-300 bg-white"></div>
                            <Input value="#FFFFFF" className="flex-1" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Image className="h-5 w-5" />
                          Layout Options
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Template Style</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single-page">
                                Single Page
                              </SelectItem>
                              <SelectItem value="multi-section">
                                Multi Section
                              </SelectItem>
                              <SelectItem value="story-timeline">
                                Story Timeline
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Animation Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih animasi" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fade">Fade In/Out</SelectItem>
                              <SelectItem value="slide">Slide</SelectItem>
                              <SelectItem value="parallax">Parallax</SelectItem>
                              <SelectItem value="none">No Animation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Fitur Utama</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="rsvp"
                            className="rounded"
                            defaultChecked
                          />
                          <Label htmlFor="rsvp">RSVP Form</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="gallery"
                            className="rounded"
                            defaultChecked
                          />
                          <Label htmlFor="gallery">Photo Gallery</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="music"
                            className="rounded"
                            defaultChecked
                          />
                          <Label htmlFor="music">Background Music</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="countdown"
                            className="rounded"
                          />
                          <Label htmlFor="countdown">Countdown Timer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="maps"
                            className="rounded"
                          />
                          <Label htmlFor="maps">Google Maps</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="guestbook"
                            className="rounded"
                          />
                          <Label htmlFor="guestbook">Guest Book</Label>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Responsive Design</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-5 w-5 text-gray-500" />
                            <span>Desktop</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Optimized
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Tablet className="h-5 w-5 text-gray-500" />
                            <span>Tablet</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Optimized
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-5 w-5 text-gray-500" />
                            <span>Mobile</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Optimized
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="preview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preview Tema</CardTitle>
                      <CardDescription>
                        Lihat bagaimana tema akan terlihat untuk pelanggan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg p-8 bg-gray-50 text-center">
                        <div className="w-full h-64 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <p className="text-white text-lg font-semibold">
                            Preview akan ditampilkan di sini
                          </p>
                        </div>
                        <div className="mt-4 flex justify-center gap-4">
                          <Button variant="outline">
                            <Monitor className="h-4 w-4 mr-2" />
                            Desktop
                          </Button>
                          <Button variant="outline">
                            <Tablet className="h-4 w-4 mr-2" />
                            Tablet
                          </Button>
                          <Button variant="outline">
                            <Smartphone className="h-4 w-4 mr-2" />
                            Mobile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Batal
                </Button>
                <Button>Simpan sebagai Draft</Button>
                <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  Publish Tema
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Tema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari tema berdasarkan nama atau kategori..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="elegant">Elegant</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="traditional">Traditional</SelectItem>
                  <SelectItem value="floral">Floral</SelectItem>
                  <SelectItem value="romantic">Romantic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map((theme) => (
            <Card
              key={theme.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-gray-200 relative">
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {getStatusBadge(theme.status)}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {theme.name}
                  </h3>
                  {getPriceBadge(theme.price)}
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {theme.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{theme.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">
                      {theme.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    {theme.usage} kali digunakan
                  </span>
                  <div className="flex gap-1">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedTheme(theme)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{selectedTheme?.name}</DialogTitle>
                        <DialogDescription>
                          Preview dan detail tema {selectedTheme?.name}
                        </DialogDescription>
                      </DialogHeader>

                      {selectedTheme && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Preview</h4>
                              <div className="aspect-video bg-gray-200 rounded-lg">
                                <img
                                  src={selectedTheme.image}
                                  alt={selectedTheme.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Informasi Tema
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Kategori:
                                    </span>
                                    <span>{selectedTheme.category}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Tier:</span>
                                    <span>{selectedTheme.price}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Rating:
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                      {selectedTheme.rating}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Digunakan:
                                    </span>
                                    <span>{selectedTheme.usage} kali</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Fitur</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedTheme.features.map(
                                    (feature, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {feature}
                                      </Badge>
                                    ),
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">
                                  Color Palette
                                </h4>
                                <div className="flex gap-2">
                                  {selectedTheme.colors.map((color, index) => (
                                    <div key={index} className="text-center">
                                      <div
                                        className="w-8 h-8 rounded border border-gray-300 mb-1"
                                        style={{ backgroundColor: color }}
                                      />
                                      <span className="text-xs text-gray-600">
                                        {color}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Link to={`/themes/edit/${theme.id}`}>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Themes;
