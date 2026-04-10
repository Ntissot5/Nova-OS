import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase'

const SUGGESTIONS = [
  'Change la couleur principale en bleu foncé',
  'Rends le design plus luxueux',
  'Change la police en quelque chose de plus moderne',
  'Ajoute une section galerie photos',
  'Mets une image de restaurant dans le hero',
  'Change tous les prix',
  'Rends le site plus coloré',
  'Passe en mode sombre',
]

export default function SiteView() {
  const [html, setHtml] = useState(null)
  const [bizId, setBizId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [regenerating, setRegenerating] = useState(false)
  const [bizData, setBizData] = useState(null)

  // Chat
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([])
  const [editing, setEditing] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) { window.location.href = '/login'; return }
      supabase.from('businesses').select('id, name, description, site_config').eq('owner_id', data.user.id).single()
        .then(({ data: biz }) => {
          if (biz) { setBizId(biz.id); setBizData(biz); if (biz.site_config?.html) setHtml(biz.site_config.html) }
          setLoading(false)
        })
    })
  }, [])

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const saveHtml = async (newHtml) => {
    if (!bizId || !bizData) return
    await supabase.from('businesses').update({ site_config: { ...bizData.site_config, html: newHtml } }).eq('id', bizId)
    setBizData({ ...bizData, site_config: { ...bizData.site_config, html: newHtml } })
  }

  const regenerate = async () => {
    if (!bizData || regenerating) return
    setRegenerating(true)
    try {
      const res = await fetch('/api/generate-html-site', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: bizData.description || bizData.name, template: bizData.site_config?.template || 'modern', colors: bizData.site_config?.colors }),
      })
      const data = await res.json()
      if (data.success && data.data?.html) { setHtml(data.data.html); await saveHtml(data.data.html) }
    } catch {}
    setRegenerating(false)
  }

  const sendEdit = async (text) => {
    if (!text?.trim() || !html || editing) return
    const msg = text.trim()
    setChatInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setEditing(true)

    try {
      const res = await fetch('/api/edit-html-site', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: msg, html }),
      })
      const data = await res.json()
      if (data.success && data.data?.html) {
        setHtml(data.data.html)
        await saveHtml(data.data.html)
        setMessages(prev => [...prev, { role: 'ai', text: '✅ Modification appliquée !' }])
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: `❌ ${data.error || 'Erreur'}` }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: '❌ Erreur de connexion.' }])
    }
    setEditing(false)
  }

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-black/30 text-sm">Chargement...</div>

  if (!html) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl mb-2">🚀</div>
      <h2 className="text-xl font-bold text-black">Générez votre site</h2>
      <p className="text-black/40 text-sm max-w-sm text-center">Nova va créer un site web professionnel complet en quelques secondes.</p>
      <button onClick={regenerate} disabled={regenerating} className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-orange-500 disabled:opacity-50 mt-2">
        {regenerating ? '⏳ Génération en cours...' : 'Générer mon site →'}
      </button>
      <a href="/dashboard" className="text-xs text-black/30 mt-4">← Retour au dashboard</a>
    </div>
  )

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-black/[0.06] shrink-0 z-50">
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="text-xs text-black/30 hover:text-black/60">← Dashboard</a>
          <div className="w-px h-4 bg-black/[0.06]" />
          <span className="text-xs text-black/20 font-mono">{bizData?.name || 'Mon site'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={regenerate} disabled={regenerating} className="text-[11px] font-medium px-3 py-1.5 rounded-lg border border-black/[0.08] text-black/40 hover:text-black/60 disabled:opacity-40">
            {regenerating ? '⏳' : '🔄'} Regénérer
          </button>
          <button onClick={() => setChatOpen(!chatOpen)} className={`text-[11px] font-semibold px-4 py-1.5 rounded-lg ${chatOpen ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-600 border border-orange-200'}`}>
            ✨ Modifier avec l'IA
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Site iframe */}
        <div className={`flex-1 ${chatOpen ? 'mr-[400px]' : ''}`}>
          <iframe srcDoc={html} className="w-full h-full border-0" title="Mon site" sandbox="allow-same-origin allow-scripts" />
        </div>

        {/* AI Chat Panel — glassy */}
        {chatOpen && (
          <div className="absolute right-0 top-0 bottom-0 w-[400px] flex flex-col border-l border-black/[0.06]" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)' }}>
            {/* Header */}
            <div className="px-5 py-4 border-b border-black/[0.06]">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-sm">✨</div>
                  <span className="text-sm font-bold text-black">Nova Editor</span>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-black/20 hover:text-black/40 text-lg">×</button>
              </div>
              <p className="text-[11px] text-black/30">Dites ce que vous voulez changer. Couleurs, textes, images, design — tout.</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.length === 0 && (
                <div className="flex flex-col gap-2 mb-4">
                  <p className="text-[11px] text-black/25 font-medium mb-1">Essayez par exemple :</p>
                  {SUGGESTIONS.slice(0, 4).map(s => (
                    <button key={s} onClick={() => sendEdit(s)} className="text-left text-[12px] text-black/40 px-3.5 py-2.5 rounded-xl border border-black/[0.06] hover:border-black/[0.12] hover:text-black/60 bg-white">
                      "{s}"
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[90%] ${m.role === 'user' ? 'self-end' : 'self-start'}`}>
                  <div className={`px-4 py-2.5 text-[13px] leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-2xl rounded-br-sm bg-orange-500 text-white'
                      : 'rounded-2xl rounded-bl-sm bg-black/[0.04] text-black/60'
                  }`}>{m.text}</div>
                </div>
              ))}
              {editing && (
                <div className="self-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-black/[0.04] flex items-center gap-2 text-[12px] text-black/30">
                    <span className="w-4 h-4 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
                    Nova modifie votre site...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-black/[0.06]">
              <form onSubmit={(e) => { e.preventDefault(); sendEdit(chatInput) }} className="flex gap-2">
                <input
                  type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                  placeholder="Changez n'importe quoi..."
                  disabled={editing}
                  className="flex-1 px-4 py-3 rounded-xl text-[13px] bg-white border border-black/[0.08] text-black placeholder:text-black/20 outline-none focus:border-orange-300 disabled:opacity-50"
                />
                <button type="submit" disabled={editing || !chatInput.trim()} className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 disabled:opacity-30 text-sm font-bold">↑</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
