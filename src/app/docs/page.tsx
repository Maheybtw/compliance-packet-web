"use client";
import { useState } from "react";
import { RegisterKey } from "@/components/RegisterKey";
import { TryIt } from "@/components/TryIt";
export default function DocsPage() {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

  const [usageApiKey, setUsageApiKey] = useState("");
  const [usageJson, setUsageJson] = useState<string | null>(null);
  const [usageLoading, setUsageLoading] = useState(false);
  const [usageError, setUsageError] = useState<string | null>(null);
  const [quickstartLang, setQuickstartLang] = useState<"curl" | "node" | "python">("curl");

  // Parse usage JSON for display
  let parsedUsage: any | null = null;
  if (usageJson) {
    try {
      parsedUsage = JSON.parse(usageJson);
    } catch {
      parsedUsage = null;
    }
  }

  async function handleGetUsage() {
    setUsageError(null);
    setUsageJson(null);
    setUsageLoading(true);

    try {
      const key = usageApiKey.trim();
      if (!key) {
        throw new Error("Please enter an API key.");
      }

      const res = await fetch(`${API_BASE_URL}/usage`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      const text = await res.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        // non-JSON, leave as raw text
      }

      if (!res.ok) {
        const message =
          (json && (json.error || json.message)) ||
          `Usage request failed with status ${res.status}`;
        throw new Error(message);
      }

      setUsageJson(json ? JSON.stringify(json, null, 2) : text);
    } catch (err: any) {
      console.error("Error fetching usage", err);
      setUsageError(err?.message || "Failed to fetch usage.");
    } finally {
      setUsageLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <header className="mb-8">
          <a href="/" className="text-xs text-emerald-300 hover:text-emerald-200">
            ← Back to home
          </a>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
            API Documentation
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            How to register, authenticate, and call the Universal Compliance Packet API.
          </p>
        </header>

        <section className="mb-8 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-200">
          <h2 className="text-lg font-semibold text-slate-50 mb-2">Quickstart</h2>
          <p className="text-xs text-slate-300 mb-3">
            The fastest way to get started is to generate an API key, then call{" "}
            <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">
              POST /check
            </code>{" "}
            with your content. Pick a language below and paste this into your app.
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px]">
            <button
              type="button"
              onClick={() => setQuickstartLang("curl")}
              className={`rounded-full px-3 py-1 border ${
                quickstartLang === "curl"
                  ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                  : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500"
              }`}
            >
              cURL
            </button>
            <button
              type="button"
              onClick={() => setQuickstartLang("node")}
              className={`rounded-full px-3 py-1 border ${
                quickstartLang === "node"
                  ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                  : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500"
              }`}
            >
              Node / TypeScript
            </button>
            <button
              type="button"
              onClick={() => setQuickstartLang("python")}
              className={`rounded-full px-3 py-1 border ${
                quickstartLang === "python"
                  ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                  : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500"
              }`}
            >
              Python
            </button>
          </div>

          <div className="text-[11px]">
            {quickstartLang === "curl" && (
              <pre className="bg-slate-950/80 rounded-lg border border-slate-800 p-3 text-slate-100 overflow-x-auto">
{`curl -X POST https://compliance-packet-api-production.up.railway.app/check \\
  -H "Authorization: Bearer cpk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Hello from Compliance Packet Quickstart."
  }'`}
              </pre>
            )}

            {quickstartLang === "node" && (
              <pre className="bg-slate-950/80 rounded-lg border border-slate-800 p-3 text-slate-100 overflow-x-auto">
{`import { createComplianceClient } from "./src/sdk/client";

const client = createComplianceClient({
  apiKey: process.env.COMPLIANCE_API_KEY || "cpk_your_api_key_here",
  baseUrl: process.env.COMPLIANCE_API_URL || "https://compliance-packet-api-production.up.railway.app",
});

async function main() {
  const packet = await client.check(
    "Hello from Compliance Packet Quickstart."
  );

  console.log("Decision:", packet.overall.recommendation);
  console.log("Safety score:", packet.safety.score);
}

main().catch(console.error);`}
              </pre>
            )}

            {quickstartLang === "python" && (
              <pre className="bg-slate-950/80 rounded-lg border border-slate-800 p-3 text-slate-100 overflow-x-auto">
{`from client import ComplianceClient

client = ComplianceClient(
    api_key="cpk_your_api_key_here",
    base_url="https://compliance-packet-api-production.up.railway.app",
)

packet = client.check("Hello from Compliance Packet Quickstart.")

print("Decision:", packet.overall.recommendation)
print("Safety score:", packet.safety.score)`}
              </pre>
            )}
          </div>
        </section>

        <section className="space-y-8 text-sm leading-relaxed text-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-50 mb-2">Base URL</h2>
            <p className="font-mono bg-slate-900/70 px-2 py-1 rounded-md text-xs inline-block">
              http://localhost:4000
            </p>
            <p className="mt-2 text-xs text-slate-400">
              In production, this will point at your deployed API (e.g. Fly.io, Render, Railway, etc.).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-50 mb-2">1. Register &amp; Get an API key</h2>
            <p className="mb-2">
              Call <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">POST /register</code> with your
              email to receive an API key:
            </p>
            <pre className="bg-slate-900/70 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto">
{`POST /register
Content-Type: application/json

{
  "email": "you@example.com",
  "label": "my-first-key"
}`}
            </pre>
            <p className="mt-2">Response:</p>
            <pre className="bg-slate-900/70 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto">
{`{
  "apiKey": "cpk_1234abcd..."
}`}
            </pre>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-50 mb-2">2. Authentication</h2>
            <p className="mb-2">All protected endpoints require a Bearer token:</p>
            <pre className="bg-slate-900/70 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto">
{`Authorization: Bearer cpk_1234abcd...`}
            </pre>
            <p className="mt-2 text-xs text-slate-400">
              Invalid or inactive keys return a structured JSON error:
            </p>
            <pre className="mt-1 bg-slate-900/70 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto">
{`{
  "error": {
    "code": "AUTH_INVALID_API_KEY",
    "message": "Invalid API key.",
    "status": 403
  }
}`}
            </pre>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-50 mb-2">3. Check content</h2>
            <p className="mb-2">
              Use <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">POST /check</code> to generate a
              compliance packet for any piece of text:
            </p>
            <pre className="bg-slate-900/70 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto">
{`curl -X POST http://localhost:4000/check \\
  -H "Authorization: Bearer cpk_1234abcd..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "This is a test message for compliance."
  }'`}
            </pre>
            <p className="mt-2">Response (simplified):</p>
            <pre className="bg-slate-900/70 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto">
{`{
  "safety": {
    "score": 0.1,
    "category": "low_risk",
    "flags": []
  },
  "copyright": {
    "risk": 0,
    "assessment": "low risk",
    "reason": "No copyrighted material detected."
  },
  "privacy": {
    "piiDetected": false,
    "piiTypes": [],
    "notes": []
  },
  "overall": {
    "complianceScore": 0.9,
    "recommendation": "allow",
    "notes": []
  },
  "meta": {
    "inputId": "uuid",
    "checkedAt": "timestamp",
    "modelVersion": "v1-llm"
  }
}`}
            </pre>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-50 mb-2">4. Usage endpoint</h2>
            <p className="mb-2">
              Use <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">GET /usage</code> to see usage
              stats for the current API key:
            </p>
            <pre className="bg-slate-900/70 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto">
{`GET /usage
Authorization: Bearer cpk_1234abcd...`}
            </pre>
            <p className="mt-2">Response (example):</p>
            <pre className="bg-slate-900/70 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto">
{`{
  "summary": {
    "totalChecks": 42,
    "allow": 30,
    "review": 8,
    "block": 4
  },
  "recent": [
    {
      "id": "uuid",
      "created_at": "2025-11-30T09:19:53.236Z",
      "safety_score": 0.1,
      "safety_category": "low_risk",
      "recommendation": "allow",
      "compliance_score": 0.9
    }
  ]
}`}
            </pre>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-50 mb-2">5. Node / TypeScript SDK</h2>
            <p className="mb-2">
              A minimal SDK is included in <code>src/sdk/client.ts</code> of the backend repo:
            </p>
            <pre className="bg-slate-900/70 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto">
{`import { createComplianceClient, CompliancePacketAPIError } from "./src/sdk/client";

const client = createComplianceClient({
  apiKey: "cpk_your_key_here",
  baseUrl: "http://localhost:4000", // or your deployed URL
});

async function main() {
  try {
    const packet = await client.check("Some text to evaluate");
    console.log("Decision:", packet.overall.recommendation);
    console.log("Safety score:", packet.safety.score);

    const usage = await client.usage();
    console.log("Usage summary:", usage.summary);
  } catch (err) {
    if (err instanceof CompliancePacketAPIError) {
      console.error("API error from Compliance Packet:", {
        code: err.code,
        status: err.status,
        details: err.details,
        message: err.message,
      });
    } else {
      console.error("Unexpected error:", err);
    }
  }
}

main();`}
            </pre>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-50 mb-2">6. Python SDK</h2>
            <p className="mb-2">
              A minimal Python client is available in the{" "}
              <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">
                python_sdk
              </code>{" "}
              folder of the backend repo. It wraps{" "}
              <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">
                POST /check
              </code>{" "}
              and{" "}
              <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">
                GET /usage
              </code>{" "}
              into a simple, typed client.
            </p>
            <pre className="bg-slate-900/70 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto mb-2">
{`from client import ComplianceClient, CompliancePacketError

client = ComplianceClient(
    api_key="cpk_your_api_key_here",
    base_url="http://localhost:4000",  # or your deployed URL
)

try:
    packet = client.check("Some text to evaluate")
    print("Decision:", packet.overall.recommendation)
    print("Safety score:", packet.safety.score)

    usage = client.usage()
    print("Usage summary:", usage["summary"])
except CompliancePacketError as e:
    print("API error from Compliance Packet:")
    print("  code:", e.code)
    print("  status:", e.status)
    print("  details:", e.details)`}
            </pre>
            <p className="text-xs text-slate-400 mb-2">
              All non-2xx responses raise <code>CompliancePacketError</code>, which exposes <code>code</code>,{" "}
              <code>status</code>, and optional <code>details</code> from the API.
            </p>
            <p className="text-xs text-slate-400 mb-2">
              For full details and examples, see the dedicated Python SDK docs:
            </p>
            <a
              href="/docs/python"
              className="inline-flex items-center text-xs font-medium text-emerald-300 hover:text-emerald-200"
            >
              View Python SDK documentation →
            </a>
          </div>
        </section>

        <RegisterKey />
        <TryIt />

        <section className="mt-10 text-sm leading-relaxed text-slate-200 space-y-3">
          <h2 className="text-lg font-semibold text-slate-50 mb-1">
            7. Usage dashboard (per API key)
          </h2>
          <p className="text-xs text-slate-400">
            After you&apos;ve sent some checks, you can fetch a summary of usage for
            a specific API key using the{" "}
            <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">
              GET /usage
            </code>{" "}
            endpoint.
          </p>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              API key
            </label>
            <input
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-xs text-slate-50 outline-none focus:border-emerald-400"
              placeholder="cpk_..."
              value={usageApiKey}
              onChange={(e) => setUsageApiKey(e.target.value)}
            />
          </div>

          <button
            onClick={handleGetUsage}
            disabled={usageLoading}
            className="inline-flex items-center rounded-md bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {usageLoading ? "Fetching usage..." : "Fetch usage"}
          </button>

          {usageError && (
            <p className="text-xs text-red-400 mt-2">Error: {usageError}</p>
          )}

          {usageJson && (
            <div className="mt-3 space-y-3">
              {parsedUsage?.summary && (
                <div>
                  <p className="text-xs font-medium text-slate-300 mb-1">
                    Summary (last 24h)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="rounded-md border border-slate-800 bg-slate-950/80 px-2 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Total checks
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-50">
                        {parsedUsage.summary.totalChecks ?? "–"}
                      </p>
                    </div>
                    <div className="rounded-md border border-slate-800 bg-slate-950/80 px-2 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-emerald-400">
                        Allow
                      </p>
                      <p className="mt-1 text-sm font-semibold text-emerald-300">
                        {parsedUsage.summary.allow ?? "–"}
                      </p>
                    </div>
                    <div className="rounded-md border border-slate-800 bg-slate-950/80 px-2 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-amber-300">
                        Review
                      </p>
                      <p className="mt-1 text-sm font-semibold text-amber-200">
                        {parsedUsage.summary.review ?? "–"}
                      </p>
                    </div>
                    <div className="rounded-md border border-slate-800 bg-slate-950/80 px-2 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-rose-300">
                        Block
                      </p>
                      <p className="mt-1 text-sm font-semibold text-rose-200">
                        {parsedUsage.summary.block ?? "–"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {parsedUsage?.recent?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-300 mb-1">
                    Most recent check
                  </p>
                  <div className="rounded-md border border-slate-800 bg-slate-950/80 px-3 py-2 text-[11px] text-slate-100 flex flex-wrap gap-x-4 gap-y-1">
                    <span>
                      <span className="text-slate-400">When:</span>{" "}
                      {parsedUsage.recent[0].created_at}
                    </span>
                    <span>
                      <span className="text-slate-400">Safety:</span>{" "}
                      {parsedUsage.recent[0].safety_category} (
                      {parsedUsage.recent[0].safety_score})
                    </span>
                    <span>
                      <span className="text-slate-400">Decision:</span>{" "}
                      {parsedUsage.recent[0].recommendation}
                    </span>
                    <span>
                      <span className="text-slate-400">Score:</span>{" "}
                      {parsedUsage.recent[0].compliance_score}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-slate-300 mb-1">
                  Raw usage response
                </p>
                <pre className="bg-slate-900/80 rounded-lg p-3 text-[11px] text-slate-100 overflow-x-auto max-h-72">
                  {usageJson}
                </pre>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}