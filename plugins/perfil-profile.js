let handler = async (m, { conn }) => {
  // ✅ FIX DB
  global.db = global.db || {}
  global.db.data = global.db.data || {}
  global.db.data.users = global.db.data.users || {}

  const mentioned = m.mentionedJid || []
  const userId = mentioned[0] || (m.quoted ? m.quoted.sender : m.sender)

  const globalUsers = global.db.data.users

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

  // Esto **toma directamente lo que ya estaba guardado**
  const user = globalUsers[userId]

  const botId = conn.user.jid
  const settings = global.db.data.settings?.[botId] || {}
  const currency = settings.currency || 'Coins'

  const name = user.name
  const genero = user.genre
  const desc = user.description
  const pasatiempo = user.pasatiempo
  const pareja = user.marry && globalUsers[user.marry] ? globalUsers[user.marry].name : 'Nadie'

  const estadoCivil =
    genero === 'Mujer' ? 'Casada con'
    : genero === 'Hombre' ? 'Casado con'
    : 'Casadx con'

  const exp = user.exp
  const nivel = user.level
  const coins = user.coins
  const bank = user.bank
  const totalCoins = coins + bank

  // 📈 RANK
  const users = Object.entries(globalUsers).map(([jid, data]) => ({ ...data, jid }))
  const sorted = users.sort((a, b) => (b.level || 0) - (a.level || 0))
  const rank = sorted.findIndex(u => u.jid === userId) + 1

  // 🖼️ FOTO
  const perfil = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://cdn.yuki-wabot.my.id/files/2PVh.jpeg')

  // 🧾 TEXTO
  let txt = `
╭───〔 👤 PERFIL 〕───⬣
│
│ 🧑 Nombre: ${name}
│ ⚥ Género: ${genero}
│ 💬 Desc: ${desc || 'Sin descripción'}
│ 🎯 Pasatiempo: ${pasatiempo || 'No definido'}
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

handler.help = ['perfil']
handler.tags = ['rpg']
handler.command = ['perfil', 'profile']

export default handler