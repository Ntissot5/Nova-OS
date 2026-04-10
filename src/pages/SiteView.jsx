import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function SiteView() {
  const [site, setSite] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) { window.location.href = '/login'; return }
      supabase.from('businesses').select('name, site_config').eq('owner_id', data.user.id).single()
        .then(({ data: biz }) => { if (biz?.site_config) setSite(biz.site_config); setLoading(false) })
    })
  }, [])

  if (loading) return <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white/30 text-sm">Chargement...</div>
  if (!site) return <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white/30 text-sm">Aucun site généré.</div>

  const { name, slogan, colors, hero, services, about, contact, pages } = site
  const accent = colors?.accent || '#4f9fff'
  const primary = colors?.primary || '#1a1a2e'

  return (
    <div className="min-h-screen" style={{ background: '#fafafa', color: '#1a1a1a', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-black/5 bg-white">
        <span className="text-lg font-bold" style={{ color: primary }}>{name}</span>
        <div className="hidden md:flex items-center gap-6 text-sm text-black/40">
          {(pages || []).map(p => <span key={p}>{p}</span>)}
        </div>
        <button className="text-sm font-semibold text-white px-5 py-2 rounded-lg" style={{ background: accent }}>{hero?.cta || 'Contact'}</button>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-28 text-center" style={{ background: `linear-gradient(135deg, ${primary}08, ${accent}08)` }}>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: primary }}>{hero?.title || name}</h1>
        <p className="text-base md:text-lg text-black/50 max-w-lg mx-auto mb-8">{hero?.subtitle || slogan}</p>
        <button className="text-sm font-semibold text-white px-8 py-3.5 rounded-xl shadow-lg" style={{ background: accent }}>{hero?.cta || 'Commencer'}</button>
      </section>

      {/* Services */}
      {services?.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: primary }}>Nos services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-black/5">
                <h3 className="text-base font-semibold mb-2">{s.name}</h3>
                <p className="text-sm text-black/40 mb-4 leading-relaxed">{s.description}</p>
                <span className="text-sm font-bold" style={{ color: accent }}>{s.price}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      {about?.text && (
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-6" style={{ color: primary }}>À propos</h2>
          <p className="text-base text-black/50 leading-relaxed">{about.text}</p>
        </section>
      )}

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ color: primary }}>Contact</h2>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-black/5 flex flex-col md:flex-row gap-8 justify-center text-center">
          {contact?.email && <div><div className="text-xs text-black/30 mb-1">Email</div><div className="text-sm font-medium">{contact.email}</div></div>}
          {contact?.phone && <div><div className="text-xs text-black/30 mb-1">Téléphone</div><div className="text-sm font-medium">{contact.phone}</div></div>}
          {contact?.address && <div><div className="text-xs text-black/30 mb-1">Adresse</div><div className="text-sm font-medium">{contact.address}</div></div>}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-8 px-6 text-center">
        <span className="text-sm font-bold" style={{ color: primary }}>{name}</span>
        <p className="text-xs text-black/30 mt-1">{slogan}</p>
        <p className="text-[10px] text-black/15 mt-4">Propulsé par Nova OS</p>
      </footer>

      {/* Back to dashboard floating button */}
      <a href="/dashboard" className="fixed bottom-6 right-6 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-black/80 shadow-lg hover:bg-black/90">← Dashboard</a>
    </div>
  )
}
