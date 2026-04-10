import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../supabase'
import Modern from '../templates/Modern'
import Elegant from '../templates/Elegant'
import Bold from '../templates/Bold'

const TEMPLATES = { modern: Modern, elegant: Elegant, bold: Bold }

export default function SiteView() {
  const [site, setSite] = useState(null)
  const [bizId, setBizId] = useState(null)
  const [template, setTemplate] = useState('modern')
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) { window.location.href = '/login'; return }
      supabase.from('businesses').select('id, site_config').eq('owner_id', data.user.id).single()
        .then(({ data: biz }) => {
          if (biz?.site_config) { setSite(biz.site_config); setTemplate(biz.site_config.template || 'modern'); setBizId(biz.id) }
          setLoading(false)
        })
    })
  }, [])

  const save = useCallback(async () => {
    if (!contentRef.current || !bizId) return
    setSaving(true)

    // Read all editable fields from the DOM
    const updated = { ...site }
    const fields = contentRef.current.querySelectorAll('[data-field]')
    fields.forEach(el => {
      const path = el.getAttribute('data-field').split('.')
      let obj = updated
      for (let i = 0; i < path.length - 1; i++) {
        if (Array.isArray(obj[path[i]])) {
          const idx = parseInt(path[i + 1])
          if (!isNaN(idx)) { obj = obj[path[i]][idx]; path.splice(i + 1, 1) }
          else obj = obj[path[i]]
        } else {
          obj = obj[path[i]]
        }
        if (!obj) return
      }
      obj[path[path.length - 1]] = el.innerText
    })

    await supabase.from('businesses').update({ site_config: updated }).eq('id', bizId)
    setSite(updated)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [site, bizId])

  if (loading) return <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white/30 text-sm">Chargement...</div>
  if (!site) return <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white/30 text-sm">Aucun site généré.</div>

  const Template = TEMPLATES[template] || Modern

  return (
    <>
      {/* Edit toolbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2.5 bg-[#0a0a1a]/95 backdrop-blur border-b border-white/[0.06]">
        <a href="/dashboard" className="text-xs text-white/30 hover:text-white/50">← Dashboard</a>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs text-green-400">✓ Sauvegardé</span>}
          {editing ? (
            <>
              <button onClick={save} disabled={saving} className="text-xs font-semibold bg-accent text-black px-4 py-1.5 rounded-lg">
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
              <button onClick={() => setEditing(false)} className="text-xs text-white/30 px-3 py-1.5">Annuler</button>
            </>
          ) : (
            <>
              <select value={template} onChange={e => { setTemplate(e.target.value); const u = { ...site, template: e.target.value }; setSite(u); supabase.from('businesses').update({ site_config: u }).eq('id', bizId) }} className="text-xs bg-white/[0.06] border border-white/[0.1] text-white rounded-lg px-3 py-1.5 outline-none">
                <option value="modern" className="bg-[#0a0a1a]">Modern</option>
                <option value="elegant" className="bg-[#0a0a1a]">Élégant</option>
                <option value="bold" className="bg-[#0a0a1a]">Bold</option>
              </select>
              <button onClick={() => setEditing(true)} className="text-xs font-semibold bg-accent text-black px-4 py-1.5 rounded-lg">Modifier les textes</button>
            </>
          )}
        </div>
      </div>

      {/* Site with editable content */}
      <div ref={contentRef} className={`pt-[45px] ${editing ? 'cursor-text' : ''}`} style={editing ? { outline: 'none' } : {}}>
        <Template site={site} editable={editing} />
      </div>

      {editing && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-[#0a0a1a]/90 backdrop-blur border border-accent/20 text-xs text-white/50 shadow-lg">
          Cliquez sur n'importe quel texte pour le modifier · <button onClick={save} className="text-accent font-semibold ml-1">Sauvegarder</button>
        </div>
      )}
    </>
  )
}
