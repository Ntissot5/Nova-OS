import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SiteMockup({ name, color }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-dark-card overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
        <div className="w-2 h-2 rounded-full bg-white/10" /><div className="w-2 h-2 rounded-full bg-white/10" /><div className="w-2 h-2 rounded-full bg-white/10" />
        <span className="text-[9px] text-white/15 ml-2 font-mono">{name?.toLowerCase().replace(/\s+/g, '')}.novaos.io</span>
      </div>
      <div className="p-4">
        <div className="h-2 w-16 rounded bg-white/10 mb-3" />
        <div className="h-6 w-40 rounded mb-2" style={{ background: `${color}30` }} />
        <div className="h-2 w-32 rounded bg-white/[0.05] mb-4" />
        <div className="h-6 w-20 rounded" style={{ background: color }} />
      </div>
    </div>
  )
}

export default function App() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const start = (e) => {
    e.preventDefault()
    if (input.trim()) {
      localStorage.setItem('novaos-desc', input)
      navigate('/onboarding')
    } else {
      navigate('/onboarding')
    }
  }

  return (
    <div className="min-h-screen text-white bg-dark">
      {/* Subtle bg */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(79,159,255,0.04) 0%, transparent 70%)' }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-4 border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center"><div className="w-2 h-2 rounded-sm bg-accent" /></div>
          <span className="text-sm font-bold">Nova OS</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[13px] text-white/25">
          <a href="#how" className="hover:text-white/50">Comment</a>
          <a href="#examples" className="hover:text-white/50">Exemples</a>
          <a href="#pricing" className="hover:text-white/50">Tarifs</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-[13px] text-white/25 px-3 py-1.5 hidden md:block hover:text-white/50">Connexion</a>
          <Link to="/onboarding" className="text-[13px] bg-accent text-black font-semibold px-4 py-1.5 rounded-lg hover:brightness-110">Commencer</Link>
        </div>
      </nav>

      {/* Hero — le produit EST le hero */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 pt-20 md:pt-32 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/10 text-accent/60 text-[11px] font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />Propulsé par l'IA
        </div>
        <h1 className="text-4xl md:text-[56px] font-black tracking-tight leading-[1.05] mb-4">
          Décrivez votre business,<br /><span className="text-accent">Nova crée tout</span>
        </h1>
        <p className="text-[15px] text-white/25 max-w-md mx-auto mb-10 leading-relaxed">
          Site web professionnel + agents IA qui gèrent vos ventes, support et opérations. Prêt en 5 minutes.
        </p>

        {/* Main input — le coeur du produit */}
        <form onSubmit={start} className="relative max-w-xl mx-auto mb-6">
          <input
            type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder="Décrivez votre business... ex: dentiste à Genève"
            className="w-full px-5 py-4 pr-36 rounded-2xl text-[15px] bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/20 outline-none focus:border-accent/40 focus:bg-white/[0.07]"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-black text-sm font-semibold px-5 py-2.5 rounded-xl hover:brightness-110">
            Créer mon site →
          </button>
        </form>
        <p className="text-[11px] text-white/15">Gratuit pendant 14 jours · Pas de carte requise</p>
      </section>

      {/* Generated examples preview */}
      <section id="examples" className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs text-white/20 text-center mb-6 font-medium">Sites générés par Nova OS</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SiteMockup name="Dr Müller" color="#3b82f6" />
          <SiteMockup name="Café du Lac" color="#22c55e" />
          <SiteMockup name="Atelier Luxe" color="#d4a053" />
          <SiteMockup name="FitStudio" color="#ef4444" />
        </div>
        <div className="flex items-center justify-center gap-6 mt-8 text-[11px] text-white/15">
          <span>500+ sites créés</span><span className="w-1 h-1 rounded-full bg-white/10" /><span>12 secteurs</span><span className="w-1 h-1 rounded-full bg-white/10" /><span>Suisse & Europe</span>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">3 étapes, 5 minutes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: '1', title: 'Décrivez', desc: 'Votre activité, vos services, vos clients.' },
            { n: '2', title: 'Choisissez', desc: 'Template, couleurs, agents IA.' },
            { n: '3', title: 'Lancez', desc: 'Site en ligne + agents actifs 24/7.' },
          ].map((s, i) => (
            <div key={s.n} className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-dark-card">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent text-xs font-bold flex items-center justify-center shrink-0">{s.n}</div>
              <div>
                <h3 className="text-sm font-semibold mb-1">{s.title}</h3>
                <p className="text-xs text-white/25 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features — compact */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-3">Tout est inclus</h2>
        <p className="text-sm text-white/20 text-center mb-10">Site web + agents IA + dashboard. Rien d'autre à installer.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { icon: '🌐', title: 'Site web pro', desc: '3 templates, édition inline' },
            { icon: '🤖', title: 'Agents IA', desc: 'Support, ventes, emails, RDV' },
            { icon: '✏️', title: 'Éditeur Wix-like', desc: 'Modifiez en cliquant' },
            { icon: '📊', title: 'Dashboard', desc: 'Tout en un coup d\'œil' },
            { icon: '🔒', title: 'RGPD natif', desc: 'Données en Europe' },
            { icon: '⚡', title: '5 minutes', desc: 'De la description au live' },
          ].map(f => (
            <div key={f.title} className="p-4 rounded-xl border border-white/[0.06] bg-dark-card">
              <span className="text-base mb-2 block">{f.icon}</span>
              <h3 className="text-[13px] font-semibold mb-0.5">{f.title}</h3>
              <p className="text-[11px] text-white/20">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-3">Tarifs</h2>
        <p className="text-sm text-white/20 text-center mb-10">14 jours gratuits. Sans engagement.</p>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { name: 'Starter', price: '59', desc: 'Site + 1 agent', features: ['Site web IA', '1 agent IA', 'Support email'] },
            { name: 'Pro', price: '99', desc: 'Site + 3 agents', features: ['Site web IA', '3 agents IA', 'Support prio', 'Dashboard avancé'], featured: true },
            { name: 'Unlimited', price: '199', desc: 'Tout illimité', features: ['Site web IA', 'Agents illimités', 'Support dédié', 'API access'] },
          ].map(p => (
            <div key={p.name} className={`p-5 rounded-xl border flex flex-col ${p.featured ? 'border-accent/20 bg-accent/[0.03]' : 'border-white/[0.06] bg-dark-card'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold ${p.featured ? 'text-accent' : 'text-white/40'}`}>{p.name}</span>
                {p.featured && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent/50">populaire</span>}
              </div>
              <div className="flex items-baseline gap-1 mb-1"><span className="text-2xl font-black">{p.price}</span><span className="text-[10px] text-white/20">€/mois</span></div>
              <p className="text-[10px] text-white/15 mb-4">{p.desc}</p>
              <div className="flex flex-col gap-1.5 mb-5 flex-1">{p.features.map(f => <span key={f} className="text-[11px] text-white/25">✓ {f}</span>)}</div>
              <Link to="/onboarding" className={`w-full py-2.5 rounded-lg text-xs font-semibold text-center block ${p.featured ? 'bg-accent text-black' : 'border border-white/[0.08] text-white/35'}`}>Commencer</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-3">Créez votre site maintenant</h2>
        <p className="text-sm text-white/20 mb-8">Décrivez votre business, Nova fait le reste.</p>
        <Link to="/onboarding" className="inline-block px-8 py-3.5 bg-accent text-black font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(79,159,255,0.15)] hover:brightness-110">Commencer gratuitement →</Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-sm bg-accent" /></div>
            <span className="text-[11px] font-bold">Nova OS</span>
          </div>
          <div className="flex gap-4 text-[10px] text-white/15">
            <a href="#">Mentions légales</a><a href="#">CGU</a><a href="#">Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
