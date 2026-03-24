export default {
  command: ['happy', 'feliz'],
  category: 'expresiones',
  group: true,

  run: async (client, m, args, usedPrefix, command) => {
    try {
      // React seguro
      if (typeof m.react === 'function') m.react('😁').catch(() => {});

      // Menciones
      const mentions = Array.isArray(m.mentionedJid) ? m.mentionedJid : [];
      const targets = mentions.length ? mentions : m.quoted ? [m.quoted.sender] : [];

      // Filtrar para no mencionar al remitente
      const mentionTargets = targets.filter(jid => jid !== m.sender);

      // Nombre del remitente con @
      const senderTag = `@${m.sender.split('@')[0]}`;

      // Texto según haya destinatarios o no
      let str;
      let mentionList = [];

      if (mentionTargets.length) {
        const targetTags = mentionTargets.map(jid => `@${jid.split('@')[0]}`).join(', ');
        str = `${senderTag} esta feliz por ${targetTags}.`;
        mentionList = [m.sender, ...mentionTargets];
      } else {
        str = `${senderTag} se siente muy feliz hoy.`;
        mentionList = [m.sender];
      }

      // Videos aleatorios de felicidad
      const videos = [
        'https://files.catbox.moe/d7hylb.mp4',
        'https://files.catbox.moe/03s0ng.mp4',
        'https://files.catbox.moe/mcbyqv.mp4',
        'https://files.catbox.moe/6dird8.mp4',
        'https://files.catbox.moe/0t6ixw.mp4',
        'https://files.catbox.moe/xbistd.mp4',
        'https://adofiles.i11.eu/dl/m52b.mp4',
        'https://files.catbox.moe/bj1pg0.mp4'
      ];
      const video = videos[Math.floor(Math.random() * videos.length)];

      // Enviar mensaje con menciones activas
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