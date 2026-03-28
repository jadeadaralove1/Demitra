let handler = async (m, { conn, args, usedPrefix, command }) => {
  // ✅ Inicializar DB de chat y usuario si no existe
  global.db = global.db || {}
  global.db.data = global.db.data || {}
  global.db.data.chats = global.db.data.chats || {}
  global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {}
  const chatUsers = global.db.data.chats[m.chat].users ||= {}
  const userData = chatUsers[m.sender] ||= {}

  // Guardar estado AFK
  userData.afk = Date.now()
  userData.afkReason = args.join(' ') || 'Sin especificar!'

  const nombre = global.db.data.users[m.sender]?.name || 'Usuario'
  const motivo = userData.afkReason

  await conn.sendMessage(m.chat, {
    text: `🪄  ❚ ❘ El Usuario *${nombre}* estará AFK.\n> ⭐⃞░ Motivo » *${motivo}*`
  }, { quoted: m })
}

handler.help = ['afk']
handler.tags = ['fun']
handler.command = ['afk']

export default handler