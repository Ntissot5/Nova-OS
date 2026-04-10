export default function Elegant({ site }) {
  const { name, slogan, colors, hero, services, about, contact } = site
  const a = colors?.accent || '#B8860B'
  const p = colors?.primary || '#1a1a1a'

  return (
    <div style={{ background: '#faf9f6', color: '#2a2a2a', fontFamily: 'Georgia, Times, serif' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-6">
        <span className="text-2xl font-bold tracking-tight" style={{ color: p }}>{name}</span>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: `${p}80`, fontFamily: 'Inter, sans-serif' }}>
          <a href="#services">Services</a><a href="#about">À propos</a><a href="#contact">Contact</a>
        </div>
        <button className="text-xs font-semibold uppercase tracking-widest px-6 py-3 border-2" style={{ borderColor: a, color: a, fontFamily: 'Inter, sans-serif' }}>{hero?.cta || 'Réserver'}</button>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-16 py-24 md:py-40 text-center border-t border-black/5">
        <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: a, fontFamily: 'Inter, sans-serif' }}>{slogan}</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 max-w-3xl mx-auto" style={{ color: p }}>{hero?.title}</h1>
        <div className="w-16 h-px mx-auto mb-6" style={{ background: a }} />
        <p className="text-lg max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: `${p}60` }}>{hero?.subtitle}</p>
        <button className="text-xs font-semibold uppercase tracking-widest text-white px-10 py-4" style={{ background: a, fontFamily: 'Inter, sans-serif' }}>{hero?.cta || 'Découvrir'}</button>
      </section>

      {/* Services */}
      {services?.length > 0 && (
        <section id="services" className="px-6 md:px-16 py-20 border-t border-black/5">
          <p className="text-xs uppercase tracking-[0.3em] text-center mb-3" style={{ color: a, fontFamily: 'Inter, sans-serif' }}>Services</p>
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: p }}>Nos prestations</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {services.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-px h-8 mx-auto mb-6" style={{ background: a }} />
                <h3 className="text-lg font-bold mb-3" style={{ color: p }}>{s.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: `${p}50` }}>{s.description}</p>
                <span className="text-sm font-bold" style={{ color: a }}>{s.price}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      {about?.text && (
        <section id="about" className="px-6 md:px-16 py-20 border-t border-black/5">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: a, fontFamily: 'Inter, sans-serif' }}>Notre histoire</p>
            <h2 className="text-3xl font-bold mb-8" style={{ color: p }}>À propos</h2>
            <p className="text-base leading-[1.8]" style={{ color: `${p}60` }}>{about.text}</p>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="px-6 md:px-16 py-20 border-t border-black/5" style={{ background: `${p}05` }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: a, fontFamily: 'Inter, sans-serif' }}>Contact</p>
          <h2 className="text-3xl font-bold mb-10" style={{ color: p }}>Nous trouver</h2>
          <div className="flex flex-col md:flex-row gap-10 justify-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            {contact?.email && <div><div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: a }}>Email</div><div className="text-sm">{contact.email}</div></div>}
            {contact?.phone && <div><div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: a }}>Téléphone</div><div className="text-sm">{contact.phone}</div></div>}
            {contact?.address && <div><div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: a }}>Adresse</div><div className="text-sm">{contact.address}</div></div>}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-black/5 text-center">
        <span className="text-lg font-bold" style={{ color: p }}>{name}</span>
        <p className="text-xs mt-1" style={{ color: `${p}30`, fontFamily: 'Inter, sans-serif' }}>Propulsé par Nova OS</p>
      </footer>
    </div>
  )
}
