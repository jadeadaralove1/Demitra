// 💫 Sopa de Letras Shadow Garden + Navidad
let juegos = {}

function generarSopaDeLetras(palabras) {
  const size = 12
  let grid = Array.from({ length: size }, () => Array(size).fill(' '))

  palabras.forEach((p, idx) => {
    if (idx < size) {
      for (let i = 0; i < p.length && i < size; i++) {
        grid[idx][i] = p[i].toUpperCase()
      }
    }
  })

  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === ' ') {
        grid[r][c] = letras[Math.floor(Math.random() * letras.length)]
      }
    }
  }

  return grid.map(row => row.join(' ')).join('\n')
}

let handler = async (m, { command, text }) => {
  const chatId = m.chat
  const jugador = m.pushName || m.sender

  const palabras = [
    "shadow", "garden", "eminence", "alpha", "beta", "gamma",
    "delta", "epsilon", "zeta", "navidad", "regalo", "nieve",
    "sombras", "trineo", "estrella", "festivo"
  ]

  // 🎮 INICIAR JUEGO
  if (['sopa', 'sopadeletras', 'shadowgame'].includes(command)) {

    if (juegos[chatId]) {
      return m.reply("⚠️ Ya hay una sopa activa en este chat.")
    }

    const sopa = generarSopaDeLetras(palabras)

    juegos[chatId] = {
      jugador,
      palabras,
      inicio: Date.now()
    }

    await m.reply(
`🌑🎄 *Sopa de Letras del Shadow Garden* 🎄🌑
👤 Jugador: ${jugador}
⏳ Tiempo máximo: 10 minutos

Palabras a encontrar:
${palabras.join(', ')}

${sopa}

✨ Busca las palabras antes de que las sombras festivas consuman la Navidad...`
    )

    setTimeout(() => {
      if (juegos[chatId]) {
        m.reply(`⚠️ ${jugador}, 5 minutos... 🎄🌑`)
      }
    }, 5 * 60 * 1000)

    setTimeout(() => {
      if (juegos[chatId]) {
        m.reply(`⏳ ${jugador}, queda 1 minuto... ❄️`)
      }
    }, 9 * 60 * 1000)

    setTimeout(() => {
      if (juegos[chatId]) {
        m.reply(`❌ Tiempo agotado, ${jugador}... 🎭🌑`)
        delete juegos[chatId]
      }
    }, 10 * 60 * 1000)
  }

  // 🧩 RESOLVER
  if (command === 'resolver') {

    if (!juegos[chatId]) {
      return m.reply("⚠️ No hay ninguna sopa activa.")
    }

    if (!text) {
      return m.reply("🧩 Escribe las palabras separadas por comas.")
    }

    const encontradas = text
      .split(',')
      .map(p => p.trim().toLowerCase())
      .filter(p => p.length > 0)

    const faltantes = juegos[chatId].palabras
      .filter(p => !encontradas.includes(p))

    if (faltantes.length === 0) {
      m.reply(`🎉✨ ¡Ganaste ${jugador}! 🎄🌑`)
      delete juegos[chatId]
    } else {
      m.reply(`🔮 Faltan: ${faltantes.join(', ')}`)
    }
  }
}

handler.help = ['sopa', 'resolver <palabras>']
handler.tags = ['game']
handler.command = ['sopa', 'sopadeletras', 'shadowgame', 'resolver']

export default handler