"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-coffee-deep px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl md:text-4xl text-beige-light font-bold uppercase tracking-wider">
            Admin Panel
          </h1>
          <p className="text-beige-medium text-sm mt-3 font-heading">
            Nerospace Designs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-beige-medium text-xs tracking-widest uppercase mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-4 py-3 font-heading text-sm focus:border-beige-medium focus:outline-none transition-colors placeholder:text-beige-medium/40"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm font-heading">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-coffee-accent text-beige-light py-3 text-sm tracking-[0.2em] uppercase font-semibold hover:bg-beige-warm hover:text-coffee-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-beige-medium/40 text-xs mt-8 font-heading">
          &copy; 2024 Nerospace Designs
        </p>
      </div>
    </div>
  );
}
