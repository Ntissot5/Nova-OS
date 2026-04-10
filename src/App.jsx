import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
const ChatNova = lazy(() => import('./components/ChatNova'))
import MiniDashboard from './components/MiniDashboard'
import LiveFeed from './components/LiveFeed'

function Aurora() {
  return (
    <div className="aurora-container">
      <div className="aurora-blob aurora-blob-1" /><div className="aurora-blob aurora-blob-2" /><div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" /><div className="aurora-blob aurora-blob-5" />
      <div className="aurora-rays" /><div className="aurora-rays-2" /><div className="aurora-rays-3" />
    </div>
  )
}

function Typewriter({ text, className, delay = 0, onDone }) {
  const [displayed, setDisplayed] = useState(''); const [started, setStarted] = useState(false); const [showCaret, setShowCaret] = useState(false)
  useEffect(() => { const t = setTimeout(() => { setStarted(true); setShowCaret(true) }, delay); return () => clearTimeout(t) }, [delay])
  useEffect(() => { if (!started) return; let i = 0; const iv = setInterval(() => { setDisplayed(text.slice(0, i + 1)); i++; if (i >= text.length) { clearInterval(iv); setTimeout(() => setShowCaret(false), 1500); onDone?.() } }, 45); return () => clearInterval(iv) }, [text, started, onDone])
  if (!started) return <span className={className}>&nbsp;</span>
  return <span className={className}>{displayed}{showCaret && <span className="inline-block w-[3px] h-[0.85em] bg-accent ml-1 align-middle animate-[blink-caret_0.8s_infinite]" />}</span>
}

function useInView(threshold = 0.08) {
  const ref = useRef(null); const [inView, setInView] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold }); obs.observe(el); return () => obs.disconnect() }, [threshold])
  return [ref, inView]
}

function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView()
  return <div ref={ref} className={`${className} transition-[opacity,transform] duration-500 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function WaitlistForm({ dark, center }) {
  const [email, setEmail] = useState(''); const [done, setDone] = useState(false)
  const submit = (e) => { e.preventDefault(); if (!email || !email.includes('@')) return; const l = JSON.parse(localStorage.getItem('novaos-waitlist') || '[]'); if (!l.includes(email)) { l.push(email); localStorage.setItem('novaos-waitlist', JSON.stringify(l)) }; setDone(true); setEmail('') }
  if (done) return <p className="text-sm text-accent font-medium animate-[fade-in_0.3s_ease]">Vous êtes sur la liste.</p>
  return (
    <form onSubmit={submit} className={`flex flex-col sm:flex-row gap-3 w-full max-w-md ${center ? 'mx-auto' : 'mx-auto lg:mx-0'}`}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" required className={`flex-1 px-4 py-3 rounded-xl text-sm outline-none border ${dark ? 'bg-white/[0.08] border-white/[0.1] text-white placeholder:text-white/25 focus:border-accent/40' : 'bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-white/50'}`} />
      <button type="submit" className={`px-5 py-3 rounded-xl text-sm font-semibold transition-colors shrink-0 ${dark ? 'bg-white/[0.08] border border-white/[0.1] text-white/70 hover:bg-white/[0.12]' : 'bg-white text-black hover:bg-white/90'}`}>Rejoindre</button>
    </form>
  )
}

function DemoSection() {
  const [sector, setSector] = useState(''); const [agents, setAgents] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState(null)
  const typeLabels = { sales: 'Ventes', support: 'Support', ops: 'Opérations' }
  const generate = async (e) => {
    e.preventDefault(); if (!sector.trim()) return; setLoading(true); setError(null); setAgents(null)
    try { const res = await fetch('/api/generate-agents', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sector }) }); const data = await res.json(); if (!data.success && !data.agents) throw new Error(data.error || 'Erreur'); setAgents(data.agents || data.data) } catch (err) { setError(err.message) }; setLoading(false)
  }
  return (
    <section id="demo" className="relative z-10 max-w-4xl mx-auto px-6 py-12">
      <FadeUp><div className="text-center mb-8"><h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">Essayez Nova maintenant</h2><p className="text-white/30 text-base md:text-lg">Décrivez votre business. Nova crée vos agents en 10 secondes.</p></div></FadeUp>
      <FadeUp delay={100}>
        <form onSubmit={generate} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10">
          <input type="text" value={sector} onChange={(e) => setSector(e.target.value)} placeholder="Ex : je suis dentiste à Lausanne avec 3 employés" className="flex-1 px-5 py-3.5 rounded-xl text-sm bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/20 outline-none focus:border-accent/30 transition-colors" />
          <button type="submit" disabled={loading} className="btn-glow px-6 py-3.5 rounded-xl text-sm bg-accent text-black font-semibold shrink-0 disabled:opacity-50 disabled:animate-none">{loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Nova réfléchit...</span> : 'Générer mes agents IA'}</button>
        </form>
      </FadeUp>
      {error && <p className="text-center text-red-400/80 text-sm mb-6">{error}</p>}
      {agents && <div className="grid md:grid-cols-3 gap-4">{agents.map((a, i) => <div key={i} className="glow-card p-6 rounded-2xl border border-white/[0.06] bg-dark-card/60 backdrop-blur-sm animate-[fade-in_0.4s_ease_both]" style={{ animationDelay: `${i * 120}ms` }}><div className="flex items-center gap-2 mb-3"><span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${a.type === 'support' ? 'bg-violet/10 text-violet-light/80 border border-violet/20' : a.type === 'ops' ? 'bg-cyan-400/10 text-cyan-300/80 border border-cyan-400/20' : 'bg-accent/10 text-accent/80 border border-accent/20'}`}>{typeLabels[a.type] || a.type}</span></div><h3 className="text-sm font-semibold mb-2">{a.name}</h3><p className="text-xs text-white/30 leading-relaxed">{a.desc}</p></div>)}</div>}
    </section>
  )
}

