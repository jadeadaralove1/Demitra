import yts from 'yt-search'
import fetch from 'node-fetch'
import { getBuffer } from '../../lib/message.js'

const isYTUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url)

export default {
  command: ['play2', 'mp4', 'ytmp4', 'ytvideo', 'playvideo'],
  category: 'downloader',
  run: async (client, m, args, usedPrefix, command) => {
    try {
      if (!args[0]) {
        return m.reply('《✧》Por favor, menciona el nombre o URL del video que deseas descargar')
      }

      const text = args.join(' ')
      const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
      const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text

      let url = query
      let title = null
      let thumbBuffer = null

      try {
        const search = await yts(query)

        if (search.all.length) {
          const videoInfo = videoMatch
            ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0]
            : search.all[0]

          if (videoInfo) {
            url = videoInfo.url
            title = videoInfo.title
            thumbBuffer = await getBuffer(videoInfo.image)

            const vistas = (videoInfo.views || 0).toLocaleString()
            const canal = videoInfo.author?.name || 'Desconocido'

            const infoMessage = `▙▅▚ ⇲ ${title} ⦙⦙⦙◗

ㅤDescargando › *${title}*

𓐮 Canal › *${canal}*

𓐮 Duración › *${videoInfo.timestamp || 'Desconocido'}*

𓐮 Vistas › *${vistas}*

𓐮 Publicado › *${videoInfo.ago || 'Desconocido'}*

𓐮 Enlace › *${url}*`

            await client.sendMessage(
              m.chat,
              { image: thumbBuffer, caption: infoMessage },
              { quoted: m }
            )
          }
        }
      } catch (err) {}

      const video = await getVideoFromApis(url)

      if (!video?.url) {
        return m.reply('《✧》 No se pudo descargar el *video*, intenta más tarde.')
      }

      const videoBuffer = await getBuffer(video.url)

      await client.sendMessage(
        m.chat,
        {
          video: videoBuffer,
          fileName: `${title || 'video'}.mp4`,
          mimetype: 'video/mp4'
        },
        { quoted: m }
      )

    } catch (e) {
      await m.reply(`Error: ${e.message}`)
    }
  }
}

async function getVideoFromApis(url) {
  const apis = [
    {
      api: 'Adonix',
      endpoint: `${global.APIs.adonix.url}/download/ytvideo?apikey=${global.APIs.adonix.key}&url=${encodeURIComponent(url)}`,
      extractor: res => res?.data?.url
    },
    {
      api: 'Vreden',
      endpoint: `${global.APIs.vreden.url}/api/v1/download/youtube/video?url=${encodeURIComponent(url)}&quality=360`,
      extractor: res => res.result?.download?.url
    }
  ]

  for (const { endpoint, extractor } of apis) {
    try {
      const res = await fetch(endpoint).then(r => r.json())
      const link = extractor(res)
      if (link) return { url: link }
    } catch {}

    await new Promise(resolve => setTimeout(resolve, 500))
  }

  return null
}