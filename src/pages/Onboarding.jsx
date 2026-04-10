import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

const SECTORS = ['Restaurant', 'Cabinet médical', 'Agence immobilière', 'Commerce retail', 'Agence marketing', 'Salon / Spa', 'Coach / Formation', 'Autre']
const TONES = [
  { id: 'professional', label: 'Professionnel', icon: '💼' },
  { id: 'warm', label: 'Chaleureux', icon: '🤝' },
  { id: 'luxury', label: 'Luxe', icon: '✨' },
  { id: 'dynamic', label: 'Dynamique', icon: '🚀' },
]
const TEMPLATES = [
  { id: 'modern', name: 'Modern', desc: 'Blanc, clean, aéré. Pour les pros.', preview: 'bg-white', textColor: 'text-black' },
  { id: 'elegant', name: 'Élégant', desc: 'Serif, raffiné, haut de gamme.', preview: 'bg-[#faf9f6]', textColor: 'text-black' },
  { id: 'bold', name: 'Bold', desc: 'Sombre, impactant, moderne.', preview: 'bg-[#0a0a0a]', textColor: 'text-white' },
]
const PALETTES = [
  { id: 'blue', name: 'Bleu pro', primary: '#1a365d', accent: '#3b82f6', secondary: '#dbeafe' },
  { id: 'green', name: 'Vert nature', primary: '#1a3a2a', accent: '#22c55e', secondary: '#dcfce7' },
  { id: 'purple', name: 'Violet luxe', primary: '#2d1b69', accent: '#8b5cf6', secondary: '#ede9fe' },
  { id: 'gold', name: 'Or élégant', primary: '#1a1a1a', accent: '#d4a053', secondary: '#fef3c7' },
  { id: 'red', name: 'Rouge énergie', primary: '#1a1a1a', accent: '#ef4444', secondary: '#fee2e2' },
  { id: 'teal', name: 'Teal santé', primary: '#0f3d3e', accent: '#14b8a6', secondary: '#ccfbf1' },
]
const AUTOMATIONS = [
  { id: 'support', label: 'Support client', icon: '🤖' },
  { id: 'sales', label: 'Relance prospects', icon: '📈' },
  { id: 'email', label: 'Emails marketing', icon: '📧' },
  { id: 'booking', label: 'Prise de RDV', icon: '📅' },
  { id: 'quotes', label: 'Génération de devis', icon: '📋' },
  { id: 'reports', label: 'Rapports hebdo', icon: '📊' },
]
const PLANS = [
  { id: 'starter', name: 'Starter', price: 59, features: ['Site web IA', '1 agent', 'Support email'] },
  { id: 'pro', name: 'Pro', price: 99, features: ['Site web IA', '3 agents', 'Support prio', 'Dashboard'], featured: true },
  { id: 'unlimited', name: 'Unlimited', price: 199, features: ['Site web IA', 'Agents illimités', 'Support dédié', 'API'] },
]

const TOTAL_STEPS = 7
const inp = 'w-full px-4 py-3.5 rounded-xl text-[15px] bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/20 outline-none focus:border-accent/50 focus:bg-white/[0.07]'
const lbl = 'block text-sm font-medium text-white/40 mb-2'

function Chip({ active, onClick, children }) {
  return <button type="button" onClick={onClick} className={`py-3.5 px-4 rounded-xl text-sm font-medium border cursor-pointer select-none active:scale-[0.97] ${active ? 'border-accent bg-accent/10 text-accent' : 'border-white/[0.1] text-white/40 hover:border-white/[0.2]'}`}>{children}</button>
}

