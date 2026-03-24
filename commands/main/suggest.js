export default {
  command: ['report', 'reporte', 'sug', 'suggest'],
  category: 'info',
  run: async (client, m, args, usedPrefix, command, text) => {

    const texto = text.trim()
    const now = Date.now()
    const demitrabot = global.db.data.users[m.sender].sugdemitrabot || 0
    const restante = demitrabot - now

    // ───── DEMITRABOT ─────
    if (restante > 0) {
      return m.reply(
`▙▅▚ㅤㅤ⇲ Espera un momento.ㅤ◗ㅤㅤ𓂧
     ━━━〔  DEMITRABOT  〕━━━
 ⭐⃞░ Tiempo restante » *${msToTime(restante)}*
      ━━━━━━━━━━━━━━━`)
    }

    // ───── SIN TEXTO ─────
    if (!texto) {
      return m.reply(
`▙▅▚ㅤㅤ⇲ ERROR ㅤ⚠️ ㅤ◗ㅤㅤ𓂧
  ━━━〔  AVISO  〕━━━

 ⭐⃞░ Debes escribir tu *reporte* o *sugerencia*

  ━━━━━━━━━━━━━━`)
    }

    // ───── TEXTO CORTO ─────
    if (texto.length < 10) {
      return m.reply(
`▙▅▚ㅤㅤ⇲ 𝖬𝖤𝖭𝖲𝖠𝖩𝖤 INVALIDOㅤㅤ◗ㅤㅤ𓂧

      ━━━〔  ERROR  〕━━━

 ⭐⃞░ Muy corto (mín. 10 caracteres)

     ━━━━━━━━━━━━━━`)
    }

    const fecha = new Date()
    const fechaLocal = fecha.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const esReporte = ['report', 'reporte'].includes(command)
    const tipo  = esReporte ? 'REPORTE' : 'SUGERENCIA'
    const tipo2 = esReporte ? '⭐⃞░ Reporte' : '⭐⃞░ Sugerencia'

    const user = m.pushName || 'Usuario'
    const numero = m.sender.split('@')[0]

    const pp = await client.profilePictureUrl(m.sender, 'image')
      .catch(() => 'https://files.catbox.moe/78jp9j.jpeg')

    // ───── MENSAJE PARA OWNER ─────
    let reportMsg =
`▙▅▚ㅤㅤ⇲ 𝖬𝖤𝖭𝖲𝖠𝖩𝖤 ㅤㅤ◗ㅤㅤ𓂧
 𐇡𐇡ㅤㅤ\`${tipo}\`ㅤㅤ⬤⬤

  ＿＿／ 𝖴𝖲𝖴𝖠𝖱𝖨𝖮 👤 ◥ 
> *${user}*

 📱 Número » wa.me/${numero}

 📅 Fecha » *${fechaLocal}*

 ／ 𝖬𝖤𝖭𝖲𝖠𝖩𝖤  ◥
> ${texto}
  ━━━━━━━━━━━━━━━━⬣`

    for (const num of global.owner) {
      try {
        await global.client.sendContextInfoIndex(
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
            redes: global.db.data.settings[
              client.user.id.split(':')[0] + "@s.whatsapp.net"
            ].link
          }
        )
      } catch {}
    }

    // ───── GUARDAR COOLDOWN ─────
    global.db.data.users[m.sender].sugCooldown = now + 24 * 60 * 60000

    // ───── RESPUESTA FINAL ─────
    m.reply(
`▙▅▚ㅤㅤ⇲ 𝖬𝖤𝖭𝖲𝖠𝖩𝖤 ENVIADOㅤㅤ◗ㅤㅤ𓂧

     ━━━〔  GRACIAS  〕━━━

┃ 💌 Tu ${esReporte ? 'reporte' : 'sugerencia'} fue enviada

> ⭐⃞░ El staff lo revisará pronto

    ━━━━━━━━━━━━━━━━`)
  },
}

// ───── FORMATO TIEMPO ─────
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