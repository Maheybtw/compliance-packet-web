"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export function RegisterKey() {
  const [email, setEmail] = useState("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setApiKey(null);

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          label: label.trim() || "default",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        const message = json?.error || `Request failed with status ${res.status}`;
        throw new Error(message);
      }

      setApiKey(json.apiKey);
    } catch (err: any) {
      setError(err?.message || "Failed to register API key.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 border border-slate-800 rounded-xl bg-slate-900/60 p-4 md:p-5">
      <h2 className="text-lg font-semibold text-slate-50 mb-2">
        Get an API key
      </h2>
      <p className="text-xs text-slate-300 mb-4">
        Enter your email to generate an API key using the{" "}
        <code className="font-mono bg-slate-950/70 px-1 py-0.5 rounded">
          /register
        </code>{" "}
        endpoint.
      </p>

      <form onSubmit={handleRegister} className="space-y-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Email
          </label>
          <input
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-xs text-slate-50 outline-none focus:border-emerald-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Key label (optional)
          </label>
          <input
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-xs text-slate-50 outline-none focus:border-emerald-400"
            placeholder="e.g. local-dev"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-md bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate API key"}
        </button>
      </form>

      {error && (
        <p className="text-xs text-red-400 mb-2">
          Error: {error}
        </p>
      )}

      {apiKey && (
        <div className="mt-2">
          <p className="text-xs font-medium text-slate-300 mb-1">
            Your API key (store this securely):
          </p>
          <div className="flex items-center gap-2">
            <code className="font-mono text-[11px] bg-slate-950/80 px-2 py-1 rounded text-emerald-300 break-all">
              {apiKey}
            </code>
          </div>
        </div>
      )}
    </section>
  );
}