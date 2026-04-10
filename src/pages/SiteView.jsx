import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function SiteView() {
  const [html, setHtml] = useState(null)
  const [bizId, setBizId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [regenerating, setRegenerating] = useState(false)
  const [bizData, setBizData] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) { window.location.href = '/login'; return }
      supabase.from('businesses').select('id, name, description, site_config').eq('owner_id', data.user.id).single()
        .then(({ data: biz }) => {
          if (biz) {
            setBizId(biz.id)
            setBizData(biz)
            if (biz.site_config?.html) setHtml(biz.site_config.html)
          }
          setLoading(false)
        })
    })
  }, [])

  const regenerate = async () => {
    if (!bizData || regenerating) return
    setRegenerating(true)
    try {
      const res = await fetch('/api/generate-html-site', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: bizData.description || bizData.name,
          template: bizData.site_config?.template || 'modern',
          colors: bizData.site_config?.colors,
        }),
      })
      const data = await res.json()
      if (data.success && data.data?.html) {
        setHtml(data.data.html)
        await supabase.from('businesses').update({
          site_config: { ...bizData.site_config, html: data.data.html }
        }).eq('id', bizId)
      }
    } catch {}
    setRegenerating(false)
  }

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-black/30 text-sm">Chargement...</div>

  if (!html) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
      <p className="text-black/30 text-sm">Aucun site généré.</p>
      <button onClick={regenerate} disabled={regenerating} className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-orange-500 disabled:opacity-50">
        {regenerating ? 'Génération en cours...' : 'Générer mon site maintenant'}
      </button>
      <a href="/dashboard" className="text-xs text-black/30">← Dashboard</a>
    </div>
  )

  return (
    <>
      {/* Toolbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2.5 bg-white/95 backdrop-blur border-b border-black/[0.06] shadow-sm">
        <a href="/dashboard" className="text-xs text-black/40 hover:text-black/60">← Dashboard</a>
        <div className="flex items-center gap-2">
          <button onClick={regenerate} disabled={regenerating} className="text-xs font-semibold px-4 py-1.5 rounded-lg border border-black/[0.08] text-black/40 hover:text-black/60 disabled:opacity-40">
            {regenerating ? '⏳ Regénération...' : '🔄 Regénérer'}
          </button>
        </div>
      </div>

      {/* Site rendered in iframe */}
      <iframe
        srcDoc={html}
        className="w-full border-0 pt-[45px]"
        style={{ height: 'calc(100vh - 45px)' }}
        title="Mon site"
        sandbox="allow-same-origin allow-scripts"
      />
    </>
  )
}
