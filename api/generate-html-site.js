const SECTOR_QUERIES = {
  'Restaurant': ['restaurant interior design', 'fine dining', 'chef cooking', 'restaurant food plating', 'restaurant terrace', 'wine glass dinner', 'cozy restaurant', 'restaurant kitchen'],
  'Cabinet médical': ['modern dental clinic', 'medical office interior', 'doctor consultation', 'dental chair', 'medical team portrait', 'healthcare technology', 'clean medical room', 'patient care'],
  'Agence immobilière': ['luxury apartment interior', 'modern house exterior', 'real estate living room', 'penthouse view', 'property balcony', 'house keys handover', 'modern kitchen design', 'real estate office'],
  'Commerce retail': ['retail store interior', 'boutique shop display', 'shopping experience', 'product shelf design', 'modern store front', 'customer shopping', 'retail checkout', 'fashion boutique'],
  'Agence marketing': ['creative office space', 'marketing team meeting', 'digital strategy whiteboard', 'modern workspace laptop', 'creative brainstorming', 'social media marketing', 'brand design', 'startup office'],
  'Salon / Spa': ['luxury spa interior', 'massage therapy', 'hair salon modern', 'beauty treatment facial', 'nail salon design', 'spa candles relaxation', 'wellness center', 'beauty products display'],
  'Coach / Formation': ['fitness coaching session', 'personal trainer gym', 'yoga class studio', 'pilates reformer', 'wellness coaching', 'group fitness class', 'sport training outdoor', 'meditation session'],
}

function detectSector(description) {
  const lower = description.toLowerCase()
  if (lower.includes('restaurant') || lower.includes('café') || lower.includes('brasserie') || lower.includes('traiteur')) return 'Restaurant'
  if (lower.includes('dentist') || lower.includes('médecin') || lower.includes('cabinet') || lower.includes('clinique') || lower.includes('dentaire')) return 'Cabinet médical'
  if (lower.includes('immobili') || lower.includes('agence')) return 'Agence immobilière'
  if (lower.includes('boutique') || lower.includes('magasin') || lower.includes('commerce') || lower.includes('shop')) return 'Commerce retail'
  if (lower.includes('marketing') || lower.includes('agence') || lower.includes('digital')) return 'Agence marketing'
  if (lower.includes('salon') || lower.includes('coiffur') || lower.includes('spa') || lower.includes('beauté') || lower.includes('esthéti')) return 'Salon / Spa'
  if (lower.includes('coach') || lower.includes('fitness') || lower.includes('yoga') || lower.includes('pilates') || lower.includes('sport') || lower.includes('formation')) return 'Coach / Formation'
  return null
}

async function fetchUnsplashImages(queries, count = 8) {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) return null

  const images = []
  const perQuery = Math.ceil(count / queries.length)

  for (const query of queries.slice(0, count)) {
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perQuery}&orientation=landscape`, {
        headers: { Authorization: `Client-ID ${key}` },
      })
      const data = await res.json()
      if (data.results) {
        for (const photo of data.results.slice(0, perQuery)) {
          images.push({
            url: photo.urls?.regular || photo.urls?.small,
            alt: photo.alt_description || query,
            credit: photo.user?.name || '',
          })
        }
      }
    } catch {}
    if (images.length >= count) break
  }

  return images.slice(0, count)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' })
  const { description, template, colors, tone } = req.body
  if (!description?.trim()) return res.status(400).json({ success: false, error: 'Description required' })
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ success: false, error: 'API key not configured' })

  const colorHex = colors || {}
  const primary = colorHex.primary || '#1a1a2e'
  const accent = colorHex.accent || '#e94560'
  const secondary = colorHex.secondary || '#f5f5f5'

  // Fetch real Unsplash images
  const sector = detectSector(description)
  const queries = sector ? SECTOR_QUERIES[sector] : ['professional business', 'modern office', 'team meeting', 'workspace design', 'customer service', 'business handshake', 'modern interior', 'professional portrait']
  const images = await fetchUnsplashImages(queries)

  let imageBlock = ''
  if (images && images.length > 0) {
    imageBlock = `
IMAGES UNSPLASH À UTILISER (URLs réelles haute qualité) :
${images.map((img, i) => `Image ${i + 1}: ${img.url} (${img.alt}) — crédit: ${img.credit}`).join('\n')}

