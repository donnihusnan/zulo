import { useState, useRef, useEffect } from "react";
import { Upload, X, Globe } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface LocalImage {
  id: string;
  file?: File; // Present only for new uploads
  preview: string; // URL for display (Blob URL for new, Public URL for existing)
}

interface MultiImageUploadProps {
  onImagesChange: (files: File[], existingUrls: string[]) => void;
  initialUrls?: string[];
  maxImages?: number;
}

export function MultiImageUpload({ onImagesChange, initialUrls = [], maxImages = 10 }: MultiImageUploadProps) {
  const [images, setImages] = useState<LocalImage[]>(() =>
    initialUrls.map(url => ({
      id: url,
      preview: url
    }))
  );
  const isInitialized = useRef(initialUrls.length > 0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize from props if updated asynchronously
  useEffect(() => {
    if (!isInitialized.current && initialUrls.length > 0) {
      isInitialized.current = true;
      queueMicrotask(() => {
        setImages(initialUrls.map(url => ({
          id: url,
          preview: url
        })));
      });
    }
  }, [initialUrls]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(img => {
        if (img.preview.startsWith('blob:')) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  const notifyChange = (updatedImages: LocalImage[]) => {
    const newFiles = updatedImages
      .filter(img => img.file)
      .map(img => img.file as File);
    
    const existingUrls = updatedImages
      .filter(img => !img.file)
      .map(img => img.preview);
      
    onImagesChange(newFiles, existingUrls);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    const validFiles: File[] = [];
    for (const file of selectedFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`Format berkas "${file.name}" tidak didukung. Gunakan JPG, PNG, WebP, atau AVIF.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`Ukuran berkas "${file.name}" melebihi 5MB.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (images.length + validFiles.length > maxImages) {
      toast.error(`Maksimal ${maxImages} gambar diperbolehkan.`);
      return;
    }

    const newImages: LocalImage[] = validFiles.map(file => ({
      id: Math.random().toString(36).substring(2),
      file,
      preview: URL.createObjectURL(file)
    }));

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    notifyChange(updatedImages);
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    const imgToRemove = images[index];
    if (imgToRemove && imgToRemove.preview.startsWith('blob:')) {
      URL.revokeObjectURL(imgToRemove.preview);
    }
    
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    notifyChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((img, index) => (
          <div key={img.id} className="relative group aspect-square rounded-lg border overflow-hidden bg-muted shadow-sm hover:shadow-md transition-shadow">
            <Image
              src={img.preview}
              alt={`Upload ${index + 1}`}
              fill
              className="object-cover"
              unoptimized={img.preview.startsWith('blob:')}
            />
            
            {/* Server Badge */}
            {!img.file && (
              <div className="absolute bottom-1 left-1 bg-primary/80 backdrop-blur-sm text-[8px] text-white px-1.5 py-0.5 rounded flex items-center gap-1">
                <Globe className="h-2 w-2" />
                Diterbitkan
              </div>
            )}
            
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-black/60 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transform scale-100 sm:scale-90 sm:group-hover:scale-100 transition-all focus:opacity-100"
              aria-label="Hapus foto"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/60 hover:bg-primary/5 transition-all group"
          >
            <Upload className="h-8 w-8 text-muted-foreground/60 group-hover:text-primary/60 mb-2 transition-colors" />
            <span className="text-xs font-semibold text-muted-foreground/70 group-hover:text-primary/70">Tambah Foto</span>
          </button>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
      />
      <p className="text-[10px] text-muted-foreground italic flex items-center gap-1.5">
        <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
        Harap gunakan foto properti yang jernih dan berkualitas tinggi. (Maks {maxImages} foto)
      </p>
    </div>
  );
}


