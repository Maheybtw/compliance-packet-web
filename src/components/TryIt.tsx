"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

type CompliancePacket = any; // you can tighten this later if you want

export function TryIt() {
  const [apiKey, setApiKey] = useState("");
  const [content, setContent] = useState("This is a harmless test message.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompliancePacket | null>(null);

  async function handleRun() {
    setError(null);
    setResult(null);

    if (!apiKey.trim()) {
      setError("Please enter an API key (from /register).");
      return;
    }

    if (!content.trim()) {
      setError("Please enter some content to check.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({ content }),
      });

      const text = await res.text();
      let json: any = null;

      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        // non-JSON response
      }

      if (!res.ok) {
        const message =
          (json && (json.error || json.message)) ||
          `Request failed with status ${res.status}`;
        throw new Error(message);
      }

      setResult(json);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 border border-slate-800 rounded-xl bg-slate-900/60 p-4 md:p-5">
      <h2 className="text-lg font-semibold text-slate-50 mb-2">
        6. Try it live
      </h2>
      <p className="text-xs text-slate-300 mb-4">
        Call your running API directly from the browser. Make sure your backend
        is running on <code className="font-mono">http://localhost:4000</code>.
      </p>

      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            API key
          </label>
          <input
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-xs text-slate-50 outline-none focus:border-emerald-400"
            placeholder="cpk_..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Content
          </label>
          <textarea
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-xs text-slate-50 outline-none focus:border-emerald-400 min-h-[80px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleRun}
        disabled={loading}
        className="inline-flex items-center rounded-md bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Checking..." : "Run check"}
      </button>

      {error && (
        <p className="mt-3 text-xs text-red-400">
          Error: {error}
        </p>
      )}

      {result && (
        <div className="mt-4">
          <p className="text-xs font-medium text-slate-300 mb-1">
            Response
          </p>
          <pre className="bg-slate-950/80 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto max-h-72">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
}