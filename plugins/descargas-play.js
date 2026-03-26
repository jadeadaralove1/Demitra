import axios from 'axios'
import yts from 'yt-search'

const handler = async (msg, { conn, args, usedPrefix }) => {
  const query = args.join(' ').trim()

  if (!query) {
    return conn.sendMessage(
      msg.chat,
      { text: `❌ *Error:*\n> Debes escribir el nombre del video.\n\n✳️ Usa:\n${usedPrefix}play <nombre>` },
      { quoted: msg }
    )
  }

  await conn.sendMessage(
    msg.chat,
    { text: '*🎧 Descargando audio...*' },
    { quoted: msg }
  )

  try {
    const search = await yts(query)
    if (!search.videos?.length) throw new Error('No se encontró el audio.')

    const video = search.videos[0]
    const url = video.url

    const api = `https://nex-magical.vercel.app/download/y?url=${encodeURIComponent(url)}`
    const { data } = await axios.get(api)

    if (!data?.status || !data?.result?.url)
      throw new Error('Error en descarga.')

    const title = video.title || 'audio'
    const thumb = video.thumbnail

    // MENÚ PRO
    const menu = `
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ  
▙▅▚ㅤㅤ⇲DEMITRAㅤㅤ⦙⦙⦙◗ㅤㅤ𓂧⁸⁶  
𐇡𐇡 ㅤㅤ ㏩𓄼ㅤㅤ◢𝖫OVEㅤㅤ 🔲ㅤㅤ⬤⬤  

ㅤㅤㅤ  ㅤ𝗍𝗎   𝖼𝖺𝗇𝖼𝗂𝗈𝗇   𝗌𝖾ㅤ  
ㅤㅤ ㅤ ㅤ𝖾𝗌𝗍𝖺 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺𝗇𝖽𝗈.ㅤ  

＿＿／ ㅤㅤ 𝖳𝖨𝖳𝖴𝖫𝖮ㅤㅤ🔘ㅤㅤ ◥  
> ${title}

＿＿／ ㅤㅤ𝖳𝖨𝖤𝖬𝖯𝖮ㅤ   🔘   ㅤ ◥  
> ${video.timestamp}

＿＿／ ㅤㅤ 𝖵𝖨𝖲𝖳𝖠𝖲ㅤㅤ🔘ㅤㅤ ◥  
> ${video.views.toLocaleString()}

＿＿／ ㅤ  PUBLICADOㅤㅤ🔘ㅤㅤ ◥  
> ${video.ago}

＿＿／ ㅤㅤ𝖤𝖭𝖫𝖠𝖢𝖤ㅤㅤ🔘ㅤㅤ◥  
> ${url}

＿＿／⬤ㅤㅤ 𝖲𝖤𝖱𝖵𝖤𝖱 ㅤㅤ[橫㦥]  

> ENVIANDO...

ㅤㅤ      creadorㅤㅤ𔘓ㅤㅤsheryl
`

    // ENVÍA IMAGEN + INFO
    await conn.sendMessage(
      msg.chat,
      {
        image: { url: thumb },
        caption: menu
      },
      { quoted: msg }
    )

    // ENVÍA AUDIO
    await conn.sendMessage(
      msg.chat,
      {
        audio: { url: data.result.url },
        mimetype: 'audio/mpeg',
        fileName: `${sanitizeFilename(title)}.mp3`
      },
      { quoted: msg }
    )

  } catch (e) {
    await conn.sendMessage(
      msg.chat,
      { text: `❌ Error:\n${e.message}` },
      { quoted: msg }
    )
  }
}

handler.help = ['play <título>']
handler.tags = ['download']
handler.command = ['play', 'ytamp3']

export default handler

function sanitizeFilename(name = 'audio') {
  return name.replace(/[\\/:*?"<>|]+/g, '').trim().slice(0, 100)
}