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

  const agentMeta = Object.fromEntries(AGENTS.map(a => [a.type, a]))
  const totalTasks = agents.reduce((s, a) => s + (a.tasks_this_month || 0), 0)
  const activeAgents = agents.filter(a => a.status === 'active').length

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-black/30 text-sm">Chargement...</div>

  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      {/* Warm gradient top — same as landing */}
      <div className="absolute inset-x-0 top-0 h-[400px] pointer-events-none" style={{ background: 'linear-gradient(180deg, #fde8d8 0%, #f9e0cc 30%, #ffffff 100%)' }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-black flex items-center justify-center"><div className="w-2.5 h-2.5 rounded bg-white" /></div>
          <span className="text-sm font-bold text-black">Nova OS</span>
        </a>
        <div className="flex items-center gap-4">
          <span className="text-xs text-black/25">{user?.email}</span>
          <button onClick={logout} className="text-xs text-black/30 hover:text-black/60">Déconnexion</button>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-black mb-2">
            Bonjour{business?.name ? `, ${business.name}` : ''} 👋
          </h1>
          <p className="text-black/30 text-sm">Votre business tourne. Voici ce qui se passe.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Agents actifs', value: activeAgents, accent: true },
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
          {/* Left */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* My site */}
            <div>
              <h2 className="text-base font-bold text-black mb-3">Mon site</h2>
              <a href="/my-site" className="flex items-center justify-between p-5 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-xl">🌐</div>
                  <div>
                    <div className="text-sm font-semibold text-black mb-0.5">{business?.site_config?.name || business?.name || 'Mon site'}</div>
                    <div className="text-xs text-black/30">{business?.site_config?.html ? 'En ligne — cliquez pour modifier' : 'Cliquez pour générer votre site'}</div>
                  </div>
                </div>
                <span className="text-sm text-orange-500 font-semibold opacity-0 group-hover:opacity-100">Ouvrir →</span>
              </a>
            </div>

            {/* Agents */}
            <div>
              <h2 className="text-base font-bold text-black mb-3">Mes agents</h2>
              <div className="flex flex-col gap-3">
                {agents.length === 0 && <p className="text-sm text-black/20 p-4">Aucun agent configuré.</p>}
                {agents.map(a => {
                  const meta = agentMeta[a.type]
                  return (
                    <div key={a.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-lg">{meta?.icon || '🤖'}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-black">{meta?.name || a.type}</span>
                          <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${a.status === 'active' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-black/[0.03] text-black/25 border border-black/[0.06]'}`}>
                            {a.status === 'active' ? 'Actif' : 'Pause'}
                          </span>
                        </div>
                        <div className="text-[11px] text-black/25">
                          {a.tasks_this_month || 0} tâches ce mois
                          {a.last_run && ` · ${new Date(a.last_run).toLocaleString('fr-CH', { hour: '2-digit', minute: '2-digit' })}`}
                        </div>
                      </div>
                      <button onClick={() => toggleAgent(a.id, a.status)} className={`w-11 h-6 rounded-full flex items-center px-0.5 ${a.status === 'active' ? 'bg-orange-500' : 'bg-black/10'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white shadow-sm ${a.status === 'active' ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right — activity */}
          <div className="lg:col-span-2">
            <h2 className="text-base font-bold text-black mb-3">Activité récente</h2>
            <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              {logs.length === 0 && <p className="text-xs text-black/20">Aucune activité pour le moment.</p>}
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
                {logs.map(l => (
                  <div key={l.id} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center text-[10px] mt-0.5 shrink-0">✓</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-black/50 leading-relaxed">{l.action}</p>
                      <p className="text-[10px] text-black/20 mt-0.5">{new Date(l.created_at).toLocaleString('fr-CH')}</p>
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
