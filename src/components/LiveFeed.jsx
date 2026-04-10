import { useState, useEffect, useRef } from 'react'

const ACTIONS = [
  { text: 'Email de relance envoyé à Marie D.', type: 'sales' },
  { text: 'Lead qualifié : Restaurant Le Lac, Genève', type: 'sales' },
  { text: 'Ticket #4821 résolu automatiquement', type: 'support' },
  { text: 'Facture #1092 générée et envoyée', type: 'ops' },
  { text: 'Prospect contacté : Cabinet Dupont, Lausanne', type: 'sales' },
  { text: 'Réponse support envoyée à Pierre M.', type: 'support' },
  { text: 'Rappel RDV envoyé à 3 clients', type: 'ops' },
  { text: 'Lead qualifié : Pharmacie Centrale, Berne', type: 'sales' },
  { text: 'Ticket #4822 escaladé vers l\'équipe', type: 'support' },
  { text: 'Stock vérifié : 2 alertes envoyées', type: 'ops' },
  { text: 'Séquence de bienvenue envoyée à Sophie L.', type: 'sales' },
  { text: 'FAQ mise à jour : 3 nouvelles réponses', type: 'support' },
  { text: 'Devis #287 généré automatiquement', type: 'ops' },
  { text: 'Lead qualifié : Agence Horizon, Zurich', type: 'sales' },
  { text: 'Ticket #4823 résolu en 12 secondes', type: 'support' },
]

const typeColors = { sales: 'text-accent', support: 'text-violet-light', ops: 'text-cyan-300' }

export default function LiveFeed() {
  const [items, setItems] = useState([])
  const idx = useRef(0)

  useEffect(() => {
    const initial = []
    for (let i = 0; i < 3; i++) initial.push({ ...ACTIONS[i], id: i, time: new Date() })
    idx.current = 3; setItems(initial)
    const interval = setInterval(() => {
      const action = ACTIONS[idx.current % ACTIONS.length]; idx.current++
      setItems(prev => [{ ...action, id: idx.current, time: new Date() }, ...prev].slice(0, 8))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden h-[280px]">
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0a0a1a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0a0a1a] to-transparent z-10 pointer-events-none" />
      <div className="flex flex-col gap-2.5 py-4">
        {items.map(item => (
          <div key={item.id} className="flex items-start gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] animate-[fade-in_0.4s_ease_both]">
            <span className={`${typeColors[item.type]} text-sm mt-0.5 shrink-0`}>✓</span>
            <p className="text-sm text-white/50 leading-relaxed flex-1 min-w-0">{item.text}</p>
            <span className="text-[10px] text-white/15 font-mono shrink-0 mt-1">maintenant</span>
          </div>
        ))}
      </div>
    </div>
  )
}
