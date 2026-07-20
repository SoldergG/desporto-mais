"use client";

import Image from "next/image";
import { useState } from "react";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  currentImageSrc?: string | null;
};

export function ImageUploadField({ name, label, currentImageSrc }: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div>
      <label className="block text-sm font-medium text-ink">{label}</label>
      <div className="mt-2 flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-border bg-cream">
          {(preview ?? currentImageSrc) && (
            <Image
              src={preview ?? currentImageSrc!}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          )}
        </div>
        <input
          type="file"
          name={name}
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            const file = event.target.files?.[0];
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
          className="block text-sm text-ink-muted file:mr-4 file:h-9 file:border file:border-border file:bg-paper file:px-3 file:text-xs file:uppercase file:tracking-[0.08em] file:text-ink"
        />
      </div>
      <p className="mt-1.5 text-xs text-ink-muted">JPEG, PNG ou WebP, até 5MB. Deixa em branco para manter a imagem atual.</p>
    </div>
  );
}
