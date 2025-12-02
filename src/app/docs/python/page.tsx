export default function PythonSdkDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <nav className="w-full border-b border-slate-800 bg-slate-900/40 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-slate-300 hover:text-white text-sm font-medium">
            ← Back to Home
          </a>
          <a
            href="/docs"
            className="text-slate-300 hover:text-white text-sm font-medium"
          >
            Documentation
          </a>
        </div>
      </nav>
      <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">
        {/* Header */}
        <header className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-300/80 font-medium">
            SDKs
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
            Python SDK for Universal Compliance Packet
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl">
            A minimal, typed Python client for the Compliance Packet API. Wrap your content
            pipelines with a single call to <code className="font-mono">check()</code> and
            optionally inspect <code className="font-mono">usage()</code> per API key.
          </p>
        </header>

        {/* Installation */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">1. Installation</h2>
          <p className="text-sm text-slate-300">
            For now, the Python SDK is shipped as a small client file you can copy directly into
            your project. It depends only on{" "}
            <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">requests</code>.
          </p>

          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-medium">Install dependency</p>
            <pre className="bg-slate-950/80 rounded-lg border border-slate-800 p-3 text-[11px] text-slate-100 overflow-x-auto">
{`pip install requests`}
            </pre>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-medium">Add the client</p>
            <p className="text-xs text-slate-400">
              Create a file like{" "}
              <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">
                compliance_client.py
              </code>{" "}
              in your project and copy the SDK client implementation from the repo&apos;s{" "}
              <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">python_sdk</code>{" "}
              folder.
            </p>
          </div>
        </section>

        {/* Configuration */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">2. Configuration</h2>
          <p className="text-sm text-slate-300">
            The client reads your API key and base URL either from constructor arguments or from
            environment variables. This keeps secrets out of your code and makes switching between
            environments simple.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs text-slate-400 font-medium">Recommended env vars</p>
              <pre className="bg-slate-950/80 rounded-lg border border-slate-800 p-3 text-[11px] text-slate-100 overflow-x-auto">
{`# .env or environment
COMPLIANCE_API_KEY=cpk_your_api_key_here
COMPLIANCE_API_URL=https://compliance-packet-api-production.up.railway.app`}
              </pre>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-slate-400 font-medium">Constructing the client</p>
              <pre className="bg-slate-950/80 rounded-lg border border-slate-800 p-3 text-[11px] text-slate-100 overflow-x-auto">
{`from compliance_client import ComplianceClient

client = ComplianceClient(
    # You can also omit these if COMPLIANCE_API_KEY / COMPLIANCE_API_URL are set
    api_key="cpk_your_api_key_here",
    base_url="https://compliance-packet-api-production.up.railway.app",
)`}
              </pre>
            </div>
          </div>
        </section>

        {/* Basic usage */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">3. Basic usage</h2>
          <p className="text-sm text-slate-300">
            The client exposes two primary methods:{" "}
            <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">check()</code> to
            evaluate content and return a compliance packet, and{" "}
            <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">usage()</code> to see
            aggregated usage for the current API key.
          </p>

          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-medium">Checking a single piece of content</p>
            <pre className="bg-slate-950/80 rounded-lg border border-slate-800 p-3 text-[11px] text-slate-100 overflow-x-auto">
{`from compliance_client import ComplianceClient

client = ComplianceClient(
    api_key="cpk_your_api_key_here",
    base_url="https://compliance-packet-api-production.up.railway.app",
)

packet = client.check("Generate a short onboarding message for new users.")

print("Decision:", packet.overall.recommendation)  # "allow" | "review" | "block"
print("Safety score:", packet.safety.score)
print("Safety category:", packet.safety.category)`}
            </pre>
          </div>
        </section>

        {/* Error handling */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">4. Error handling</h2>
          <p className="text-sm text-slate-300">
            The client raises <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">
              ComplianceClientError
            </code>{" "}
            for non-2xx responses or network failures. You can catch this to inspect HTTP status and
            body when something goes wrong.
          </p>

          <pre className="bg-slate-950/80 rounded-lg border border-slate-800 p-3 text-[11px] text-slate-100 overflow-x-auto">
{`from compliance_client import ComplianceClient, ComplianceClientError

client = ComplianceClient(
    api_key="cpk_your_api_key_here",
    base_url="https://compliance-packet-api-production.up.railway.app",
)

try:
    packet = client.check("Content to evaluate")
    print("Decision:", packet.overall.recommendation)
except ComplianceClientError as e:
    print("Request failed:", e)
    print("HTTP status:", e.status)
    print("Response body:", e.body)`}
          </pre>
        </section>

        {/* Usage endpoint */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">5. Inspecting usage</h2>
          <p className="text-sm text-slate-300">
            Use the{" "}
            <code className="font-mono bg-slate-900/70 px-1 py-0.5 rounded">usage()</code> method to
            fetch a summary of requests associated with the current API key. This is a thin wrapper
            around the <code className="font-mono">GET /usage</code> endpoint.
          </p>

          <pre className="bg-slate-950/80 rounded-lg border border-slate-800 p-3 text-[11px] text-slate-100 overflow-x-auto">
{`from compliance_client import ComplianceClient

client = ComplianceClient(
    api_key="cpk_your_api_key_here",
    base_url="https://compliance-packet-api-production.up.railway.app",
)

usage = client.usage()

summary = usage["summary"]
print("Total checks:", summary["totalChecks"])
print("Allow:", summary["allow"])
print("Review:", summary["review"])
print("Block:", summary["block"])`}
          </pre>
        </section>

        {/* Full example */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">6. Full example script</h2>
          <p className="text-sm text-slate-300">
            A small end-to-end script that checks content, branches on the decision, and then prints
            usage for the key.
          </p>

          <pre className="bg-slate-950/80 rounded-lg border border-slate-800 p-3 text-[11px] text-slate-100 overflow-x-auto">
{`from compliance_client import ComplianceClient, ComplianceClientError

def main() -> None:
    client = ComplianceClient(
        api_key="cpk_your_api_key_here",
        base_url="https://compliance-packet-api-production.up.railway.app",
    )

    try:
        packet = client.check("Generate a friendly welcome message for our new product.")
    except ComplianceClientError as e:
        print("Compliance check failed:", e)
        return

    decision = packet.overall.recommendation
    print("Decision:", decision)
    print("Compliance score:", packet.overall.complianceScore)

    if decision == "block":
        print("Blocking content and routing for manual review...")
    elif decision == "review":
        print("Flagging content for human review...")
    else:
        print("Content allowed. Proceeding as normal.")

    usage = client.usage()
    print("Usage summary:", usage["summary"])

if __name__ == "__main__":
    main()`}
          </pre>
        </section>
      </div>
    </main>
  );
}
