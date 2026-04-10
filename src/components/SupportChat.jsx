import { useState, useEffect, useRef } from 'react'

export default function SupportChat({ businessId, businessName, accentColor }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Bonjour ! Je suis l'assistant de ${businessName || 'notre entreprise'}. Comment puis-je vous aider ?` }
  ])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)
  const accent = accentColor || '#4f9fff'

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }) }, [messages])

  const send = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    const msg = input.trim()
    setInput('')
    const updated = [...messages, { role: 'user', content: msg }]
    setMessages(updated)
    setLoading(true)

    try {
      const res = await fetch('/api/agents/chat-widget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, message: msg, history: updated.slice(-6) }),
      })
      const data = await res.json()
      setMessages([...updated, { role: 'assistant', content: data.reply || 'Désolé, réessayez.' }])
    } catch {
      setMessages([...updated, { role: 'assistant', content: 'Connexion perdue. Réessayez.' }])
    }
    setLoading(false)
  }

  return (
    <>
      {/* Bubble */}
      <button onClick={() => setOpen(!open)} className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg" style={{ background: accent }}>
        {open ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>}
      </button>

      {/* Window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[350px] max-w-[calc(100vw-40px)] rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '440px', background: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>
          {/* Header */}
          <div className="px-5 py-4 text-white" style={{ background: accent }}>
            <div className="text-sm font-bold">{businessName || 'Support'}</div>
            <div className="text-[11px] opacity-70 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-300" />En ligne</div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ background: '#f8f9fa' }}>
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] ${m.role === 'user' ? 'self-end' : 'self-start'}`}>
                <div className={`px-4 py-2.5 text-[13px] leading-relaxed ${m.role === 'user' ? 'rounded-2xl rounded-br-sm text-white' : 'rounded-2xl rounded-bl-sm bg-white text-gray-700 shadow-sm border border-gray-100'}`} style={m.role === 'user' ? { background: accent } : {}}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="self-start"><div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white shadow-sm border border-gray-100 flex gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" /><span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={send} className="px-3 py-3 border-t border-gray-100 flex gap-2 bg-white">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Votre question..." className="flex-1 px-4 py-2.5 rounded-full text-[13px] bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-300" />
            <button type="submit" disabled={loading} className="w-10 h-10 rounded-full text-white flex items-center justify-center shrink-0 disabled:opacity-40 text-sm" style={{ background: accent }}>↑</button>
          </form>
        </div>
      )}
    </>
  )
}
