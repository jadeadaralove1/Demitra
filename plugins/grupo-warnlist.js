import { database } from '../lib/database.js'

const handler = async (m, { conn }) => {
    const groupId = m.chat
    const warns = database.data.groups?.[groupId]?.warnings || {}
    const entries = Object.entries(warns).filter(([, v]) => v.count > 0)

    if (!entries.length) {
        return m.reply('Nadie tiene advertencias todavía ¡Qué grupo más bueno! ')
    }

    const mentions = entries.map(([uid]) => uid)
    let text = `*Lista de Advertencias*\n\n`

    for (const [uid, data] of entries) {
        text += `@${uid.split('@')[0]}*${data.count}/3*\n`
        text += `   ${data.reasons[data.reasons.length - 1]}\n\n`
    }

    await conn.sendMessage(m.chat, { text, mentions }, { quoted: m })
    await m.react('🐢')
}

handler.help = ['advertencias']
handler.tags = ['grupo']
handler.command = ['advertencias', 'warnlist']
handler.group = true
handler.admin = true

export default handler