"use client";
 
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save, Image as ImageIcon, MapPin, Tag, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { MultiImageUpload } from "@/components/admin/MultiImageUpload";
import { toast } from "sonner";
import { createProperty, updateProperty } from "@/services/admin.service";
import { PropertyInput, Property } from "@/types/property.types";
import { createClient } from "@/utils/supabase/client";
 
interface PropertyFormProps {
  initialData?: Property;
  mode: "add" | "edit";
}
 
export function PropertyForm({ initialData, mode }: PropertyFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(initialData?.images?.map((img: any) => img.imageUrl) || []);
  const [selectedPaymentSchemas, setSelectedPaymentSchemas] = useState<string[]>(
    initialData?.paymentSchema ? initialData.paymentSchema.split(", ") : []
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = useMemo(() => createClient(), []);
 
  const handleImagesChange = (newFiles: File[], keptUrls: string[]) => {
    setImageFiles(newFiles);
    setExistingImageUrls(keptUrls);
  };
 
  const handlePaymentChange = (option: string, checked: boolean) => {
    setSelectedPaymentSchemas(prev => 
      checked ? [...prev, option] : prev.filter(item => item !== option)
    );
  };
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
 
    if (imageFiles.length === 0 && existingImageUrls.length === 0) {
      toast.error("Harap unggah setidaknya satu gambar.");
      setIsLoading(false);
      return;
    }
 
    const formData = new FormData(e.currentTarget);
    
    const saveAction = async () => {
      // 1. Upload new images
      const newUploadedUrls: string[] = [];
      
      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `properties/${fileName}`;
 
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, file);
 
        if (uploadError) throw new Error(`Gagal mengunggah gambar: ${file.name}`);
 
        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);
 
        newUploadedUrls.push(publicUrl);
      }
 
      // 2. Prepare final URLs list (Existing kept + New uploaded)
      const finalImages = [...existingImageUrls, ...newUploadedUrls];
 
      // 3. Prepare data
      const data: PropertyInput = {
        title: (formData.get("title") as string) || "",
        slug: ((formData.get("title") as string) || "").toLowerCase().replace(/ /g, "-"),
        description: (formData.get("description") as string) || "",
        price: (formData.get("price") as string) || "0",
        city: (formData.get("city") as string) || "",
        address: (formData.get("address") as string) || "",
        bedrooms: (formData.get("bedrooms") as string) || "0",
        bathrooms: (formData.get("bathrooms") as string) || "0",
        landSize: (formData.get("landSize") as string) || "0",
        buildingSize: (formData.get("buildingSize") as string) || "0",
        propertyType: (formData.get("propertyType") as string) || "Rumah",
        paymentSchema: selectedPaymentSchemas.length > 0 ? selectedPaymentSchemas.join(", ") : null,
        status: (formData.get("status") as string) || "available",
        images: finalImages,
        featured: formData.get("featured") === "on",
      };
 
 
      // 4. Create or Update in DB
      if (mode === "edit" && initialData?.id) {
        return await updateProperty(initialData.id, data);
      } else {
        return await createProperty(data);
      }
    };
 
    try {
      const promise = saveAction();
      toast.promise(promise, {
        loading: mode === "edit" ? 'Memperbarui properti...' : 'Menambahkan properti...',
        success: mode === "edit" ? 'Properti berhasil diperbarui!' : 'Properti berhasil ditambahkan!',
        error: (err) => err.message || 'Terjadi kesalahan.',
      });
      
      await promise;
      await queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
      
      setIsLoading(false);
      router.push("/admin/properties");
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
 
  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <Card className="border-none shadow-md overflow-hidden bg-background/50 backdrop-blur">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-primary" />
              Informasi Dasar
            </CardTitle>
            <CardDescription>Masukkan detail utama mengenai properti Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold">Judul Properti</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="Contoh: Modern Emerald Villa" 
                required 
                className="bg-background" 
                defaultValue={initialData?.title}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold">Deskripsi</Label>
              <Textarea 
                id="description" 
                name="description" 
                rows={6} 
                placeholder="Ceritakan tentang daya tarik utama properti ini..." 
                required 
                className="bg-background resize-none"
                defaultValue={initialData?.description}
              />
            </div>
          </CardContent>
        </Card>
 
        <Card className="border-none shadow-md overflow-hidden bg-background/50 backdrop-blur">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              Lokasi
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 pt-6">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-semibold">Kota</Label>
              <Input 
                id="city" 
                name="city" 
                placeholder="Contoh: Bandung" 
                required 
                className="bg-background" 
                defaultValue={initialData?.city}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-semibold">Alamat Lengkap</Label>
              <Input 
                id="address" 
                name="address" 
                placeholder="Contoh: Jl. Emerald No. 123" 
                required 
                className="bg-background" 
                defaultValue={initialData?.address}
              />
            </div>
          </CardContent>
        </Card>
 
        <Card className="border-none shadow-md overflow-hidden bg-background/50 backdrop-blur">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Tag className="h-5 w-5 text-primary" />
              Spesifikasi & Harga
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-semibold">Harga (IDR)</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                placeholder="1500000000" 
                required 
                className="bg-background font-mono" 
                defaultValue={initialData?.price}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bedrooms" className="text-sm font-semibold">Kamar Tidur</Label>
              <Input 
                id="bedrooms" 
                name="bedrooms" 
                type="number" 
                required 
                className="bg-background text-center" 
                defaultValue={initialData?.bedrooms || 0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms" className="text-sm font-semibold">Kamar Mandi</Label>
              <Input 
                id="bathrooms" 
                name="bathrooms" 
                type="number" 
                required 
                className="bg-background text-center" 
                defaultValue={initialData?.bathrooms || 0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landSize" className="text-sm font-semibold">Luas Tanah (m²)</Label>
              <Input 
                id="landSize" 
                name="landSize" 
                type="number" 
                placeholder="120" 
                required 
                className="bg-background text-center" 
                defaultValue={initialData?.landSize}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buildingSize" className="text-sm font-semibold">Luas Bangunan (m²)</Label>
              <Input 
                id="buildingSize" 
                name="buildingSize" 
                type="number" 
                placeholder="90" 
                className="bg-background text-center" 
                defaultValue={initialData?.buildingSize}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyType" className="text-sm font-semibold">Tipe Properti</Label>
              <Select name="propertyType" defaultValue={initialData?.propertyType || "Rumah"}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Pilih tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rumah">Rumah</SelectItem>
                  <SelectItem value="Apartemen">Apartemen</SelectItem>
                  <SelectItem value="Ruko">Ruko</SelectItem>
                  <SelectItem value="Tanah">Tanah</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-full space-y-4 pt-4 border-t mt-2">
              <Label className="text-sm font-semibold">Skema Pembayaran (Bisa pilih lebih dari satu)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border bg-muted/20">
                {["CASH KERAS", "CASH BERTAHAP", "KPR BANK", "KPR DEVELOPER"].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`pay-${option}`} 
                      checked={selectedPaymentSchemas.includes(option)}
                      onCheckedChange={(checked) => handlePaymentChange(option, !!checked)}
                    />
                    <Label 
                      htmlFor={`pay-${option}`}
                      className="text-xs font-normal cursor-pointer hover:text-primary transition-colors"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
 
      <div className="space-y-8">
        <Card className="border-none shadow-md overflow-hidden bg-background/50 backdrop-blur">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ImageIcon className="h-5 w-5 text-primary" />
              Media
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <MultiImageUpload 
              onImagesChange={handleImagesChange}
              initialUrls={initialData?.images?.map((img: any) => img.imageUrl) || []}
              maxImages={10}
            />
 
            <div className="flex items-center space-x-2 pt-2 border-t mt-4">
              <input 
                type="checkbox" 
                id="featured" 
                name="featured" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                defaultChecked={initialData?.featured}
              />
              <Label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Tandai sebagai Unggulan
              </Label>
            </div>
          </CardContent>
        </Card>
 
        <Card className="border-none shadow-md overflow-hidden bg-background/50 backdrop-blur">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Tag className="h-5 w-5 text-primary" />
              Status Listing
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Select name="status" defaultValue={initialData?.status || "available"}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Tersedia (Available)
                  </div>
                </SelectItem>
                <SelectItem value="unavailable">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Tidak Tersedia
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
 
            <p className="mt-2 text-[10px] text-muted-foreground italic">
              Status ini akan menentukan bagaimana properti ditampilkan di website publik.
            </p>
          </CardContent>
        </Card>
 
        <div className="sticky bottom-4 space-y-2">
          <Button type="submit" className="w-full py-6 text-lg font-bold shadow-lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                {mode === "edit" ? "Perbarui Properti" : "Simpan Properti"}
              </>
            )}
          </Button>
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/admin/properties">Batalkan</Link>
          </Button>
        </div>
      </div>
    </form>
  );
}
