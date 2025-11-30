// app/docs/page.tsx
import { RegisterKey } from "@/components/RegisterKey";
import { TryIt } from "@/components/TryIt";
export default function DocsPage() {
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
              Invalid or inactive keys will return a JSON error: <code>{"{ \"error\": \"Invalid API key\" }"}</code>
            </p>
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
{`import { createComplianceClient } from "./src/sdk/client";

const client = createComplianceClient({
  apiKey: "cpk_your_key_here",
  baseUrl: "http://localhost:4000",
});

const packet = await client.check("Some text to evaluate");
console.log(packet.overall.recommendation);

const usage = await client.usage();
console.log(usage.summary);`}
            </pre>
          </div>
        </section>
        <RegisterKey />
        <TryIt />
      </div>
    </main>
  );
}