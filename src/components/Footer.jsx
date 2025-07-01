"use client";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 glass shadow-glass flex items-center justify-center px-8 py-4 backdrop-blur-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm text-glass-blue-light drop-shadow">
          © 2025 MyNotes. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
