import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, ZoomIn, Check } from "lucide-react";

const STORAGE_KEY = "salman_avatar_v1";
const OUTPUT_SIZE = 512;

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (dataUrl: string | null) => void;
  currentSrc?: string | null;
};

export const AvatarEditor = ({ open, onClose, onSave, currentSrc }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const imageElRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (open && currentSrc && !imgSrc) {
      setImgSrc(currentSrc);
    }
  }, [open, currentSrc, imgSrc]);

  useEffect(() => {
    if (!imgSrc) {
      imageElRef.current = null;
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageElRef.current = img;
      // Reset transform to fit
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      drawCanvas(img, 1, { x: 0, y: 0 });
    };
    img.src = imgSrc;
  }, [imgSrc]);

  useEffect(() => {
    if (imageElRef.current) drawCanvas(imageElRef.current, zoom, offset);
  }, [zoom, offset]);

  const drawCanvas = (img: HTMLImageElement, z: number, o: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;

    ctx.clearRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

    // Cover-fit base scale
    const baseScale = Math.max(OUTPUT_SIZE / img.width, OUTPUT_SIZE / img.height);
    const scale = baseScale * z;
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const dx = (OUTPUT_SIZE - drawW) / 2 + o.x;
    const dy = (OUTPUT_SIZE - drawH) / 2 + o.y;

    ctx.save();
    // Circular crop preview
    ctx.beginPath();
    ctx.arc(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, dx, dy, drawW, drawH);
    ctx.restore();
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setImgSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ratio = OUTPUT_SIZE / rect.width;
    const dx = (e.clientX - dragRef.current.x) * ratio;
    const dy = (e.clientY - dragRef.current.y) * ratio;
    setOffset({ x: dragRef.current.ox + dx, y: dragRef.current.oy + dy });
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  const handleSave = () => {
    if (!canvasRef.current || !imageElRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl);
    } catch (err) {
      console.warn("Failed to persist avatar", err);
    }
    onSave(dataUrl);
    onClose();
  };

  const handleRemove = () => {
    localStorage.removeItem(STORAGE_KEY);
    setImgSrc(null);
    onSave(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="glass-strong relative w-full max-w-lg rounded-3xl p-6 space-y-5 animate-scale-in">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-display font-semibold">Edit Profile Photo</h3>
            <p className="text-sm text-muted-foreground">Upload, drag to position, zoom to crop.</p>
          </div>
          <button
            onClick={onClose}
            className="glass w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {!imgSrc ? (
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="glass cursor-pointer rounded-2xl border-dashed border-2 border-border/60 hover:border-primary/50 p-10 flex flex-col items-center justify-center gap-3 text-center transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary/20 flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Drop an image or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to ~5MB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative mx-auto w-64 h-64 rounded-full overflow-hidden glass-strong">
              <canvas
                ref={canvasRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="w-full h-full touch-none cursor-grab active:cursor-grabbing"
              />
            </div>

            <div className="flex items-center gap-3 px-1">
              <ZoomIn className="w-4 h-4 text-muted-foreground" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 accent-[hsl(var(--primary))]"
              />
              <span className="text-xs text-muted-foreground w-10 text-right">{zoom.toFixed(1)}x</span>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-primary hover:underline"
            >
              Choose a different image
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />

        <div className="flex flex-wrap gap-3 justify-end pt-2">
          {currentSrc && (
            <button
              onClick={handleRemove}
              className="glass inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-destructive hover:border-destructive/40 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Reset
            </button>
          )}
          <button
            onClick={onClose}
            className="glass inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium hover:border-primary/40 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!imgSrc}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium glow-ring hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            <Check className="w-4 h-4" />
            Save Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export const loadStoredAvatar = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};
