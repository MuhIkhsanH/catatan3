"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      router.push("/notes"); // sudah login
    } else {
      router.push("/login"); // belum login
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-glass-blue via-glass-blue-light to-glass-blue-dark">
      <p className="text-xl font-semibold text-glass-blue-light drop-shadow">Mengalihkan...</p>
    </div>
  );
}
