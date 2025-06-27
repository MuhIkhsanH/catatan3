"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("username"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass shadow-glass flex items-center justify-between px-8 py-4 backdrop-blur-lg">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-glass-blue-light drop-shadow">📝 MyNotes</span>
      </div>
      {loggedIn && (
        <button
          onClick={handleLogout}
          className="bg-glass-blue-light/80 hover:bg-glass-blue text-white px-4 py-2 rounded shadow-glass border border-glass-blue-light transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
