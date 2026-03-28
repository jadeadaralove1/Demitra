let handler = async (m, { conn }) => {
  global.db = global.db || {}
  global.db.data = global.db.data || {}
  global.db.data.users = global.db.data.users || {}

  const mentioned = m.mentionedJid || []
  const userId = mentioned[0] || (m.quoted ? m.quoted.sender : m.sender)

  const globalUsers = global.db.data.users || {}

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

  const botId = conn.user.jid
  const settings = global.db.data.settings?.[botId] || {}
  const currency = settings.currency || 'Coins'

  const pareja = user.marry && globalUsers[user.marry] ? globalUsers[user.marry].name : 'Nadie'
  const estadoCivil = user.genre === 'Mujer' ? 'Casada con' : user.genre === 'Hombre' ? 'Casado con' : 'Casadx con'

  // RANK
  const users = Object.entries(globalUsers).map(([jid,data]) => ({...data,jid}))
  const sorted = users.sort((a,b) => (b.level||0) - (a.level||0))
  const rank = sorted.findIndex(u=>u.jid===userId)+1

  // FOTO
  const perfilImg = await conn.profilePictureUrl(userId, 'image').catch(()=> 'https://cdn.yuki-wabot.my.id/files/2PVh.jpeg')

  const txt = `
╭───〔 👤 PERFIL 〕───⬣
│
│ 🧑 Nombre: ${user.name}
│ ⚥ Género: ${user.genre||'Oculto'}
│ 💬 Desc: ${user.description||'Sin descripción'}
│ 🎯 Pasatiempo: ${user.pasatiempo||'No definido'}
│ 💞 ${estadoCivil}: ${pareja}
│
│ 📊 Nivel: ${user.level||0}
│ ✨ XP: ${user.exp||0}
│ 🏆 Rank: #${rank}
│
│ 💰 ${currency}: ${(user.coins||0) + (user.bank||0)}
│
╰──────────────⬣
`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: perfilImg },
    caption: txt,
    mentions: [userId]
  }, { quoted: m })
}

handler.help = ['perfil']
handler.tags = ['rpg']
handler.command = ['perfil', 'profile']

export default handler