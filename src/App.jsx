import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function App() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const start = (e) => { e.preventDefault(); if (input.trim()) localStorage.setItem('novaos-desc', input); navigate('/dashboard') }

  return (
    <div className="min-h-screen text-dark" style={{ background: '#fff' }}>

      {/* Warm gradient top */}
      <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none" style={{ background: 'linear-gradient(180deg, #fde8d8 0%, #f9e0cc 30%, #ffffff 100%)' }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-16 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-dark flex items-center justify-center"><div className="w-2.5 h-2.5 rounded bg-white" /></div>
          <span className="text-base font-bold">Nova OS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[13px] text-black/40 font-medium">
          <a href="#why" className="hover:text-black/70">Pourquoi Nova</a>
          <a href="#how" className="hover:text-black/70">Comment</a>
          <a href="#pricing" className="hover:text-black/70">Tarifs</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-[13px] text-black/40 px-3 py-2 hidden md:block hover:text-black/70">Connexion</a>
          <Link to="/dashboard" className="text-[13px] font-semibold px-5 py-2.5 rounded-full bg-dark text-white">Commencer →</Link>
        </div>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-8 text-center">
        <h1 className="text-4xl md:text-[60px] font-black tracking-tight leading-[1.05] mb-5 text-dark">
          Un site pro + une équipe complète. Sans agence.
        </h1>
        <p className="text-[16px] text-black/40 max-w-lg mx-auto mb-12 leading-relaxed">
          Décrivez votre activité. Nova crée votre site, répond à vos clients, relance vos prospects. Le tout en 5 minutes, pour 99 CHF/mois.
        </p>

        {/* Input */}
        <form onSubmit={start} className="max-w-2xl mx-auto mb-3">
          <div className="flex items-center rounded-2xl p-1.5 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-black/[0.06]">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Décrivez votre activité en une phrase..." className="flex-1 px-5 py-4 bg-transparent text-[15px] text-dark placeholder:text-black/25 outline-none" />
            <button type="submit" className="text-[13px] font-semibold px-7 py-3.5 rounded-xl text-white shrink-0 bg-accent hover:bg-accent-light">Créer mon site →</button>
          </div>
        </form>
        <p className="text-[11px] text-black/25 mb-16">Prêt en 5 minutes · Gratuit 14 jours · Sans carte bancaire</p>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          <p className="text-[12px] text-black/30 w-full mb-2">Pas d'idée ? Essayez :</p>
          {['Cabinet dentaire', 'Restaurant', 'Salon de coiffure', 'Coach sportif', 'Agence immobilière'].map(s => (
            <button key={s} onClick={() => { setInput(s); }} className="text-[12px] px-4 py-2 rounded-full border border-black/[0.08] text-black/40 hover:border-black/20 hover:text-black/60">{s}</button>
          ))}
        </div>
      </section>

      {/* ━━━ PRODUCT PREVIEW — Full realistic site ━━━ */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="rounded-2xl overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.10)] border border-black/[0.06]">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#f5f5f5] border-b border-black/[0.06]">
            <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ff5f57]" /><div className="w-3 h-3 rounded-full bg-[#febc2e]" /><div className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
            <div className="flex-1 mx-12"><div className="bg-white rounded-lg px-4 py-1.5 text-[11px] text-black/30 text-center font-mono border border-black/[0.04]">🔒 cabinet-leman.novaos.io</div></div>
          </div>
          {/* Site content */}
          <div className="bg-white text-[#1a1a1a]" style={{ fontSize: '14px' }}>
            {/* Nav */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-black/[0.04]">
              <span className="text-base font-black" style={{ color: '#1e3a5f' }}>Cabinet Dentaire Léman</span>
              <div className="hidden md:flex gap-6 text-[11px] text-black/35 font-medium"><span>Services</span><span>Équipe</span><span>Avis</span><span>Contact</span></div>
              <div className="px-5 py-2 rounded-full text-[11px] font-semibold text-white" style={{ background: '#1e3a5f' }}>Prendre RDV</div>
            </div>

            {/* Hero with image */}
            <div className="relative h-64">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.85), rgba(30,58,95,0.5))' }}>
                <div className="h-full flex items-center px-10">
                  <div>
                    <p className="text-white/50 text-[10px] uppercase tracking-widest mb-2">Depuis 2008 à Genève</p>
                    <h2 className="text-white text-2xl md:text-3xl font-black mb-3 leading-tight">Votre sourire mérite<br />les meilleurs soins</h2>
                    <p className="text-white/60 text-xs mb-5 max-w-sm">Cabinet dentaire moderne au cœur de Genève. Orthodontie, implants et soins esthétiques.</p>
                    <div className="flex gap-3">
                      <div className="px-5 py-2.5 rounded-full text-[11px] font-semibold text-white" style={{ background: '#3b82f6' }}>Prendre rendez-vous</div>
                      <div className="px-5 py-2.5 rounded-full text-[11px] font-semibold text-white/70 border border-white/20">Découvrir →</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 border-b border-black/[0.04]">
              {[{ n: '15+', l: 'Années' }, { n: '3 200', l: 'Patients' }, { n: '4.9/5', l: 'Google' }, { n: '24h', l: 'Réponse' }].map(s => (
                <div key={s.n} className="text-center py-5 border-r last:border-r-0 border-black/[0.04]">
                  <div className="text-lg font-black" style={{ color: '#1e3a5f' }}>{s.n}</div>
                  <div className="text-[9px] text-black/30">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Services */}
            <div className="px-8 py-8">
              <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#3b82f6' }}>Nos services</p>
              <h3 className="text-lg font-black mb-6" style={{ color: '#1e3a5f' }}>Des soins d'excellence</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: '🦷', name: 'Orthodontie', desc: 'Alignement dentaire invisible et bagues classiques.', price: 'Dès 2 500 CHF' },
                  { icon: '✨', name: 'Esthétique dentaire', desc: 'Blanchiment, facettes et sourire sur-mesure.', price: 'Dès 800 CHF' },
                  { icon: '🔧', name: 'Implants', desc: 'Remplacement durable des dents manquantes.', price: 'Dès 3 000 CHF' },
                ].map((s, i) => (
                  <div key={i} className="p-5 rounded-xl border border-black/[0.04] hover:shadow-md">
                    <span className="text-xl block mb-3">{s.icon}</span>
                    <div className="text-xs font-bold mb-1.5" style={{ color: '#1e3a5f' }}>{s.name}</div>
                    <div className="text-[10px] text-black/35 leading-relaxed mb-3">{s.desc}</div>
                    <div className="text-[10px] font-bold" style={{ color: '#3b82f6' }}>{s.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="px-8 py-8 bg-[#f8f9fb]">
              <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#3b82f6' }}>Avis patients</p>
              <h3 className="text-lg font-black mb-6" style={{ color: '#1e3a5f' }}>Ils nous font confiance</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { text: 'Excellent cabinet, équipe très professionnelle et rassurante.', name: 'Marie L.', stars: 5 },
                  { text: 'Mon traitement d\'orthodontie s\'est parfaitement déroulé.', name: 'Pierre K.', stars: 5 },
                  { text: 'Je recommande vivement. Soins de qualité supérieure.', name: 'Sophie R.', stars: 5 },
                ].map((t, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-black/[0.04]">
                    <div className="flex gap-0.5 mb-2">{[...Array(t.stars)].map((_, j) => <span key={j} className="text-[10px]" style={{ color: '#f59e0b' }}>★</span>)}</div>
                    <p className="text-[10px] text-black/40 leading-relaxed mb-3">"{t.text}"</p>
                    <div className="text-[10px] font-bold" style={{ color: '#1e3a5f' }}>{t.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="px-8 py-6 flex items-center justify-between border-t border-black/[0.04]">
              <div className="flex gap-8">
                <div><div className="text-[8px] text-black/25 uppercase tracking-widest mb-1">Email</div><div className="text-[11px] font-medium">contact@cabinet-leman.ch</div></div>
                <div><div className="text-[8px] text-black/25 uppercase tracking-widest mb-1">Téléphone</div><div className="text-[11px] font-medium">+41 22 700 40 50</div></div>
                <div><div className="text-[8px] text-black/25 uppercase tracking-widest mb-1">Adresse</div><div className="text-[11px] font-medium">Rue du Lac 15, 1201 Genève</div></div>
              </div>
              <div className="text-[8px] text-black/15">Propulsé par Nova OS</div>
            </div>

            {/* Fake chat widget */}
            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg" style={{ background: '#1e3a5f' }}>💬</div>
          </div>
        </div>
        <p className="text-center text-[11px] text-black/20 mt-4">↑ Exemple de site généré par Nova OS en 5 minutes</p>
      </section>

      {/* ━━━ LOGOS ━━━ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-16 text-center">
        <p className="text-[11px] text-black/20 uppercase tracking-widest mb-4">Utilisé par des PME en Suisse et en Europe</p>
        <div className="flex items-center justify-center gap-8 text-black/10 text-base font-bold">
          <span>Cabinet Léman</span><span>FitStudio</span><span>Brasserie du Lac</span><span>Atelier Luxe</span>
        </div>
      </section>

      {/* ━━━ WHY — Comparison ━━━ */}
      <section id="why" className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Arrêtez de surpayer</h2>
          <p className="text-sm text-black/40 max-w-md mx-auto">Une agence facture des milliers. Nova fait pareil pour le prix d'un café par jour.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-7 bg-[#fafafa] border border-black/[0.04]">
            <div className="text-xs font-bold text-black/20 uppercase tracking-widest mb-5">Agence traditionnelle</div>
            <div className="flex flex-col gap-3 mb-6">
              {['Site web : 3 000 – 15 000 CHF', 'Délai : 4 à 12 semaines', 'Modifications : 80 CHF/heure', 'Support client : pas inclus', 'Marketing : supplément', 'Vous attendez. Vous payez.'].map(t => (
                <div key={t} className="flex items-center gap-2.5 text-[13px] text-black/30"><span className="text-red-400">✕</span>{t}</div>
              ))}
            </div>
            <div className="text-2xl font-black text-black/15">5 000 – 20 000 CHF</div>
          </div>
          <div className="rounded-2xl p-7 border-2 border-accent/20 bg-orange-50/50">
            <div className="text-xs font-bold text-accent uppercase tracking-widest mb-5">Nova OS</div>
            <div className="flex flex-col gap-3 mb-6">
              {['Site web pro en 5 minutes', 'Modifications en 1 clic', 'Réponse client auto 24/7', 'Relance prospects non-stop', 'Rapports hebdo automatiques', 'Vous dormez. Ça tourne.'].map(t => (
                <div key={t} className="flex items-center gap-2.5 text-[13px] text-black/50"><span className="text-accent">✓</span>{t}</div>
              ))}
            </div>
            <div className="text-2xl font-black text-dark">99 CHF<span className="text-sm font-normal text-black/30">/mois</span></div>
          </div>
        </div>
      </section>

      {/* ━━━ WHAT NOVA DOES ━━━ */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-widest text-accent mb-3">Concrètement</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Nova remplace 5 prestataires</h2>
          <p className="text-sm text-black/40 max-w-lg mx-auto">Développeur, designer, réceptionniste, commercial, assistant. Pour 99 CHF/mois.</p>
        </div>

        <div className="rounded-2xl p-8 mb-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-accent/10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-3">Votre site web</div>
              <h3 className="text-2xl font-bold mb-3 text-dark">En ligne en 5 minutes, pas 5 semaines</h3>
              <p className="text-sm text-black/40 leading-relaxed">Décrivez → choisissez → c'est live. Modifiez en cliquant ou dites à l'IA quoi changer.</p>
            </div>
            <div className="w-full md:w-56 h-36 rounded-xl overflow-hidden border border-black/[0.06]">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { emoji: '💬', role: 'Votre réceptionniste', title: 'Réponse en 10 secondes, même à 3h du matin', desc: 'Chat IA sur votre site. Connaît vos services, tarifs, horaires. Jour et nuit.', cost: 'Remplace : 3 500 CHF/mois' },
            { emoji: '📈', role: 'Votre commercial', title: 'Prospects relancés jusqu\'au rendez-vous', desc: 'Chaque lead qualifié et relancé automatiquement. Zéro prospect oublié.', cost: 'Remplace : 5 000 CHF/mois' },
            { emoji: '📧', role: 'Votre assistant', title: 'Emails triés, urgences traitées', desc: 'L\'IA lit, répond aux questions simples, vous alerte quand c\'est important.', cost: 'Remplace : 2 500 CHF/mois' },
            { emoji: '📊', role: 'Votre analyste', title: 'Rapport clair chaque lundi matin', desc: 'Clients contactés, RDV pris, questions résolues. Tout mesuré.', cost: 'Remplace : heures de reporting' },
          ].map(f => (
            <div key={f.title} className="rounded-2xl p-6 bg-[#fafafa] border border-black/[0.04]">
              <span className="text-2xl block mb-3">{f.emoji}</span>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-2">{f.role}</div>
              <h3 className="text-[15px] font-bold mb-2 text-dark leading-snug">{f.title}</h3>
              <p className="text-xs text-black/35 leading-relaxed mb-3">{f.desc}</p>
              <div className="text-[10px] text-black/20 italic">{f.cost}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ HOW ━━━ */}
      <section id="how" className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Opérationnel en 5 minutes</h2>
          <p className="text-sm text-black/40">Pas de devis. Pas de réunion. Pas d'attente.</p>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { n: '1', title: 'Décrivez votre activité', desc: '7 questions simples : qui êtes-vous, que faites-vous, qui sont vos clients.' },
            { n: '2', title: 'Choisissez le design', desc: 'Template, couleurs, ton. L\'IA génère tous les textes.' },
            { n: '3', title: 'Activez vos automatisations', desc: 'Support, relance, emails, rapports. Cochez ce que vous voulez.' },
            { n: '4', title: 'C\'est en ligne', desc: 'Site live. Automatisations actives. Dashboard prêt.' },
          ].map(s => (
            <div key={s.n} className="flex items-start gap-5 p-5 rounded-2xl bg-[#fafafa] border border-black/[0.04]">
              <div className="w-10 h-10 rounded-xl bg-dark text-white flex items-center justify-center text-sm font-bold shrink-0">{s.n}</div>
              <div><h3 className="text-sm font-bold mb-1 text-dark">{s.title}</h3><p className="text-xs text-black/35 leading-relaxed">{s.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ PRICING ━━━ */}
      <section id="pricing" className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Moins cher qu'un stagiaire</h2>
          <p className="text-sm text-black/40">14 jours gratuits. Annulation en 1 clic.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Starter', price: '59', desc: 'Indépendants', features: ['Site web professionnel', 'Réceptionniste IA (chat)', 'Support email', 'Hébergement Suisse'] },
            { name: 'Pro', price: '99', desc: 'PME', features: ['Tout Starter +', 'Commercial IA (relances)', 'Assistant email IA', 'Rapports hebdo', 'Éditeur IA'], featured: true },
            { name: 'Scale', price: '199', desc: 'Ambitieux', features: ['Tout Pro +', 'Automatisations illimitées', 'Support dédié', 'API & intégrations', 'Domaine custom'] },
          ].map(p => (
            <div key={p.name} className={`rounded-2xl p-7 flex flex-col ${p.featured ? 'bg-dark text-white' : 'bg-[#fafafa] border border-black/[0.04]'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold ${p.featured ? 'text-white/60' : 'text-black/30'}`}>{p.name}</span>
                {p.featured && <span className="text-[9px] px-2.5 py-1 rounded-full bg-accent text-white font-semibold">Populaire</span>}
              </div>
              <div className="flex items-baseline gap-1 mb-1"><span className="text-4xl font-black">{p.price}</span><span className={`text-xs ${p.featured ? 'text-white/30' : 'text-black/20'}`}>CHF/mois</span></div>
              <p className={`text-[11px] mb-6 ${p.featured ? 'text-white/30' : 'text-black/25'}`}>{p.desc}</p>
              <div className="flex flex-col gap-2.5 mb-8 flex-1">{p.features.map(f => <span key={f} className={`text-[12px] flex items-center gap-2 ${p.featured ? 'text-white/50' : 'text-black/35'}`}><span className={p.featured ? 'text-accent' : 'text-black/15'}>✓</span>{f}</span>)}</div>
              <Link to="/dashboard" className={`w-full py-3 rounded-xl text-[13px] font-semibold text-center block ${p.featured ? 'bg-accent text-white' : 'bg-white border border-black/[0.08] text-black/50 hover:text-black/70'}`}>Essayer 14 jours</Link>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-black/20 mt-6">Comparé à une agence (5 000 – 20 000 CHF) + un employé (3 500 CHF/mois), c'est 50x moins cher.</p>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="rounded-3xl p-12 md:p-16" style={{ background: 'linear-gradient(135deg, #fde8d8, #fef3c7)' }}>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-dark">Votre business mérite mieux qu'une agence à 10 000 CHF</h2>
          <p className="text-sm text-black/40 mb-8">5 minutes. 99 CHF/mois. Tout inclus.</p>
          <Link to="/dashboard" className="inline-block text-[13px] font-semibold px-8 py-4 rounded-full bg-dark text-white">Commencer gratuitement →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-black/[0.04]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-lg bg-dark flex items-center justify-center"><div className="w-1.5 h-1.5 rounded bg-white" /></div><span className="text-[11px] font-bold">Nova OS</span><span className="text-[10px] text-black/20 ml-2">Zurich, Suisse</span></div>
          <div className="flex gap-5 text-[10px] text-black/20"><a href="#">Légal</a><a href="#">CGU</a><a href="#">Confidentialité</a></div>
        </div>
      </footer>
    </div>
  )
}
