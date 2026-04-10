import { Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen text-white bg-dark">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-sm bg-accent" /></div>
          <span className="text-[15px] font-bold">Nova OS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/30">
          <a href="#pricing">Tarifs</a>
          <a href="#features">Fonctions</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-sm text-white/30 px-3 py-2 hidden md:block">Connexion</a>
          <Link to="/onboarding" className="text-sm bg-accent text-black font-semibold px-5 py-2 rounded-lg">Commencer →</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 md:pt-32 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5">
          Votre site web + vos agents IA,
          <br /><span className="text-accent">prêts en 5 minutes</span>
        </h1>
        <p className="text-base md:text-lg text-white/30 max-w-lg mx-auto mb-10 leading-relaxed">
          Décrivez votre business. Nova génère votre site, active vos agents,
          et automatise ventes, support et opérations. 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/onboarding" className="px-8 py-4 bg-accent text-black font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(79,159,255,0.2)]">Créer mon site IA gratuit →</Link>
          <a href="#pricing" className="px-8 py-4 border border-white/[0.08] text-white/40 rounded-xl text-sm">Voir les tarifs</a>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Comment ça marche</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: '1', title: 'Décrivez votre business', desc: 'Répondez à quelques questions sur votre activité.' },
            { n: '2', title: 'Nova crée tout', desc: 'Site web + agents IA générés automatiquement.' },
            { n: '3', title: 'Tout tourne 24/7', desc: 'Ventes, support, emails — sans intervention.' },
          ].map(s => (
            <div key={s.n} className="p-6 rounded-xl border border-white/[0.06] bg-dark-card text-center">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent text-sm font-bold flex items-center justify-center mx-auto mb-4">{s.n}</div>
              <h3 className="text-sm font-semibold mb-2">{s.title}</h3>
              <p className="text-xs text-white/25 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Fonctions</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: 'Ventes auto', desc: 'Qualifie vos leads, envoie les relances.' },
            { title: 'Support 24/7', desc: 'Répond à vos clients automatiquement.' },
            { title: 'RGPD natif', desc: 'Données en Europe, consentement intégré.' },
            { title: 'Tous les canaux', desc: 'Email, WhatsApp, chat — un seul agent.' },
            { title: 'Dashboard', desc: 'Suivez tout en temps réel.' },
            { title: 'Vous décidez', desc: 'Activez, désactivez chaque agent.' },
          ].map(f => (
            <div key={f.title} className="p-5 rounded-xl border border-white/[0.06] bg-dark-card">
              <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
              <p className="text-xs text-white/25">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Tarifs</h2>
        <p className="text-sm text-white/25 text-center mb-10">14 jours gratuits. Sans engagement.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Starter', price: '59', features: ['Site web IA', '1 agent', 'Support email'] },
            { name: 'Pro', price: '99', features: ['Site web IA', '3 agents', 'Support prioritaire', 'Dashboard avancé'], featured: true },
            { name: 'Unlimited', price: '199', features: ['Site web IA', 'Agents illimités', 'Support dédié', 'API access'] },
          ].map(p => (
            <div key={p.name} className={`p-6 rounded-xl border flex flex-col ${p.featured ? 'border-accent/25 bg-accent/[0.03]' : 'border-white/[0.06] bg-dark-card'}`}>
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
              <Link to="/onboarding" className={`w-full py-3 rounded-xl text-sm font-semibold text-center block ${p.featured ? 'bg-accent text-black' : 'border border-white/[0.08] text-white/40'}`}>Commencer</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Prêt ?</h2>
        <p className="text-sm text-white/25 mb-8">5 minutes pour lancer votre business automatisé.</p>
        <Link to="/onboarding" className="inline-block px-8 py-4 bg-accent text-black font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(79,159,255,0.2)]">Créer mon site gratuit →</Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-accent/10 flex items-center justify-center"><div className="w-2 h-2 rounded-sm bg-accent" /></div>
            <span className="text-xs font-bold">Nova OS</span>
            <span className="text-xs text-white/10 ml-2">Zurich</span>
          </div>
          <div className="flex gap-5 text-[11px] text-white/15">
            <a href="#">Mentions légales</a>
            <a href="#">CGU</a>
            <a href="#">Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
