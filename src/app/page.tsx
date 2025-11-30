// app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xs font-bold text-emerald-300">
              CP
            </div>
            <span className="text-sm font-semibold text-slate-100">
              Universal Compliance Packet API
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/docs" className="text-slate-300 hover:text-emerald-300">
              Docs
            </a>
            <a
              href="https://github.com/your-username/compliance-packet-api"
              className="text-slate-400 hover:text-slate-100"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <div className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
            {/* Left column: hero copy */}
            <div>
              <p className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200 mb-4">
                AI-native trust & safety layer
              </p>

              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50 mb-4">
                One API call for a universal compliance packet.
              </h1>

              <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                Turn any piece of content into a structured packet describing safety, copyright,
                privacy, and overall compliance. Designed for AI agents, content pipelines, and
                trust layers that need a single, low-entropy standard.
              </p>

              <ul className="text-sm text-slate-300 space-y-2 mb-8">
                <li>• LLM-powered scoring with heuristic fallback</li>
                <li>• Stable JSON schema for safety, copyright, privacy & overall risk</li>
                <li>• API-key scoped logging and usage analytics</li>
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/docs"
                  className="inline-flex items-center rounded-lg bg-emerald-400 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-300 transition"
                >
                  Read the docs
                </a>
                <span className="text-xs text-slate-400">
                  Start by calling <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">
                    /register
                  </code>{' '}
                  to get your API key.
                </span>
              </div>
            </div>

            {/* Right column: example */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 shadow-lg shadow-slate-900/60">
              <p className="text-xs font-semibold text-slate-300 mb-2">
                Example: curl request
              </p>
              <pre className="bg-slate-950/70 rounded-xl p-3 text-[11px] leading-relaxed text-slate-200 overflow-x-auto mb-4">
{`curl -X POST http://localhost:4000/check \\
  -H "Authorization: Bearer cpk_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"content": "Hello, world"}'`}
              </pre>

              <p className="text-xs font-semibold text-slate-300 mb-2">
                Example: Node / TypeScript SDK
              </p>
              <pre className="bg-slate-950/70 rounded-xl p-3 text-[11px] leading-relaxed text-slate-200 overflow-x-auto">
{`import { createComplianceClient } from "./src/sdk/client";

const client = createComplianceClient({
  apiKey: "cpk_your_key_here",
  baseUrl: "http://localhost:4000",
});

const packet = await client.check("Hello, world");
console.log(packet.overall.recommendation);`}
              </pre>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} Universal Compliance Packet</span>
          <span>Backend: Node · Postgres · LLM</span>
        </div>
      </footer>
    </main>
  );
}