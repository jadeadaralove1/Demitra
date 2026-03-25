export default {
  command: ['confesar', 'confesiones'],
  category: 'game',
  private: true,
  register: true,
  run: async (client, m, args, usedPrefix, command) => {
    try {
      client.menfess = client.menfess ? client.menfess : {};

      const text = args.join(' ');
      if (!text) {
        return m.reply(`> 🎄 :: Ejemplo:\n\n${usedPrefix + command} @usuario tu mensaje de confesión\n\n> Uso: ${usedPrefix + command} ${m.sender.split`@`[0]} Te admiro mucho...`);
      }

      const mentions = Array.isArray(m.mentionedJid) ? m.mentionedJid : [];
      if (!mentions.length) {
        return m.reply('⚠️ Debes mencionar a alguien.');
      }

      let targetJid = mentions[0];
      targetJid = client.decodeJid ? client.decodeJid(targetJid) : targetJid;

      if (targetJid === m.sender) {
        return m.reply('🎁 No puedes enviarte una confesión a ti mismo.');
      }

      const senderTag = `@${m.sender.split('@')[0]}`;
      const targetTag = `@${targetJid.split('@')[0]}`;

      const teks = `ֹ          
                    ︠︠︠︡  .    ★   .   ︠︠︠︡ 

                   𝗖ᥲ𝗿𝗍𝗮 ─ 𝗖᥆ᥒ𝖿і𝗱𝗲ᥒᥴіᥲᥣ  

── 🪼 𝗛᥆ᥣᥲ ${targetTag}, has recibido un mensaje secreto de ${senderTag}:

💭 "${text}"

> “A veces, el silencio dice más que cualquier palabra.” ✨
`.trim();

      // Enviar confesión al privado (CON preview)
      await client.sendMessage(targetJid, {
        text: teks,
        contextInfo: {
          mentionedJid: [targetJid, m.sender],
          externalAdReply: {
            title: 'DEMITRA envía confesiones',
            body: 'Envía tu respuesta con .respuesta <mensaje>',
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnailUrl: 'https://files.catbox.moe/aroyr4.jpeg',
            sourceUrl: '',
          },
        },
      });

      // Confirmación en el chat
      return client.sendMessage(
        m.chat,
        {
          text: `「🗒️」 :: Tu confesión ha sido enviada a ${targetTag}.`,
          contextInfo: {
            mentionedJid: [targetJid]
          }
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      return m.reply('👻⚠️ Error al enviar la confesión...');
    }
  }
};