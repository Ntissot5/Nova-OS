export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { sector } = req.body
  if (!sector || sector.trim().length < 2) return res.status(400).json({ error: 'Sector is required' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' })

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
        max_tokens: 600,
        messages: [{
          role: 'user',
          content: `Tu es un expert en automatisation IA pour PME. L'utilisateur dit : "${sector}".

Génère exactement 3 agents IA personnalisés pour ce secteur. Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks :
[
  {"name": "Nom court", "desc": "1 phrase de ce que fait l'agent", "type": "sales|support|ops"},
  {"name": "Nom court", "desc": "1 phrase de ce que fait l'agent", "type": "sales|support|ops"},
  {"name": "Nom court", "desc": "1 phrase de ce que fait l'agent", "type": "sales|support|ops"}
]`
        }],
      }),
    })

    const data = await response.json()
    if (!response.ok) return res.status(500).json({ error: data.error?.message || 'API error' })

    const text = data.content?.[0]?.text || '[]'
    const agents = JSON.parse(text)
    return res.status(200).json({ agents })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
