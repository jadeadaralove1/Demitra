export default {
  command: ['dance', 'bailar'],
  category: 'expresiones',
  group: true,

  run: async (client, m, args, usedPrefix, command) => {
    try {
      // React seguro
      if (typeof m.react === 'function') m.react('💃').catch(() => {});

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
        str = `${senderTag} esta bailando a ${targetTags}.`;
        mentionList = [m.sender, ...mentionTargets];
      } else {
        str = `${senderTag} esta bailando.`;
        mentionList = [m.sender];
      }

      // Videos aleatorios de dance
      const videos = [
        'https://files.catbox.moe/vyg6vb.mp4',
        'https://adofiles.i11.eu/dl/7jtk.mp4',
        'https://files.catbox.moe/vb440j.mp4',
        'https://files.catbox.moe/lpvkzp.mp4',
        'https://files.catbox.moe/x9g0q8.mp4',
        'https://files.catbox.moe/5cycsg.mp4',
        'https://adofiles.i11.eu/dl/uwjm.mp4',
        'https://files.catbox.moe/am00db.mp4', 
        'https://files.catbox.moe/fzu81g.mp4'
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