"use client";

import { useEffect, useRef, useState } from "react";

interface ImageCropperProps {
  file: File;
  /** Crop frame aspect ratio (width / height) — taken from the image slot on the page. */
  aspect: number;
  onCancel: () => void;
  onDone: (blob: Blob) => void;
}

/**
 * Dev-only pan/zoom cropper. The frame matches the aspect ratio of the image
 * slot that was right-clicked, so what you frame is exactly what renders.
 * Export is WebP via canvas.toBlob (native in Chrome/Edge/Firefox); browsers
 * that can't encode WebP (Safari) fall back to JPEG automatically.
 */
export function ImageCropper({ file, aspect, onCancel, onDone }: ImageCropperProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [busy, setBusy] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  const [frameW] = useState(() => Math.min(560, window.innerWidth - 64));
  const frameH = Math.max(80, Math.round(frameW / aspect));

  // Create the object URL inside the effect so React StrictMode's dev-only
  // mount→unmount→mount cycle can't leave the <img> pointing at a revoked URL.
  useEffect(() => {
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  const coverScale = natural ? Math.max(frameW / natural.w, frameH / natural.h) : 1;
  const scale = coverScale * zoom;

  const clampOff = (o: { x: number; y: number }, s = scale) => {
    if (!natural) return o;
    const dw = natural.w * s;
    const dh = natural.h * s;
    return { x: Math.min(0, Math.max(frameW - dw, o.x)), y: Math.min(0, Math.max(frameH - dh, o.y)) };
  };

  const onLoad = () => {
    const img = imgRef.current!;
    const n = { w: img.naturalWidth, h: img.naturalHeight };
    setNatural(n);
    const s = Math.max(frameW / n.w, frameH / n.h);
    setOff({ x: (frameW - n.w * s) / 2, y: (frameH - n.h * s) / 2 });
  };

  const onZoom = (z: number) => {
    if (!natural) return;
    const oldS = scale;
    const newS = coverScale * z;
    // Keep the frame centre fixed while zooming.
    const cx = (frameW / 2 - off.x) / oldS;
    const cy = (frameH / 2 - off.y) / oldS;
    setZoom(z);
    setOff(clampOff({ x: frameW / 2 - cx * newS, y: frameH / 2 - cy * newS }, newS));
  };

  const exportBlob = () => {
    if (!natural || busy) return;
    setBusy(true);
    const sx = -off.x / scale;
    const sy = -off.y / scale;
    const sw = frameW / scale;
    const sh = frameH / scale;
    const outW = Math.max(1, Math.min(1600, Math.round(sw)));
    const outH = Math.max(1, Math.round((outW * frameH) / frameW));
    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    canvas.getContext("2d")!.drawImage(imgRef.current!, sx, sy, sw, sh, 0, 0, outW, outH);
    canvas.toBlob(
      (blob) => {
        if (blob?.type === "image/webp") return onDone(blob);
        // Safari can't encode WebP — fall back to JPEG.
        canvas.toBlob((jpg) => (jpg ? onDone(jpg) : onCancel()), "image/jpeg", 0.85);
      },
      "image/webp",
      0.85,
    );
  };

  return (
    <div data-dev-ui className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4">
      <div className="rounded-lg bg-white p-4 text-gray-900 shadow-2xl">
        <div
          role="application"
          aria-label="Crop image — drag to reposition"
          className="relative cursor-grab touch-none overflow-hidden rounded-md bg-gray-100 active:cursor-grabbing"
          style={{ width: frameW, height: frameH }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drag.current = { sx: e.clientX, sy: e.clientY, ox: off.x, oy: off.y };
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            setOff(clampOff({ x: drag.current.ox + e.clientX - drag.current.sx, y: drag.current.oy + e.clientY - drag.current.sy }));
          }}
          onPointerUp={() => (drag.current = null)}
        >
          {/* Plain <img>: this is a local object URL inside a dev-only tool. */}
          {url && (
            <img
              ref={imgRef}
              src={url}
              alt=""
              draggable={false}
              onLoad={onLoad}
              onError={onCancel}
              className="absolute max-w-none select-none"
              style={natural ? { left: off.x, top: off.y, width: natural.w * scale, height: natural.h * scale } : { visibility: "hidden" }}
            />
          )}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <label className="flex flex-1 items-center gap-2 text-xs font-medium text-gray-500">
            Zoom
            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={zoom}
              onChange={(e) => onZoom(Number(e.target.value))}
              className="flex-1 accent-gray-900"
            />
          </label>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={exportBlob}
            disabled={!natural || busy}
            className="rounded-md bg-gray-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
