let handler = async (m, { conn }) => {

  // ✅ FIX DB
  global.db = global.db || {}
  global.db.data = global.db.data || {}
  global.db.data.users = global.db.data.users || {}
  global.db.data.chats = global.db.data.chats || {}

  const mentioned = m.mentionedJid || []
  const userId = mentioned[0] || (m.quoted ? m.quoted.sender : m.sender)

  const chat = global.db.data.chats[m.chat] || {}
  const chatUsers = chat.users || {}
  const globalUsers = global.db.data.users || {}

  const user = chatUsers[userId] || {}
  const user2 = globalUsers[userId] || {}

  if (!user2) {
    return m.reply('✎ El usuario no está registrado')
  }

  const botId = conn.user.jid
  const settings = global.db.data.settings?.[botId] || {}
  const currency = settings.currency || 'Coins'

  const name = user2.name || 'Sin nombre'
  const genero = user2.genre || 'Oculto'
  const desc = user2.description || 'Sin descripción'
  const pasatiempo = user2.pasatiempo || 'No definido'

  const pareja = user2.marry && globalUsers[user2.marry]
    ? globalUsers[user2.marry].name
    : 'Nadie'

  const estadoCivil =
    genero === 'Mujer' ? 'Casada con'
    : genero === 'Hombre' ? 'Casado con'
    : 'Casadx con'

  const exp = user2.exp || 0
  const nivel = user2.level || 0

  const coins = user.coins || 0
  const bank = user.bank || 0
  const totalCoins = coins + bank

  // 📈 RANK
  const users = Object.entries(globalUsers)
    .map(([jid, data]) => ({ ...data, jid }))

  const sorted = users.sort((a, b) => (b.level || 0) - (a.level || 0))
  const rank = sorted.findIndex(u => u.jid === userId) + 1

  // 🖼️ FOTO
  const perfil = await conn.profilePictureUrl(userId, 'image')
    .catch(() => 'https://cdn.yuki-wabot.my.id/files/2PVh.jpeg')

  // 🧾 TEXTO
  let txt = `
╭───〔 👤 PERFIL 〕───⬣
│
│ 🧑 Nombre: ${name}
│ ⚥ Género: ${genero}
│ 💬 Desc: ${desc}
│ 🎯 Pasatiempo: ${pasatiempo}
│ 💞 ${estadoCivil}: ${pareja}
│
│ 📊 Nivel: ${nivel}
│ ✨ XP: ${exp}
│ 🏆 Rank: #${rank}
│
│ 💰 ${currency}: ${totalCoins}
│
╰──────────────⬣
`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: perfil },
    caption: txt,
    mentions: [userId]
  }, { quoted: m })
}

handler.help = ['profile', 'perfil']
handler.tags = ['rpg']
handler.command = ['profile', 'perfil']

export default handlerlet handler = async (m, { conn }) => {

  // ✅ FIX DB
  global.db = global.db || {}
  global.db.data = global.db.data || {}
  global.db.data.users = global.db.data.users || {}
  global.db.data.chats = global.db.data.chats || {}

  const mentioned = m.mentionedJid || []
  const userId = mentioned[0] || (m.quoted ? m.quoted.sender : m.sender)

  const chat = global.db.data.chats[m.chat] || {}
  const chatUsers = chat.users || {}
  const globalUsers = global.db.data.users || {}

  const user = chatUsers[userId] || {}
  const user2 = globalUsers[userId] || {}

  if (!user2) {
    return m.reply('✎ El usuario no está registrado')
  }

  const botId = conn.user.jid
  const settings = global.db.data.settings?.[botId] || {}
  const currency = settings.currency || 'Coins'

  const name = user2.name || 'Sin nombre'
  const genero = user2.genre || 'Oculto'
  const desc = user2.description || 'Sin descripción'
  const pasatiempo = user2.pasatiempo || 'No definido'

  const pareja = user2.marry && globalUsers[user2.marry]
    ? globalUsers[user2.marry].name
    : 'Nadie'

  const estadoCivil =
    genero === 'Mujer' ? 'Casada con'
    : genero === 'Hombre' ? 'Casado con'
    : 'Casadx con'

  const exp = user2.exp || 0
  const nivel = user2.level || 0

  const coins = user.coins || 0
  const bank = user.bank || 0
  const totalCoins = coins + bank

  // 📈 RANK
  const users = Object.entries(globalUsers)
    .map(([jid, data]) => ({ ...data, jid }))

  const sorted = users.sort((a, b) => (b.level || 0) - (a.level || 0))
  const rank = sorted.findIndex(u => u.jid === userId) + 1

  // 🖼️ FOTO
  const perfil = await conn.profilePictureUrl(userId, 'image')
    .catch(() => 'https://cdn.yuki-wabot.my.id/files/2PVh.jpeg')

  // 🧾 TEXTO
  let txt = `
╭───〔 👤 PERFIL 〕───⬣
│
│ 🧑 Nombre: ${name}
│ ⚥ Género: ${genero}
│ 💬 Desc: ${desc}
│ 🎯 Pasatiempo: ${pasatiempo}
│ 💞 ${estadoCivil}: ${pareja}
│
│ 📊 Nivel: ${nivel}
│ ✨ XP: ${exp}
│ 🏆 Rank: #${rank}
│
│ 💰 ${currency}: ${totalCoins}
│
╰──────────────⬣
`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: perfil },
    caption: txt,
    mentions: [userId]
  }, { quoted: m })
}

handler.help = ['profile', 'perfil']
handler.tags = ['rpg']
handler.command = ['profile', 'perfil']

export default handler