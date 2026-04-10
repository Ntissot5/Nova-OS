import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import Modern from '../templates/Modern'
import Elegant from '../templates/Elegant'
import Bold from '../templates/Bold'

const TEMPLATES = { modern: Modern, elegant: Elegant, bold: Bold }

export default function SiteView() {
  const [site, setSite] = useState(null)
  const [template, setTemplate] = useState('modern')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) { window.location.href = '/login'; return }
      supabase.from('businesses').select('site_config').eq('owner_id', data.user.id).single()
        .then(({ data: biz }) => {
          if (biz?.site_config) {
            setSite(biz.site_config)
            setTemplate(biz.site_config.template || 'modern')
          }
          setLoading(false)
        })
    })
  }, [])

  if (loading) return <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white/30 text-sm">Chargement...</div>
  if (!site) return <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white/30 text-sm">Aucun site généré.</div>

  const Template = TEMPLATES[template] || Modern

  return (
    <>
      <Template site={site} />
      <a href="/dashboard" className="fixed bottom-6 right-6 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-black/80 shadow-lg hover:bg-black/90 z-50">← Dashboard</a>
    </>
  )
}
