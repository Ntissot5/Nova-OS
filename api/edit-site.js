export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' })
  const { message, siteConfig } = req.body
  if (!message?.trim() || !siteConfig) return res.status(400).json({ success: false, error: 'Message and siteConfig required' })
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ success: false, error: 'API key not configured' })

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: `Tu es un assistant qui modifie des sites web. Voici le site actuel en JSON :

${JSON.stringify(siteConfig, null, 2)}

L'utilisateur demande : "${message}"

Applique la modification demandée et retourne le JSON complet mis à jour. Retourne UNIQUEMENT le JSON valide, sans markdown, sans backticks, sans explication. Garde la même structure exacte, modifie seulement ce qui est demandé.` }],
      }),
    })
    const data = await response.json()
    if (!response.ok) return res.status(500).json({ success: false, error: data.error?.message || 'API error' })
    const updated = JSON.parse(data.content?.[0]?.text || '{}')
    return res.status(200).json({ success: true, data: updated })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}
