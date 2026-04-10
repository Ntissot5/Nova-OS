export default function Modern({ site }) {
  const { name, slogan, colors, hero, services, about, contact } = site
  const a = colors?.accent || '#4f9fff'
  const p = colors?.primary || '#111'

  return (
    <div style={{ background: '#ffffff', color: '#1a1a1a', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-black/5">
        <span className="text-xl font-black tracking-tight" style={{ color: p }}>{name}</span>
        <div className="hidden md:flex items-center gap-8 text-sm text-black/40">
          <a href="#services">Services</a><a href="#about">À propos</a><a href="#contact">Contact</a>
        </div>
        <button className="text-sm font-semibold text-white px-6 py-2.5 rounded-full" style={{ background: a }}>{hero?.cta || 'Contact'}</button>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-16 py-24 md:py-36">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: a }}>{slogan}</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6" style={{ color: p }}>{hero?.title}</h1>
          <p className="text-lg text-black/40 max-w-xl mb-10 leading-relaxed">{hero?.subtitle}</p>
          <div className="flex gap-4">
            <button className="text-sm font-semibold text-white px-8 py-4 rounded-full" style={{ background: a }}>{hero?.cta || 'Commencer'}</button>
            <button className="text-sm font-semibold px-8 py-4 rounded-full border-2" style={{ borderColor: a, color: a }}>En savoir plus</button>
          </div>
        </div>
      </section>

      {/* Services */}
      {services?.length > 0 && (
        <section id="services" className="px-6 md:px-16 py-20 border-t border-black/5">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: a }}>Services</p>
          <h2 className="text-3xl font-black mb-12" style={{ color: p }}>Ce que nous proposons</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={i} className="group">
                <div className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center text-white text-lg font-bold" style={{ background: a }}>{i + 1}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: p }}>{s.name}</h3>
                <p className="text-sm text-black/40 leading-relaxed mb-3">{s.description}</p>
                <span className="text-sm font-bold" style={{ color: a }}>{s.price}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      {about?.text && (
        <section id="about" className="px-6 md:px-16 py-20" style={{ background: `${p}08` }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: a }}>À propos</p>
            <h2 className="text-3xl font-black mb-6" style={{ color: p }}>Notre histoire</h2>
            <p className="text-base text-black/50 leading-relaxed">{about.text}</p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 md:px-16 py-20">
        <div className="rounded-3xl px-8 md:px-16 py-16 text-center text-white" style={{ background: `linear-gradient(135deg, ${p}, ${a})` }}>
          <h2 className="text-3xl font-black mb-4">Prêt à commencer ?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">Contactez-nous pour discuter de vos besoins.</p>
          <button className="text-sm font-semibold bg-white px-8 py-4 rounded-full" style={{ color: p }}>Nous contacter →</button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 md:px-16 py-16 border-t border-black/5">
        <div className="flex flex-col md:flex-row gap-12 justify-between max-w-4xl">
          {contact?.email && <div><div className="text-xs text-black/30 uppercase tracking-widest mb-2">Email</div><div className="text-sm font-medium">{contact.email}</div></div>}
          {contact?.phone && <div><div className="text-xs text-black/30 uppercase tracking-widest mb-2">Téléphone</div><div className="text-sm font-medium">{contact.phone}</div></div>}
          {contact?.address && <div><div className="text-xs text-black/30 uppercase tracking-widest mb-2">Adresse</div><div className="text-sm font-medium">{contact.address}</div></div>}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-black/5 flex items-center justify-between">
        <span className="text-sm font-bold" style={{ color: p }}>{name}</span>
        <span className="text-xs text-black/20">Propulsé par Nova OS</span>
      </footer>
    </div>
  )
}
