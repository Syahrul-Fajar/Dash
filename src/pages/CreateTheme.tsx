import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Copy,
  RefreshCw,
  Plus,
  Check,
} from "lucide-react";

const CreateTheme = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if duplicating from another theme
  const duplicateFrom = location.state?.duplicateFrom;

  const [theme, setTheme] = useState({
    name: duplicateFrom ? `${duplicateFrom.name} - Copy` : "",
    category: duplicateFrom?.category || "elegant",
    description: duplicateFrom?.description || "",
    status: "draft",
    price: duplicateFrom?.price || "premium",
    colors: duplicateFrom?.colors || {
      primary: "#D4AF37",
      secondary: "#FFFFFF",
      accent: "#F5F5DC",
      text: "#2C3E50",
      background: "#FAFAFA",
    },
    features: duplicateFrom?.features || {
      rsvp: true,
      gallery: true,
      music: true,
      countdown: false,
      maps: false,
      guestbook: false,
      animation: "fade",
      parallax: false,
    },
    layout: duplicateFrom?.layout || {
      style: "single-page",
      sections: ["hero", "couple", "story", "gallery", "rsvp"],
      headerStyle: "fixed",
      footerStyle: "minimal",
    },
    content: duplicateFrom?.content || {
      defaultMusic: "",
      defaultImages: [],
      fonts: {
        heading: "Playfair Display",
        body: "Open Sans",
      },
    },
    seo: duplicateFrom?.seo || {
      title: "",
      description: "",
      keywords: "",
    },
  });

  const [previewMode, setPreviewMode] = useState("desktop");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Handle form changes
  const handleBasicInfoChange = (field: string, value: string) => {
    setTheme((prev) => ({ ...prev, [field]: value }));
  };

  const handleColorChange = (colorKey: string, value: string) => {
    setTheme((prev) => ({
      ...prev,
      colors: { ...prev.colors, [colorKey]: value },
    }));
  };

  const handleFeatureChange = (feature: string, value: boolean | string) => {
    setTheme((prev) => ({
      ...prev,
      features: { ...prev.features, [feature]: value },
    }));
  };

  const handleSave = async (publish = false) => {
    setIsSaving(true);

    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const finalTheme = {
      ...theme,
      status: publish ? "published" : "draft",
      id: Date.now().toString(), // Generate temp ID
      usage: 0,
      rating: 0,
      createdDate: new Date().toISOString().split("T")[0],
    };

    console.log("Saving theme:", finalTheme);

    setIsSaving(false);
    setSaved(true);

    // Show success message
    setTimeout(() => {
      setSaved(false);
      if (publish) {
        navigate("/themes");
      }
    }, 2000);
  };

  const handlePublish = () => {
    handleSave(true);
  };

  const canSave = theme.name.trim() && theme.description.trim();

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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {duplicateFrom ? "Duplikasi Tema" : "Buat Tema Baru"}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Draft
                </Badge>
                {duplicateFrom && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Berdasarkan: {duplicateFrom.name}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saved && (
              <div className="flex items-center gap-2 text-green-600 mr-2">
                <Check className="h-4 w-4" />
                <span className="text-sm">Tersimpan!</span>
              </div>
            )}
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={!canSave || isSaving}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Draft
                </>
              )}
            </Button>
            <Button
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              onClick={handlePublish}
              disabled={!canSave || isSaving}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Publish Tema
                </>
              )}
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
                    <CardDescription>
                      Pengaturan dasar tema baru
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="theme-name">Nama Tema *</Label>
                        <Input
                          id="theme-name"
                          placeholder="Masukkan nama tema..."
                          value={theme.name}
                          onChange={(e) =>
                            handleBasicInfoChange("name", e.target.value)
                          }
                          className={
                            !theme.name.trim()
                              ? "border-red-300 focus:border-red-500"
                              : ""
                          }
                        />
                        {!theme.name.trim() && (
                          <p className="text-xs text-red-500 mt-1">
                            Nama tema wajib diisi
                          </p>
                        )}
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
                      <Label htmlFor="theme-description">Deskripsi *</Label>
                      <Textarea
                        id="theme-description"
                        placeholder="Jelaskan tema ini..."
                        value={theme.description}
                        onChange={(e) =>
                          handleBasicInfoChange("description", e.target.value)
                        }
                        className={cn(
                          "h-24",
                          !theme.description.trim()
                            ? "border-red-300 focus:border-red-500"
                            : "",
                        )}
                      />
                      {!theme.description.trim() && (
                        <p className="text-xs text-red-500 mt-1">
                          Deskripsi tema wajib diisi
                        </p>
                      )}
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
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Upload Thumbnail</Label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center mt-2 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">
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
                                className="w-8 h-8 rounded border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
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
                          <p className="text-sm text-gray-500 dark:text-gray-400">
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
                            className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700"
                          >
                            <div>
                              <p className="font-medium capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
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
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer">
                        <Volume2 className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Upload musik default
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          MP3, WAV up to 10MB
                        </p>
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
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                          <div className="text-center">
                            <Plus className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                            <p className="text-xs text-gray-400">Add Image</p>
                          </div>
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
                        placeholder="Template untuk undangan pernikahan..."
                        value={theme.seo.title}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, title: e.target.value },
                          }))
                        }
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {theme.seo.title.length}/60 karakter
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="seo-description">Meta Description</Label>
                      <Textarea
                        id="seo-description"
                        placeholder="Deskripsi singkat untuk search engine..."
                        value={theme.seo.description}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, description: e.target.value },
                          }))
                        }
                        className="h-20"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {theme.seo.description.length}/160 karakter
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="seo-keywords">Keywords</Label>
                      <Input
                        id="seo-keywords"
                        placeholder="undangan digital, pernikahan, tema elegant"
                        value={theme.seo.keywords}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, keywords: e.target.value },
                          }))
                        }
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Pisahkan dengan koma
                      </p>
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
                  className={`mx-auto bg-white dark:bg-gray-800 border rounded-lg overflow-hidden ${
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
                        {theme.name || "Nama Tema"}
                      </h3>
                      <p
                        className="text-sm mt-2"
                        style={{ fontFamily: theme.content.fonts.body }}
                      >
                        {theme.description ||
                          "Deskripsi tema akan muncul di sini"}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
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

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Progress Pembuatan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Informasi Dasar:
                  </span>
                  <Badge
                    className={
                      canSave
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {canSave ? "Complete" : "Incomplete"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Design:
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    Complete
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Fitur:
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    Complete
                  </Badge>
                </div>
                <Separator />
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {canSave
                      ? "Siap untuk disimpan atau dipublish!"
                      : "Lengkapi informasi dasar terlebih dahulu"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default CreateTheme;
