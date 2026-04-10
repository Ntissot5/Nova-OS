export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' })
  const { instruction, html } = req.body
  if (!instruction?.trim() || !html) return res.status(400).json({ success: false, error: 'Instruction and html required' })
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ success: false, error: 'API key not configured' })

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8000,
        messages: [{ role: 'user', content: `Tu es un expert en modification de sites web. Voici le code HTML actuel d'un site :

${html}

L'utilisateur demande : "${instruction}"

RÈGLES :
1. Applique EXACTEMENT la modification demandée
2. Retourne le code HTML COMPLET modifié (<!DOCTYPE html> ... </html>)
3. Ne retourne RIEN d'autre que le HTML — pas de backticks, pas d'explication, pas de markdown
4. Garde tout le reste du site intact — ne modifie QUE ce qui est demandé
5. Si on demande de changer une couleur, change-la partout où elle apparaît (texte, boutons, backgrounds, etc.)
6. Si on demande de changer une image, utilise une URL Unsplash réelle pertinente
7. Si on demande de changer la police, mets à jour le Google Fonts link ET les classes CSS
8. Si on demande d'ajouter une section, insère-la au bon endroit dans le flow du site` }],
      }),
    })
    const data = await response.json()
    if (!response.ok) return res.status(500).json({ success: false, error: data.error?.message || 'API error' })

    let result = data.content?.[0]?.text || ''
    result = result.replace(/^```html\n?/i, '').replace(/\n?```$/i, '').trim()
    if (!result.startsWith('<!')) {
      const idx = result.indexOf('<!')
      if (idx > -1) result = result.substring(idx)
    }

    return res.status(200).json({ success: true, data: { html: result } })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}
