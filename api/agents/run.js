import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

const AGENT_PROMPTS = {
  support: 'Tu es un agent support client. Génère 1 action réaliste que tu viens d\'effectuer pour ce business. Ex: répondre à un client, résoudre un ticket. Réponds en JSON: {"action":"description courte","result":"résultat"}',
  sales: 'Tu es un agent commercial. Génère 1 action réaliste : qualifier un lead, envoyer une relance, etc. JSON: {"action":"description","result":"résultat"}',
  marketing: 'Tu es un agent marketing. Génère 1 action : publier un post, créer du contenu, etc. JSON: {"action":"description","result":"résultat"}',
  email: 'Tu es un agent email. Génère 1 action : trier un email, répondre, planifier un suivi. JSON: {"action":"description","result":"résultat"}',
  reports: 'Tu es un agent rapports. Génère 1 action : compiler des stats, envoyer un rapport. JSON: {"action":"description","result":"résultat"}',
  ecommerce: 'Tu es un agent e-commerce. Génère 1 action : traiter une commande, vérifier le stock. JSON: {"action":"description","result":"résultat"}',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' })

  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ success: false, error: 'No API key' })

  try {
    // Get all active agents
    const { data: agents, error: agentsErr } = await supabase
      .from('agents').select('*, businesses(name, description)').eq('status', 'active')
    if (agentsErr) throw agentsErr

    let ran = 0
    for (const agent of (agents || [])) {
      const bizDesc = agent.businesses?.description || agent.businesses?.name || 'business'
      const prompt = AGENT_PROMPTS[agent.type]
      if (!prompt) continue

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 200,
          messages: [{ role: 'user', content: `Business: "${bizDesc}". ${prompt}` }],
        }),
      })
      const data = await response.json()
      const text = data.content?.[0]?.text || '{}'
      const result = JSON.parse(text)

      // Log the action
      await supabase.from('agent_logs').insert({
        agent_id: agent.id,
        business_id: agent.business_id,
        action: result.action || 'Action exécutée',
        result: result.result || 'OK',
        type: agent.type,
      })

      // Update agent
      await supabase.from('agents').update({
        last_run: new Date().toISOString(),
        tasks_this_month: (agent.tasks_this_month || 0) + 1,
      }).eq('id', agent.id)

      ran++
    }

    return res.status(200).json({ success: true, data: { agents_ran: ran } })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}
