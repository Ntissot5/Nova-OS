function E({ field, tag: Tag = 'span', children, editable, ...props }) {
  return <Tag {...props} contentEditable={editable || undefined} suppressContentEditableWarning data-field={field} className={`${props.className || ''} ${editable ? 'outline-none hover:ring-2 hover:ring-blue-400/30 focus:ring-2 focus:ring-blue-400/50 rounded px-0.5' : ''}`}>{children}</Tag>
}

const SECTOR_IMAGES = {
  'Restaurant': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
  'Cabinet médical': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80',
  'Agence immobilière': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
  'Commerce retail': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
  'Agence marketing': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
  'Salon / Spa': 'https://images.unsplash.com/photo-1540555700478-4be289fbec6b?w=1200&q=80',
  'Coach / Formation': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80',
  'default': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
}

const SERVICE_ICONS = ['✦', '◆', '●']

export default function Modern({ site, editable }) {
  const { name, slogan, colors, hero, services, about, contact, sector } = site
  const a = colors?.accent || '#4f9fff'
  const p = colors?.primary || '#111'
  const img = SECTOR_IMAGES[sector] || SECTOR_IMAGES.default

  return (
    <div style={{ background: '#ffffff', color: '#1a1a1a', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-black/5 sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <E field="name" tag="span" editable={editable} className="text-xl font-black tracking-tight" style={{ color: p }}>{name}</E>
        <div className="hidden md:flex items-center gap-8 text-[13px] text-black/40 font-medium">
          <a href="#services">Services</a><a href="#about">À propos</a><a href="#testimonials">Avis</a><a href="#contact">Contact</a>
        </div>
        <button className="text-[13px] font-semibold text-white px-6 py-2.5 rounded-full" style={{ background: a }}>{hero?.cta || 'Contact'}</button>
      </nav>

      {/* Hero with image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p}ee, ${p}99)` }} />
        </div>
        <div className="relative z-10 px-6 md:px-16 py-28 md:py-40">
          <div className="max-w-2xl">
            <E field="slogan" tag="p" editable={editable} className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/60">{slogan}</E>
            <E field="hero.title" tag="h1" editable={editable} className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6 text-white">{hero?.title}</E>
            <E field="hero.subtitle" tag="p" editable={editable} className="text-lg text-white/60 max-w-lg mb-10 leading-relaxed">{hero?.subtitle}</E>
            <div className="flex gap-4">
              <button className="text-sm font-semibold text-white px-8 py-4 rounded-full shadow-lg" style={{ background: a }}>{hero?.cta || 'Commencer'}</button>
              <button className="text-sm font-semibold px-8 py-4 rounded-full bg-white/10 text-white backdrop-blur">En savoir plus ↓</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-16 py-12 border-b border-black/5">
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {[{ n: '10+', l: 'Années d\'expérience' }, { n: '500+', l: 'Clients satisfaits' }, { n: '4.9/5', l: 'Note moyenne' }].map(s => (
            <div key={s.n} className="text-center">
              <div className="text-3xl font-black" style={{ color: a }}>{s.n}</div>
              <div className="text-xs text-black/30 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      {services?.length > 0 && (
        <section id="services" className="px-6 md:px-16 py-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-center" style={{ color: a }}>Services</p>
            <h2 className="text-3xl md:text-4xl font-black mb-16 text-center" style={{ color: p }}>Ce que nous proposons</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <div key={i} className="p-8 rounded-2xl border border-black/5 hover:border-black/10 hover:shadow-lg text-center group">
                  <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-white text-xl font-bold mx-auto" style={{ background: `linear-gradient(135deg, ${a}, ${a}cc)` }}>{SERVICE_ICONS[i] || '✦'}</div>
                  <E field={`services.${i}.name`} tag="h3" editable={editable} className="text-lg font-bold mb-3" style={{ color: p }}>{s.name}</E>
                  <E field={`services.${i}.description`} tag="p" editable={editable} className="text-sm text-black/40 leading-relaxed mb-4">{s.description}</E>
                  <E field={`services.${i}.price`} tag="span" editable={editable} className="text-sm font-bold" style={{ color: a }}>{s.price}</E>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About with side image */}
      {about?.text && (
        <section id="about" className="px-6 md:px-16 py-20" style={{ background: '#f8f9fa' }}>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: a }}>Notre histoire</p>
              <h2 className="text-3xl font-black mb-6" style={{ color: p }}>À propos</h2>
              <E field="about.text" tag="p" editable={editable} className="text-base text-black/50 leading-relaxed">{about.text}</E>
            </div>
            <div className="flex-1 max-w-sm">
              <img src={img} alt="" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section id="testimonials" className="px-6 md:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-center" style={{ color: a }}>Témoignages</p>
          <h2 className="text-3xl font-black mb-12 text-center" style={{ color: p }}>Ce que disent nos clients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: 'Un service exceptionnel, je recommande vivement. Très professionnel et à l\'écoute.', name: 'Marie L.', role: 'Cliente depuis 2 ans' },
              { text: 'Rapport qualité-prix excellent. L\'équipe est compétente et réactive.', name: 'Pierre D.', role: 'Client régulier' },
              { text: 'J\'ai été agréablement surpris par la qualité. Je reviendrai sans hésiter.', name: 'Sophie M.', role: 'Nouvelle cliente' },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl border border-black/5 bg-white">
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <span key={j} style={{ color: a }}>★</span>)}</div>
                <p className="text-sm text-black/50 leading-relaxed mb-4">"{t.text}"</p>
                <div><div className="text-sm font-bold" style={{ color: p }}>{t.name}</div><div className="text-xs text-black/30">{t.role}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-16 py-20" style={{ background: '#f8f9fa' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-12 text-center" style={{ color: p }}>Questions fréquentes</h2>
          {[
            { q: 'Comment prendre rendez-vous ?', a: 'Vous pouvez nous contacter par téléphone, email ou via le formulaire de contact sur cette page.' },
            { q: 'Quels sont vos horaires ?', a: 'Nous sommes ouverts du lundi au vendredi de 8h à 18h, et le samedi sur rendez-vous.' },
            { q: 'Acceptez-vous les nouveaux clients ?', a: 'Oui, nous accueillons avec plaisir les nouveaux clients. N\'hésitez pas à nous contacter.' },
          ].map((f, i) => (
            <div key={i} className="py-5 border-b border-black/5">
              <h3 className="text-sm font-bold mb-2" style={{ color: p }}>{f.q}</h3>
              <p className="text-sm text-black/40 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-4xl mx-auto rounded-3xl px-8 md:px-16 py-16 text-center text-white overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${p}, ${a})` }}>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Prêt à commencer ?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">Contactez-nous dès aujourd'hui.</p>
          <button className="text-sm font-semibold bg-white px-8 py-4 rounded-full shadow-lg" style={{ color: p }}>{hero?.cta || 'Nous contacter'} →</button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 md:px-16 py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {contact?.email && <div className="text-center p-6 rounded-2xl border border-black/5"><div className="text-2xl mb-3">✉️</div><div className="text-xs text-black/30 uppercase tracking-widest mb-2">Email</div><E field="contact.email" editable={editable} className="text-sm font-medium">{contact.email}</E></div>}
          {contact?.phone && <div className="text-center p-6 rounded-2xl border border-black/5"><div className="text-2xl mb-3">📞</div><div className="text-xs text-black/30 uppercase tracking-widest mb-2">Téléphone</div><E field="contact.phone" editable={editable} className="text-sm font-medium">{contact.phone}</E></div>}
          {contact?.address && <div className="text-center p-6 rounded-2xl border border-black/5"><div className="text-2xl mb-3">📍</div><div className="text-xs text-black/30 uppercase tracking-widest mb-2">Adresse</div><E field="contact.address" editable={editable} className="text-sm font-medium">{contact.address}</E></div>}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-black/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold" style={{ color: p }}>{name}</span>
          <div className="flex gap-6 text-xs text-black/30"><a href="#services">Services</a><a href="#about">À propos</a><a href="#contact">Contact</a></div>
          <span className="text-[10px] text-black/20">Propulsé par Nova OS</span>
        </div>
      </footer>
    </div>
  )
}
