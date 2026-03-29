let handler = async (m, { conn }) => {

let iq = Math.floor(Math.random() * 200)

let msg = `𐄹 ۪ ׁ 🧠ᩚ̼ 𖹭̫ ▎ *Calculando IQ...*\n\nTu IQ es: *${iq}*`

conn.reply(m.chat, msg, m)

}

handler.help = ['iq']
handler.tags = ['fun']
handler.command = ['iq']

export default handler