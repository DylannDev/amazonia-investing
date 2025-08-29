"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/dashboard/button";

function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await authClient.$fetch("/sign-in/email", {
        method: "POST",
        body: { email, password },
      });
      if (!res.data) {
        setError("Échec de la connexion. Vérifiez vos identifiants.");
        setIsLoading(false);
        return;
      }
      router.push("/admin/clients");
    } catch {
      setError("Échec de la connexion. Vérifiez vos identifiants.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black px-4">
      <Logo className="mb-10" variant="white" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-gray-700 bg-black p-6"
      >
        <h1 className="text-center text-xl font-semibold text-white mb-8">
          Connexion Dashboard
        </h1>
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Email</label>
          <input
            className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@exemple.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Mot de passe</label>
          <input
            className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <Button
          size="sm"
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-white px-3 py-2 font-medium text-black hover:bg-gray-200 disabled:opacity-50"
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}

export default AdminPage;
