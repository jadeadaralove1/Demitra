// handler_report.js
// Comando para enviar reportes o sugerencias al staff/owner

const handler = async (m, { conn, args, usedPrefix, command, text }) => {
  // ─── Variables básicas ───
  const texto = (text || args.join(' ')).trim()
  const now = Date.now()
  global.db.data.users[m.sender] = global.db.data.users[m.sender] || {}
  const userData = global.db.data.users[m.sender]

  const cooldown = userData.sugCooldown || 0
  const restante = cooldown - now

  // ─── Cooldown activo ───
  if (restante > 0) {
    return m.reply(
`▙▅▚ㅤㅤ⇲ Espera un momento.ㅤ◗ㅤㅤ𓂧
━━━〔  DEMITRABOT  〕━━━
⭐⃞░ Tiempo restante » *${msToTime(restante)}*
━━━━━━━━━━━━━━━`
    )
  }

  // ─── Sin texto ───
  if (!texto) {
    return m.reply(
`▙▅▚ㅤㅤ⇲ ERROR ㅤ⚠️ ㅤ◗ㅤㅤ𓂧
━━━〔  AVISO 〕━━━
⭐⃞░ Debes escribir tu *reporte* o *sugerencia*
━━━━━━━━━━━━━━━`
    )
  }

  // ─── Texto demasiado corto ───
  if (texto.length < 10) {
    return m.reply(
`▙▅▚ㅤㅤ⇲ MENSAJE INVALIDOㅤㅤ◗ㅤㅤ𓂧
━━━〔  ERROR 〕━━━
⭐⃞░ Muy corto (mín. 10 caracteres)
━━━━━━━━━━━━━━━`
    )
  }

  // ─── Fecha local ───
  const fecha = new Date()
  const fechaLocal = fecha.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const esReporte = ['report', 'reporte'].includes(command)
  const tipo = esReporte ? 'REPORTE' : 'SUGERENCIA'
  const tipo2 = esReporte ? '⭐⃞░ Reporte' : '⭐⃞░ Sugerencia'
  const user = m.pushName || 'Usuario'
  const numero = m.sender.split('@')[0]

  // ─── Foto de perfil ───
  let pp
  try { pp = await conn.profilePictureUrl(m.sender, 'image') }
  catch { pp = 'https://files.catbox.moe/78jp9j.jpeg' }

  // ─── Mensaje para owner/staff ───
  const reportMsg =
`▙▅▚ㅤㅤ⇲ MENSAJE ㅤㅤ◗ㅤㅤ𓂧
𐇡𐇡ㅤㅤ\`${tipo}\`ㅤㅤ⬤⬤

＿＿／  USUARIO 👤 ◥ 
> *${user}*

📱 Número » wa.me/${numero}

📅 Fecha » *${fechaLocal}*

／ MENSAJE ◥
> ${texto}
━━━━━━━━━━━━━━⬣`

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

  // ─── Guardar cooldown ───
  userData.sugCooldown = now + 24 * 60 * 60000 // 24 horas

  // ─── Respuesta final al usuario ───
  m.reply(
`▙▅▚ㅤㅤ⇲ MENSAJE ENVIADOㅤㅤ◗ㅤㅤ𓂧
━━━〔  GRACIAS 〕━━━
┃ 💌 Tu ${esReporte ? 'reporte' : 'sugerencia'} fue enviada
> ⭐⃞░ El staff lo revisará pronto
━━━━━━━━━━━━━━`
  )
}

// ─── Formato tiempo ───
const msToTime = (duration) => {
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

// ─── Configuración del handler ───
handler.help = ['report', 'reporte', 'sug', 'suggest']
handler.tags = ['info']
handler.command = ['report', 'reporte', 'sug', 'suggest']

export default handler