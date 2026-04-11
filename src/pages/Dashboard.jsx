import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { AGENTS } from '../components/AgentCard'

const TEMPLATES = [
  { id: 'modern', name: 'Moderne', desc: 'Clean, aéré, Apple-like', bg: '#ffffff', text: '#000', accent: '#3b82f6', font: 'Inter' },
  { id: 'elegant', name: 'Élégant', desc: 'Serif, raffiné, luxe', bg: '#faf9f6', text: '#1a1a1a', accent: '#b8860b', font: 'Playfair' },
  { id: 'minimal', name: 'Minimaliste', desc: 'Épuré, espace blanc', bg: '#ffffff', text: '#333', accent: '#000000', font: 'Inter' },
  { id: 'colorful', name: 'Coloré', desc: 'Vif, dynamique, fun', bg: '#ffffff', text: '#1a1a1a', accent: '#e94560', font: 'Inter' },
  { id: 'bold', name: 'Sombre', desc: 'Dark mode, impactant', bg: '#0a0a0a', text: '#fff', accent: '#6c5ce7', font: 'Inter' },
  { id: 'professional', name: 'Professionnel', desc: 'Corporate, sérieux', bg: '#f8f9fa', text: '#1a365d', accent: '#1a365d', font: 'Inter' },
]

const WIZARD_AGENTS = [
  { id: 'support', icon: '💬', name: 'Réceptionniste IA', desc: 'Répond aux questions de vos clients 24/7 sur votre site. Connaît vos services, prix et horaires.' },
  { id: 'sales', icon: '📈', name: 'Commercial IA', desc: 'Qualifie vos prospects et envoie des relances automatiques par email jusqu\'à obtenir un rendez-vous.' },
  { id: 'email', icon: '📧', name: 'Assistant Email', desc: 'Trie vos emails entrants, répond aux questions simples et vous alerte pour les urgences.' },
  { id: 'booking', icon: '📅', name: 'Gestionnaire RDV', desc: 'Gère votre agenda, envoie des rappels aux clients et propose des créneaux disponibles.' },
  { id: 'reports', icon: '📊', name: 'Analyste', desc: 'Compile un rapport hebdomadaire : clients contactés, RDV pris, tâches accomplies.' },
  { id: 'quotes', icon: '📋', name: 'Deviseur IA', desc: 'Génère des devis personnalisés automatiquement selon les demandes reçues.' },
]

