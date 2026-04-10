import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase'

export default function SiteView() {
  const [html, setHtml] = useState(null)
  const [bizId, setBizId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [regenerating, setRegenerating] = useState(false)
  const [bizData, setBizData] = useState(null)

  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([])
  const [editing, setEditing] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)

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
    setExpanded(true)
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
        setMessages(prev => [...prev, { role: 'ai', text: 'Done ✓' }])
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: `Error: ${data.error || 'Failed'}` }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Connection error' }])
    }
    setEditing(false)
    inputRef.current?.focus()
  }

  if (loading) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white/30 text-sm">Loading...</div>

  if (!html) return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-4 text-white">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-2">✨</div>
      <h2 className="text-xl font-bold">Generate your site</h2>
      <p className="text-white/30 text-sm max-w-sm text-center">Nova will create a complete professional website in seconds.</p>
      <button onClick={regenerate} disabled={regenerating} className="px-8 py-3.5 rounded-2xl text-sm font-semibold text-black bg-white disabled:opacity-50 mt-2">
        {regenerating ? 'Generating...' : 'Generate my site →'}
      </button>
      <a href="/dashboard" className="text-xs text-white/20 mt-4">← Dashboard</a>
    </div>
  )

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0f]">
      {/* Site — full screen */}
      <div className="flex-1 relative">
        <iframe srcDoc={html} className="w-full h-full border-0" title="Site" sandbox="allow-same-origin allow-scripts" />

        {/* Top bar — floating, minimal */}
        <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between">
          <a href="/dashboard" className="px-3 py-1.5 rounded-full text-[11px] text-white/50 hover:text-white/80 font-medium" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)' }}>← Back</a>
          <div className="flex items-center gap-2">
            <button onClick={regenerate} disabled={regenerating} className="px-3 py-1.5 rounded-full text-[11px] text-white/50 hover:text-white/80 font-medium" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)' }}>
              {regenerating ? '⏳' : '↻'} Regenerate
            </button>
          </div>
        </div>

        {/* Floating AI Command Bar — bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[600px]">
          {/* Messages — expandable */}
          {expanded && messages.length > 0 && (
            <div className="mb-3 max-h-[200px] overflow-y-auto rounded-2xl p-3 flex flex-col gap-2" style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className={`inline-block px-3 py-1.5 rounded-xl text-[12px] max-w-[80%] ${
                    m.role === 'user' ? 'bg-white/10 text-white/70' : 'text-white/40'
                  }`}>{m.text}</span>
                </div>
              ))}
              {editing && (
                <div className="flex items-center gap-2 text-[11px] text-white/25">
                  <span className="w-3 h-3 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
                  Applying changes...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}

          {/* Main input bar */}
          <form onSubmit={(e) => { e.preventDefault(); sendEdit(chatInput) }}>
            <div className="rounded-2xl p-1" style={{ background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-2">
                <div className="pl-4 text-white/20 text-sm">✨</div>
                <input
                  ref={inputRef}
                  type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                  placeholder="Type what you want to change..."
                  disabled={editing}
                  className="flex-1 px-2 py-3.5 bg-transparent text-[14px] text-white placeholder:text-white/25 outline-none disabled:opacity-40"
                />
                {chatInput.trim() ? (
                  <button type="submit" disabled={editing} className="px-5 py-2.5 rounded-xl text-[12px] font-semibold text-black bg-white mr-1 disabled:opacity-30">Apply</button>
                ) : (
                  <div className="flex items-center gap-1.5 mr-3">
                    <button type="button" onClick={() => sendEdit('Make it more modern')} className="px-2.5 py-1.5 rounded-lg text-[10px] text-white/25 hover:text-white/50 hover:bg-white/5">Modern</button>
                    <button type="button" onClick={() => sendEdit('Switch to dark mode')} className="px-2.5 py-1.5 rounded-lg text-[10px] text-white/25 hover:text-white/50 hover:bg-white/5">Dark</button>
                    <button type="button" onClick={() => sendEdit('Make it more colorful')} className="px-2.5 py-1.5 rounded-lg text-[10px] text-white/25 hover:text-white/50 hover:bg-white/5">Colorful</button>
                  </div>
                )}
              </div>
            </div>
          </form>
          {messages.length > 0 && !expanded && (
            <button onClick={() => setExpanded(true)} className="mt-2 text-[10px] text-white/15 hover:text-white/30 text-center w-full">Show history ↑</button>
          )}
        </div>
      </div>
    </div>
  )
}
