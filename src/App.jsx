import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function App() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const start = (e) => { e.preventDefault(); if (input.trim()) localStorage.setItem('novaos-desc', input); navigate('/onboarding') }

  return (
    <div className="min-h-screen text-white" style={{ background: '#09090f' }}>
      {/* BG */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[600px] -top-[300px] left-1/2 -translate-x-1/2 rounded-full opacity-[0.12]" style={{ background: 'radial-gradient(circle, #6c5ce7, transparent 70%)' }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-16 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)' }}><div className="w-3 h-3 rounded bg-white" /></div>
          <span className="text-base font-bold">Nova OS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[13px] text-white/30 font-medium">
          <a href="#demo" className="hover:text-white/60">Produit</a>
          <a href="#pricing" className="hover:text-white/60">Tarifs</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-[13px] text-white/30 px-3 py-2 hidden md:block hover:text-white/60">Se connecter</a>
          <Link to="/onboarding" className="text-[13px] font-semibold px-5 py-2.5 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)' }}>Commencer gratuitement</Link>
        </div>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-20 md:pt-32 pb-6 text-center">
        <h1 className="text-5xl md:text-[72px] font-black tracking-tight leading-[1] mb-6">
          Créez votre site web<br />
          <span style={{ background: 'linear-gradient(135deg, #a29bfe, #74b9ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>avec l'intelligence artificielle</span>
        </h1>
        <p className="text-[16px] text-white/30 max-w-lg mx-auto mb-12 leading-relaxed">
          Décrivez votre activité en une phrase. Nova génère votre site professionnel, active vos agents IA, et automatise votre business.
        </p>

        {/* Input */}
        <form onSubmit={start} className="max-w-2xl mx-auto mb-4">
          <div className="flex items-center rounded-2xl p-1.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ex: Cabinet dentaire à Genève, 3 employés, spécialisé en orthodontie..." className="flex-1 px-5 py-4 bg-transparent text-[15px] text-white placeholder:text-white/15 outline-none" />
            <button type="submit" className="text-[13px] font-semibold px-7 py-3.5 rounded-xl text-white shrink-0" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)' }}>Générer mon site →</button>
          </div>
        </form>
        <p className="text-[11px] text-white/15 mb-16">Gratuit 14 jours · Aucune carte bancaire requise</p>

        {/* Product preview — real site mockup */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} /><div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} /><div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} /></div>
            <div className="flex-1 mx-8"><div className="rounded-lg px-4 py-1.5 text-[11px] text-white/20 text-center font-mono" style={{ background: 'rgba(255,255,255,0.03)' }}>votre-site.novaos.io</div></div>
          </div>
          {/* Fake site preview */}
          <div style={{ background: '#fff', padding: '0' }}>
            {/* Mini nav */}
            <div className="flex items-center justify-between px-8 py-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
              <span className="text-sm font-bold text-gray-800">Votre Business</span>
              <div className="flex gap-6 text-[11px] text-gray-400"><span>Services</span><span>À propos</span><span>Contact</span></div>
              <div className="px-4 py-1.5 rounded-full text-[10px] font-semibold text-white" style={{ background: '#6c5ce7' }}>Réserver</div>
            </div>
            {/* Mini hero */}
            <div className="relative h-48 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(108,92,231,0.4))' }}>
                <div className="text-center">
                  <div className="text-white text-xl font-bold mb-2">Bienvenue chez Votre Business</div>
                  <div className="text-white/60 text-xs mb-3">Votre slogan accrocheur ici</div>
                  <div className="inline-block px-5 py-2 rounded-full text-[10px] font-semibold text-white" style={{ background: '#6c5ce7' }}>Prendre rendez-vous</div>
                </div>
              </div>
            </div>
            {/* Mini services */}
            <div className="px-8 py-6">
              <div className="grid grid-cols-3 gap-4">
                {['Service 1', 'Service 2', 'Service 3'].map((s, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{ border: '1px solid #f0f0f0' }}>
                    <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center text-white text-xs font-bold" style={{ background: ['#6c5ce7', '#74b9ff', '#a29bfe'][i] }}>{i + 1}</div>
                    <div className="text-xs font-semibold text-gray-800 mb-1">{s}</div>
                    <div className="text-[10px] text-gray-400">Description du service</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ TRUSTED BY ━━━ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-[11px] text-white/15 uppercase tracking-widest mb-6">Déjà adopté par des PME en Suisse et en Europe</p>
        <div className="flex items-center justify-center gap-10 text-white/10 text-lg font-bold">
          <span>Cabinet Léman</span><span>·</span><span>FitStudio</span><span>·</span><span>Brasserie du Lac</span><span>·</span><span>Atelier Luxe</span>
        </div>
      </section>

      {/* ━━━ PRODUCT ━━━ */}
      <section id="demo" className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#a29bfe' }}>Le produit</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Tout ce dont vous avez besoin</h2>
          <p className="text-sm text-white/25 max-w-md mx-auto">Un site web professionnel + des agents IA qui travaillent pour vous 24/7. Clé en main.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Big feature cards */}
          <div className="rounded-2xl p-8 md:col-span-2" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.08), rgba(116,185,255,0.04))', border: '1px solid rgba(108,92,231,0.15)' }}>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#a29bfe' }}>Site web IA</div>
                <h3 className="text-2xl font-bold mb-3">Généré en 10 secondes</h3>
                <p className="text-sm text-white/30 leading-relaxed mb-4">Décrivez votre business, choisissez votre template et vos couleurs. L'IA génère un site complet avec textes, services et contact.</p>
                <div className="flex gap-3 text-[11px] text-white/20">
                  <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>3 templates</span>
                  <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>6 palettes</span>
                  <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>Éditeur live</span>
                </div>
              </div>
              <div className="w-full md:w-64 h-40 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" alt="" className="w-full h-full object-cover opacity-60" />
              </div>
            </div>
          </div>

          {[
            { icon: '🤖', tag: 'Agent Support', title: 'Répond à vos clients', desc: 'Chat IA intégré à votre site. Répond 24/7 avec le contexte de votre business.' },
            { icon: '📈', tag: 'Agent Ventes', title: 'Relance vos prospects', desc: 'Qualifie les leads, envoie des relances personnalisées automatiquement.' },
            { icon: '✏️', tag: 'Éditeur IA', title: 'Modifiez en parlant', desc: '"Change le titre" — l\'IA modifie votre site en temps réel.' },
            { icon: '📊', tag: 'Dashboard', title: 'Tout en un coup d\'œil', desc: 'Agents actifs, tâches accomplies, activité en temps réel.' },
          ].map(f => (
            <div key={f.title} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-2xl block mb-4">{f.icon}</span>
              <div className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#a29bfe' }}>{f.tag}</div>
              <h3 className="text-base font-bold mb-2">{f.title}</h3>
              <p className="text-xs text-white/25 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ HOW ━━━ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">3 étapes, 5 minutes</h2>
          <p className="text-sm text-white/25">De l'idée au site en ligne.</p>
        </div>
        <div className="flex flex-col gap-6">
          {[
            { n: '01', title: 'Décrivez votre activité', desc: 'Nom, secteur, services, clients, ton souhaité.' },
            { n: '02', title: 'Choisissez le design', desc: 'Template, palette de couleurs, agents à activer.' },
            { n: '03', title: 'Votre business tourne', desc: 'Site en ligne, agents actifs, dashboard prêt.' },
          ].map((s, i) => (
            <div key={s.n} className="flex items-start gap-6 p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)', color: '#fff' }}>{s.n}</div>
              <div>
                <h3 className="text-base font-bold mb-1">{s.title}</h3>
                <p className="text-sm text-white/25 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ PRICING ━━━ */}
      <section id="pricing" className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Tarifs simples</h2>
          <p className="text-sm text-white/25">14 jours gratuits. Sans engagement. Annulation en 1 clic.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Starter', price: '59', desc: 'Pour démarrer', features: ['Site web IA', '1 agent IA', 'Support email', 'Hébergement EU'] },
            { name: 'Pro', price: '99', desc: 'Le plus populaire', features: ['Site web IA', '3 agents IA', 'Support prioritaire', 'Dashboard avancé', 'Éditeur IA'], featured: true },
            { name: 'Unlimited', price: '199', desc: 'Pour scaler', features: ['Site web IA', 'Agents illimités', 'Support dédié', 'API access', 'Domaine custom'] },
          ].map(p => (
            <div key={p.name} className={`rounded-2xl p-7 flex flex-col ${p.featured ? '' : ''}`} style={p.featured ? { background: 'linear-gradient(180deg, rgba(108,92,231,0.12), rgba(108,92,231,0.03))', border: '1px solid rgba(108,92,231,0.25)' } : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold ${p.featured ? '' : 'text-white/40'}`} style={p.featured ? { color: '#a29bfe' } : {}}>{p.name}</span>
                {p.featured && <span className="text-[9px] px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(108,92,231,0.2)', color: '#a29bfe' }}>Recommandé</span>}
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black">{p.price}</span>
                <span className="text-xs text-white/20">€/mois</span>
              </div>
              <p className="text-[11px] text-white/20 mb-6">{p.desc}</p>
              <div className="flex flex-col gap-2.5 mb-8 flex-1">{p.features.map(f => <span key={f} className="text-[12px] text-white/30 flex items-center gap-2"><span style={{ color: p.featured ? '#a29bfe' : 'rgba(255,255,255,0.2)' }}>✓</span>{f}</span>)}</div>
              <Link to="/onboarding" className="w-full py-3 rounded-xl text-[13px] font-semibold text-center block" style={p.featured ? { background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)', color: '#fff' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>Commencer</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="rounded-3xl p-12 md:p-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.15), rgba(116,185,255,0.08))', border: '1px solid rgba(108,92,231,0.15)' }}>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Prêt à lancer ?</h2>
          <p className="text-sm text-white/30 mb-8">Votre site + vos agents IA en 5 minutes.</p>
          <Link to="/onboarding" className="inline-block text-[13px] font-semibold px-8 py-4 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)' }}>Commencer gratuitement →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)' }}><div className="w-1.5 h-1.5 rounded bg-white" /></div><span className="text-[11px] font-bold">Nova OS</span></div>
          <div className="flex gap-5 text-[10px] text-white/15"><a href="#">Légal</a><a href="#">CGU</a><a href="#">Confidentialité</a></div>
        </div>
      </footer>
    </div>
  )
}
