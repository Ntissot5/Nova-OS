function App() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(57,255,20,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center">
            <div className="w-3 h-3 rounded-sm bg-neon shadow-[0_0_12px_rgba(57,255,20,0.6)]" />
          </div>
          <span className="text-lg font-bold tracking-tight">Nova OS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#features" className="hover:text-neon transition-colors">Features</a>
          <a href="#modules" className="hover:text-neon transition-colors">Modules</a>
          <a href="#pricing" className="hover:text-neon transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">Log in</button>
          <button className="text-sm bg-neon text-black font-semibold px-5 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all">
            Start free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5 text-neon text-xs font-mono mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-[pulse-glow_2s_ease-in-out_infinite]" />
          SYSTEM ONLINE — v1.0
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-6">
          AI infrastructure
          <br />
          <span className="text-neon drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]">for European SMBs</span>
        </h1>
        <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed">
          Automate sales, operations and support with AI agents that run 24/7.
          Deploy in minutes. No code required. GDPR-native.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-8 py-3.5 bg-neon text-black font-bold rounded-xl text-sm hover:shadow-[0_0_40px_rgba(57,255,20,0.4)] transition-all">
            Deploy your first agent
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
          <button className="px-8 py-3.5 border border-white/10 text-white/60 rounded-xl text-sm hover:border-neon/30 hover:text-neon transition-all font-mono">
            $ nova init
          </button>
        </div>

        {/* Terminal preview */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-dark-border bg-dark-card overflow-hidden shadow-[0_0_60px_rgba(57,255,20,0.05)]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-border">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs text-white/20 font-mono">nova-os — terminal</span>
            </div>
            <div className="p-6 text-left font-mono text-sm leading-7">
              <div className="text-white/30">$ nova deploy --agent sales-qualifier</div>
              <div className="text-neon/80">&#x2713; Agent compiled (2.1s)</div>
              <div className="text-neon/80">&#x2713; Connected to CRM pipeline</div>
              <div className="text-neon/80">&#x2713; GDPR compliance check passed</div>
              <div className="text-neon/80">&#x2713; Deployed to eu-west-1</div>
              <div className="mt-3 text-white/30">$ nova status</div>
              <div className="text-white/50">Agents running: <span className="text-neon font-bold">3</span> &nbsp;|&nbsp; Tasks completed today: <span className="text-neon font-bold">847</span> &nbsp;|&nbsp; Uptime: <span className="text-neon font-bold">99.98%</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Built for the new era</h2>
          <p className="text-white/40 max-w-xl mx-auto">Every module is designed for European compliance, speed, and autonomy.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: '01', title: 'AI Agents', desc: 'Autonomous agents that qualify leads, answer support tickets, and manage workflows — around the clock.' },
            { icon: '02', title: 'GDPR-native', desc: 'Data stays in EU. Built-in consent management, audit trails, and data deletion pipelines.' },
            { icon: '03', title: 'No-code builder', desc: 'Visual workflow editor. Connect your tools, define triggers, deploy in minutes.' },
            { icon: '04', title: 'Multi-channel', desc: 'Email, WhatsApp, Slack, phone — one agent handles all channels with unified context.' },
            { icon: '05', title: 'Real-time analytics', desc: 'Live dashboards. Monitor agent performance, conversion rates, and cost per task.' },
            { icon: '06', title: 'Team control', desc: 'Role-based access, approval workflows, and human-in-the-loop escalation.' },
          ].map((f) => (
            <div key={f.icon} className="group p-6 rounded-2xl border border-dark-border bg-dark-card/50 hover:border-neon/20 hover:bg-neon/[0.02] transition-all">
              <div className="text-xs font-mono text-neon/50 mb-4">[{f.icon}]</div>
              <h3 className="text-base font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-white/35 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Modular by design</h2>
          <p className="text-white/40">Activate only what you need. Scale as you grow.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: 'nova/sales', status: 'active', desc: 'Lead qualification, outreach sequences, CRM sync' },
            { name: 'nova/support', status: 'active', desc: 'Ticket triage, auto-responses, escalation rules' },
            { name: 'nova/ops', status: 'beta', desc: 'Invoice processing, inventory alerts, scheduling' },
            { name: 'nova/analytics', status: 'active', desc: 'Real-time dashboards, cost tracking, ROI reports' },
          ].map((m) => (
            <div key={m.name} className="flex items-start gap-4 p-5 rounded-xl border border-dark-border bg-dark-card/30 hover:border-neon/20 transition-all">
              <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-neon text-lg">&#x25A0;</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-semibold">{m.name}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${m.status === 'beta' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-neon/10 text-neon border border-neon/20'}`}>
                    {m.status}
                  </span>
                </div>
                <p className="text-xs text-white/35">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Transparent pricing</h2>
          <p className="text-white/40">Start free. Scale with usage. No hidden fees.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Starter', price: '0', sub: 'Free forever', features: ['1 agent', '500 tasks/mo', 'Community support', 'EU hosting'] },
            { name: 'Growth', price: '99', sub: '/mo', features: ['5 agents', '10K tasks/mo', 'Priority support', 'All modules', 'Custom integrations'], featured: true },
            { name: 'Enterprise', price: 'Custom', sub: '', features: ['Unlimited agents', 'Unlimited tasks', 'Dedicated CSM', 'SLA 99.99%', 'On-premise option'] },
          ].map((p) => (
            <div key={p.name} className={`p-8 rounded-2xl border ${p.featured ? 'border-neon/30 bg-neon/[0.03] shadow-[0_0_40px_rgba(57,255,20,0.06)]' : 'border-dark-border bg-dark-card/30'} flex flex-col`}>
              <div className="text-xs font-mono text-white/30 mb-3">{p.name}</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">{p.price === 'Custom' ? '' : '€'}{p.price}</span>
                {p.sub && <span className="text-sm text-white/30">{p.sub}</span>}
              </div>
              <div className="flex flex-col gap-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-white/50">
                    <span className="text-neon text-xs">&#x2713;</span>{f}
                  </div>
                ))}
              </div>
              <button className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${p.featured ? 'bg-neon text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]' : 'border border-white/10 text-white/60 hover:border-neon/30 hover:text-neon'}`}>
                {p.price === 'Custom' ? 'Contact sales' : 'Get started'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-dark-border py-10 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-5 h-5 rounded bg-neon/10 border border-neon/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-neon" />
          </div>
          <span className="text-sm font-bold">Nova OS</span>
        </div>
        <p className="text-xs text-white/20 font-mono">AI infrastructure for European SMBs — Zurich, Switzerland</p>
      </footer>
    </div>
  )
}

export default App
