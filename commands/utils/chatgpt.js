import axios from "axios";

export default {
  command: ['venice', 'ia', 'chatgpt'],
  category: 'ai',

  run: async (client, m, args) => {
    try {
      const text = args.join(' ') || (m.quoted && m.quoted.text)
      if (!text) return m.reply('🧠 Escribe algo.')

      await m.react('⏳')

      const { data } = await axios.post(
        "https://outerface.venice.ai/api/inference/chat",
        {
          requestId: "zico-bot",
          modelId: "dolphin-3.0-mistral-24b",
          prompt: [{ role: "user", content: text }],
          temperature: 0.7,
          topP: 0.9,
          webEnabled: true
        },
        {
          headers: {
            "content-type": "application/json",
            "origin": "https://venice.ai",
            "referer": "https://venice.ai/",
            "user-agent": "Mozilla/5.0"
          }
        }
      )

      // 🧠 procesar respuesta tipo streaming
      let result = ''

      try {
        const chunks = data
          .split('\n')
          .filter(x => x.trim() !== '')
          .map(x => JSON.parse(x))

        result = chunks.map(x => x.content || '').join('')
      } catch {
        result = typeof data === 'string' ? data : JSON.stringify(data)
      }

      if (!result) throw 'Sin respuesta'

      await client.sendMessage(m.chat, {
        text: `🐢 VChatgpt AI*\n\n${result.trim()}`
      }, { quoted: m })

      await m.react('✅')

    } catch (e) {
      console.error(e)

      await m.react('❌')
      m.reply('❌ Venice falló. Puede estar bloqueado o saturado.')
    }
  }
}