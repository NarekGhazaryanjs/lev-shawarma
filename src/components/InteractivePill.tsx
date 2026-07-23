import Link from "next/link";
import type { ReactNode } from "react";

type InteractivePillProps = {
  active?: boolean;
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

export function InteractivePill({
  active = false,
  children,
  className = "",
  href,
  onClick,
}: InteractivePillProps) {
  const classes = `pill ${active ? "pill-active" : ""} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