PLACEMENT DES IMAGES :
- Image 1 : Hero background (pleine largeur, avec overlay gradient)
- Image 2 : Section À propos (côté droit, rounded-2xl)
- Images 3-5 : Section Services (une par service, rounded-xl)
- Images 6-8 : Section Galerie (grille 3 colonnes, rounded-xl, hover scale)

IMPORTANT : Utilise ces URLs EXACTES. Ne les modifie pas. Ne les invente pas.`
  } else {
    imageBlock = `
IMAGES : Utilise ces URLs Unsplash qui fonctionnent :
- Hero : https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80
- About : https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80
- Service 1 : https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80
- Service 2 : https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80
- Service 3 : https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80`
  }

  const templateGuide = template === 'bold'
    ? `STYLE : Fond sombre (#0a0a0a), texte blanc, accent vif (${accent}). Gros titres bold, sections avec beaucoup de padding, cards avec bordures subtiles rgba(255,255,255,0.06). Feeling : startup tech, Vercel, Linear.`
    : template === 'elegant'
    ? `STYLE : Fond crème (#faf9f6), typographie serif (Playfair Display pour les titres, Inter pour le body), accent doré/chaud (${accent}). Beaucoup d'espace blanc, séparateurs fins, feeling luxe/premium.`
    : `STYLE : Fond blanc pur (#ffffff), typographie Inter clean, accent couleur (${accent}), ombres douces. Cards avec rounded-2xl et border subtile. Hero avec image pleine largeur et overlay gradient. Feeling : Apple, Stripe, moderne et premium.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        messages: [{ role: 'user', content: `Tu es un designer web d'élite. Génère le code HTML complet d'un site one-page EXCEPTIONNEL.

BUSINESS : "${description}"
${templateGuide}
Couleur primaire : ${primary}
Couleur accent : ${accent}
${tone ? `Ton : ${tone}` : ''}

${imageBlock}

ARCHITECTURE DU SITE :

1. NAVIGATION — sticky, backdrop-blur, logo + liens + CTA button accent rounded-full. Mobile hamburger.

2. HERO (80vh minimum, SPECTACULAIRE)
   - Image 1 en background, overlay gradient primary → transparent
   - Badge en haut : ex "Depuis 2015 à Genève"
   - H1 très grand (text-5xl md:text-7xl font-black)
   - Sous-titre (text-lg, opacity réduite)
   - 2 boutons : CTA accent + secondaire outline

3. STATS — 4 chiffres : années, clients, note Google, temps de réponse. text-4xl font-black accent.

4. SERVICES (3 cards) — chacune avec image, titre, description détaillée (2-3 phrases), prix en CHF. Cards avec hover shadow.

5. GALERIE PHOTOS — titre + grille de 3-6 photos avec rounded-xl et hover:scale-105.

6. À PROPOS — 2 colonnes : texte riche (5-6 phrases) + image rounded-2xl shadow.

7. TÉMOIGNAGES (3 cards) — étoiles ★★★★★, citation italique entre guillemets, nom + rôle.

8. FAQ (3-4 questions) — question bold, réponse claire, séparées par bordures.

9. CTA — grande section fond gradient primary → accent. Titre blanc, bouton blanc.

10. CONTACT — 3 colonnes : ✉️ Email, 📞 Téléphone, 📍 Adresse (réalistes Suisse).

11. FOOTER — nom + slogan + liens + "Propulsé par Nova OS" + copyright.

RÈGLES :
- Retourne UNIQUEMENT le HTML (<!DOCTYPE html> ... </html>). RIEN d'autre.
- <script src="https://cdn.tailwindcss.com"></script>
- Google Fonts (Inter + une display font)
- Configure tailwind theme avec les fonts
- Responsive mobile-first
- Minimum 400 lignes
- AUCUN placeholder, textes réalistes et complets
- Bouton chat fixe bas droite (rond, accent, 💬, shadow-lg)` }],
      }),
    })
    const data = await response.json()
    if (!response.ok) return res.status(500).json({ success: false, error: data.error?.message || 'API error' })

    let html = data.content?.[0]?.text || ''
    html = html.replace(/^```html\n?/i, '').replace(/\n?```$/i, '').trim()
    if (!html.startsWith('<!')) { const idx = html.indexOf('<!'); if (idx > -1) html = html.substring(idx) }

    return res.status(200).json({ success: true, data: { html, images } })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}
