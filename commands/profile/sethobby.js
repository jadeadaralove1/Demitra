export default {
  command: ['setpasatiempo', 'sethobby'],
  category: 'rpg',
  run: async (client, m, args, usedPrefix) => {
    const user = global.db.data.users[m.sender]
    const input = args.join(' ').trim()
    const pasatiemposDisponibles = [
      '📚 Leer', '✍️ Escribir', '🎤 Cantar', '💃 Bailar', '🎮 Jugar', 
'🎨 Dibujar', '🍳 Cocinar', '✈️ Viajar', '🏊 Nadar', '📸 Fotografía',
'🎧 Escuchar música', '🏀 Deportes', '🎬 Ver películas', '🌿 Jardinería',
'🧵 Manualidades', '🎲 Juegos de mesa', '🏋️‍♂️ Gimnasio', '🚴 Ciclismo',
'🎯 Tiro con arco', '🧘‍♂️ Meditación', '🎪 Malabares',
'🛠️ Bricolaje', '🎹 Tocar instrumentos', '🐶 Cuidar mascotas', '🌌 Astronomía',
'♟️ Ajedrez', '🛍️ Compras', '🏕️ Acampar',
'🎣 Pescar', '📱 Tecnología', '🎭 Teatro', '🍽️ Gastronomía', '🏺 Coleccionar',
'✂️ Costura', '🧁 Repostería', '📝 Blogging', '🚗 Automóviles', '🧩 Rompecabezas',
'🎳 Bolos', '🏄 Surf', '🤿 Buceo', '🏹 Tiro al blanco',
'🧭 Orientación', '🏇 Equitación', '🎨 Pintura', '📊 Invertir',
'🔍 Investigar', '💄 Maquillaje', '💇‍♂️ Peluquería', '🛌 Dormir',
'🪓 Carpintería', '🧪 Experimentos', '🗺️ Geografía',
'🎧 Crear música', '🎬 Editar videos', '📖 Leer manga',
'🕹️ Juegos retro', '🧋 Probar bebidas', '🍔 Comer hamburguesas',
'🧠 Psicología', '🧍‍♂️ Ejercicio en casa', '🌙 Salir de noche',
'🧥 Armar outfits', '📦 Decorar habitación', '📺 Ver series',
'🗣️ Aprender idiomas', '🧑‍💻 Programar', '🎯 Mejorar habilidades',
'🛵 Andar en moto', '🚲 Andar en bici', '🌧️ Disfrutar la lluvia',
'💖 Tener novio/a', '🫶 Enamorarse', '😎 Ser cool',
'🧸 Ser tierno/a', '🔥 Ser intenso/a', '🎭 Cambiar personalidad',
'💅 Actitud estética', '🖤 Ser misterioso/a',

'Otro 🌟'
    ]
    if (!input) {
      let lista = 'ᘛ  ࣭  🐢⃝   ࣪   ࣭Elige un pasatiempo:*\n\n'
      pasatiemposDisponibles.forEach((pasatiempo, index) => {
        lista += `${index + 1}) ${pasatiempo}\n`
      })
      lista += `\n*Ejemplos:*\n${usedPrefix}setpasatiempo 1\n${usedPrefix}setpasatiempo Leer\n${usedPrefix}setpasatiempo "Otro 🌟"`
            return m.reply(lista)
    }
    let pasatiempoSeleccionado = ''
    if (/^\d+$/.test(input)) {
      const index = parseInt(input) - 1
      if (index >= 0 && index < pasatiemposDisponibles.length) {
        pasatiempoSeleccionado = pasatiemposDisponibles[index]
      } else {
        return m.reply(`૮₍- ⤙ -₎ა Número inválido. Selecciona un número entre 1 y ${pasatiemposDisponibles.length}`)
      }
    } 
    else {
      const inputLimpio = input.replace(/[^\w\s]/g, '').toLowerCase().trim()
      const encontrado = pasatiemposDisponibles.find(p => p.replace(/[^\w\s]/g, '').toLowerCase().includes(inputLimpio))
      if (encontrado) {
        pasatiempoSeleccionado = encontrado
      } else {
        return m.reply('(ᯅ̈ ) Pasatiempo no encontrado. Usa el comando sin argumentos para ver la lista disponible.')
      }
    }
    if (user.pasatiempo === pasatiempoSeleccionado) {
      return m.reply(`₍ᐢ..ᐢ₎ Ya tienes establecido este pasatiempo: *${user.pasatiempo}*`)
    }
    user.pasatiempo = pasatiempoSeleccionado    
    return m.reply(`૮₍˶• ˔ ก₎ა Se ha establecido tu pasatiempo:\n> *${user.pasatiempo}*`)
  },
};