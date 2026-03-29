let handler = async (m, { conn, usedPrefix, command }) => {

  if (!m.isGroup) {
    return m.reply('𐄹 ۪ ׁ ⚠️ᩚ̼ 𖹭̫ ▎Este comando solo funciona en grupos')
  }

  try {
    // 🔒 Resetear enlace
    await conn.groupRevokeInvite(m.chat)

    // 🔗 Obtener nuevo link
    const code = await conn.groupInviteCode(m.chat)
    const link = `https://chat.whatsapp.com/${code}`

    const teks = `ㅤ₊💤᪲ㅤㅤ⵰  El enlace del grupo ha sido restablecido:\n\n` +
      `𐚁 ֹ ִ \`NEW GROUP LINK\` ! ୧ ֹ ִ🔗\n` +
      `🐢 \`Solicitado por :\` @${m.sender.split('@')[0]}\n\n` +
      `🦭 \`Enlace :\` ${link}`

    await m.react('🕒')

    await conn.sendMessage(m.chat, {
      text: teks,
      mentions: [m.sender]
    }, { quoted: m })

    await m.react('✔️')

  } catch (e) {
    console.error(e)

    await m.react('✖️')

    await m.reply(
      `❌ Error al ejecutar *${usedPrefix + command}*\n\n` +
      `🧾 ${e.message}`
    )
  }
}

handler.help = ['revoke', 'restablecer']
handler.tags = ['grupo']
handler.command = ['revoke', 'restablecer']

// 🔥 IMPORTANTE
handler.botAdmin = true

export default handler