function CardSelect({ active, onClick, icon, label, extra }) {
  return <button type="button" onClick={onClick} className={`flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer select-none active:scale-[0.97] ${active ? 'border-accent bg-accent/10' : 'border-white/[0.1] hover:border-white/[0.2]'}`}><span className="text-xl shrink-0">{icon}</span><span className={`text-sm font-medium flex-1 ${active ? 'text-accent' : 'text-white/50'}`}>{label}</span>{active && <span className="text-accent text-sm shrink-0">✓</span>}{extra}</button>
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [setupStatus, setSetupStatus] = useState('')

  const [companyName, setCompanyName] = useState('')
  const [sector, setSector] = useState('')
  const [city, setCity] = useState('')
  const [description, setDescription] = useState('')
  const [services, setServices] = useState(['', '', ''])
  const [clientType, setClientType] = useState('')
  const [ageRange, setAgeRange] = useState('')
  const [tone, setTone] = useState('')
  const [template, setTemplate] = useState('modern')
  const [palette, setPalette] = useState('blue')
  const [automations, setAutomations] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [plan, setPlan] = useState('pro')

  const toggle = (id) => setAutomations(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  const setSvc = (i, v) => setServices(prev => prev.map((s, idx) => idx === i ? v : s))

  const valid = () => {
    if (step === 1) return companyName.trim() && sector && city.trim()
    if (step === 2) return description.trim()
    if (step === 3) return clientType && tone
    if (step === 4) return template
    if (step === 5) return palette
    if (step === 6) return automations.length > 0
    if (step === 7) return email.includes('@') && password.length >= 6
    return false
  }

  const next = () => { if (valid()) { setError(null); setStep(s => s + 1) } }
  const back = () => setStep(s => Math.max(1, s - 1))

  const submit = async () => {
    if (!valid()) return
    setSubmitting(true); setError(null)
    try {
      setSetupStatus('Création de votre compte...')
      const { data: authData, error: authErr } = await supabase.auth.signUp({ email, password })
      if (authErr) throw authErr
      const userId = authData?.user?.id
      if (!userId) throw new Error('Vérifiez votre email pour confirmer, puis connectez-vous.')

      await supabase.from('onboarding_responses').insert({
        email, company_name: companyName, sector, city, description,
        services: services.filter(Boolean), client_type: clientType,
        age_range: ageRange, tone, automations, plan,
      })

      setSetupStatus('Nova génère votre site web complet...')
      const chosenPalette = PALETTES.find(p => p.id === palette)
      let siteConfig = {}
      let siteHtml = ''

      // Generate JSON config (for dashboard display)
      try {
        const res = await fetch('/api/generate-site', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: `${companyName}, ${sector} à ${city}. ${description}. Services: ${services.filter(Boolean).join(', ')}. Clients: ${clientType}. Ton: ${tone}.` }),
        })
        const data = await res.json()
        if (data.success) siteConfig = data.data
      } catch {}
      siteConfig.template = template
      siteConfig.colors = { primary: chosenPalette.primary, accent: chosenPalette.accent, secondary: chosenPalette.secondary }

      // Generate full HTML site
      setSetupStatus('Design de votre site en cours...')
      try {
        const res = await fetch('/api/generate-html-site', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description: `${companyName}, ${sector} à ${city}. ${description}. Services: ${services.filter(Boolean).join(', ')}. Clients: ${clientType}. Ton: ${tone}.`,
            template, colors: { primary: chosenPalette.primary, accent: chosenPalette.accent, secondary: chosenPalette.secondary }, tone,
          }),
        })
        const data = await res.json()
        if (data.success && data.data?.html) siteHtml = data.data.html
      } catch {}

      setSetupStatus('Configuration de votre espace...')
      const { data: biz, error: bizErr } = await supabase.from('businesses').insert({
        owner_id: userId, owner_email: email, name: companyName,
        description: `${sector} à ${city}. ${description}`,
        site_config: { ...siteConfig, html: siteHtml }, plan, agents: automations,
      }).select().single()
      if (bizErr) throw bizErr

      setSetupStatus('Activation de vos agents IA...')
      const agentTypes = { support: 'support', sales: 'sales', email: 'email', booking: 'support', quotes: 'sales', reports: 'reports' }
      const inserts = automations.map(a => ({ business_id: biz.id, type: agentTypes[a] || 'support', status: 'active', config: { automation: a, tone, client_type: clientType } }))
      if (inserts.length > 0) await supabase.from('agents').insert(inserts)

      setSetupStatus('Tout est prêt !')
      await new Promise(r => setTimeout(r, 500))
      navigate('/dashboard?setup=success')
    } catch (err) { setError(err.message); setSetupStatus('') }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a1a' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] shrink-0">
        <a href="/" className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-sm bg-accent" /></div><span className="text-sm font-bold text-white">Nova OS</span></a>
        <div className="flex items-center gap-1.5">{Array.from({ length: TOTAL_STEPS }, (_, i) => <div key={i} className={`w-8 h-1.5 rounded-full ${step >= i + 1 ? 'bg-accent' : 'bg-white/[0.06]'}`} />)}</div>
        <a href="/" className="text-xs text-white/20 hover:text-white/40">✕</a>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center overflow-y-auto">
        <div className="w-full max-w-lg px-6 py-10 md:py-14">
          {error && <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}

          {/* 1 — Business */}
          {step === 1 && <div key="s1"><h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">Votre business</h1><p className="text-white/25 text-sm mb-8">Dites-nous qui vous êtes.</p><div className="flex flex-col gap-5"><div><label className={lbl}>Nom de l'entreprise</label><input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Ex : Cabinet Dentaire Léman" className={inp} autoFocus /></div><div><label className={lbl}>Secteur</label><select value={sector} onChange={e => setSector(e.target.value)} className={`${inp} ${!sector ? 'text-white/20' : ''}`}><option value="" disabled>Choisir un secteur</option>{SECTORS.map(s => <option key={s} value={s} className="bg-[#0d0d20] text-white">{s}</option>)}</select></div><div><label className={lbl}>Ville</label><input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Ex : Lausanne" className={inp} /></div></div></div>}

          {/* 2 — Services */}
          {step === 2 && <div key="s2"><h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">Vos services</h1><p className="text-white/25 text-sm mb-8">Décrivez votre activité.</p><div className="flex flex-col gap-5"><div><label className={lbl}>Que faites-vous ?</label><textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Ex : Je suis dentiste spécialisé en orthodontie, je cherche à automatiser la prise de RDV..." className={`${inp} resize-none leading-relaxed`} autoFocus /></div><div><label className={lbl}>3 services principaux <span className="text-white/15">(optionnel)</span></label><div className="flex flex-col gap-2">{services.map((s, i) => <input key={i} type="text" value={s} onChange={e => setSvc(i, e.target.value)} placeholder={['Service principal', 'Deuxième service', 'Troisième service'][i]} className={inp} />)}</div></div></div></div>}

          {/* 3 — Clients */}
          {step === 3 && <div key="s3"><h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">Vos clients</h1><p className="text-white/25 text-sm mb-8">Pour que Nova adopte le bon ton.</p><div className="flex flex-col gap-7"><div><label className={lbl}>Type de clients</label><div className="grid grid-cols-3 gap-2">{['B2B', 'B2C', 'Les deux'].map(t => <Chip key={t} active={clientType === t} onClick={() => setClientType(t)}>{t}</Chip>)}</div></div><div><label className={lbl}>Tranche d'âge <span className="text-white/15">(optionnel)</span></label><div className="grid grid-cols-4 gap-2">{['18-25', '25-40', '40-60', '60+'].map(a => <Chip key={a} active={ageRange === a} onClick={() => setAgeRange(a)}>{a}</Chip>)}</div></div><div><label className={lbl}>Ton souhaité</label><div className="grid grid-cols-2 gap-2">{TONES.map(t => <CardSelect key={t.id} active={tone === t.id} onClick={() => setTone(t.id)} icon={t.icon} label={t.label} />)}</div></div></div></div>}

          {/* 4 — Template */}
          {step === 4 && (
            <div key="s4">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">Style de votre site</h1>
              <p className="text-white/25 text-sm mb-8">Choisissez le design qui vous correspond.</p>
              <div className="flex flex-col gap-4">
                {TEMPLATES.map(t => (
                  <button key={t.id} type="button" onClick={() => setTemplate(t.id)} className={`flex items-center gap-5 p-4 rounded-xl border text-left cursor-pointer select-none active:scale-[0.98] ${template === t.id ? 'border-accent bg-accent/[0.06]' : 'border-white/[0.1] hover:border-white/[0.2]'}`}>
                    {/* Mini preview */}
                    <div className={`w-24 h-16 rounded-lg ${t.preview} shrink-0 flex flex-col items-center justify-center border border-black/5`}>
                      <div className={`w-12 h-1 rounded-full mb-1.5 ${t.id === 'bold' ? 'bg-white/30' : 'bg-black/15'}`} />
                      <div className={`w-8 h-1 rounded-full mb-2 ${t.id === 'bold' ? 'bg-white/15' : 'bg-black/8'}`} />
                      <div className={`w-10 h-3 rounded ${t.id === 'bold' ? 'bg-white/20' : 'bg-black/10'}`} />
                    </div>
                    <div>
                      <div className={`text-sm font-semibold mb-0.5 ${template === t.id ? 'text-accent' : 'text-white/60'}`}>{t.name}</div>
                      <div className="text-xs text-white/25">{t.desc}</div>
                    </div>
                    {template === t.id && <span className="text-accent ml-auto shrink-0">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5 — Colors */}
          {step === 5 && (
            <div key="s5">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">Couleurs</h1>
              <p className="text-white/25 text-sm mb-8">Choisissez la palette de votre site.</p>
              <div className="grid grid-cols-2 gap-3">
                {PALETTES.map(p => (
                  <button key={p.id} type="button" onClick={() => setPalette(p.id)} className={`p-4 rounded-xl border text-left cursor-pointer select-none active:scale-[0.97] ${palette === p.id ? 'border-accent bg-accent/[0.06]' : 'border-white/[0.1] hover:border-white/[0.2]'}`}>
                    <div className="flex gap-1.5 mb-3">
                      <div className="w-8 h-8 rounded-lg" style={{ background: p.primary }} />
                      <div className="w-8 h-8 rounded-lg" style={{ background: p.accent }} />
                      <div className="w-8 h-8 rounded-lg border border-white/[0.06]" style={{ background: p.secondary }} />
                    </div>
                    <div className={`text-sm font-medium ${palette === p.id ? 'text-accent' : 'text-white/50'}`}>{p.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 6 — Automations */}
          {step === 6 && <div key="s6"><h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">Automatisations</h1><p className="text-white/25 text-sm mb-8">Que doit gérer Nova pour vous ?</p><div className="grid grid-cols-2 gap-2">{AUTOMATIONS.map(a => <CardSelect key={a.id} active={automations.includes(a.id)} onClick={() => toggle(a.id)} icon={a.icon} label={a.label} />)}</div>{automations.length > 0 && <p className="text-xs text-accent/60 mt-4 text-center font-medium">{automations.length} sélectionnée{automations.length > 1 ? 's' : ''}</p>}</div>}

          {/* 7 — Account + Plan */}
          {step === 7 && (
            <div key="s7">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">Créez votre espace</h1>
              <p className="text-white/25 text-sm mb-8">Dernière étape — en ligne dans 2 minutes.</p>
              <div className="flex flex-col gap-4 mb-8">
                <div><label className={lbl}>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" className={inp} autoFocus /></div>
                <div><label className={lbl}>Mot de passe</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimum 6 caractères" className={inp} /></div>
              </div>
              <label className={lbl}>Plan</label>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {PLANS.map(p => (
                  <button key={p.id} type="button" onClick={() => setPlan(p.id)} className={`p-4 rounded-xl border text-left flex flex-col cursor-pointer select-none active:scale-[0.97] ${plan === p.id ? 'border-accent bg-accent/[0.08]' : 'border-white/[0.1] hover:border-white/[0.2]'}`}>
                    <div className="flex items-center gap-1.5 mb-2"><span className={`text-xs font-bold ${plan === p.id ? 'text-accent' : 'text-white/40'}`}>{p.name}</span>{p.featured && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent/50">populaire</span>}</div>
                    <span className={`text-2xl font-black ${plan === p.id ? 'text-white' : 'text-white/50'}`}>{p.price}<span className="text-[10px] text-white/20 font-normal">€/mois</span></span>
                  </button>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-2 text-xs text-white/25 space-y-1">
                <div className="flex justify-between"><span>{companyName} · {sector} · {city}</span></div>
                <div className="flex justify-between"><span>Template {TEMPLATES.find(t => t.id === template)?.name} · {PALETTES.find(p => p.id === palette)?.name}</span></div>
                <div className="flex justify-between"><span>{automations.length} automatisation{automations.length > 1 ? 's' : ''}</span><span className="text-accent font-bold">{PLANS.find(p => p.id === plan)?.price}€/mois</span></div>
              </div>
            </div>
          )}

          {/* NAV */}
          <div className="flex gap-3 mt-8">
            {step > 1 && <button type="button" onClick={back} className="px-5 py-3.5 rounded-xl text-sm border border-white/[0.1] text-white/30 hover:text-white/50 active:scale-[0.97] cursor-pointer select-none">← Retour</button>}
            {step < TOTAL_STEPS ? (
              <button type="button" onClick={next} disabled={!valid()} className={`flex-1 py-3.5 rounded-xl text-sm font-bold cursor-pointer select-none active:scale-[0.97] ${valid() ? 'bg-accent text-black hover:brightness-110' : 'bg-white/[0.06] text-white/15 cursor-not-allowed'}`}>Continuer →</button>
            ) : (
              <button type="button" onClick={submit} disabled={!valid() || submitting} className={`flex-1 py-3.5 rounded-xl text-sm font-bold cursor-pointer select-none active:scale-[0.97] ${valid() && !submitting ? 'bg-accent text-black hover:brightness-110' : 'bg-white/[0.06] text-white/15 cursor-not-allowed'}`}>
                {submitting ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />{setupStatus || 'Création...'}</span> : 'Créer mon espace Nova →'}
              </button>
            )}
          </div>
          <p className="text-center text-[10px] text-white/10 mt-4">14 jours gratuits · Annulation libre</p>
        </div>
      </div>
    </div>
  )
}
