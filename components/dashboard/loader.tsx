"use client";

import React from "react";

export interface LoaderProps {
  size?: number;
  className?: string;
}

export function Loader({ size = 28, className = "" }: LoaderProps) {
  const stroke = Math.max(2, Math.floor(size / 12));
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
      aria-label="Chargement"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="animate-spin text-blue-500"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          className="opacity-20"
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
        />
        <path
          d="M21 12a9 9 0 0 1-9 9"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          className="opacity-90"
        />
      </svg>
    </div>
  );
}

export default Loader;
