"use client";
import { useState } from "react";
import OverlayMessage from "./OverlayMessage";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [overlayMessage, setOverlayMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("username", data.user.username);
      window.location.href = "/notes";
    } else {
      setOverlayMessage(data.message);
    }
  };

  return (
    <div className="glass p-8 w-full max-w-md text-white shadow-glass">
      <OverlayMessage
        message={overlayMessage}
        onConfirm={() => setOverlayMessage(null)}
      />
      <div className="flex justify-center mb-6">
        <h2 className="text-3xl font-bold text-glass-blue-light drop-shadow-lg bg-white/70 px-4 py-2 rounded-lg inline-block shadow-md">Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 rounded bg-glass-white/30 text-white placeholder-white border border-glass-blue-light focus:outline-none focus:ring-2 focus:ring-glass-blue-light"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-3 rounded bg-glass-white/30 text-white placeholder-white border border-glass-blue-light focus:outline-none focus:ring-2 focus:ring-glass-blue-light"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-glass-blue-light/80 border border-glass-blue-light hover:bg-glass-blue transition rounded p-3 text-white font-semibold shadow-glass"
          type="submit"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
