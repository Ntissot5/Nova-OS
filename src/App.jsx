import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function App() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const start = (e) => { e.preventDefault(); if (input.trim()) localStorage.setItem('novaos-desc', input); navigate('/onboarding') }

  const G = (t) => <span style={{ background: 'linear-gradient(135deg, #a29bfe, #74b9ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t}</span>

  return (
    <div className="min-h-screen text-white" style={{ background: '#09090f' }}>
      <div className="fixed inset-0 pointer-events-none"><div className="absolute w-[800px] h-[600px] -top-[300px] left-1/2 -translate-x-1/2 rounded-full opacity-[0.12]" style={{ background: 'radial-gradient(circle, #6c5ce7, transparent 70%)' }} /></div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-16 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)' }}><div className="w-3 h-3 rounded bg-white" /></div>
          <span className="text-base font-bold">Nova OS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[13px] text-white/30 font-medium">
          <a href="#compare" className="hover:text-white/60">Pourquoi Nova</a>
          <a href="#how" className="hover:text-white/60">Comment</a>
          <a href="#pricing" className="hover:text-white/60">Tarifs</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-[13px] text-white/30 px-3 py-2 hidden md:block hover:text-white/60">Connexion</a>
          <Link to="/onboarding" className="text-[13px] font-semibold px-5 py-2.5 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)' }}>Essai gratuit →</Link>
        </div>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-20 md:pt-32 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium text-white/30 mb-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          🇨🇭 Créé en Suisse · Utilisé par 500+ PME en Europe
        </div>

        <h1 className="text-4xl md:text-[68px] font-black tracking-tight leading-[1] mb-6">
          Un site pro + une équipe<br />complète. {G('Sans agence.')}
        </h1>
        <p className="text-[16px] text-white/30 max-w-xl mx-auto mb-12 leading-relaxed">
          Votre site web est en ligne en 5 minutes. Vos clients reçoivent une réponse en 10 secondes. Vos prospects sont relancés automatiquement. <span className="text-white/50 font-medium">Le tout pour le prix d'un déjeuner d'affaires par mois.</span>
        </p>

        <form onSubmit={start} className="max-w-2xl mx-auto mb-4">
          <div className="flex items-center rounded-2xl p-1.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Décrivez votre activité en une phrase..." className="flex-1 px-5 py-4 bg-transparent text-[15px] text-white placeholder:text-white/15 outline-none" />
            <button type="submit" className="text-[13px] font-semibold px-7 py-3.5 rounded-xl text-white shrink-0" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)' }}>Créer mon site →</button>
          </div>
        </form>
        <p className="text-[11px] text-white/15 mb-16">Prêt en 5 minutes · Gratuit 14 jours · Sans carte bancaire</p>

        {/* Product preview */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} /><div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} /><div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} /></div>
            <div className="flex-1 mx-8"><div className="rounded-lg px-4 py-1.5 text-[11px] text-white/20 text-center font-mono" style={{ background: 'rgba(255,255,255,0.03)' }}>votre-business.novaos.io</div></div>
          </div>
          <div style={{ background: '#fff' }}>
            <div className="flex items-center justify-between px-8 py-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
              <span className="text-sm font-bold text-gray-800">Votre Business</span>
              <div className="flex gap-6 text-[11px] text-gray-400"><span>Services</span><span>À propos</span><span>Contact</span></div>
              <div className="px-4 py-1.5 rounded-full text-[10px] font-semibold text-white" style={{ background: '#6c5ce7' }}>Réserver</div>
            </div>
            <div className="relative h-52">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(108,92,231,0.3))' }}>
                <div className="text-center"><div className="text-white text-2xl font-bold mb-2">Votre titre ici</div><div className="text-white/60 text-sm mb-4">Votre slogan accrocheur</div><div className="inline-block px-6 py-2.5 rounded-full text-xs font-semibold text-white" style={{ background: '#6c5ce7' }}>Prendre rendez-vous</div></div>
              </div>
            </div>
            <div className="px-8 py-6 grid grid-cols-3 gap-4">
              {['Votre service 1', 'Votre service 2', 'Votre service 3'].map((s, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ border: '1px solid #f0f0f0' }}>
                  <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center text-white text-xs font-bold" style={{ background: ['#6c5ce7', '#74b9ff', '#a29bfe'][i] }}>{i + 1}</div>
                  <div className="text-xs font-semibold text-gray-800 mb-1">{s}</div>
                  <div className="text-[10px] text-gray-400">Généré par l'IA</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ COMPARE — Pourquoi pas une agence ━━━ */}
      <section id="compare" className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Arrêtez de payer trop cher</h2>
          <p className="text-sm text-white/25 max-w-md mx-auto">Votre agence web vous facture des milliers. Nova OS fait la même chose pour le prix d'un café par jour.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Agence */}
          <div className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-xs font-bold text-white/20 uppercase tracking-widest mb-5">Agence traditionnelle</div>
            <div className="flex flex-col gap-3 mb-6">
              {['Site web : 3 000 – 15 000 CHF', 'Délai : 4 à 12 semaines', 'Modifications : 80 CHF/heure', 'Support client : pas inclus', 'Marketing : supplément', 'Vous attendez. Vous payez.'].map(t => (
                <div key={t} className="flex items-center gap-2.5 text-[13px] text-white/25"><span className="text-red-400/60">✕</span>{t}</div>
              ))}
            </div>
            <div className="text-2xl font-black text-white/15">5 000 – 20 000 CHF</div>
            <div className="text-[11px] text-white/10">+ frais récurrents</div>
          </div>
          {/* Nova */}
          <div className="rounded-2xl p-7" style={{ background: 'linear-gradient(180deg, rgba(108,92,231,0.1), rgba(108,92,231,0.03))', border: '1px solid rgba(108,92,231,0.2)' }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#a29bfe' }}>Nova OS</div>
            <div className="flex flex-col gap-3 mb-6">
              {['Site web professionnel en 5 minutes', 'Modifications en 1 clic ou par la voix', 'Réponse client automatique 24/7', 'Relance de vos prospects non-stop', 'Rapports hebdomadaires automatiques', 'Vous dormez. Ça tourne.'].map(t => (
                <div key={t} className="flex items-center gap-2.5 text-[13px] text-white/40"><span style={{ color: '#a29bfe' }}>✓</span>{t}</div>
              ))}
            </div>
            <div className="text-2xl font-black">99 CHF<span className="text-sm font-normal text-white/20">/mois</span></div>
            <div className="text-[11px] text-white/20">Tout inclus. Sans surprise.</div>
          </div>
        </div>
      </section>

      {/* ━━━ CE QUE NOVA FAIT POUR VOUS ━━━ */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#a29bfe' }}>Concrètement</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Nova remplace 5 prestataires</h2>
          <p className="text-sm text-white/25 max-w-lg mx-auto">Un développeur web, un designer, une réceptionniste, un commercial et un assistant marketing. Pour 99 CHF/mois.</p>
        </div>

        {/* Big card */}
        <div className="rounded-2xl p-8 mb-4" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.08), rgba(116,185,255,0.04))', border: '1px solid rgba(108,92,231,0.15)' }}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#a29bfe' }}>Votre site web</div>
              <h3 className="text-2xl font-bold mb-3">En ligne en 5 minutes, pas 5 semaines</h3>
              <p className="text-sm text-white/30 leading-relaxed mb-4">Décrivez votre activité → choisissez le design → c'est en ligne. Modifiez n'importe quel texte en cliquant dessus. Ou dites à l'IA "change le titre" et c'est fait.</p>
              <div className="flex gap-2 text-[11px] text-white/20">
                <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>3 designs pro</span>
                <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>Éditeur visuel</span>
                <span className="px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>IA intégrée</span>
              </div>
            </div>
            <div className="w-full md:w-64 h-44 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" alt="" className="w-full h-full object-cover opacity-60" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { emoji: '💬', role: 'Votre réceptionniste', title: 'Vos clients reçoivent une réponse en 10 secondes', desc: 'Un chat intelligent est intégré à votre site. Il connaît vos services, vos tarifs, vos horaires. Il répond jour et nuit, même le dimanche à 3h du matin.', tag: 'Remplace : 1 réceptionniste (3 500 CHF/mois)' },
            { emoji: '📈', role: 'Votre commercial', title: 'Vos prospects sont relancés jusqu\'à ce qu\'ils répondent', desc: 'Chaque lead est qualifié et relancé automatiquement par email. Pas de prospect oublié, pas de relance manquée. Pendant que vous vous concentrez sur les RDV.', tag: 'Remplace : 1 commercial (5 000 CHF/mois)' },
            { emoji: '📧', role: 'Votre assistant', title: 'Vos emails sont triés et les urgences traitées', desc: 'L\'IA lit vos emails entrants, répond aux questions simples, et vous alerte uniquement quand c\'est important.', tag: 'Remplace : 1 assistant (2 500 CHF/mois)' },
            { emoji: '📊', role: 'Votre analyste', title: 'Un rapport clair chaque lundi matin', desc: 'Combien de clients contactés, de rendez-vous pris, de questions résolues. Tout est mesuré. Vous voyez exactement ce que Nova fait pour vous.', tag: 'Remplace : heures de reporting manuel' },
          ].map(f => (
            <div key={f.title} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-2xl block mb-3">{f.emoji}</span>
              <div className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#a29bfe' }}>{f.role}</div>
              <h3 className="text-[15px] font-bold mb-2 leading-snug">{f.title}</h3>
              <p className="text-xs text-white/25 leading-relaxed mb-3">{f.desc}</p>
              <div className="text-[10px] text-white/15 italic">{f.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ HOW ━━━ */}
      <section id="how" className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Opérationnel en 5 minutes</h2>
          <p className="text-sm text-white/25">Pas de devis. Pas de réunion. Pas d'attente.</p>
        </div>
        <div className="flex flex-col gap-5">
          {[
            { n: '01', title: 'Décrivez votre activité', desc: 'En 7 questions simples : qui êtes-vous, que faites-vous, qui sont vos clients.' },
            { n: '02', title: 'Choisissez le look', desc: 'Template, couleurs, ton. L\'IA génère tous les textes et la structure du site.' },
            { n: '03', title: 'Activez vos automatisations', desc: 'Support client, relance prospects, emails, rapports. Cochez ce que vous voulez.' },
            { n: '04', title: 'C\'est en ligne', desc: 'Votre site est live. Vos automatisations tournent. Votre dashboard est prêt.' },
          ].map(s => (
            <div key={s.n} className="flex items-start gap-5 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)', color: '#fff' }}>{s.n}</div>
              <div><h3 className="text-sm font-bold mb-1">{s.title}</h3><p className="text-xs text-white/25 leading-relaxed">{s.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ PRICING ━━━ */}
      <section id="pricing" className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Moins cher qu'un stagiaire</h2>
          <p className="text-sm text-white/25">14 jours gratuits. Annulation en 1 clic. Pas de surprise.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Starter', price: '59', desc: 'Pour les indépendants', features: ['Site web professionnel', 'Réceptionniste IA (chat)', 'Support email', 'Hébergement Suisse'], cta: 'Essayer 14 jours' },
            { name: 'Pro', price: '99', desc: 'Pour les PME', features: ['Tout Starter +', 'Commercial IA (relances)', 'Assistant email IA', 'Rapports hebdo', 'Éditeur IA vocal'], featured: true, cta: 'Essayer 14 jours' },
            { name: 'Scale', price: '199', desc: 'Pour les ambitieux', features: ['Tout Pro +', 'Automatisations illimitées', 'Support dédié', 'API & intégrations', 'Domaine personnalisé'], cta: 'Nous contacter' },
          ].map(p => (
            <div key={p.name} className="rounded-2xl p-7 flex flex-col" style={p.featured ? { background: 'linear-gradient(180deg, rgba(108,92,231,0.12), rgba(108,92,231,0.03))', border: '1px solid rgba(108,92,231,0.25)' } : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold" style={p.featured ? { color: '#a29bfe' } : { color: 'rgba(255,255,255,0.4)' }}>{p.name}</span>
                {p.featured && <span className="text-[9px] px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(108,92,231,0.2)', color: '#a29bfe' }}>Recommandé</span>}
              </div>
              <div className="flex items-baseline gap-1 mb-1"><span className="text-4xl font-black">{p.price}</span><span className="text-xs text-white/20">CHF/mois</span></div>
              <p className="text-[11px] text-white/20 mb-6">{p.desc}</p>
              <div className="flex flex-col gap-2.5 mb-8 flex-1">{p.features.map(f => <span key={f} className="text-[12px] text-white/30 flex items-center gap-2"><span style={{ color: p.featured ? '#a29bfe' : 'rgba(255,255,255,0.2)' }}>✓</span>{f}</span>)}</div>
              <Link to="/onboarding" className="w-full py-3 rounded-xl text-[13px] font-semibold text-center block" style={p.featured ? { background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)', color: '#fff' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>{p.cta}</Link>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-white/15 mt-6">Comparé à une agence (5 000 – 20 000 CHF) + un employé (3 500 CHF/mois), c'est <span className="text-white/30 font-medium">50x moins cher</span>.</p>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="rounded-3xl p-12 md:p-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.15), rgba(116,185,255,0.08))', border: '1px solid rgba(108,92,231,0.15)' }}>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Votre business mérite mieux<br />qu'une agence à 10 000 CHF</h2>
          <p className="text-sm text-white/30 mb-8">5 minutes. 99 CHF/mois. Tout inclus.</p>
          <Link to="/onboarding" className="inline-block text-[13px] font-semibold px-8 py-4 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)' }}>Commencer gratuitement →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6c5ce7, #74b9ff)' }}><div className="w-1.5 h-1.5 rounded bg-white" /></div><span className="text-[11px] font-bold">Nova OS</span><span className="text-[10px] text-white/10 ml-2">Zurich, Suisse</span></div>
          <div className="flex gap-5 text-[10px] text-white/15"><a href="#">Légal</a><a href="#">CGU</a><a href="#">Confidentialité</a></div>
        </div>
      </footer>
    </div>
  )
}
