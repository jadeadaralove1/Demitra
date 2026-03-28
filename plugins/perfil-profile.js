let handler = async (m, { conn }) => {
  // ✅ Asegurarnos de que la base de datos exista
  global.db = global.db || {}
  global.db.data = global.db.data || {}
  global.db.data.users = global.db.data.users || {}

  const mentioned = m.mentionedJid || []
  const userId = mentioned[0] || (m.quoted ? m.quoted.sender : m.sender)
  const globalUsers = global.db.data.users || {}

  // Inicializar usuario si no existe
  if (!globalUsers[userId]) {
    globalUsers[userId] = {
      name: 'Sin nombre',
      genre: 'Oculto',
      description: '',
      pasatiempo: 'No definido',
      level: 0,
      exp: 0,
      coins: 0,
      bank: 0,
      marry: null
    }
  }

  const user = globalUsers[userId]

  // Inicializar campos si no existen
  user.name = user.name || 'Sin nombre'
  user.genre = user.genre || 'Oculto'
  user.description = user.description || 'Sin descripción'
  user.pasatiempo = user.pasatiempo || 'No definido'
  user.level = user.level || 0
  user.exp = user.exp || 0
  user.coins = user.coins || 0
  user.bank = user.bank || 0
  user.marry = user.marry || null

  const botId = conn.user.jid
  const settings = global.db.data.settings?.[botId] || {}
  const currency = settings.currency || 'Coins'

  const pareja = user.marry && globalUsers[user.marry]
    ? globalUsers[user.marry].name
    : 'Nadie'

  const estadoCivil =
    user.genre === 'Mujer' ? 'Casada con'
    : user.genre === 'Hombre' ? 'Casado con'
    : 'Casadx con'

  // 📈 Rank
  const users = Object.entries(globalUsers).map(([jid, data]) => ({ ...data, jid }))
  const sorted = users.sort((a, b) => (b.level || 0) - (a.level || 0))
  const rank = sorted.findIndex(u => u.jid === userId) + 1

  // 🖼️ Foto de perfil
  const perfil = await conn.profilePictureUrl(userId, 'image')
    .catch(() => 'https://cdn.yuki-wabot.my.id/files/2PVh.jpeg')

  // 🧾 Texto del perfil
  const txt = `
╭───〔 👤 PERFIL 〕───⬣
│
│ 🧑 Nombre: ${user.name}
│ ⚥ Género: ${user.genre}
│ 💬 Desc: ${user.description}
│ 🎯 Pasatiempo: ${user.pasatiempo}
│ 💞 ${estadoCivil}: ${pareja}
│
│ 📊 Nivel: ${user.level}
│ ✨ XP: ${user.exp}
│ 🏆 Rank: #${rank}
│
│ 💰 ${currency}: ${user.coins + user.bank}
│
╰──────────────⬣
`.trim()

  // ✅ Enviar mensaje con mención
  await conn.sendMessage(m.chat, {
    image: { url: perfil },
    caption: txt,
    mentions: [userId]
  }, { quoted: m })
}

handler.help = ['perfil']
handler.tags = ['rpg']
handler.command = ['perfil', 'profile']

export default handler