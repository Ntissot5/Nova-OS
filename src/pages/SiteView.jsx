import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../supabase'
import Modern from '../templates/Modern'
import Elegant from '../templates/Elegant'
import Bold from '../templates/Bold'

const TEMPLATES = { modern: Modern, elegant: Elegant, bold: Bold }

export default function SiteView() {
  const [site, setSite] = useState(null)
  const [bizId, setBizId] = useState(null)
  const [template, setTemplate] = useState('modern')
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const contentRef = useRef(null)

  // AI Chat state
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Salut ! Dites-moi ce que vous voulez changer sur votre site. Ex: "Change le titre en Bienvenue chez nous" ou "Ajoute un 4e service massage"' }
  ])
  const [chatLoading, setChatLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) { window.location.href = '/login'; return }
      supabase.from('businesses').select('id, site_config').eq('owner_id', data.user.id).single()
        .then(({ data: biz }) => {
          if (biz?.site_config) { setSite(biz.site_config); setTemplate(biz.site_config.template || 'modern'); setBizId(biz.id) }
          setLoading(false)
        })
    })
  }, [])

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chatMessages])

  const saveSite = useCallback(async (updated) => {
    if (!bizId) return
    await supabase.from('businesses').update({ site_config: updated }).eq('id', bizId)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [bizId])

  const saveFromDom = useCallback(async () => {
    if (!contentRef.current || !bizId) return
    setSaving(true)
    const updated = JSON.parse(JSON.stringify(site))
    const fields = contentRef.current.querySelectorAll('[data-field]')
    fields.forEach(el => {
      const path = el.getAttribute('data-field').split('.')
      let obj = updated
      for (let i = 0; i < path.length - 1; i++) {
        if (Array.isArray(obj[path[i]])) {
          const idx = parseInt(path[i + 1])
          if (!isNaN(idx)) { obj = obj[path[i]][idx]; path.splice(i + 1, 1) }
          else obj = obj[path[i]]
        } else { obj = obj[path[i]] }
        if (!obj) return
      }
      obj[path[path.length - 1]] = el.innerText
    })
    await saveSite(updated)
    setSite(updated)
    setSaving(false)
  }, [site, bizId, saveSite])

  // AI Chat send
  const sendChat = async (e) => {
    e.preventDefault()
    if (!chatInput.trim() || chatLoading) return
    const msg = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', text: msg }])
    setChatLoading(true)

    try {
      const res = await fetch('/api/edit-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, siteConfig: site }),
      })
      const data = await res.json()
      if (data.success && data.data) {
        const updated = { ...data.data, template: site.template }
        setSite(updated)
        await saveSite(updated)
        setChatMessages(prev => [...prev, { role: 'ai', text: '✅ Modification appliquée ! Regardez votre site.' }])
      } else {
        setChatMessages(prev => [...prev, { role: 'ai', text: `Erreur : ${data.error || 'Impossible de modifier'}` }])
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Erreur de connexion. Réessayez.' }])
    }
    setChatLoading(false)
  }

  if (loading) return <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white/30 text-sm">Chargement...</div>
  if (!site) return <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white/30 text-sm">Aucun site généré.</div>

  const Template = TEMPLATES[template] || Modern

  return (
    <>
      {/* Toolbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2.5 bg-[#0a0a1a]/95 backdrop-blur border-b border-white/[0.06]">
        <a href="/dashboard" className="text-xs text-white/30 hover:text-white/50">← Dashboard</a>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs text-green-400">✓ Sauvegardé</span>}
          {editing ? (
            <>
              <button onClick={saveFromDom} disabled={saving} className="text-xs font-semibold bg-accent text-black px-4 py-1.5 rounded-lg">{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
              <button onClick={() => setEditing(false)} className="text-xs text-white/30 px-3 py-1.5">Annuler</button>
            </>
          ) : (
            <>
              <select value={template} onChange={e => { const t = e.target.value; setTemplate(t); const u = { ...site, template: t }; setSite(u); saveSite(u) }} className="text-xs bg-white/[0.06] border border-white/[0.1] text-white rounded-lg px-3 py-1.5 outline-none">
                <option value="modern" className="bg-[#0a0a1a]">Modern</option>
                <option value="elegant" className="bg-[#0a0a1a]">Élégant</option>
                <option value="bold" className="bg-[#0a0a1a]">Bold</option>
              </select>
              <button onClick={() => setEditing(true)} className="text-xs font-semibold bg-white/[0.06] border border-white/[0.1] text-white/60 px-4 py-1.5 rounded-lg">✏️ Éditer</button>
              <button onClick={() => setChatOpen(!chatOpen)} className={`text-xs font-semibold px-4 py-1.5 rounded-lg ${chatOpen ? 'bg-accent text-black' : 'bg-accent/10 border border-accent/20 text-accent'}`}>🤖 IA</button>
            </>
          )}
        </div>
      </div>

      {/* Site */}
      <div ref={contentRef} className={`pt-[45px] ${editing ? 'cursor-text' : ''}`}>
        <Template site={site} editable={editing} />
      </div>

      {/* Edit mode hint */}
      {editing && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-[#0a0a1a]/90 backdrop-blur border border-accent/20 text-xs text-white/50 shadow-lg">
          Cliquez sur un texte pour le modifier · <button onClick={saveFromDom} className="text-accent font-semibold ml-1">Sauvegarder</button>
        </div>
      )}

      {/* AI Chat panel */}
      {chatOpen && !editing && (
        <div className="fixed bottom-4 right-4 z-50 w-[380px] max-w-[calc(100vw-32px)] rounded-2xl border border-white/[0.08] bg-[#0c0c1e]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col" style={{ height: '420px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center"><span className="text-xs">🤖</span></div>
              <div>
                <span className="text-sm font-semibold">Nova IA</span>
                <span className="text-[10px] text-white/20 ml-2">Modifie votre site</span>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/20 hover:text-white/40 text-sm">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
            {chatMessages.map((m, i) => (
              <div key={i} className={`max-w-[85%] ${m.role === 'user' ? 'self-end' : 'self-start'}`}>
                <div className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${m.role === 'user' ? 'bg-accent text-black rounded-br-md' : 'bg-white/[0.06] text-white/70 rounded-bl-md'}`}>{m.text}</div>
              </div>
            ))}
            {chatLoading && (
              <div className="self-start"><div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.06] flex gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" /><span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendChat} className="px-3 py-3 border-t border-white/[0.06] flex gap-2">
            <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ex: Change le titre en..." className="flex-1 px-3.5 py-2.5 rounded-xl text-[13px] bg-white/[0.06] border border-white/[0.06] text-white placeholder:text-white/15 outline-none focus:border-accent/30" />
            <button type="submit" disabled={chatLoading} className="w-9 h-9 rounded-xl bg-accent text-black flex items-center justify-center shrink-0 disabled:opacity-40 text-sm">↑</button>
          </form>
        </div>
      )}
    </>
  )
}
