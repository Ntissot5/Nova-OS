import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { AGENTS } from '../components/AgentCard'

export default function Dashboard() {
  const [business, setBusiness] = useState(null)
  const [agents, setAgents] = useState([])
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

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
      const { data: ag } = await supabase.from('agents').select('*').eq('business_id', biz.id).order('created_at')
      setAgents(ag || [])
      const { data: lg } = await supabase.from('agent_logs').select('*').eq('business_id', biz.id).order('created_at', { ascending: false }).limit(20)
      setLogs(lg || [])
    }
    setLoading(false)
  }

  const toggleAgent = async (agentId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active'
    await supabase.from('agents').update({ status: newStatus }).eq('id', agentId)
    setAgents(agents.map(a => a.id === agentId ? { ...a, status: newStatus } : a))
  }

  const logout = async () => { await supabase.auth.signOut(); window.location.href = '/' }

  const typeColors = { sales: 'text-accent', support: 'text-violet-light', marketing: 'text-pink-400', email: 'text-cyan-300', reports: 'text-amber-400', ecommerce: 'text-emerald-400' }
  const agentMeta = Object.fromEntries(AGENTS.map(a => [a.type, a]))
  const totalTasks = agents.reduce((s, a) => s + (a.tasks_this_month || 0), 0)

  if (loading) return <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white/30">Chargement...</div>

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0d1117 100%)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-sm bg-accent" /></div>
          <span className="text-sm font-bold">Nova OS</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/25">{user?.email}</span>
          <button onClick={logout} className="text-xs text-white/30 hover:text-white/60 transition-colors">Déconnexion</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-2">
            Bonjour{business?.name ? `, ${business.name}` : ''} 👋
          </h1>
          <p className="text-white/30">Votre business tourne. Voici ce qui se passe.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Agents actifs', value: agents.filter(a => a.status === 'active').length, color: 'text-accent' },
            { label: 'Tâches ce mois', value: totalTasks, color: 'text-violet-light' },
            { label: 'Temps économisé', value: `${Math.round(totalTasks * 2.5)}min`, color: 'text-cyan-300' },
            { label: 'Plan', value: business?.plan || 'free', color: 'text-white/60' },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-[10px] text-white/20 uppercase tracking-wider mb-1">{s.label}</div>
              <div className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — site + agents */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* My site */}
            <div>
              <h2 className="text-lg font-bold mb-4">Mon site</h2>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                {business?.site_url ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold mb-1">{business.name}</div>
                      <a href={business.site_url} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline">{business.site_url}</a>
                    </div>
                    <a href={business.site_url} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg text-xs bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all">Voir mon site</a>
                  </div>
                ) : business?.site_config?.name ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold mb-1">{business.site_config.name}</div>
                      <div className="text-xs text-white/25">{business.site_config.slogan}</div>
                    </div>
                    <a href="/my-site" className="px-4 py-2 rounded-lg text-xs bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20">Voir mon site →</a>
                  </div>
                ) : (
                  <p className="text-sm text-white/25">Aucun site généré.</p>
                )}
              </div>
            </div>

            {/* Agents */}
            <div>
              <h2 className="text-lg font-bold mb-4">Mes agents</h2>
              <div className="flex flex-col gap-3">
                {agents.length === 0 && <p className="text-sm text-white/20">Aucun agent configuré.</p>}
                {agents.map(a => {
                  const meta = agentMeta[a.type]
                  return (
                    <div key={a.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-4">
                      <span className="text-lg">{meta?.icon || '🤖'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold">{meta?.name || a.type}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${a.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-white/25 border border-white/[0.06]'}`}>
                            {a.status === 'active' ? 'actif' : 'pause'}
                          </span>
                        </div>
                        <div className="text-[10px] text-white/20">
                          {a.tasks_this_month || 0} tâches ce mois
                          {a.last_run && ` · Dernière action : ${new Date(a.last_run).toLocaleString('fr-CH', { hour: '2-digit', minute: '2-digit' })}`}
                        </div>
                      </div>
                      <button onClick={() => toggleAgent(a.id, a.status)} className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-all ${a.status === 'active' ? 'bg-accent' : 'bg-white/10'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-all ${a.status === 'active' ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right — activity feed */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold mb-4">Activité récente</h2>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              {logs.length === 0 && <p className="text-xs text-white/20">Aucune activité pour le moment.</p>}
              <div className="flex flex-col gap-2.5 max-h-[500px] overflow-y-auto">
                {logs.map(l => (
                  <div key={l.id} className="flex items-start gap-2.5">
                    <span className={`text-xs mt-0.5 ${typeColors[l.type] || 'text-white/30'}`}>&#x2713;</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/40 leading-relaxed">{l.action}</p>
                      <p className="text-[9px] text-white/15 font-mono mt-0.5">{new Date(l.created_at).toLocaleString('fr-CH')}</p>
                    </div>
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
