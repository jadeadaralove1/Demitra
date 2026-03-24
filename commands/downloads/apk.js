import { search, download } from 'aptoide-scraper'

export default {
  command: ['apk', 'aptoide', 'apkdl'],
  category: 'download',
  description: 'Descarga APKs desde Aptoide',
  run: async (client, m, args, usedPrefix, command) => {
    if (!args || !args.length) {
      return m.reply('《✧》 Por favor, ingresa el nombre de la aplicación.')
    }

    const query = args.join(' ').trim()

    try {
      // Buscar la app en Aptoide
      const searchResult = await search(query)
      if (!searchResult || searchResult.length === 0) {
        return m.reply('《✧》 No se encontraron resultados para esa aplicación.')
      }

      // Descargar info de la primera app encontrada
      const apkInfo = await download(searchResult[0].id)
      if (!apkInfo) {
        return m.reply('《✧》 No se pudo obtener la información de la aplicación.')
      }

      const { name, package: pkg, size, icon, dllink: downloadUrl, lastup } = apkInfo

      // Construir caption con deco
      const caption = `
▙▅▚ ㅤㅤ⇲𝗔𝗉𝗍𝗈𝗂𝗱𝗲ㅤㅤ⦙⦙⦙◗
𐇡𐇡 ㅤㅤ ㏩𓄼ㅤㅤ◢𝖫OVE

ㅤㅤㅤ𝗌𝗈𝗒   𝗅𝗈 𝗉𝗋𝗈𝗉𝗂𝗈   𝗔𝗉𝗍𝗈𝗂𝗱𝗲 𝖺𝗉𝗉  
ㅤㅤㅤ     𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗡𝗗𝗢

＿＿／  𓐮𝖭𝗢𝗠𝖡𝗥𝖤
> ${name || 'Desconocido'}

＿＿／  𓐮𝖯𝖠𝖰𝗨𝖤𝗧𝖤
> ${pkg || 'Desconocido'}

＿＿／  𓐮𝖴𝗅𝗍𝗂𝗆𝖺 𝖠𝗅𝗍𝗎𝗌𝗂𝗓𝖺𝗅𝗂𝗈𝗇
> ${lastup || 'Desconocido'}

＿＿／  𓐮𝖳𝖠𝗆𝗔𝗇𝖮
> ${size || 'Desconocido'}


> 𝖤𝖭𝖵𝖨𝖠𝖣𝖮 / 𝖤𝖭𝖵𝖨𝖠𝖭𝖣𝖮 / 𝖫𝖫𝖤𝖦𝖠𝖣o

ㅤㅤ      𝖼𝗋𝖾𝖺𝗍𝗈𝗋: Adara
`

      // Convertir tamaño a bytes y validar límite (500MB)
      const sizeBytes = parseSize(size)
      if (sizeBytes > 524288000) {
        return m.reply(`《✧》 El archivo es demasiado grande (${size}).\n> Descárgalo directamente desde aquí:\n${downloadUrl}`)
      }

      // Enviar APK como documento
      await client.sendMessage(
        m.chat,
        {
          document: { url: downloadUrl },
          mimetype: 'application/vnd.android.package-archive',
          fileName: `${name}.apk`,
          caption
        },
        { quoted: m }
      )

    } catch (e) {
      await m.reply(`> Ocurrió un error al ejecutar *${usedPrefix + command}*.\n> Detalles: ${e.message}`)
    }
  }
}

// Función para convertir tamaño a bytes
function parseSize(sizeStr) {
  if (!sizeStr) return 0
  const parts = sizeStr.trim().toUpperCase().split(' ')
  const value = parseFloat(parts[0])
  const unit = parts[1] || 'B'
  switch (unit) {
    case 'KB': return value * 1024
    case 'MB': return value * 1024 * 1024
    case 'GB': return value * 1024 * 1024 * 1024
    default: return value
  }
}