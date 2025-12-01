// app/page.tsx
export default function HomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center">
              <div className="relative h-4 w-4">
                <div className="absolute inset-0 rounded-md border border-emerald-400/70 bg-emerald-500/10" />
                <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-md border border-emerald-400/30 bg-emerald-500/5" />
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-100">
                Universal Compliance Packet
              </span>
              <span className="text-[10px] text-slate-400">
                Drop‑in trust &amp; safety for AI and content pipelines
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-xs md:text-sm">
            <a href="/docs" className="text-slate-300 hover:text-emerald-300">
              Docs
            </a>
            <a
              href="https://github.com/Maheybtw/compliance-packet-api"
              className="text-slate-400 hover:text-slate-100"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
            {/* Left column: hero copy */}
            <div>
              <p className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200 mb-4">
                AI-native trust &amp; safety layer
              </p>

              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50 mb-4">
                One API call for a universal compliance packet.
              </h1>

              <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-5">
                Turn any piece of content into a structured packet describing safety, copyright,
                privacy, and overall risk in a single, stable JSON schema. Plug it in anywhere
                you&apos;re generating or moderating content and keep your system low‑entropy.
              </p>

              <ul className="text-sm text-slate-300 space-y-1.5 mb-7">
                <li>• LLM-powered scoring with deterministic heuristic fallback</li>
                <li>• Stable JSON contract for safety, copyright, privacy &amp; overall compliance</li>
                <li>• API-key scoped logging and usage analytics out of the box</li>
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/docs"
                  className="inline-flex items-center rounded-lg bg-emerald-400 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-300 transition"
                >
                  Get started in 5 minutes
                </a>
                <span className="text-xs text-slate-400 max-w-xs">
                  Call{" "}
                  <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">
                    POST /register
                  </code>{" "}
                  to get an API key, then{" "}
                  <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">
                    POST /check
                  </code>{" "}
                  for a full compliance packet per request.
                </span>
              </div>

              {/* Small badges */}
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-slate-400">
                <span className="inline-flex items-center rounded-full border border-slate-700/80 px-2 py-1">
                  Built for LLM agents
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-700/80 px-2 py-1">
                  Works with any content pipeline
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-700/80 px-2 py-1">
                  JSON-first &amp; language agnostic
                </span>
              </div>
            </div>

            {/* Right column: example */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 shadow-lg shadow-slate-900/60">
              <p className="text-xs font-semibold text-slate-300 mb-2">
                Example: curl request
              </p>
              <pre className="bg-slate-950/70 rounded-xl p-3 text-[11px] leading-relaxed text-slate-200 overflow-x-auto mb-4">
{`curl -X POST https://your-backend-url/check \\
  -H "Authorization: Bearer cpk_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"content": "Generate a short product description for our new running shoes."}'`}
              </pre>

              <p className="text-xs font-semibold text-slate-300 mb-2">
                Example: Node / TypeScript SDK
              </p>
              <pre className="bg-slate-950/70 rounded-xl p-3 text-[11px] leading-relaxed text-slate-200 overflow-x-auto">
{`import { createComplianceClient } from "./src/sdk/client";

const client = createComplianceClient({
  apiKey: process.env.COMPLIANCE_API_KEY!,
  baseUrl: process.env.COMPLIANCE_API_URL || "https://your-backend-url",
});

async function main() {
  const packet = await client.check(
    "Generate a short product description for our new running shoes."
  );

  if (packet.overall.recommendation === "block") {
    // hold, log, or route for human review
    console.log("Content blocked:", packet.overall.notes);
    return;
  }

  console.log("Safety score:", packet.safety.score);
  console.log("Decision:", packet.overall.recommendation);
}

main().catch(console.error);`}
              </pre>
            </div>
          </div>
        </section>

        {/* Secondary sections */}
        <section className="mx-auto max-w-5xl px-6 pb-14 space-y-10">
          {/* Who it's for */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="col-span-3 md:col-span-1">
              <h2 className="text-base font-semibold text-slate-100 mb-2">
                Built for real systems, not demos.
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Universal Compliance Packet is designed to sit between your AI models and the
                outside world: score, log and standardise everything you generate or accept.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:col-span-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-xs font-semibold text-slate-200 mb-1">LLM applications</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Wrap your LLM calls with a compliance check before sending to users, storing in
                  memory, or forwarding to tools. One schema, any model.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-xs font-semibold text-slate-200 mb-1">
                  UGC &amp; content platforms
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Score user-generated posts, comments or uploads for safety, copyright risk and
                  privacy issues with a single call.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-xs font-semibold text-slate-200 mb-1">
                  Internal tools &amp; agents
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Give internal agents a lightweight &quot;should I send/log/ship this?&quot; check
                  without wiring bespoke policy logic everywhere.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-xs font-semibold text-slate-200 mb-1">
                  Compliance &amp; risk teams
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Use the packet as a low-entropy interface between AI systems and policy: one
                  schema you can evolve without touching model code.
                </p>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="border border-slate-800 rounded-2xl bg-slate-950/60 p-5 md:p-6">
            <h2 className="text-base font-semibold text-slate-100 mb-3">
              How it fits into your stack
            </h2>
            <div className="grid gap-4 md:grid-cols-3 text-[11px] text-slate-300">
              <div className="flex flex-col gap-1.5">
                <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/60 text-[11px] font-semibold text-emerald-200 mb-1">
                  1
                </div>
                <p className="font-medium text-slate-100">Generate or receive content</p>
                <p className="text-slate-400">
                  Your app, agent, or ingestion pipeline produces text or receives user input.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/60 text-[11px] font-semibold text-emerald-200 mb-1">
                  2
                </div>
                <p className="font-medium text-slate-100">Call <code>/check</code></p>
                <p className="text-slate-400">
                  Send the content to the Compliance Packet API. We score it for safety, copyright,
                  privacy and overall risk in one pass.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/60 text-[11px] font-semibold text-emerald-200 mb-1">
                  3
                </div>
                <p className="font-medium text-slate-100">Act on a single decision</p>
                <p className="text-slate-400">
                  Use the structured packet to allow, block, or route for review. Log it once, in a
                  format every part of your system can agree on.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-5xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>© {currentYear} Universal Compliance Packet</span>
          <span>Backend: Node · Postgres · LLM · Supabase · Railway · Vercel</span>
        </div>
      </footer>
    </main>
  );
}