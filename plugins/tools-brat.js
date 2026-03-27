import axios from 'axios'
import fs from 'fs'
import exif from '../lib/exif.js'

const { writeExif } = exif

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fetchSticker = async (text, attempt = 1) => {
  try {
    const response = await axios.get(
      'https://skyzxu-brat.hf.space/brat',
      {
        params: { text },
        responseType: 'arraybuffer'
      }
    )
    return response.data
  } catch (error) {
    if (error.response?.status === 429 && attempt <= 3) {
      const retryAfter = error.response.headers['retry-after'] || 5
      await delay(retryAfter * 1000)
      return fetchSticker(text, attempt + 1)
    }
    throw error
  }
}

let handler = async (m, { conn, args, command }) => {
  try {
    let text = m.quoted?.text || args.join(' ')

    if (!text) {
      return conn.reply(
        m.chat,
        'ᐢ. ֑ .ᐢ Por favor, responde a un mensaje o ingresa un texto para crear el sticker.',
        m
      )
    }

    await m.react('🕒')

    let user = globalThis.db?.data?.users?.[m.sender] || {}

    let texto1 = user.metadatos || 'Demitra bot'
    let texto2 = user.metadatos2 || 'Sticker'

    const buffer = await fetchSticker(text)

    const tmpFile = `./tmp-${Date.now()}.png`

    fs.writeFileSync(tmpFile, buffer)

    const sticker = await writeExif(
      {
        mimetype: 'image/png',
        data: fs.readFileSync(tmpFile)
      },
      {
        packname: 'Demitra BOT',
        author: 'Adara'
      }
    )

    await conn.sendMessage(
      m.chat,
      {
        sticker: fs.readFileSync(sticker)
      },
      { quoted: m }
    )

    fs.unlinkSync(tmpFile)
    if (fs.existsSync(sticker)) fs.unlinkSync(sticker)

    await m.react('✔️')

  } catch (e) {
    await m.react('✖️')
    return m.reply(
      `> Error en *${command}*\n> [${e.message}]`
    )
  }
}

handler.help = ['brat']
handler.tags = ['sticker']
handler.command = ['brat']

export default handler