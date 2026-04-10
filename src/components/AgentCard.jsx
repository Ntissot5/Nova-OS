const AGENTS = [
  { type: 'support', icon: '🤖', name: 'Agent Support', desc: 'Répond à vos clients 24/7 par chat et email', included: true },
  { type: 'sales', icon: '📈', name: 'Agent Ventes', desc: 'Qualifie et relance vos leads automatiquement' },
  { type: 'marketing', icon: '📱', name: 'Agent Marketing', desc: 'Génère et poste du contenu chaque jour' },
  { type: 'email', icon: '📧', name: 'Agent Emails', desc: 'Gère vos emails entrants et sortants' },
  { type: 'reports', icon: '📊', name: 'Agent Rapports', desc: 'Rapport hebdomadaire automatique' },
  { type: 'ecommerce', icon: '🛒', name: 'Agent E-commerce', desc: 'Gère commandes et stock' },
]

export { AGENTS }

export default function AgentCard({ agent, active, onToggle }) {
  return (
    <button
      onClick={() => !agent.included && onToggle(agent.type)}
      className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
        active
          ? 'border-accent/30 bg-accent/[0.06] shadow-[0_0_20px_rgba(79,159,255,0.06)]'
          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
      } ${agent.included ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{agent.icon}</span>
            <span className="text-sm font-semibold">{agent.name}</span>
            {agent.included && <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent/70 border border-accent/20">inclus</span>}
          </div>
          <p className="text-xs text-white/30 leading-relaxed">{agent.desc}</p>
        </div>
        {/* Toggle */}
        <div className={`w-10 h-6 rounded-full shrink-0 mt-1 flex items-center transition-all duration-300 px-0.5 ${
          active ? 'bg-accent' : 'bg-white/10'
        }`}>
          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${active ? 'translate-x-4' : 'translate-x-0'}`} />
        </div>
      </div>
    </button>
  )
}
