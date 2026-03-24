import fetch from 'node-fetch'
import fs from 'fs'
import { exec } from 'child_process'

const LINK_CANAL = 'https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A'
const API_KEY = 'causa-ec43262f206b3305'

export default {
    command: ['enviartt', 'sendtt'],
    category: 'owner',
    owner: true,

    run: async (client, m, args) => {
        let url = args[0] || (m.quoted && m.quoted.text ? m.quoted.text.trim() : '')

        if (!url || !url.includes('tiktok.com')) {
            return m.reply('🐢 ⣙ ⣙ Demitra necesita un link de TikTok.')
        }

        await m.react('⏳')

        try {
            // 🔹 Canal
            const inviteCode = LINK_CANAL.split('/').pop()
            const metadata = await client.newsletterMetadata("invite", inviteCode).catch(() => null)
            if (!metadata?.id) throw 'No se encontró el canal.'

            const JID_CANAL = metadata.id

            // 🔹 API
            const res = await fetch(`https://rest.apicausas.xyz/api/v1/descargas/tiktok?url=${encodeURIComponent(url)}&apikey=${API_KEY}`)
            const json = await res.json()
            if (!json.status || !json.data?.download?.url) throw 'API falló.'

            const videoUrl = json.data.download.url

            // 🔹 Rutas temporales
            const input = './tmp/in.mp4'
            const output = './tmp/out.mp4'

            // 🔹 Descargar
            const vid = await fetch(videoUrl)
            const buffer = Buffer.from(await vid.arrayBuffer())
            fs.writeFileSync(input, buffer)

            // 🔹 Convertir (clave real)
            await new Promise((resolve, reject) => {
                exec(`ffmpeg -y -i ${input} -c:v libx264 -c:a aac -movflags +faststart ${output}`, (err) => {
                    if (err) reject(err)
                    else resolve()
                })
            })

            // 🔹 Enviar ya compatible
            await client.sendMessage(JID_CANAL, {
                video: fs.readFileSync(output),
                mimetype: 'video/mp4',
                caption: `                               
       ✉️֧֪ꯪ⃪⃤͛  ⠁ɛ TikTok de:
> ${json.data.autor} 

𝅄🥊ㅤ۫ㅤ﹙  Enviado por Demitra ﹚ ◞ㅤ⊹`
            })

            // 🔹 Limpiar
            fs.unlinkSync(input)
            fs.unlinkSync(output)

            await m.react('✅')
            await m.reply(`✅ ⣙ ⣙Enviado a ${metadata.name}`)

        } catch (e) {
            console.error(e)
            await m.react('❌')
            m.reply(`Error: ${e}`)
        }
    }
}