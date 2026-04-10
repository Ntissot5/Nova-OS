function E({ field, tag: Tag = 'span', children, editable, ...props }) {
  return <Tag {...props} contentEditable={editable || undefined} suppressContentEditableWarning data-field={field} className={`${props.className || ''} ${editable ? 'outline-none hover:ring-2 hover:ring-blue-400/30 focus:ring-2 focus:ring-blue-400/50 rounded px-0.5' : ''}`}>{children}</Tag>
}

export default function Bold({ site, editable }) {
  const { name, slogan, colors, hero, services, about, contact } = site
  const a = colors?.accent || '#ff4f4f'
  const p = colors?.primary || '#0a0a0a'

  return (
    <div style={{ background: p, color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <E field="name" tag="span" editable={editable} className="text-xl font-black tracking-tight">{name}</E>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/40"><a href="#services">Services</a><a href="#about">À propos</a><a href="#contact">Contact</a></div>
        <button className="text-sm font-bold px-6 py-2.5 rounded-xl" style={{ background: a }}>{hero?.cta || 'Contact'}</button>
      </nav>

      <section className="px-6 md:px-16 py-24 md:py-36">
        <div className="max-w-4xl">
          <E field="slogan" tag="div" editable={editable} className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8" style={{ background: `${a}20`, color: a }}>{slogan}</E>
          <E field="hero.title" tag="h1" editable={editable} className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-6">{hero?.title}</E>
          <E field="hero.subtitle" tag="p" editable={editable} className="text-lg text-white/35 max-w-xl mb-10 leading-relaxed">{hero?.subtitle}</E>
          <button className="text-sm font-bold px-10 py-4 rounded-xl" style={{ background: a }}>{hero?.cta || 'Commencer'} →</button>
        </div>
      </section>

      <section className="px-6 md:px-16 py-8 border-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex flex-wrap gap-12 justify-center text-center">
          <div><div className="text-3xl font-black" style={{ color: a }}>10+</div><div className="text-xs text-white/25 mt-1">Années d'expérience</div></div>
          <div><div className="text-3xl font-black" style={{ color: a }}>500+</div><div className="text-xs text-white/25 mt-1">Clients satisfaits</div></div>
          <div><div className="text-3xl font-black" style={{ color: a }}>4.9</div><div className="text-xs text-white/25 mt-1">Note moyenne</div></div>
        </div>
      </section>

      {services?.length > 0 && (
        <section id="services" className="px-6 md:px-16 py-20">
          <h2 className="text-3xl md:text-4xl font-black mb-12">Nos services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="p-6 rounded-2xl border" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-3xl font-black mb-4" style={{ color: `${a}40` }}>0{i + 1}</div>
                <E field={`services.${i}.name`} tag="h3" editable={editable} className="text-lg font-bold mb-2">{s.name}</E>
                <E field={`services.${i}.description`} tag="p" editable={editable} className="text-sm text-white/30 leading-relaxed mb-4">{s.description}</E>
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <E field={`services.${i}.price`} tag="span" editable={editable} className="text-sm font-bold" style={{ color: a }}>{s.price}</E>
                  <span className="text-xs text-white/20">En savoir plus →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {about?.text && (
        <section id="about" className="px-6 md:px-16 py-20">
          <div className="rounded-3xl p-8 md:p-16" style={{ background: `${a}10` }}>
            <h2 className="text-3xl font-black mb-6">À propos</h2>
            <E field="about.text" tag="p" editable={editable} className="text-base text-white/50 leading-relaxed max-w-2xl">{about.text}</E>
          </div>
        </section>
      )}

      <section className="px-6 md:px-16 py-20">
        <div className="rounded-3xl p-8 md:p-16 text-center" style={{ background: a }}>
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">Prêt à commencer ?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">Contactez-nous dès maintenant.</p>
          <button className="text-sm font-bold bg-white px-8 py-4 rounded-xl" style={{ color: a }}>Nous contacter →</button>
        </div>
      </section>

      <section id="contact" className="px-6 md:px-16 py-16 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex flex-col md:flex-row gap-12">
          {contact?.email && <div><div className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Email</div><E field="contact.email" editable={editable} className="text-sm font-medium">{contact.email}</E></div>}
          {contact?.phone && <div><div className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Téléphone</div><E field="contact.phone" editable={editable} className="text-sm font-medium">{contact.phone}</E></div>}
          {contact?.address && <div><div className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Adresse</div><E field="contact.address" editable={editable} className="text-sm font-medium">{contact.address}</E></div>}
        </div>
      </section>

      <footer className="px-6 md:px-16 py-8 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <span className="text-sm font-black">{name}</span>
        <span className="text-xs text-white/15">Propulsé par Nova OS</span>
      </footer>
    </div>
  )
}
