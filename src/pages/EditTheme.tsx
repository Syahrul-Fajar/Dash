import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  ArrowLeft,
  Save,
  Eye,
  Upload,
  Palette,
  Image,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
  Play,
  Pause,
  Volume2,
  Download,
  Trash2,
  Copy,
  RefreshCw,
} from "lucide-react";

const EditTheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock theme data - in real app, this would be fetched based on ID
  const [theme, setTheme] = useState({
    id: id || "1",
    name: "Golden Elegance",
    category: "elegant",
    description: "Template elegan dengan nuansa emas dan putih yang mewah",
    status: "published",
    usage: 45,
    rating: 4.8,
    price: "premium",
    colors: {
      primary: "#D4AF37",
      secondary: "#FFFFFF",
      accent: "#F5F5DC",
      text: "#2C3E50",
      background: "#FAFAFA",
    },
    features: {
      rsvp: true,
      gallery: true,
      music: true,
      countdown: false,
      maps: false,
      guestbook: false,
      animation: "fade",
      parallax: false,
    },
    layout: {
      style: "single-page",
      sections: ["hero", "couple", "story", "gallery", "rsvp"],
      headerStyle: "fixed",
      footerStyle: "minimal",
    },
    content: {
      defaultMusic: "romantic-piano.mp3",
      defaultImages: ["/placeholder.svg"],
      fonts: {
        heading: "Playfair Display",
        body: "Open Sans",
      },
    },
    seo: {
      title: "Template Golden Elegance",
      description: "Template undangan digital elegan dengan nuansa emas",
      keywords: "undangan digital, elegant, emas, pernikahan",
    },
  });

  const [previewMode, setPreviewMode] = useState("desktop");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Handle form changes
  const handleBasicInfoChange = (field: string, value: string) => {
    setTheme((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleColorChange = (colorKey: string, value: string) => {
    setTheme((prev) => ({
      ...prev,
      colors: { ...prev.colors, [colorKey]: value },
    }));
    setHasUnsavedChanges(true);
  };

  const handleFeatureChange = (feature: string, value: boolean | string) => {
    setTheme((prev) => ({
      ...prev,
      features: { ...prev.features, [feature]: value },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saving theme:", theme);
    setHasUnsavedChanges(false);
    // Show success message
  };

  const handlePublish = () => {
    setTheme((prev) => ({ ...prev, status: "published" }));
    handleSave();
  };

  const handleDuplicate = () => {
    // Duplicate theme logic
    navigate("/themes/create", { state: { duplicateFrom: theme } });
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/themes")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Tema: {theme.name}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge
                  className={
                    theme.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {theme.status === "published" ? "Published" : "Draft"}
                </Badge>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">
                  {theme.usage} kali digunakan
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">Rating {theme.rating}/5</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <span className="text-sm text-orange-600 mr-2">
                Perubahan belum disimpan
              </span>
            )}
            <Button variant="outline" onClick={handleDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplikasi
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Simpan
            </Button>
            <Button
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              onClick={handlePublish}
            >
              <Upload className="h-4 w-4 mr-2" />
              {theme.status === "published" ? "Update" : "Publish"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Dasar</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="features">Fitur</TabsTrigger>
                <TabsTrigger value="content">Konten</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              {/* Basic Information */}
              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Dasar</CardTitle>
                    <CardDescription>Pengaturan dasar tema</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="theme-name">Nama Tema</Label>
                        <Input
                          id="theme-name"
                          value={theme.name}
                          onChange={(e) =>
                            handleBasicInfoChange("name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="theme-category">Kategori</Label>
                        <Select
                          value={theme.category}
                          onValueChange={(value) =>
                            handleBasicInfoChange("category", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
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
                    </div>

                    <div>
                      <Label htmlFor="theme-description">Deskripsi</Label>
                      <Textarea
                        id="theme-description"
                        value={theme.description}
                        onChange={(e) =>
                          handleBasicInfoChange("description", e.target.value)
                        }
                        className="h-24"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="theme-price">Tier Harga</Label>
                        <Select
                          value={theme.price}
                          onValueChange={(value) =>
                            handleBasicInfoChange("price", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
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
                      <div>
                        <Label htmlFor="theme-status">Status</Label>
                        <Select
                          value={theme.status}
                          onValueChange={(value) =>
                            handleBasicInfoChange("status", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Upload Thumbnail Baru</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">
                          Drag & drop atau klik untuk upload
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG up to 2MB
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Design Settings */}
              <TabsContent value="design">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Color Palette
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(theme.colors).map(([key, color]) => (
                          <div key={key}>
                            <Label className="capitalize">{key} Color</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <div
                                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                  const input = document.createElement("input");
                                  input.type = "color";
                                  input.value = color;
                                  input.onchange = (e) =>
                                    handleColorChange(
                                      key,
                                      (e.target as HTMLInputElement).value,
                                    );
                                  input.click();
                                }}
                              />
                              <Input
                                value={color}
                                onChange={(e) =>
                                  handleColorChange(key, e.target.value)
                                }
                                className="flex-1"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Typography</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Heading Font</Label>
                        <Select
                          value={theme.content.fonts.heading}
                          onValueChange={(value) =>
                            setTheme((prev) => ({
                              ...prev,
                              content: {
                                ...prev.content,
                                fonts: {
                                  ...prev.content.fonts,
                                  heading: value,
                                },
                              },
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Playfair Display">
                              Playfair Display
                            </SelectItem>
                            <SelectItem value="Great Vibes">
                              Great Vibes
                            </SelectItem>
                            <SelectItem value="Dancing Script">
                              Dancing Script
                            </SelectItem>
                            <SelectItem value="Cormorant Garamond">
                              Cormorant Garamond
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Body Font</Label>
                        <Select
                          value={theme.content.fonts.body}
                          onValueChange={(value) =>
                            setTheme((prev) => ({
                              ...prev,
                              content: {
                                ...prev.content,
                                fonts: { ...prev.content.fonts, body: value },
                              },
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Lato">Lato</SelectItem>
                            <SelectItem value="Source Sans Pro">
                              Source Sans Pro
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Layout & Animation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Template Style</Label>
                        <Select
                          value={theme.layout.style}
                          onValueChange={(value) =>
                            setTheme((prev) => ({
                              ...prev,
                              layout: { ...prev.layout, style: value },
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
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
                        <Select
                          value={theme.features.animation}
                          onValueChange={(value) =>
                            handleFeatureChange("animation", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fade">Fade In/Out</SelectItem>
                            <SelectItem value="slide">Slide</SelectItem>
                            <SelectItem value="parallax">Parallax</SelectItem>
                            <SelectItem value="none">No Animation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable Parallax</p>
                          <p className="text-sm text-gray-500">
                            Efek parallax pada background
                          </p>
                        </div>
                        <Switch
                          checked={theme.features.parallax}
                          onCheckedChange={(checked) =>
                            handleFeatureChange("parallax", checked)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Features */}
              <TabsContent value="features">
                <Card>
                  <CardHeader>
                    <CardTitle>Fitur Template</CardTitle>
                    <CardDescription>
                      Konfigurasi fitur yang tersedia dalam tema
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(theme.features)
                        .filter(
                          ([key]) =>
                            typeof theme.features[
                              key as keyof typeof theme.features
                            ] === "boolean",
                        )
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                              </p>
                              <p className="text-sm text-gray-500">
                                {key === "rsvp" && "Form konfirmasi kehadiran"}
                                {key === "gallery" && "Galeri foto pasangan"}
                                {key === "music" && "Background music"}
                                {key === "countdown" &&
                                  "Countdown timer ke hari H"}
                                {key === "maps" && "Integrasi Google Maps"}
                                {key === "guestbook" && "Buku tamu digital"}
                              </p>
                            </div>
                            <Switch
                              checked={value as boolean}
                              onCheckedChange={(checked) =>
                                handleFeatureChange(key, checked)
                              }
                            />
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content */}
              <TabsContent value="content">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Volume2 className="h-5 w-5" />
                        Default Music
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <div className="flex-1">
                          <p className="font-medium">
                            {theme.content.defaultMusic}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                              style={{ width: "35%" }}
                            ></div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Ganti
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Image className="h-5 w-5" />
                        Default Images
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {theme.content.defaultImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Default ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <Button variant="secondary" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                          <Upload className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* SEO */}
              <TabsContent value="seo">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO & Meta Data</CardTitle>
                    <CardDescription>
                      Optimasi untuk mesin pencari
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="seo-title">Meta Title</Label>
                      <Input
                        id="seo-title"
                        value={theme.seo.title}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, title: e.target.value },
                          }))
                        }
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {theme.seo.title.length}/60 karakter
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="seo-description">Meta Description</Label>
                      <Textarea
                        id="seo-description"
                        value={theme.seo.description}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, description: e.target.value },
                          }))
                        }
                        className="h-20"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {theme.seo.description.length}/160 karakter
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="seo-keywords">Keywords</Label>
                      <Input
                        id="seo-keywords"
                        value={theme.seo.keywords}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, keywords: e.target.value },
                          }))
                        }
                        placeholder="pisahkan dengan koma"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Preview
                  <div className="flex gap-1">
                    <Button
                      variant={
                        previewMode === "desktop" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewMode === "tablet" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("tablet")}
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewMode === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`mx-auto bg-white border rounded-lg overflow-hidden ${
                    previewMode === "desktop"
                      ? "w-full"
                      : previewMode === "tablet"
                        ? "w-80"
                        : "w-60"
                  }`}
                >
                  <div
                    className="h-64 bg-gradient-to-br flex items-center justify-center text-white relative"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    }}
                  >
                    <div className="text-center">
                      <h3
                        className="text-lg font-bold"
                        style={{ fontFamily: theme.content.fonts.heading }}
                      >
                        {theme.name}
                      </h3>
                      <p
                        className="text-sm mt-2"
                        style={{ fontFamily: theme.content.fonts.body }}
                      >
                        {theme.description}
                      </p>
                    </div>
                    {hasUnsavedChanges && (
                      <div className="absolute top-2 right-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-2 bg-gray-200 rounded"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Full Preview
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik Tema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Digunakan:</span>
                  <span className="font-medium">{theme.usage} kali</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium">{theme.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-medium">
                    Rp{" "}
                    {(
                      theme.usage *
                      (theme.price === "basic"
                        ? 99
                        : theme.price === "premium"
                          ? 199
                          : 399)
                    ).toLocaleString()}
                    K
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Modified:</span>
                  <span className="font-medium text-sm">Hari ini</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditTheme;
