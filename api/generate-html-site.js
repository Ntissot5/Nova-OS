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

  const templateGuide = template === 'bold'
    ? `STYLE : Fond sombre (#0a0a0a), texte blanc, accent vif (${accent}). Gros titres bold, sections avec beaucoup de padding, cards avec bordures subtiles rgba(255,255,255,0.06). Feeling : startup tech, Vercel, Linear.`
    : template === 'elegant'
    ? `STYLE : Fond crème (#faf9f6), typographie serif (Playfair Display pour les titres, Inter pour le body), accent doré/chaud (${accent}). Beaucoup d'espace blanc, séparateurs fins, feeling luxe/premium. Inspiration : hôtel 5 étoiles, cabinet d'avocat haut de gamme.`
    : `STYLE : Fond blanc pur (#ffffff), typographie Inter clean, accent couleur (${accent}), ombres douces. Cards avec rounded-2xl et border subtile. Hero avec image pleine largeur et overlay gradient. Feeling : Apple, Stripe, moderne et premium.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        messages: [{ role: 'user', content: `Tu es un designer web d'élite. Tu crées des sites qui rivalisent avec les meilleures agences suisses (50'000 CHF+). Génère le code HTML complet d'un site one-page EXCEPTIONNEL.

BUSINESS : "${description}"
${templateGuide}
Couleur primaire : ${primary}
Couleur accent : ${accent}
${tone ? `Ton de communication : ${tone}` : ''}

ARCHITECTURE DU SITE (dans cet ordre exact) :

1. NAVIGATION
   - Logo texte à gauche (nom du business, font-weight 800)
   - Liens : Services, À propos, Avis, Contact
   - Bouton CTA à droite avec la couleur accent, rounded-full
   - Sticky on scroll, backdrop-blur, border-bottom subtile
   - Mobile : hamburger menu

2. HERO (section la plus importante — doit être SPECTACULAIRE)
   - Image de fond Unsplash pertinente au secteur (cherche un ID réel)
   - Overlay gradient du primary vers transparent
   - Badge en haut : ex "Depuis 2015 à Genève" ou "Cabinet N°1 de la région"
   - Titre H1 très grand (text-5xl md:text-7xl), font-black, sur 2 lignes max
   - Sous-titre descriptif (text-lg, opacity réduite)
   - 2 boutons : CTA principal (accent, rounded-full, shadow-lg) + secondaire (outline blanc)
   - Le hero doit faire au moins 80vh

3. BANDE DE CONFIANCE
   - Fond légèrement différent
   - 4 stats en ligne : années d'expérience, nombre de clients, note Google, temps de réponse
   - Chiffres très grands (text-4xl font-black) avec la couleur accent
   - Labels petits en dessous

4. SERVICES (3 minimum)
   - Titre de section avec label accent en uppercase tracking-widest au-dessus
   - 3 cards en grid, chacune avec :
     * Icône emoji grande (text-3xl)
     * Nom du service (font-bold)
     * Description (2-3 phrases réalistes et détaillées)
     * Prix en CHF (réaliste pour la Suisse)
     * Petit lien "En savoir plus →"
   - Les cards ont des hover effects (shadow-lg, légère translation Y)

5. À PROPOS
   - Layout 2 colonnes : texte à gauche, image Unsplash à droite
   - Paragraphe riche (5-6 phrases) qui raconte l'histoire du business
   - Mention de valeurs, expérience, engagement qualité
   - Image avec rounded-2xl et shadow

6. TÉMOIGNAGES (3 minimum)
   - Cards avec étoiles jaunes (★★★★★)
   - Citation entre guillemets, texte en italique
   - Nom + rôle du client
   - Les cards ont un fond légèrement différent

7. FAQ (3-4 questions)
   - Questions en font-bold
   - Réponses en texte plus clair
   - Séparées par des bordures fines

8. CALL-TO-ACTION
   - Grande section avec fond gradient (primary → accent)
   - Titre blanc, gras, centré
   - Sous-titre
   - Gros bouton blanc avec texte accent

9. CONTACT
   - 3 colonnes : Email, Téléphone, Adresse
   - Chacune avec un emoji en haut (✉️ 📞 📍)
   - Informations réalistes pour la Suisse

10. FOOTER
    - Nom du business + slogan
    - Liens de navigation
    - "Propulsé par Nova OS"
    - Copyright 2024

RÈGLES TECHNIQUES :
- Retourne UNIQUEMENT le HTML (<!DOCTYPE html> ... </html>), AUCUN texte avant ou après, AUCUN backtick
- CDN Tailwind : <script src="https://cdn.tailwindcss.com"></script>
- Google Fonts via <link> dans le <head> (Inter + une font display comme Playfair Display ou DM Serif Display)
- Configure Tailwind dans un <script> pour ajouter les fonts custom au theme
- Images Unsplash avec des URLs RÉELLES qui fonctionnent : utilise ces IDs selon le secteur :
  * Dentiste/médical : photo-1629909613654-28e377c37b09, photo-1588776814546-1ffcf47267a5
  * Restaurant : photo-1517248135467-4c7edcad34c4, photo-1414235077428-338989a2e8c0
  * Immobilier : photo-1560518883-ce09059eeffa, photo-1600596542815-ffad4c1539a9
  * Sport/fitness : photo-1534438327276-14e5300c3a48, photo-1571019614242-c5c5dee9f50b
  * Coiffure/beauté : photo-1560066984-138dadb4c035, photo-1522337360788-8b13dee7a37e
  * Bureau/corporate : photo-1497366216548-37526070297c, photo-1497366811353-6870744d04b2
  * Pilates/yoga : photo-1518611012118-696072aa579a, photo-1544367567-0f2fcb009e0b
- Format URL : https://images.unsplash.com/photo-ID?w=1200&q=80
- Responsive : mobile-first, tout doit être beau sur mobile
- Minimum 350 lignes de HTML
- AUCUN placeholder, AUCUN "Lorem ipsum" — tous les textes sont réalistes et complets
- Bouton chat widget fixe en bas à droite (rond, couleur accent, emoji 💬, shadow-lg)` }],
      }),
    })
    const data = await response.json()
    if (!response.ok) return res.status(500).json({ success: false, error: data.error?.message || 'API error' })

    let html = data.content?.[0]?.text || ''
    html = html.replace(/^```html\n?/i, '').replace(/\n?```$/i, '').trim()
    if (!html.startsWith('<!')) html = html.substring(html.indexOf('<!'))

    return res.status(200).json({ success: true, data: { html } })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}
