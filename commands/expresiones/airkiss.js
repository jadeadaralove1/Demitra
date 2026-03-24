export default {
  command: ['airkiss', 'lanzarbeso','lanzarkiss'],
  category: 'expresiones',
  group: true,

  run: async (client, m, args, usedPrefix, command) => {
    try {
      // Solo continuar si hay menciones
      const mentions = Array.isArray(m.mentionedJid) ? m.mentionedJid : [];
      if (!mentions.length) {
        return m.reply('❌ Debes mencionar a alguien para lanzar un beso.');
      }

      // React seguro
      if (typeof m.react === 'function') m.react('😘').catch(() => {});

      // Texto con menciones activas
      // Se menciona al remitente (@sender) y a los destinatarios (@targets)
      const senderTag = `@${m.sender.split('@')[0]}`;
      const targetTags = mentions.map(jid => `@${jid.split('@')[0]}`).join(', ');

      const str = `${senderTag} le lanzó un beso a ${targetTags}!`;

      // Videos aleatorios de airkiss
      const videos = [
  'https://adofiles.i11.eu/dl/ncyo.mp4',
  'https://files.catbox.moe/cznuzu.mp4',
  'https://files.catbox.moe/ml536k.mp4',
  'https://files.catbox.moe/w5umk1.mp4',
  'https://adofiles.i11.eu/dl/sr9z.mp4',
  'https://files.catbox.moe/c8tih8.mp4'
];
      const video = videos[Math.floor(Math.random() * videos.length)];

      // Enviar mensaje con menciones activas
      await client.sendMessage(
        m.chat,
        {
          video: { url: video },
          gifPlayback: true,
          caption: str,
          mentions: [m.sender, ...mentions]
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      m.reply(`⚠️ Ocurrió un error al ejecutar el comando *${usedPrefix + command}*.\n[Error: ${e.message}]`);
    }
  }
};