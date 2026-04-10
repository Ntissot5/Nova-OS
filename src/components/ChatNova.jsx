import { useState, useRef, useEffect } from 'react'

export default function ChatNova() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Salut ! Je suis Nova, votre assistant IA. Posez-moi une question sur Nova OS.' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }) }, [messages])

  const send = async (e) => {
    e.preventDefault(); if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    const updated = [...messages, userMsg]; setMessages(updated); setInput(''); setLoading(true)
    try {
      const res = await fetch('/api/chat-nova', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: updated.map(m => ({ role: m.role, content: m.content })) }) })
      const data = await res.json()
      if (data.reply) setMessages([...updated, { role: 'assistant', content: data.reply }])
    } catch { setMessages([...updated, { role: 'assistant', content: 'Désolé, je ne suis pas disponible pour le moment.' }]) }
    setLoading(false)
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-black flex items-center justify-center shadow-[0_0_25px_rgba(79,159,255,0.3)] hover:shadow-[0_0_35px_rgba(79,159,255,0.5)] transition-all">
        {open ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>}
        {!open && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0a0a1a] animate-pulse" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-2xl border border-white/[0.08] bg-[#0c0c1e]/95 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.5)] animate-[fade-in_0.2s_ease] flex flex-col" style={{ height: '480px' }}>
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
            <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center"><div className="w-3 h-3 rounded-sm bg-accent" /></div>
            <div><div className="text-sm font-semibold">Nova</div><div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-[10px] text-white/30">En ligne</span></div></div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] ${m.role === 'user' ? 'self-end' : 'self-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-accent text-black rounded-br-md' : 'bg-white/[0.06] text-white/70 rounded-bl-md'}`}>{m.content}</div>
              </div>
            ))}
            {loading && <div className="self-start"><div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.06] flex gap-1.5"><span className="w-2 h-2 rounded-full bg-white/20 animate-bounce" /><span className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>}
          </div>
          <form onSubmit={send} className="px-4 py-3 border-t border-white/[0.06] flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Posez une question..." className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-white/[0.06] border border-white/[0.06] text-white placeholder:text-white/20 outline-none focus:border-accent/30 transition-all" />
            <button type="submit" disabled={loading} className="w-10 h-10 rounded-xl bg-accent text-black flex items-center justify-center shrink-0 disabled:opacity-40"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12 14-7-4 7 4 7z" /></svg></button>
          </form>
        </div>
      )}
    </>
  )
}
