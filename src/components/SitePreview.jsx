export default function SitePreview({ site }) {
  if (!site) return null
  const { name, slogan, colors, hero, services, about, contact } = site
  const bg = colors?.primary || '#1a1a2e'
  const accent = colors?.accent || '#4f9fff'

  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0e0e1a] text-white text-left shadow-[0_0_60px_rgba(0,0,0,0.3)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a16] border-b border-white/[0.06]">
        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/50" /></div>
        <div className="flex-1 mx-8"><div className="bg-white/[0.06] rounded-md px-3 py-1 text-[10px] text-white/20 font-mono text-center">{name?.toLowerCase().replace(/\s+/g, '')}.novaos.io</div></div>
      </div>

      {/* Site content */}
      <div className="max-h-[400px] overflow-y-auto">
        {/* Nav */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
          <span className="text-sm font-bold" style={{ color: accent }}>{name}</span>
          <div className="flex gap-4 text-[10px] text-white/30">
            {(site.pages || []).slice(0, 4).map(p => <span key={p}>{p}</span>)}
          </div>
        </div>

        {/* Hero */}
        <div className="px-6 py-10 text-center" style={{ background: `linear-gradient(135deg, ${bg}22, ${accent}11)` }}>
          <h2 className="text-xl font-bold mb-2" style={{ color: accent }}>{hero?.title || name}</h2>
          <p className="text-xs text-white/40 mb-4 max-w-xs mx-auto">{hero?.subtitle || slogan}</p>
          <span className="inline-block px-4 py-1.5 rounded-lg text-[11px] font-semibold text-black" style={{ background: accent }}>{hero?.cta || 'Commencer'}</span>
        </div>

        {/* Services */}
        {services?.length > 0 && (
          <div className="px-5 py-6">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Services</h3>
            <div className="grid grid-cols-3 gap-2">
              {services.map((s, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                  <div className="text-[11px] font-semibold mb-1">{s.name}</div>
                  <div className="text-[9px] text-white/25 mb-2 line-clamp-2">{s.description}</div>
                  <div className="text-[10px] font-mono" style={{ color: accent }}>{s.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About */}
        {about?.text && (
          <div className="px-5 py-4 border-t border-white/[0.04]">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">À propos</h3>
            <p className="text-[11px] text-white/30 leading-relaxed">{about.text}</p>
          </div>
        )}

        {/* Contact */}
        <div className="px-5 py-4 border-t border-white/[0.04] flex gap-6 text-[10px] text-white/20">
          {contact?.email && <span>{contact.email}</span>}
          {contact?.phone && <span>{contact.phone}</span>}
        </div>
      </div>
    </div>
  )
}
