import speed from 'performance-now'
import { exec } from 'child_process'

export default {
  command: ['ping', 'p'],
  category: 'info',
  run: async (client, m) => {
    const start = speed()

    const sent = await client.sendMessage(
      m.chat,
      {
        text: `❏ ¡Pong!\n> *${global.db.data.settings[client.user.id.split(':')[0] + "@s.whatsapp.net"].namebot}*`
      },
      { quoted: m }
    )

    const latency = (speed() - start).toFixed(4).split('.')[0]

    exec('neofetch --stdout', (error, stdout) => {
      let systemInfo = stdout.toString('utf-8').replace(/Memory:/, 'Ram:')

      client.sendMessage(
        m.chat,
        {
          text: `⭐⃞░  *Pong!* (꜆˶ᵔᵕᵔ˶)꜆
> Tiempo ⌛ ${latency}ms

${systemInfo}`,
          edit: sent.key
        },
        { quoted: m }
      )
    })
  },
}