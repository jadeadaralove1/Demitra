import axios from 'axios'

const run = async (client, m, args) => {

  const query = args.join(' ').trim()

  if (!query) {
    return client.sendMessage(
      m.chat,
      { text: '❌ Error:\n> Debes escribir la URL del video de Instagram.' },
      { quoted: m }
    )
  }

  await client.sendMessage(
    m.chat,
    { text: '*📥 Demitra está descargando el video de Instagram...*' },
    { quoted: m }
  )

  let data = []

  try {

    // 🔹 API 1 (vreden)
    try {
      const api1 = `${global.APIs.vreden.url}/api/igdownload?url=${encodeURIComponent(query)}`
      const res1 = await axios.get(api1)

      if (res1.data?.resultado?.respuesta?.datos?.length) {
        data = res1.data.resultado.respuesta.datos.map(v => v.url)
      }
    } catch (e) {
      console.log('API 1 error:', e.message)
    }

    // 🔹 API 2 (delirius) fallback
    if (!data.length) {
      try {
        const api2 = `${global.APIs.delirius.url}/download/instagram?url=${encodeURIComponent(query)}`
        const res2 = await axios.get(api2)

        if (res2.data?.status && res2.data?.data?.length) {
          data = res2.data.data.map(v => v.url)
        }
      } catch (e) {
        console.log('API 2 error:', e.message)
      }
    }

    // ❌ Si no hay resultados
    if (!data.length) {
      throw new Error('No se pudo obtener el contenido del enlace.')
    }

    // 📤 Enviar videos
    for (let media of data) {
      await client.sendMessage(
        m.chat,
        {
          video: { url: media },
          caption: '✅ Demitra descargó esto para ti.'
        },
        { quoted: m }
      )
    }

  } catch (e) {

    await client.sendMessage(
      m.chat,
      { text: `❌ Error:\n${e.message}` },
      { quoted: m }
    )

  }
}

export default {
  command: ['ig', 'instagram'],
  category: 'downloader',
  description: 'Descarga videos de Instagram',
  run
}