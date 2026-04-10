export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' })
  const { description, template, colors, tone } = req.body
  if (!description?.trim()) return res.status(400).json({ success: false, error: 'Description required' })
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ success: false, error: 'API key not configured' })

  const colorStyle = colors ? `Couleurs principales : ${colors.primary}, accent : ${colors.accent}, secondaire : ${colors.secondary}.` : ''
  const toneStyle = tone ? `Ton : ${tone}.` : ''
  const templateStyle = template === 'bold' ? 'Design sombre, fond noir, typographie impactante.' : template === 'elegant' ? 'Design élégant, typographie serif, tons chauds, luxueux.' : 'Design moderne, fond blanc, clean et aéré.'

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: `Tu es un expert en création de sites web. Génère un site web COMPLET en une seule page HTML avec CSS inline et Tailwind CDN.

Business : "${description}"
${templateStyle}
${colorStyle}
${toneStyle}

RÈGLES STRICTES :
1. Retourne UNIQUEMENT le code HTML complet (<!DOCTYPE html> ... </html>), RIEN d'autre
2. Utilise le CDN Tailwind : <script src="https://cdn.tailwindcss.com"></script>
3. Utilise des images Unsplash pertinentes au secteur : https://images.unsplash.com/photo-[ID]?w=1200&q=80
4. Le site doit avoir ces sections : Navigation, Hero avec image de fond, Stats (3-4 chiffres), Services (3 avec prix en CHF), À propos, Témoignages (3 avis), FAQ (3 questions), Call-to-action, Contact (email, tel, adresse inventés mais réalistes pour la Suisse), Footer
5. Design PROFESSIONNEL niveau agence — pas un template basique
6. Typographie Google Fonts (pas juste sans-serif)
7. Responsive mobile-first
8. Pas de JavaScript sauf Tailwind
9. Le site doit faire au minimum 200 lignes
10. Ajoute un chat widget fixe en bas à droite (juste le bouton rond, pas fonctionnel)
11. Ajoute dans le footer "Propulsé par Nova OS"
12. Les textes doivent être réalistes et complets, pas des placeholders` }],
      }),
    })
    const data = await response.json()
    if (!response.ok) return res.status(500).json({ success: false, error: data.error?.message || 'API error' })

    let html = data.content?.[0]?.text || ''
    // Clean up markdown if Claude wraps it
    html = html.replace(/^```html\n?/i, '').replace(/\n?```$/i, '').trim()

    return res.status(200).json({ success: true, data: { html } })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}
