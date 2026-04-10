import { Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen text-white bg-glow">
      <div className="bg-grid min-h-screen">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-sm bg-accent" /></div>
          <span className="text-[15px] font-bold">Nova OS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/30">
          <a href="#how" className="hover:text-white/50">Comment</a>
          <a href="#features" className="hover:text-white/50">Fonctions</a>
          <a href="#pricing" className="hover:text-white/50">Tarifs</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-sm text-white/30 px-3 py-2 hidden md:block hover:text-white/50">Connexion</a>
          <Link to="/onboarding" className="text-sm bg-accent text-black font-semibold px-5 py-2 rounded-lg hover:brightness-110">Commencer →</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 md:pt-32 pb-20 text-center animate-[fade-in_0.6s_ease]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/15 bg-accent/5 text-accent/70 text-xs font-mono mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          14 JOURS GRATUITS
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5">
          Votre site web + vos agents IA,
          <br /><span className="text-accent">prêts en 5 minutes</span>
        </h1>
        <p className="text-base md:text-lg text-white/30 max-w-lg mx-auto mb-10 leading-relaxed">
          Décrivez votre business. Nova génère votre site, active vos agents,
          et automatise ventes, support et opérations. 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/onboarding" className="px-8 py-4 bg-accent text-black font-bold rounded-xl text-sm shadow-[0_0_30px_rgba(79,159,255,0.15)] hover:shadow-[0_0_40px_rgba(79,159,255,0.25)] hover:brightness-110">Créer mon site IA gratuit →</Link>
          <a href="#pricing" className="px-8 py-4 border border-white/[0.08] text-white/40 rounded-xl text-sm hover:border-white/[0.15] hover:text-white/60">Voir les tarifs</a>
        </div>
      </section>

      {/* Logos / trust */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-center gap-8 text-[11px] text-white/15 font-medium">
          <span>RGPD natif</span><span className="w-1 h-1 rounded-full bg-white/10" /><span>Hébergé en Europe</span><span className="w-1 h-1 rounded-full bg-white/10" /><span>Support 24/7</span><span className="w-1 h-1 rounded-full bg-white/10" /><span>99.9% uptime</span>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Comment ça marche</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: '1', title: 'Décrivez votre business', desc: 'Répondez à quelques questions sur votre activité, vos services et vos clients.' },
            { n: '2', title: 'Nova crée tout', desc: 'Site web professionnel + agents IA personnalisés, générés en quelques secondes.' },
            { n: '3', title: 'Tout tourne 24/7', desc: 'Ventes, support, emails — vos agents travaillent pendant que vous dormez.' },
          ].map((s, i) => (
            <div key={s.n} className="card p-6 rounded-xl border border-white/[0.06] bg-dark-card text-center relative">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent text-sm font-bold flex items-center justify-center mx-auto mb-4">{s.n}</div>
              <h3 className="text-sm font-semibold mb-2">{s.title}</h3>
              <p className="text-xs text-white/25 leading-relaxed">{s.desc}</p>
              {i < 2 && <span className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-white/10">→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Tout inclus</h2>
        <p className="text-sm text-white/20 text-center mb-10">Chaque plan inclut votre site web + les agents IA que vous choisissez.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: '📈', title: 'Ventes automatiques', desc: 'Qualifie vos leads et envoie les relances.' },
            { icon: '🤖', title: 'Support 24/7', desc: 'Répond à vos clients par email et chat.' },
            { icon: '🔒', title: 'RGPD natif', desc: 'Données en Europe, consentement intégré.' },
            { icon: '💬', title: 'Tous les canaux', desc: 'Email, WhatsApp, chat — un seul agent.' },
            { icon: '📊', title: 'Dashboard', desc: 'Suivez leads, tickets et revenus.' },
            { icon: '⚡', title: 'Prêt en 5 min', desc: 'Décrivez, générez, lancez.' },
          ].map(f => (
            <div key={f.title} className="card flex items-start gap-3 p-5 rounded-xl border border-white/[0.06] bg-dark-card">
              <span className="text-lg mt-0.5">{f.icon}</span>
              <div>
                <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
                <p className="text-xs text-white/25 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Tarifs simples</h2>
        <p className="text-sm text-white/20 text-center mb-10">14 jours gratuits. Sans engagement. Annulation en 1 clic.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Starter', price: '59', features: ['Site web IA', '1 agent IA', 'Support email', 'Hébergement EU'] },
            { name: 'Pro', price: '99', features: ['Site web IA', '3 agents IA', 'Support prioritaire', 'Dashboard avancé', 'Intégrations CRM'], featured: true },
            { name: 'Unlimited', price: '199', features: ['Site web IA', 'Agents illimités', 'Support dédié', 'API access', 'Sur vos serveurs'] },
          ].map(p => (
            <div key={p.name} className={`card p-6 rounded-xl border flex flex-col ${p.featured ? 'border-accent/25 bg-accent/[0.03]' : 'border-white/[0.06] bg-dark-card'}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-semibold ${p.featured ? 'text-accent' : 'text-white/40'}`}>{p.name}</span>
                {p.featured && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent/60">populaire</span>}
              </div>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-black">{p.price}</span>
                <span className="text-xs text-white/20">€/mois</span>
              </div>
              <div className="flex flex-col gap-2 mb-6 flex-1">
                {p.features.map(f => <span key={f} className="text-xs text-white/30">✓ {f}</span>)}
              </div>
              <Link to="/onboarding" className={`w-full py-3 rounded-xl text-sm font-semibold text-center block ${p.featured ? 'bg-accent text-black hover:brightness-110' : 'border border-white/[0.08] text-white/40 hover:text-white/60 hover:border-white/[0.15]'}`}>Commencer</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="p-10 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-accent/[0.03] to-transparent">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Prêt à lancer ?</h2>
          <p className="text-sm text-white/25 mb-8">5 minutes pour automatiser votre business.</p>
          <Link to="/onboarding" className="inline-block px-8 py-4 bg-accent text-black font-bold rounded-xl text-sm shadow-[0_0_30px_rgba(79,159,255,0.15)] hover:shadow-[0_0_40px_rgba(79,159,255,0.25)] hover:brightness-110">Créer mon site IA gratuit →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-accent/10 flex items-center justify-center"><div className="w-2 h-2 rounded-sm bg-accent" /></div>
            <span className="text-xs font-bold">Nova OS</span>
            <span className="text-xs text-white/10 ml-2">Zurich, Suisse</span>
          </div>
          <div className="flex gap-5 text-[11px] text-white/15">
            <a href="#" className="hover:text-white/30">Mentions légales</a>
            <a href="#" className="hover:text-white/30">CGU</a>
            <a href="#" className="hover:text-white/30">Confidentialité</a>
            <a href="#" className="hover:text-white/30">Contact</a>
          </div>
        </div>
      </footer>

      </div>
    </div>
  )
}