const icons = {
  sales: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
  shield: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
  zap: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  channels: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 10h8" /><path d="M8 14h4" /></svg>,
  chart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg>,
  lock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4" /><path d="M12 19v4" /><path d="m4.22 4.22 2.83 2.83" /><path d="m16.95 16.95 2.83 2.83" /><path d="M1 12h4" /><path d="M19 12h4" /><path d="m4.22 19.78 2.83-2.83" /><path d="m16.95 7.05 2.83-2.83" /></svg>,
}

export default function App() {
  const [line1Done, setLine1Done] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0d1117 40%, #0c0c1e 70%, #0a0a1a 100%)' }}>
      <Aurora />
      <Suspense fallback={null}><ChatNova /></Suspense>

      {/* NAV */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-5 border-t border-white/[0.1] border-b border-b-white/[0.06]">
        <div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><div className="w-3 h-3 rounded-sm bg-accent shadow-[0_0_10px_rgba(79,159,255,0.5)]" /></div><span className="text-lg font-bold tracking-tight">Nova OS</span></div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/40">
          <a href="#demo" className="hover:text-accent transition-colors duration-300">Démo</a>
          <a href="#live" className="hover:text-accent transition-colors duration-300">Live</a>
          <a href="#features" className="hover:text-accent transition-colors duration-300">Fonctions</a>
          <a href="#pricing" className="hover:text-accent transition-colors duration-300">Tarifs</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-sm text-white/50 hover:text-white transition-colors duration-300 px-4 py-2">Connexion</a>
          <Link to="/onboarding" className="btn-glow text-sm bg-accent text-black font-semibold px-5 py-2.5 rounded-lg">Créer mon site →</Link>
        </div>
        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
          <span className={`block w-5 h-0.5 bg-white/60 transition-colors duration-200 ${mobileMenu ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white/60 transition-colors duration-200 ${mobileMenu ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white/60 transition-colors duration-200 ${mobileMenu ? '-rotate-45 -translate-y-[4px]' : ''}`} />
        </button>
      </nav>
      {mobileMenu && (
        <div className="md:hidden relative z-20 border-b border-white/[0.06] bg-[#0a0a1a]/95 backdrop-blur-md px-6 py-6 flex flex-col gap-4">
          {['Démo', 'Live', 'Fonctions', 'Tarifs'].map((l, i) => <a key={l} href={`#${['demo','live','features','pricing'][i]}`} onClick={() => setMobileMenu(false)} className="text-sm text-white/50 hover:text-white transition-colors">{l}</a>)}
          <div className="flex gap-3 pt-2"><a href="/login" className="text-sm text-white/50 px-4 py-2">Connexion</a><Link to="/onboarding" onClick={() => setMobileMenu(false)} className="text-sm bg-accent text-black font-semibold px-5 py-2.5 rounded-lg">Créer mon site</Link></div>
        </div>
      )}

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
          <div className="flex-1 text-center lg:text-left">
            <FadeUp><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/15 bg-accent/5 text-accent/80 text-xs font-mono mb-8"><span className="w-1.5 h-1.5 rounded-full bg-accent animate-[pulse-glow_2s_ease-in-out_infinite]" />DISPONIBLE — 14 JOURS GRATUITS</div></FadeUp>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[0.9] mb-6">
              <Typewriter text="Votre entreprise" className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent" delay={300} onDone={() => setLine1Done(true)} /><br />
              {line1Done ? <Typewriter text="tourne toute seule" className="shimmer-text" delay={200} /> : <span className="shimmer-text">&nbsp;</span>}
            </h1>
            <FadeUp delay={1800}><p className="text-base md:text-lg text-white/35 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">Nova crée votre site web et vos agents IA en 5 minutes. Ventes, support, marketing — tout tourne 24/7.</p></FadeUp>
            <FadeUp delay={2000}>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-6">
                <Link to="/onboarding" className="btn-glow group px-6 md:px-8 py-4 bg-accent text-black font-bold rounded-xl text-sm w-full sm:w-auto text-center block">Créer mon site IA gratuit<span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">&rarr;</span></Link>
                <a href="#demo" className="px-6 md:px-8 py-4 border border-white/[0.08] text-white/50 rounded-xl text-sm hover:border-accent/25 hover:text-accent transition-colors duration-200 w-full sm:w-auto text-center">Voir la démo</a>
              </div>
            </FadeUp>
            <FadeUp delay={2200}><div className="max-w-md mx-auto lg:mx-0"><p className="text-xs text-white/20 mb-3">Ou rejoignez la liste d'attente :</p><WaitlistForm dark /></div></FadeUp>
          </div>
          <FadeUp delay={800} className="flex-1 w-full lg:max-w-[440px]"><MiniDashboard /></FadeUp>
        </div>
      </section>

      {/* METRICS */}
      <FadeUp><section className="relative z-10 max-w-4xl mx-auto px-6 py-8"><div className="flex flex-wrap items-center justify-between">{[{ value: '5 min', label: 'de setup' }, { value: '99.9%', label: 'uptime' }, { value: 'RGPD', label: 'natif' }, { value: '24/7', label: 'support' }].map((m, i, arr) => <div key={m.value} className="flex items-center flex-1 min-w-[120px]"><div className="flex-1 text-center py-2"><div className="text-xl md:text-3xl font-black tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">{m.value}</div><div className="text-[10px] md:text-xs text-white/25 mt-1 font-medium">{m.label}</div></div>{i < arr.length - 1 && <div className="w-px h-8 md:h-10 bg-white/[0.06] shrink-0 hidden sm:block" />}</div>)}</div></section></FadeUp>

      {/* HOW IT WORKS */}
      <section id="how" className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <FadeUp><div className="text-center mb-10"><h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">Comment ça marche</h2><p className="text-white/30 text-base md:text-lg">Trois étapes. Cinq minutes. Zéro code.</p></div></FadeUp>
        <div className="grid md:grid-cols-3 gap-5">{[{ step: '01', title: 'Décrivez votre business', desc: 'Dites-nous ce que vous faites. Nova comprend votre secteur.' }, { step: '02', title: 'Nova crée votre site + agents', desc: "Votre site web et vos agents IA sont générés instantanément." }, { step: '03', title: 'Tout tourne 24/7', desc: 'Ventes, support, emails — vos agents travaillent pendant que vous dormez.' }].map((s, i) => <FadeUp key={s.step} delay={i * 120}><div className="relative p-6 rounded-2xl border border-white/[0.06] bg-dark-card/40 backdrop-blur-sm text-center"><div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-accent/20 bg-accent/5 mb-5"><span className="text-accent font-mono font-bold text-sm">{s.step}</span></div><h3 className="text-base font-semibold mb-2">{s.title}</h3><p className="text-sm text-white/30 leading-relaxed">{s.desc}</p>{i < 2 && <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-white/10 text-xl">&rarr;</div>}</div></FadeUp>)}</div>
      </section>

      {/* DEMO */}
      <DemoSection />

      {/* LIVE FEED */}
      <section id="live" className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <FadeUp><div className="text-center mb-8"><h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">Nova travaille maintenant</h2><p className="text-white/30 text-base md:text-lg">En ce moment, Nova exécute des tâches pour de vraies PME.</p></div></FadeUp>
        <FadeUp delay={150}><div className="glow-card rounded-2xl border border-white/[0.06] bg-dark-card/40 backdrop-blur-sm p-4"><LiveFeed /></div></FadeUp>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <FadeUp><div className="text-center mb-10"><h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">Tout ce dont votre PME a besoin</h2><p className="text-white/30 max-w-xl mx-auto text-base md:text-lg">Site web + agents IA. Conçu pour l'Europe.</p></div></FadeUp>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">{[{ icon: 'sales', title: 'Ventes automatiques', desc: "L'IA qualifie vos leads et envoie les relances.", color: 'accent' }, { icon: 'shield', title: 'Conforme RGPD', desc: 'Données en Europe. Consentement automatique.', color: 'violet' }, { icon: 'zap', title: 'Prêt en 5 minutes', desc: "Décrivez votre business, Nova fait le reste.", color: 'accent' }, { icon: 'channels', title: 'Tous vos canaux', desc: "Email, WhatsApp, chat — un seul assistant.", color: 'violet' }, { icon: 'chart', title: 'Résultats temps réel', desc: 'Dashboard avec toutes vos métriques.', color: 'accent' }, { icon: 'lock', title: 'Vous gardez le contrôle', desc: "Activez, désactivez, configurez chaque agent.", color: 'violet' }].map((f, i) => <FadeUp key={f.icon} delay={i * 80}><div className="glow-card h-full p-6 md:p-7 rounded-2xl border border-white/[0.06] bg-dark-card/60 backdrop-blur-sm"><div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${f.color === 'violet' ? 'bg-violet/10 border border-violet/20 text-violet-light' : 'bg-accent/10 border border-accent/20 text-accent'}`}>{icons[f.icon]}</div><h3 className="text-sm md:text-base font-semibold mb-2">{f.title}</h3><p className="text-xs md:text-sm text-white/30 leading-relaxed">{f.desc}</p></div></FadeUp>)}</div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <FadeUp><div className="text-center mb-10"><h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">Tarifs simples</h2><p className="text-white/30 text-base md:text-lg">Site web inclus. 14 jours gratuits. Sans engagement.</p></div></FadeUp>
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">{[{ name: 'Starter', price: '59', sub: '€/mois', features: ['Site web IA généré', '1 agent IA inclus', 'Support email', 'RGPD natif', 'Hébergement EU'] }, { name: 'Pro', price: '99', sub: '€/mois', features: ['Site web IA généré', '3 agents IA inclus', 'Support prioritaire', 'Dashboard avancé', 'Intégrations CRM'], featured: true }, { name: 'Unlimited', price: '199', sub: '€/mois', features: ['Site web IA généré', 'Agents illimités', 'Support dédié', 'API access', 'Sur vos serveurs'] }].map((p, i) => <FadeUp key={p.name} delay={i * 120}><div className={`glow-card h-full p-6 md:p-8 rounded-2xl border flex flex-col ${p.featured ? 'border-accent/20 bg-gradient-to-b from-accent/[0.04] to-violet/[0.02] shadow-[0_0_50px_rgba(79,159,255,0.06)]' : 'border-white/[0.06] bg-dark-card/40'} backdrop-blur-sm`}><div className={`text-xs font-mono mb-4 ${p.featured ? 'text-accent/60' : 'text-white/25'}`}>{p.name}</div><div className="flex items-baseline gap-1 mb-6"><span className={`text-4xl md:text-5xl font-black ${p.featured ? 'bg-gradient-to-r from-accent to-violet-light bg-clip-text text-transparent' : ''}`}>{p.price}</span><span className="text-sm text-white/25">{p.sub}</span></div><div className="flex flex-col gap-3 mb-7 flex-1">{p.features.map(f => <div key={f} className="flex items-center gap-2.5 text-xs md:text-sm text-white/40"><span className={`text-xs ${p.featured ? 'text-accent' : 'text-white/30'}`}>✓</span>{f}</div>)}</div><Link to="/onboarding" className={`w-full py-3 rounded-xl text-sm font-semibold text-center block transition-colors duration-200 ${p.featured ? 'btn-glow bg-accent text-black' : 'border border-white/[0.08] text-white/50 hover:border-accent/25 hover:text-accent'}`}>Commencer</Link></div></FadeUp>)}</div>
      </section>

      {/* CTA FINAL */}
      <FadeUp><section className="relative z-10 max-w-5xl mx-auto px-6 py-12"><div className="rounded-3xl p-8 md:p-14 text-center overflow-hidden relative" style={{ background: 'linear-gradient(135deg, rgba(79,159,255,0.12) 0%, rgba(124,58,237,0.12) 50%, rgba(79,159,255,0.08) 100%)' }}><div className="absolute inset-0 border border-white/[0.08] rounded-3xl pointer-events-none" /><h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 relative">Prêt à automatiser ?</h2><p className="text-white/40 text-sm md:text-base mb-8 relative">Créez votre site web IA et vos agents en 5 minutes.</p><div className="relative flex flex-col sm:flex-row gap-3 justify-center items-center"><Link to="/onboarding" className="btn-glow px-8 py-4 bg-accent text-black font-bold rounded-xl text-sm">Créer mon site gratuit →</Link><WaitlistForm center /></div></div></section></FadeUp>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.06] mt-4"><div className="max-w-6xl mx-auto px-6 py-10 md:py-12"><div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10"><div className="col-span-2 md:col-span-1"><div className="flex items-center gap-2.5 mb-4"><div className="w-7 h-7 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-sm bg-accent" /></div><span className="text-sm font-bold">Nova OS</span></div><p className="text-xs text-white/20 leading-relaxed">Site web IA + agents pour les PME européennes.</p><p className="text-xs text-white/15 mt-2">Zurich, Suisse</p></div><div><div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Produit</div><div className="flex flex-col gap-2.5"><Link to="/onboarding" className="text-sm text-white/25 hover:text-white/60 transition-colors">Créer mon site</Link><a href="#demo" className="text-sm text-white/25 hover:text-white/60 transition-colors">Démo</a><a href="#pricing" className="text-sm text-white/25 hover:text-white/60 transition-colors">Tarifs</a></div></div><div><div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Légal</div><div className="flex flex-col gap-2.5"><a href="#" className="text-sm text-white/25 hover:text-white/60 transition-colors">Mentions légales</a><a href="#" className="text-sm text-white/25 hover:text-white/60 transition-colors">CGU</a><a href="#" className="text-sm text-white/25 hover:text-white/60 transition-colors">Confidentialité</a><a href="#" className="text-sm text-white/25 hover:text-white/60 transition-colors">Contact</a></div></div><div><div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Suivez-nous</div><div className="flex items-center gap-3"><a href="#" className="w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/30 hover:text-accent hover:border-accent/20 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a><a href="#" className="w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/30 hover:text-accent hover:border-accent/20 transition-colors"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a></div></div></div><div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"><p className="text-xs text-white/15">© 2026 Nova OS. Tous droits réservés.</p><p className="text-xs text-white/10">Fait en Suisse avec de l'intelligence artificielle.</p></div></div></footer>
    </div>
  )
}