function Wizard({ business, onComplete }) {
  const [step, setStep] = useState(1)
  const [generating, setGenerating] = useState(false)
  const [genStatus, setGenStatus] = useState('')

  // Step 1
  const [name, setName] = useState(business?.name || '')
  const [sector, setSector] = useState('')
  const [city, setCity] = useState('')
  const [description, setDescription] = useState(business?.description || '')
  const [services, setServices] = useState([{ name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }])

  // Step 2
  const [template, setTemplate] = useState('modern')

  // Step 3
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [instagram, setInstagram] = useState('')

  // Step 4
  const [activeAgents, setActiveAgents] = useState(['support'])

  const toggleAgent = (id) => setActiveAgents(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  const setSvc = (i, field, val) => setServices(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s))

  const valid = () => {
    if (step === 1) return name.trim() && description.trim()
    if (step === 2) return template
    if (step === 3) return email.trim() || phone.trim()
    if (step === 4) return activeAgents.length > 0
    return true
  }

  const generate = async () => {
    setGenerating(true)
    setGenStatus('Préparation...')

    const fullDesc = `${name}, ${sector || 'business'} à ${city || 'Suisse'}. ${description}. Services: ${services.filter(s => s.name).map(s => `${s.name} (${s.price})`).join(', ')}. Contact: ${email} ${phone} ${address}`

    try {
      // Update business info
      setGenStatus('Mise à jour de vos informations...')
      const siteConfig = business?.site_config || {}
      siteConfig.template = template
      siteConfig.contact = { email, phone, address, instagram }
      siteConfig.name = name

      await supabase.from('businesses').update({
        name, description: fullDesc, site_config: siteConfig,
      }).eq('id', business.id)

      // Create agents
      setGenStatus('Activation de vos agents...')
      const agentTypes = { support: 'support', sales: 'sales', email: 'email', booking: 'support', quotes: 'sales', reports: 'reports' }
      for (const agentId of activeAgents) {
        const exists = await supabase.from('agents').select('id').eq('business_id', business.id).eq('type', agentTypes[agentId] || 'support').limit(1)
        if (!exists.data?.length) {
          await supabase.from('agents').insert({ business_id: business.id, type: agentTypes[agentId] || 'support', status: 'active', config: { automation: agentId } })
        }
      }

      // Generate site
      setGenStatus('Nova génère votre site web...')
      const res = await fetch('/api/generate-html-site', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: fullDesc, template, colors: siteConfig.colors }),
      })
      const data = await res.json()

      if (data.success && data.data?.html) {
        setGenStatus('Mise en ligne...')
        await supabase.from('businesses').update({
          site_config: { ...siteConfig, html: data.data.html },
        }).eq('id', business.id)

        setGenStatus('Votre site est prêt !')
        await new Promise(r => setTimeout(r, 1000))
        window.location.href = '/my-site'
      } else {
        setGenStatus('Erreur — réessayez')
        setGenerating(false)
      }
    } catch (err) {
      setGenStatus('Erreur: ' + err.message)
      setGenerating(false)
    }
  }

  const inp = 'w-full px-4 py-3.5 rounded-xl text-[14px] bg-white border border-black/[0.08] text-black placeholder:text-black/20 outline-none focus:border-orange-300 shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
  const lbl = 'block text-sm font-medium text-black/50 mb-2'

  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      <div className="absolute inset-x-0 top-0 h-[400px] pointer-events-none" style={{ background: 'linear-gradient(180deg, #fde8d8 0%, #f9e0cc 30%, #ffffff 100%)' }} />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-black flex items-center justify-center"><div className="w-2.5 h-2.5 rounded bg-white" /></div>
          <span className="text-sm font-bold">Nova OS</span>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map(s => <div key={s} className={`w-10 h-1.5 rounded-full ${step >= s ? 'bg-orange-400' : 'bg-black/[0.06]'}`} />)}
        </div>
        <span className="text-xs text-black/20">{step}/5</span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">

        {/* STEP 1 — Business */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <span className="text-3xl mb-3 block">🏢</span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-black mb-2">Bienvenue sur Nova OS</h1>
              <p className="text-sm text-black/35">Décrivez votre business en détail pour que Nova crée le site parfait.</p>
            </div>
            <div className="flex flex-col gap-5">
              <div><label className={lbl}>Nom de l'entreprise</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Cabinet Dentaire Léman" className={inp} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={lbl}>Secteur</label><input type="text" value={sector} onChange={e => setSector(e.target.value)} placeholder="Ex: Dentiste" className={inp} /></div>
                <div><label className={lbl}>Ville</label><input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Ex: Genève" className={inp} /></div>
              </div>
              <div><label className={lbl}>Décrivez votre activité</label><textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Ex: Cabinet dentaire spécialisé en orthodontie et soins esthétiques. 15 ans d'expérience, équipe de 5 personnes..." className={`${inp} resize-none leading-relaxed`} /></div>
              <div>
                <label className={lbl}>Vos services et prix</label>
                <div className="flex flex-col gap-2">
                  {services.map((s, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={s.name} onChange={e => setSvc(i, 'name', e.target.value)} placeholder={`Service ${i + 1}`} className={`${inp} flex-1`} />
                      <input type="text" value={s.price} onChange={e => setSvc(i, 'price', e.target.value)} placeholder="Prix CHF" className={`${inp} w-32`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — Template */}
        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <span className="text-3xl mb-3 block">🎨</span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-black mb-2">Choisissez votre style</h1>
              <p className="text-sm text-black/35">Chaque design est unique et professionnel. Cliquez pour sélectionner.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {TEMPLATES.map(t => {
                const sel = template === t.id
                const dark = t.id === 'bold'
                const txtC = dark ? '#fff' : t.text
                const subC = dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'
                const cardC = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
                const borderC = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'
                return (
                  <button key={t.id} onClick={() => setTemplate(t.id)} className={`text-left rounded-2xl overflow-hidden border-2 shadow-sm hover:shadow-md ${sel ? 'border-orange-400 shadow-[0_0_0_2px_rgba(249,115,22,0.2)]' : 'border-black/[0.06] hover:border-black/[0.12]'}`}>
                    {/* Realistic mini site */}
                    <div className="relative" style={{ background: t.bg, fontFamily: t.font === 'Playfair' ? 'Georgia, serif' : 'Inter, sans-serif' }}>
                      {/* Nav */}
                      <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: `1px solid ${borderC}` }}>
                        <span className="text-[7px] font-bold" style={{ color: txtC }}>{name || 'Business'}</span>
                        <div className="flex gap-2">
                          <span className="text-[5px]" style={{ color: subC }}>Services</span>
                          <span className="text-[5px]" style={{ color: subC }}>Contact</span>
                        </div>
                        <div className="px-2 py-0.5 rounded-full text-[5px] font-bold text-white" style={{ background: t.accent }}>RDV</div>
                      </div>
                      {/* Hero */}
                      <div className="relative h-20 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=60" alt="" className="w-full h-full object-cover" style={{ opacity: dark ? 0.3 : 0.2 }} />
                        <div className="absolute inset-0 flex flex-col items-start justify-end p-3" style={{ background: dark ? 'linear-gradient(0deg, rgba(10,10,10,0.9), transparent)' : 'linear-gradient(0deg, rgba(255,255,255,0.95), rgba(255,255,255,0.5))' }}>
                          <div className="text-[9px] font-black leading-tight mb-0.5" style={{ color: txtC }}>Votre titre<br/>accrocheur ici</div>
                          <div className="text-[5px] mb-1.5" style={{ color: subC }}>Sous-titre descriptif</div>
                          <div className="px-2 py-0.5 rounded-full text-[5px] font-bold text-white" style={{ background: t.accent }}>Découvrir</div>
                        </div>
                      </div>
                      {/* Stats */}
                      <div className="flex justify-around py-2" style={{ borderBottom: `1px solid ${borderC}` }}>
                        {['15+', '500', '4.9'].map(n => (
                          <div key={n} className="text-center">
                            <div className="text-[8px] font-black" style={{ color: t.accent }}>{n}</div>
                            <div className="text-[4px]" style={{ color: subC }}>stat</div>
                          </div>
                        ))}
                      </div>
                      {/* Services */}
                      <div className="px-3 py-2">
                        <div className="text-[5px] font-bold uppercase tracking-widest mb-1" style={{ color: t.accent }}>Services</div>
                        <div className="flex gap-1.5">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex-1 p-1.5 rounded-md" style={{ background: cardC, border: `1px solid ${borderC}` }}>
                              <div className="w-3 h-3 rounded mb-1" style={{ background: t.accent, opacity: 0.2 }} />
                              <div className="h-1 w-8 rounded-full mb-0.5" style={{ background: txtC, opacity: 0.15 }} />
                              <div className="h-0.5 w-10 rounded-full" style={{ background: txtC, opacity: 0.07 }} />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Testimonials hint */}
                      <div className="px-3 pb-2">
                        <div className="flex gap-1">
                          {[1, 2].map(i => (
                            <div key={i} className="flex-1 p-1.5 rounded-md" style={{ background: cardC, border: `1px solid ${borderC}` }}>
                              <div className="flex gap-0.5 mb-0.5">{[...Array(5)].map((_, j) => <span key={j} className="text-[4px]" style={{ color: '#f59e0b' }}>★</span>)}</div>
                              <div className="h-0.5 w-full rounded-full" style={{ background: txtC, opacity: 0.07 }} />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* CTA */}
                      <div className="mx-3 mb-2 py-2 rounded-lg text-center" style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}cc)` }}>
                        <span className="text-[6px] font-bold text-white">Prêt à commencer ?</span>
                      </div>
                      {/* Footer */}
                      <div className="px-3 py-1.5" style={{ borderTop: `1px solid ${borderC}` }}>
                        <div className="text-[4px]" style={{ color: subC }}>© {name || 'Business'} · Nova OS</div>
                      </div>
                    </div>
                    {/* Label */}
                    <div className={`px-3 py-3 flex items-center justify-between ${sel ? 'bg-orange-50' : 'bg-white'}`} style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                      <div>
                        <div className={`text-xs font-bold ${sel ? 'text-orange-600' : 'text-black'}`}>{t.name}</div>
                        <div className="text-[10px] text-black/30">{t.desc}</div>
                      </div>
                      {sel && <div className="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center text-white text-[10px]">✓</div>}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 3 — Contact */}
        {step === 3 && (
          <div>
            <div className="text-center mb-8">
              <span className="text-3xl mb-3 block">📇</span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-black mb-2">Vos coordonnées</h1>
              <p className="text-sm text-black/35">Ces informations seront affichées sur votre site web.</p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                <div><label className={lbl}>Email professionnel</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="contact@votrebusiness.ch" className={inp} /></div>
                <div><label className={lbl}>Téléphone</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+41 22 700 00 00" className={inp} /></div>
              </div>
              <div><label className={lbl}>Adresse</label><input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Rue du Lac 15, 1201 Genève" className={inp} /></div>
              <div><label className={lbl}>Instagram <span className="text-black/15">(optionnel)</span></label><input type="text" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@votrebusiness" className={inp} /></div>
            </div>
          </div>
        )}

        {/* STEP 4 — Agents */}
        {step === 4 && (
          <div>
            <div className="text-center mb-8">
              <span className="text-3xl mb-3 block">🤖</span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-black mb-2">Activez vos automatisations</h1>
              <p className="text-sm text-black/35">Choisissez ce que Nova doit gérer pour vous au quotidien.</p>
            </div>
            <div className="flex flex-col gap-3">
              {WIZARD_AGENTS.map(a => {
                const active = activeAgents.includes(a.id)
                return (
                  <button key={a.id} onClick={() => toggleAgent(a.id)} className={`flex items-start gap-4 p-5 rounded-2xl text-left border-2 ${active ? 'border-orange-400 bg-orange-50/50' : 'border-black/[0.04] bg-white hover:border-black/[0.08]'} shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: active ? '#fff7ed' : '#f5f5f5' }}>{a.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-black">{a.name}</span>
                        {active && <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">Activé</span>}
                      </div>
                      <p className="text-xs text-black/35 leading-relaxed">{a.desc}</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full flex items-center px-0.5 shrink-0 mt-1 ${active ? 'bg-orange-400' : 'bg-black/10'}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm ${active ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                  </button>
                )
              })}
            </div>
            <p className="text-center text-xs text-black/20 mt-4">{activeAgents.length} automatisation{activeAgents.length > 1 ? 's' : ''} activée{activeAgents.length > 1 ? 's' : ''}</p>
          </div>
        )}

        {/* STEP 5 — Generate */}
        {step === 5 && (
          <div className="text-center py-12">
            {generating ? (
              <div>
                <div className="w-20 h-20 rounded-3xl bg-orange-50 flex items-center justify-center text-3xl mx-auto mb-6">
                  <span className="animate-spin inline-block">⚡</span>
                </div>
                <h1 className="text-2xl font-black text-black mb-3">{genStatus}</h1>
                <p className="text-sm text-black/30">Cela prend environ 15 secondes...</p>
                <div className="w-48 h-1.5 bg-black/[0.04] rounded-full mx-auto mt-8 overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>
            ) : (
              <div>
                <div className="w-20 h-20 rounded-3xl bg-orange-50 flex items-center justify-center text-3xl mx-auto mb-6">🚀</div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-black mb-3">Tout est prêt !</h1>
                <p className="text-sm text-black/35 max-w-sm mx-auto mb-4">Nova va générer votre site web professionnel complet et activer vos {activeAgents.length} automatisation{activeAgents.length > 1 ? 's' : ''}.</p>
                <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.04] max-w-sm mx-auto mb-8 text-left">
                  <div className="text-xs text-black/50 space-y-1.5">
                    <div className="flex justify-between"><span>Business</span><span className="font-medium text-black">{name}</span></div>
                    <div className="flex justify-between"><span>Template</span><span className="font-medium text-black">{TEMPLATES.find(t => t.id === template)?.name}</span></div>
                    <div className="flex justify-between"><span>Agents</span><span className="font-medium text-black">{activeAgents.length} actifs</span></div>
                  </div>
                </div>
                <button onClick={generate} className="px-10 py-4 rounded-2xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-[0_4px_20px_rgba(249,115,22,0.25)]">
                  Générer mon site maintenant →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        {step < 5 && (
          <div className="flex gap-3 mt-10">
            {step > 1 && <button onClick={() => setStep(s => s - 1)} className="px-5 py-3.5 rounded-xl text-sm border border-black/[0.08] text-black/30 hover:text-black/60">← Retour</button>}
            <button onClick={() => { if (valid()) setStep(s => s + 1) }} disabled={!valid()} className={`flex-1 py-3.5 rounded-xl text-sm font-bold ${valid() ? 'bg-black text-white hover:bg-black/90' : 'bg-black/[0.04] text-black/15 cursor-not-allowed'}`}>Continuer →</button>
          </div>
        )}
        {step < 5 && <p className="text-center text-[10px] text-black/15 mt-4">Étape {step} sur 5</p>}
      </div>
    </div>
  )
}

// ─── MAIN DASHBOARD ───
export default function Dashboard() {
  const [business, setBusiness] = useState(null)
  const [agents, setAgents] = useState([])
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [needsWizard, setNeedsWizard] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) { window.location.href = '/login'; return }
      setUser(data.user)
      loadData(data.user.id)
    })
  }, [])

  const loadData = async (userId) => {
    const { data: biz } = await supabase.from('businesses').select('*').eq('owner_id', userId).single()
    if (biz) {
      setBusiness(biz)
      if (!biz.site_config?.html) { setNeedsWizard(true); setLoading(false); return }
      const { data: ag } = await supabase.from('agents').select('*').eq('business_id', biz.id).order('created_at')
      setAgents(ag || [])
      const { data: lg } = await supabase.from('agent_logs').select('*').eq('business_id', biz.id).order('created_at', { ascending: false }).limit(20)
      setLogs(lg || [])
    } else {
      setNeedsWizard(true)
    }
    setLoading(false)
  }

  const toggleAgent = async (agentId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active'
    await supabase.from('agents').update({ status: newStatus }).eq('id', agentId)
    setAgents(agents.map(a => a.id === agentId ? { ...a, status: newStatus } : a))
  }

  const logout = async () => { await supabase.auth.signOut(); window.location.href = '/' }

  const agentMeta = Object.fromEntries(AGENTS.map(a => [a.type, a]))
  const totalTasks = agents.reduce((s, a) => s + (a.tasks_this_month || 0), 0)
  const activeCount = agents.filter(a => a.status === 'active').length

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-black/30 text-sm">Chargement...</div>

  if (needsWizard) return <Wizard business={business} onComplete={() => window.location.reload()} />

  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      <div className="absolute inset-x-0 top-0 h-[400px] pointer-events-none" style={{ background: 'linear-gradient(180deg, #fde8d8 0%, #f9e0cc 30%, #ffffff 100%)' }} />
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2"><div className="w-7 h-7 rounded-xl bg-black flex items-center justify-center"><div className="w-2.5 h-2.5 rounded bg-white" /></div><span className="text-sm font-bold text-black">Nova OS</span></a>
        <div className="flex items-center gap-4"><span className="text-xs text-black/25">{user?.email}</span><button onClick={logout} className="text-xs text-black/30 hover:text-black/60">Déconnexion</button></div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-black mb-2">Bonjour{business?.name ? `, ${business.name}` : ''} 👋</h1>
          <p className="text-black/30 text-sm">Votre business tourne. Voici ce qui se passe.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Agents actifs', value: activeCount, accent: true },
            { label: 'Tâches ce mois', value: totalTasks },
            { label: 'Temps économisé', value: `${Math.round(totalTasks * 2.5)}min` },
            { label: 'Plan', value: (business?.plan || 'free').toUpperCase() },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="text-[10px] text-black/25 uppercase tracking-widest mb-2">{s.label}</div>
              <div className={`text-2xl font-black font-mono ${s.accent ? 'text-orange-500' : 'text-black'}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div>
              <h2 className="text-base font-bold text-black mb-3">Mon site</h2>
              <a href="/my-site" className="flex items-center justify-between p-5 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-xl">🌐</div>
                  <div>
                    <div className="text-sm font-semibold text-black mb-0.5">{business?.site_config?.name || business?.name}</div>
                    <div className="text-xs text-black/30">En ligne — cliquez pour modifier</div>
                  </div>
                </div>
                <span className="text-sm text-orange-500 font-semibold opacity-0 group-hover:opacity-100">Ouvrir →</span>
              </a>
            </div>
            <div>
              <h2 className="text-base font-bold text-black mb-3">Mes agents</h2>
              <div className="flex flex-col gap-3">
                {agents.map(a => {
                  const meta = agentMeta[a.type]
                  return (
                    <div key={a.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-lg">{meta?.icon || '🤖'}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-black">{meta?.name || a.type}</span>
                          <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${a.status === 'active' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-black/[0.03] text-black/25 border border-black/[0.06]'}`}>{a.status === 'active' ? 'Actif' : 'Pause'}</span>
                        </div>
                        <div className="text-[11px] text-black/25">{a.tasks_this_month || 0} tâches{a.last_run && ` · ${new Date(a.last_run).toLocaleString('fr-CH', { hour: '2-digit', minute: '2-digit' })}`}</div>
                      </div>
                      <button onClick={() => toggleAgent(a.id, a.status)} className={`w-11 h-6 rounded-full flex items-center px-0.5 ${a.status === 'active' ? 'bg-orange-400' : 'bg-black/10'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white shadow-sm ${a.status === 'active' ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-base font-bold text-black mb-3">Activité récente</h2>
            <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              {logs.length === 0 && <p className="text-xs text-black/20">Aucune activité pour le moment.</p>}
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
                {logs.map(l => (
                  <div key={l.id} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center text-[10px] mt-0.5 shrink-0">✓</div>
                    <div className="flex-1 min-w-0"><p className="text-xs text-black/50 leading-relaxed">{l.action}</p><p className="text-[10px] text-black/20 mt-0.5">{new Date(l.created_at).toLocaleString('fr-CH')}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
