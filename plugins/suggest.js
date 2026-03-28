// handler_reports.js
let handler = async (m, { conn, command, text }) => {
  const mensaje = text?.trim()
  const now = Date.now()
  const userDb = global.db.data.users[m.sender] || {}
  const cooldown = userDb.sugCooldown || 0
  const restante = cooldown - now

  // ───── COOLDOWN ─────
  if (restante > 0) {
    return m.reply(
`▙▅▚  ⇲ Espera un momento. ◗
━━━〔  DEMITRABOT  〕━━━
⭐⃞░ Tiempo restante » *${msToTime(restante)}*
━━━━━━━━━━━━━━━`
    )
  }

  // ───── SIN TEXTO ─────
  if (!mensaje) {
    return m.reply(
`▙▅▚  ⇲ ERROR ⚠️ ◗
━━━〔  AVISO 〕━━━
⭐⃞░ Debes escribir tu *${command.includes('sug') ? 'sugerencia' : 'reporte'}*
━━━━━━━━━━━━━`
    )
  }

  // ───── TEXTO MUY CORTO ─────
  if (mensaje.length < 10) {
    return m.reply(
`▙▅▚  ⇲ MENSAJE INVÁLIDO ◗
━━━〔 ERROR 〕━━━
⭐⃞░ Muy corto (mín. 10 caracteres)
━━━━━━━━━━━━━`
    )
  }

  const fecha = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const tipo = ['report', 'reporte'].includes(command) ? 'REPORTE' : 'SUGERENCIA'
  const tipo2 = ['report', 'reporte'].includes(command) ? '⭐⃞░ Reporte' : '⭐⃞░ Sugerencia'
  const user = m.pushName || 'Usuario'
  const numero = m.sender.split('@')[0]
  const pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://files.catbox.moe/78jp9j.jpeg')

  // ───── MENSAJE PARA EL STAFF ─────
  const reportMsg =
`▙▅▚  ⇲ MENSAJE ◗
𐇡𐇡  \`${tipo}\`  ⬤⬤
＿＿／ USUARIO 👤 ◥
> *${user}*
📱 Número » wa.me/${numero}
📅 Fecha » *${fecha}*
／ MENSAJE ◥
> ${mensaje}
━━━━━━━━━━━━━━━━⬣`

  for (const num of global.owner || []) {
    try {
      await conn.sendContextInfoIndex(
        `${num}@s.whatsapp.net`,
        reportMsg,
        {},
        null,
        false,
        null,
        {
          banner: pp,
          title: tipo2,
          body: '🫧 Nuevo mensaje para el staff',
          redes: global.db.data.settings?.[conn.user.id.split(':')[0] + "@s.whatsapp.net"]?.link
        }
      )
    } catch {}
  }

  // ───── GUARDAR COOLDOWN ─────
  userDb.sugCooldown = now + 24 * 60 * 60000
  global.db.data.users[m.sender] = userDb

  // ───── RESPUESTA AL USUARIO ─────
  m.reply(
`▙▅▚  ⇲ MENSAJE ENVIADO ◗
━━━〔  GRACIAS 〕━━━
┃ 💌 Tu ${tipo.toLowerCase()} fue enviada
> ⭐⃞░ El staff lo revisará pronto
━━━━━━━━━━━━━━━━⬣`
  )
}

// ───── FUNCIONES AUXILIARES ─────
function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  const days = Math.floor(duration / (1000 * 60 * 60 * 24))

  const s = seconds.toString().padStart(2, '0')
  const m = minutes.toString().padStart(2, '0')
  const h = hours.toString().padStart(2, '0')
  const d = days.toString()

  const parts = []
  if (days > 0) parts.push(`${d} día${d > 1 ? 's' : ''}`)
  if (hours > 0) parts.push(`${h} hora${h > 1 ? 's' : ''}`)
  if (minutes > 0) parts.push(`${m} minuto${m > 1 ? 's' : ''}`)
  parts.push(`${s} segundo${s > 1 ? 's' : ''}`)

  return parts.join(', ')
}

// ───── CONFIGURACIÓN DEL HANDLER ─────
handler.command = ['report', 'reporte', 'sug', 'suggest']
handler.tags = ['tools', 'info']
handler.help = ['report', 'sug']

export default handler