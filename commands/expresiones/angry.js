export default {
  command: ['angry', 'enojado'],
  category: 'expresiones',
  group: true,

  run: async (client, m, args, usedPrefix, command) => {
    try {
      // React seguro
      if (typeof m.react === 'function') m.react('😡').catch(() => {});

      // Menciones si hay
      const mentions = Array.isArray(m.mentionedJid) ? m.mentionedJid : [];
      const targets = mentions.length ? mentions : m.quoted ? [m.quoted.sender] : [];

      // Nombre del remitente con @
      const senderTag = `@${m.sender.split('@')[0]}`;

      // Construir mensaje según haya destinatarios o no
      let str;
      let mentionList = [];

      if (targets.length) {
        // Etiquetas de los destinatarios
        const targetTags = targets.map(jid => `@${jid.split('@')[0]}`).join(', ');
        str = `${senderTag} está enojado con ${targetTags}.`;
        mentionList = [m.sender, ...targets];
      } else {
        str = `${senderTag} está muy enojado hoy.`;
        mentionList = [m.sender];
      }

      // Mensaje si no es grupo
      if (!m.isGroup) return m.reply(str);

      // Videos aleatorios
      const videos = [
        'https://files.catbox.moe/ezbsru.mp4',
        'https://files.catbox.moe/bx7on4.mp4',
        'https://adofiles.i11.eu/dl/5xvx.mp4',
        'https://files.catbox.moe/zno91w.mp4',
        'https://files.catbox.moe/3gny8b.mp4',
        'https://files.catbox.moe/w7ahs5.mp4',
        'https://files.catbox.moe/mguish.mp4',
        'https://files.catbox.moe/p4q933.mp4'
      ];
      const video = videos[Math.floor(Math.random() * videos.length)];

      // Enviar mensaje con menciones si corresponde
      await client.sendMessage(
        m.chat,
        {
          video: { url: video },
          gifPlayback: true,
          caption: str,
          mentions: mentionList
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      m.reply(`⚠️ Ocurrió un error al ejecutar el comando *${usedPrefix + command}*.\n[Error: ${e.message}]`);
    }
  }
};