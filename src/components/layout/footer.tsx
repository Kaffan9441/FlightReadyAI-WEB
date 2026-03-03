"use client";

export function Footer() {
  return (
    <footer className="border-t border-glass-border">
      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-white">FlightReady</span>
          <span className="text-sm font-bold text-sky-500">AI</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-text-tertiary">
          &copy; 2026 FlightReadyAI
        </p>
      </div>
    </footer>
  );
}
