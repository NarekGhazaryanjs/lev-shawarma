"use client";

import { useId, useRef, useState } from "react";

function ImageIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ImageUploadField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Խնդրում ենք ընտրել նկարի ֆայլ (JPG, PNG, WEBP)");
      return;
    }

    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onChange(data.url);
      } else {
        setError("Նկարը չհաջողվեց բեռնել։ Կրկին փորձեք։");
      }
    } catch {
      setError("Նկարը չհաջողվեց բեռնել։ Կրկին փորձեք։");
    } finally {
      setUploading(false);
    }
  }

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
    event.target.value = "";
  }

  function onDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void uploadFile(file);
  }

  function openPicker() {
    inputRef.current?.click();
  }

  if (value && !uploading) {
    return (
      <div className="space-y-3">
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={onFileChange}
        />
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
          <img src={value} alt="Ընտրված նկար" className="aspect-[4/3] w-full object-cover" />
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-brand" onClick={openPicker}>
            Փոխել նկարը
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => onChange("")}>
            Հեռացնել նկարը
          </button>
        </div>
        <p className="text-soft text-xs">Նկարը պահպանելու համար սեղմեք «Պահպանել» կոճակը։</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onFileChange}
        disabled={uploading}
      />
      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={[
          "image-upload-zone flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition",
          dragOver
            ? "border-brand bg-brand-soft/70"
            : "border-brand/35 bg-brand-soft/25 hover:border-brand hover:bg-brand-soft/45",
          uploading ? "pointer-events-none opacity-80" : "",
        ].join(" ")}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
          <ImageIcon />
        </div>
        <div>
          <p className="text-base font-bold text-ink">
            {uploading ? "Նկարը բեռնվում է..." : "Սեղմեք այստեղ նկար ընտրելու համար"}
          </p>
          <p className="text-soft mt-1 text-sm">
            {uploading ? "Խնդրում ենք սպասել մի քանի վայրկյան" : "կամ քաշեք նկարը այս տարածք"}
          </p>
        </div>
        {!uploading ? (
          <span className="btn btn-brand mt-1 shadow-sm">Ընտրել նկար</span>
        ) : (
          <span className="text-brand mt-1 inline-block h-6 w-6 animate-spin rounded-full border-2 border-brand/25 border-t-brand" />
        )}
      </label>
      {error ? <p className="text-brand text-sm font-semibold">{error}</p> : null}
    </div>
  );
}
