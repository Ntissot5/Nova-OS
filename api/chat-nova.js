export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { messages } = req.body
  if (!messages?.length) return res.status(400).json({ error: 'Messages required' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' })

  const systemPrompt = `Tu es Nova, l'assistant IA de Nova OS — la plateforme d'automatisation IA pour les PME européennes basée à Zurich.

Ton rôle : répondre aux questions des visiteurs sur Nova OS de manière concise, enthousiaste et professionnelle. Tu parles français.

Ce que fait Nova OS :
- Automatise les ventes (qualification de leads, relances, CRM)
- Automatise le support client (réponses auto, tri, escalade)
- Automatise les opérations (factures, stock, planning)
- RGPD natif, données en Europe
- 3 plans : Découverte (gratuit), Business (99€/mois), Sur mesure

Règles :
- Réponses courtes (2-4 phrases max)
- Enthousiaste mais pas forcé
- Si on te demande des choses hors sujet, ramène la conversation vers Nova OS poliment
- Ne mens jamais sur les capacités du produit`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: systemPrompt,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
      }),
    })
    const data = await response.json()
    if (!response.ok) return res.status(500).json({ error: data.error?.message || 'API error' })
    return res.status(200).json({ reply: data.content?.[0]?.text || '' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
