import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SiteMockup({ name, color1, color2 }) {
  return (
    <div className="glass rounded-2xl overflow-hidden group">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
        <div className="w-2 h-2 rounded-full bg-white/10" /><div className="w-2 h-2 rounded-full bg-white/10" /><div className="w-2 h-2 rounded-full bg-white/10" />
      </div>
      <div className="p-5">
        <div className="h-1.5 w-14 rounded-full bg-white/10 mb-3" />
        <div className="h-4 w-32 rounded-lg mb-2" style={{ background: `linear-gradient(135deg, ${color1}40, ${color2}40)` }} />
        <div className="h-1.5 w-28 rounded-full bg-white/[0.05] mb-4" />
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-lg" style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }} />
          <div className="h-5 w-12 rounded-lg border border-white/[0.06]" />
        </div>
      </div>
      <div className="px-5 pb-4 flex gap-2">
        <div className="flex-1 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <div className="h-1 w-10 rounded-full bg-white/10 mb-1.5" />
          <div className="h-1 w-16 rounded-full bg-white/[0.04]" />
        </div>
        <div className="flex-1 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <div className="h-1 w-12 rounded-full bg-white/10 mb-1.5" />
          <div className="h-1 w-14 rounded-full bg-white/[0.04]" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const start = (e) => {
    e.preventDefault()
    if (input.trim()) localStorage.setItem('novaos-desc', input)
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(180deg, #0c0c1c 0%, #0d1025 40%, #0c0c1c 100%)' }}>
      {/* Background orbs — static, no animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] -top-[200px] -left-[200px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #6c5ce7, transparent 70%)' }} />
        <div className="absolute w-[500px] h-[500px] top-[30%] -right-[150px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #74b9ff, transparent 70%)' }} />
        <div className="absolute w-[400px] h-[400px] -bottom-[100px] left-[20%] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #6c5ce7, transparent 70%)' }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-accent to-blue flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded bg-white" />
          </div>
          <span className="text-[15px] font-bold">Nova OS</span>
        </div>
        <div className="hidden md:flex items-center gap-7 text-[13px] text-white/30">
          <a href="#how" className="hover:text-white/60">Comment</a>
          <a href="#features" className="hover:text-white/60">Fonctions</a>
          <a href="#pricing" className="hover:text-white/60">Tarifs</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-[13px] text-white/30 px-3 py-1.5 hidden md:block hover:text-white/60">Connexion</a>
          <Link to="/onboarding" className="btn-gradient text-[13px] font-semibold px-5 py-2 rounded-xl">Commencer →</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pt-24 md:pt-36 pb-12 text-center animate-[fade-in_0.5s_ease]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11px] font-medium text-white/40 mb-10">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-blue" />
          Propulsé par l'intelligence artificielle
        </div>

        <h1 className="text-4xl md:text-[64px] font-black tracking-tight leading-[1] mb-6">
          <span className="text-gradient">Décrivez votre business.</span><br />
          <span className="text-gradient-accent">Nova crée tout le reste.</span>
        </h1>

        <p className="text-[15px] text-white/25 max-w-md mx-auto mb-12 leading-relaxed">
          Site web professionnel, agents IA, automatisation complète. De l'idée au live en 5 minutes.
        </p>

        {/* Main input */}
        <form onSubmit={start} className="relative max-w-xl mx-auto mb-4">
          <div className="absolute inset-0 rounded-2xl opacity-50" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.1), rgba(116,185,255,0.1))', filter: 'blur(20px)' }} />
          <div className="relative glass rounded-2xl p-1.5">
            <div className="flex items-center bg-white/[0.03] rounded-xl">
              <input
                type="text" value={input} onChange={e => setInput(e.target.value)}
                placeholder="Ex: Je suis dentiste à Genève avec 3 employés..."
                className="flex-1 px-5 py-4 bg-transparent text-[15px] text-white placeholder:text-white/20 outline-none"
              />
              <button type="submit" className="btn-gradient text-sm font-semibold px-6 py-3 rounded-xl mr-1 shrink-0">
                Créer →
              </button>
            </div>
          </div>
        </form>
        <p className="text-[11px] text-white/15">Gratuit 14 jours · Pas de carte bancaire</p>
      </section>

      {/* Site previews */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <p className="text-[11px] text-white/15 text-center mb-6 uppercase tracking-widest font-medium">Sites générés par Nova</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SiteMockup name="Dr Müller" color1="#6c5ce7" color2="#74b9ff" />
          <SiteMockup name="Café du Lac" color1="#00b894" color2="#55efc4" />
          <SiteMockup name="Atelier Luxe" color1="#d4a053" color2="#fdcb6e" />
          <SiteMockup name="FitStudio" color1="#e17055" color2="#ff7675" />
        </div>
        <div className="flex items-center justify-center gap-6 mt-8 text-[11px] text-white/15">
          <span>500+ sites</span><span className="w-1 h-1 rounded-full bg-white/10" /><span>12 secteurs</span><span className="w-1 h-1 rounded-full bg-white/10" /><span>Europe</span>
        </div>
      </section>

      {/* How */}
      <section id="how" className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-3 text-gradient">Comment ça marche</h2>
        <p className="text-sm text-white/20 text-center mb-12">De l'idée au live en 3 étapes.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { n: '01', title: 'Décrivez', desc: 'Votre activité, vos services, le ton souhaité.', icon: '✍️' },
            { n: '02', title: 'Personnalisez', desc: 'Template, couleurs, agents IA à activer.', icon: '🎨' },
            { n: '03', title: 'Lancez', desc: 'Site en ligne + agents actifs en 5 minutes.', icon: '🚀' },
          ].map((s, i) => (
            <div key={s.n} className="glass rounded-2xl p-6 text-center relative">
              <span className="text-2xl mb-3 block">{s.icon}</span>
              <span className="text-[10px] font-mono text-accent/40 block mb-2">{s.n}</span>
              <h3 className="text-sm font-bold mb-1.5">{s.title}</h3>
              <p className="text-xs text-white/25 leading-relaxed">{s.desc}</p>
              {i < 2 && <span className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 text-white/10 text-sm">→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-3 text-gradient">Tout est inclus</h2>
        <p className="text-sm text-white/20 text-center mb-12">Site + IA + dashboard. Clé en main.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { icon: '🌐', title: 'Site web pro', desc: '3 templates magnifiques' },
            { icon: '🤖', title: 'Agents IA', desc: 'Support, ventes, emails' },
            { icon: '✏️', title: 'Éditeur live', desc: 'Modifiez en cliquant' },
            { icon: '💬', title: 'IA intégrée', desc: '"Change le titre en..."' },
            { icon: '📊', title: 'Dashboard', desc: 'Métriques en temps réel' },
            { icon: '🔒', title: 'RGPD natif', desc: 'Données en Europe' },
          ].map(f => (
            <div key={f.title} className="glass rounded-2xl p-5">
              <span className="text-lg mb-2.5 block">{f.icon}</span>
              <h3 className="text-[13px] font-bold mb-1">{f.title}</h3>
              <p className="text-[11px] text-white/20 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-3 text-gradient">Tarifs</h2>
        <p className="text-sm text-white/20 text-center mb-12">14 jours gratuits. Annulation en 1 clic.</p>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { name: 'Starter', price: '59', features: ['Site web IA', '1 agent IA', 'Support email'] },
            { name: 'Pro', price: '99', features: ['Site web IA', '3 agents IA', 'Support prioritaire', 'Dashboard avancé'], featured: true },
            { name: 'Unlimited', price: '199', features: ['Site web IA', 'Agents illimités', 'Support dédié', 'API access'] },
          ].map(p => (
            <div key={p.name} className={`rounded-2xl p-6 flex flex-col ${p.featured ? 'bg-gradient-to-b from-accent/10 to-blue/5 border border-accent/20' : 'glass'}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold ${p.featured ? 'text-accent-light' : 'text-white/40'}`}>{p.name}</span>
                {p.featured && <span className="text-[8px] px-2 py-0.5 rounded-full bg-accent/20 text-accent-light">populaire</span>}
              </div>
              <div className="flex items-baseline gap-1 mb-5">
                <span className={`text-3xl font-black ${p.featured ? 'text-gradient-accent' : ''}`}>{p.price}</span>
                <span className="text-[11px] text-white/20">€/mois</span>
              </div>
              <div className="flex flex-col gap-2 mb-6 flex-1">{p.features.map(f => <span key={f} className="text-[11px] text-white/25">✓ {f}</span>)}</div>
              <Link to="/onboarding" className={`w-full py-2.5 rounded-xl text-xs font-semibold text-center block ${p.featured ? 'btn-gradient' : 'glass text-white/40'}`}>Commencer</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-xl mx-auto px-6 py-20 text-center">
        <div className="glass rounded-3xl p-10 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.15), rgba(116,185,255,0.1))' }} />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gradient">Lancez votre business</h2>
            <p className="text-sm text-white/25 mb-8">5 minutes. C'est tout ce qu'il faut.</p>
            <Link to="/onboarding" className="btn-gradient inline-block px-8 py-3.5 rounded-xl text-sm font-bold">Commencer gratuitement →</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-accent to-blue flex items-center justify-center"><div className="w-1.5 h-1.5 rounded bg-white" /></div>
            <span className="text-[11px] font-bold">Nova OS</span>
          </div>
          <div className="flex gap-4 text-[10px] text-white/15">
            <a href="#">Légal</a><a href="#">CGU</a><a href="#">Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
