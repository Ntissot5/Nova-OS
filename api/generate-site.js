export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' })
  const { description } = req.body
  if (!description?.trim()) return res.status(400).json({ success: false, error: 'Description required' })
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ success: false, error: 'API key not configured' })

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1200,
        messages: [{ role: 'user', content: `Tu es un expert en création de sites web pour PME. Le client dit : "${description}"

Génère un site web complet en JSON. Réponds UNIQUEMENT en JSON valide, sans markdown ni backticks :
{
  "name": "Nom du business",
  "slogan": "Slogan accrocheur (max 8 mots)",
  "colors": { "primary": "#hex", "secondary": "#hex", "accent": "#hex" },
  "pages": ["Accueil", "Services", "À propos", "Contact", "Blog"],
  "hero": { "title": "Titre principal du site", "subtitle": "Sous-titre explicatif (1 phrase)", "cta": "Texte du bouton CTA" },
  "services": [
    { "name": "Service 1", "description": "Description courte", "price": "Dès XXX CHF" },
    { "name": "Service 2", "description": "Description courte", "price": "Dès XXX CHF" },
    { "name": "Service 3", "description": "Description courte", "price": "Dès XXX CHF" }
  ],
  "about": { "text": "Paragraphe de présentation (3 phrases)" },
  "contact": { "email": "contact@example.com", "phone": "+41 XX XXX XX XX", "address": "Adresse plausible en Suisse" }
}

Les prix doivent être réalistes pour le secteur. Les couleurs doivent correspondre au secteur.` }],
      }),
    })
    const data = await response.json()
    if (!response.ok) return res.status(500).json({ success: false, error: data.error?.message || 'API error' })
    const site = JSON.parse(data.content?.[0]?.text || '{}')
    return res.status(200).json({ success: true, data: site })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}
