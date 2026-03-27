import axios from 'axios'
import FormData from 'form-data'

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

function generateUniqueFilename(mime) {
  const ext = mime.split('/')[1] || 'bin'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = Array.from({ length: 8 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
  return `${id}.${ext}`
}

async function uploadToCatbox(buffer, mime) {
  const form = new FormData()
  form.append('reqtype', 'fileupload')
  form.append('fileToUpload', buffer, {
    filename: generateUniqueFilename(mime)
  })

  const res = await axios.post(
    'https://catbox.moe/user/api.php',
    form,
    {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    }
  )

  if (!res.data || typeof res.data !== 'string' || !res.data.startsWith('https://')) {
    throw new Error('Respuesta inválida de Catbox')
  }

  return res.data.trim()
}

async function uploadToAdonix(buffer, mime) {
  const filename = generateUniqueFilename(mime)
  const base64Content = buffer.toString('base64')

  const res = await axios.post(
    'https://adofiles.i11.eu/api/upload',
    {
      filename,
      content: base64Content,
      apiKey: 'Ado&'
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'Ado&'
      }
    }
  )

  if (res.status !== 201 || !res.data.files || res.data.files.length === 0) {
    throw new Error('Respuesta inválida de AdonixFiles')
  }

  return res.data.files[0].publicUrl
}

let handler = async (m, { conn, command, prefix }) => {
  const q = m.quoted ? m.quoted : m
  const mime = (q.msg || q).mimetype || q.mimetype || ''

  if (!mime) {
    return m.reply(
      `🐢 Responde a una imagen o video con *${prefix + command}*`
    )
  }

  try {
    let media = await q.download()

    const [catboxLink, adonixLink] = await Promise.all([
      uploadToCatbox(media, mime),
      uploadToAdonix(media, mime)
    ])

    const userName = global.db?.data?.users?.[m.sender]?.name || 'Usuario'

    const txt =
`੭୧ Upload Success

✦ URL 1: ${catboxLink}
✦ URL 2: ${adonixLink}
✦ Peso: ${formatBytes(media.length)}
✦ Solicitado por: ${userName}`

    await conn.reply(m.chat, txt, m)

  } catch (e) {
    console.error(e)
    m.reply(`❌ Error:\n${e.message}`)
  }
}

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = ['tourl']

export default handler