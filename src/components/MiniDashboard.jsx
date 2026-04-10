import { useState, useEffect } from 'react'

const INITIAL = { leads: 142, emails: 847, tickets: 394, revenue: 28400 }

const EVENTS = [
  { text: 'Lead qualifié : Boulangerie Favre', type: 'sales', stat: 'leads' },
  { text: 'Email envoyé à Thomas K.', type: 'sales', stat: 'emails' },
  { text: 'Ticket #__ID__ résolu en 8s', type: 'support', stat: 'tickets' },
  { text: 'Relance automatique : 5 prospects', type: 'sales', stat: 'emails' },
  { text: 'Ticket #__ID__ escaladé', type: 'support', stat: 'tickets' },
  { text: 'Lead qualifié : Garage Central SA', type: 'sales', stat: 'leads' },
  { text: 'Facture #__ID__ envoyée', type: 'ops', stat: 'revenue' },
  { text: 'Email de suivi envoyé à Sarah L.', type: 'sales', stat: 'emails' },
]

export default function MiniDashboard() {
  const [stats, setStats] = useState(INITIAL)
  const [log, setLog] = useState([
    { text: 'Prospect qualifié : Cabinet Rossi', type: 'sales', time: '9:01' },
    { text: 'Email de relance envoyé à Julie M.', type: 'sales', time: '9:00' },
    { text: 'Ticket #4820 résolu automatiquement', type: 'support', time: '8:58' },
  ])

  useEffect(() => {
    let idx = 0, ticketId = 4821
    const interval = setInterval(() => {
      const event = EVENTS[idx % EVENTS.length]; idx++; ticketId++
      const text = event.text.replace('__ID__', String(ticketId))
      const now = new Date()
      const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
      setLog(prev => [{ text, type: event.type, time }, ...prev].slice(0, 5))
      setStats(prev => ({ ...prev, [event.stat]: prev[event.stat] + (event.stat === 'revenue' ? 150 : 1) }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const typeColor = { sales: 'text-accent', support: 'text-violet-light', ops: 'text-cyan-300' }

  return (
    <div className="glow-card rounded-2xl border border-white/[0.06] bg-[#0c0c1e]/80 backdrop-blur-sm overflow-hidden w-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <span className="ml-2 text-[10px] text-white/15 font-mono">nova-os — dashboard live</span>
        <div className="ml-auto flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /><span className="text-[9px] text-green-400/60 font-mono">LIVE</span></div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
        {[{ label: 'Leads qualifiés', value: stats.leads, color: 'text-accent' }, { label: 'Emails envoyés', value: stats.emails, color: 'text-accent' }, { label: 'Tickets résolus', value: stats.tickets, color: 'text-violet-light' }, { label: 'Revenue généré', value: `${(stats.revenue / 1000).toFixed(1)}k CHF`, color: 'text-cyan-300' }].map(s => (
          <div key={s.label} className="bg-[#0c0c1e] px-4 py-3">
            <div className="text-[10px] text-white/20 mb-1">{s.label}</div>
            <div className={`text-lg font-bold font-mono ${s.color} transition-all duration-300`}>{typeof s.value === 'number' ? s.value.toLocaleString() : s.value}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/[0.04] px-4 py-3">
        <div className="text-[9px] text-white/15 font-mono uppercase tracking-wider mb-2.5">Activité en direct</div>
        <div className="flex flex-col gap-1.5">
          {log.map((item, i) => (
            <div key={`${item.text}-${i}`} className={`flex items-center gap-2 text-xs ${i === 0 ? 'animate-[fade-in_0.3s_ease]' : ''}`}>
              <span className={`${typeColor[item.type]} shrink-0`}>✓</span>
              <span className="text-white/40 truncate">{item.text}</span>
              <span className="text-white/10 font-mono text-[10px] ml-auto shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
