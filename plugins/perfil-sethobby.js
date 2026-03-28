import { database } from '../lib/database.js'

let handler = async (m, { args, usedPrefix }) => {
  const user = database.data.users[m.sender] || (database.data.users[m.sender] = {})

  const input = args.join(' ').trim()

  const pasatiemposDisponibles = [
    '📚 Leer','✍️ Escribir','🎤 Cantar','💃 Bailar','🎮 Jugar','🎨 Dibujar','🍳 Cocinar','✈️ Viajar',
    '🏊 Nadar','📸 Fotografía','🎧 Escuchar música','🏀 Deportes','🎬 Ver películas','🌿 Jardinería',
    '🧵 Manualidades','🎲 Juegos de mesa','🏋️‍♂️ Gimnasio','🚴 Ciclismo','🎯 Tiro con arco',
    '🧘‍♂️ Meditación','🎪 Malabares','🛠️ Bricolaje','🎹 Tocar instrumentos','🐶 Cuidar mascotas',
    '🌌 Astronomía','♟️ Ajedrez','🛍️ Compras','🏕️ Acampar','🎣 Pescar','📱 Tecnología','🎭 Teatro',
    '🍽️ Gastronomía','🏺 Coleccionar','✂️ Costura','🧁 Repostería','📝 Blogging','🚗 Automóviles',
    '🧩 Rompecabezas','🎳 Bolos','🏄 Surf','🤿 Buceo','🏹 Tiro al blanco','🧭 Orientación',
    '🏇 Equitación','🎨 Pintura','📊 Invertir','🔍 Investigar','💄 Maquillaje','💇‍♂️ Peluquería',
    '🛌 Dormir','🪓 Carpintería','🧪 Experimentos','🗺️ Geografía','🎧 Crear música','🎬 Editar videos',
    '📖 Leer manga','🕹️ Juegos retro','🧋 Probar bebidas','🍔 Comer hamburguesas','🧠 Psicología',
    '🧍‍♂️ Ejercicio en casa','🌙 Salir de noche','🧥 Armar outfits','📦 Decorar habitación','📺 Ver series',
    '🗣️ Aprender idiomas','🧑‍💻 Programar','🎯 Mejorar habilidades','🛵 Andar en moto','🚲 Andar en bici',
    '🌧️ Disfrutar la lluvia','💖 Tener novio/a','🫶 Enamorarse','😎 Ser cool','🧸 Ser tierno/a',
    '🔥 Ser intenso/a','🎭 Cambiar personalidad','💅 Actitud estética','🖤 Ser misterioso/a',
    'Otro 🌟'
  ]

  if (!input) {
    let lista = '🐢 Elige un pasatiempo:\n\n'
    pasatiemposDisponibles.forEach((p, i) => lista += `${i + 1}) ${p}\n`)
    lista += `\nEjemplos:\n${usedPrefix}setpasatiempo 1\n${usedPrefix}setpasatiempo Leer`
    return m.reply(lista)
  }

  let seleccionado = ''

  if (/^\d+$/.test(input)) {
    const index = parseInt(input) - 1
    if (index >= 0 && index < pasatiemposDisponibles.length) {
      seleccionado = pasatiemposDisponibles[index]
    } else {
      return m.reply(`❌ Número inválido (1 - ${pasatiemposDisponibles.length})`)
    }
  } else {
    const limpio = input.toLowerCase().trim()
    const encontrado = pasatiemposDisponibles.find(p => p.toLowerCase().includes(limpio))
    if (!encontrado) return m.reply('❌ Pasatiempo no encontrado')
    seleccionado = encontrado
  }

  if (user.pasatiempo === seleccionado) return m.reply(`⚠️ Ya tienes ese pasatiempo:\n> ${user.pasatiempo}`)

  user.pasatiempo = seleccionado
  await database.save()  // ✅ Guardar cambios en la base de datos

  return m.reply(`✅ Pasatiempo establecido:\n> ${user.pasatiempo}`)
}

handler.help = ['setpasatiempo', 'sethobby']
handler.tags = ['rpg']
handler.command = ['setpasatiempo', 'sethobby']

export default handler