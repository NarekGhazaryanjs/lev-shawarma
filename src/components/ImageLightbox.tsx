"use client";

import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

export function ImageLightbox({
  src,
  alt,
  subtitle,
  open,
  onClose,
}: {
  src: string;
  alt: string;
  subtitle?: string;
  open: boolean;
  onClose: () => void;
}) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="image-lightbox" role="presentation">
      <button
        type="button"
        className="image-lightbox-backdrop"
        aria-label="Փակել"
        onClick={handleClose}
      />

      <button
        type="button"
        className="image-lightbox-close"
        onClick={handleClose}
        aria-label="Փակել"
      >
        <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <figure className="image-lightbox-panel" role="dialog" aria-modal="true" aria-label={alt}>
        <img src={src} alt={alt} className="image-lightbox-image" draggable={false} />
        <figcaption className="image-lightbox-caption">
          <span className="image-lightbox-title">{alt}</span>
          {subtitle ? <span className="image-lightbox-subtitle">{subtitle}</span> : null}
        </figcaption>
      </figure>
    </div>,
    document.body
  );
}
