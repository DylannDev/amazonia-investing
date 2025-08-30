import React from "react";
import { Menu, X } from "lucide-react";

interface MobileOverlayProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileOverlay({ isOpen, onToggle }: MobileOverlayProps) {
  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={onToggle}
        className="fixed top-6 left-6 z-50 p-3 rounded-lg shadow-md border border-slate-100 md:hidden hover:bg-slate-50 transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-slate-600" />
        ) : (
          <Menu className="h-5 w-5 text-slate-600" />
        )}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={onToggle}
        />
      )}
    </>
  );
}
