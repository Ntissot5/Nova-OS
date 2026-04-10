import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { businessId, message, history } = req.body
  if (!businessId || !message) return res.status(400).json({ error: 'businessId and message required' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' })

  try {
    // Get business context
    const { data: biz } = await supabase.from('businesses').select('name, description, site_config').eq('id', businessId).single()
    if (!biz) return res.status(404).json({ error: 'Business not found' })

    const services = biz.site_config?.services?.map(s => `${s.name}: ${s.description} (${s.price})`).join('\n') || ''
    const contact = biz.site_config?.contact || {}

    const systemPrompt = `Tu es l'assistant virtuel de "${biz.name}". Tu réponds aux questions des clients de manière professionnelle, chaleureuse et concise en français.

Contexte sur l'entreprise :
- Nom : ${biz.name}
- Description : ${biz.description || ''}
- Services :
${services}
- Contact : ${contact.email || ''} / ${contact.phone || ''} / ${contact.address || ''}

Règles :
- Réponses courtes (2-3 phrases max)
- Si tu ne connais pas la réponse, propose de contacter l'entreprise directement
- Ne mens jamais sur les services ou les prix
- Reste dans le contexte de cette entreprise`

    const messages = (history || []).map(m => ({ role: m.role, content: m.content }))
    messages.push({ role: 'user', content: message })

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 300, system: systemPrompt, messages }),
    })
    const data = await response.json()
    const reply = data.content?.[0]?.text || 'Désolé, je ne peux pas répondre pour le moment.'

    // Log the action
    const { data: agent } = await supabase.from('agents').select('id').eq('business_id', businessId).eq('type', 'support').limit(1).single()
    if (agent) {
      await supabase.from('agent_logs').insert({
        agent_id: agent.id, business_id: businessId,
        action: `Client : "${message.slice(0, 80)}" → Répondu`, result: reply.slice(0, 200), type: 'support',
      })
      await supabase.from('agents').update({ last_run: new Date().toISOString(), tasks_this_month: agent.tasks_this_month + 1 }).eq('id', agent.id)
    }

    return res.status(200).json({ reply })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
