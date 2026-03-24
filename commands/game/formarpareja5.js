export default {
  command: ['formarpareja5'],
  tags: ['fun', 'main'],
  help: ['formarpareja5'],
  group: true,
  register: true,

  run: async (conn, m, args) => {
    const toM = (a) => '@' + a.split('@')[0];

    // Obtener participantes del grupo
    let metadata;
    try {
      metadata = await conn.groupMetadata(m.chat);
    } catch (e) {
      return conn.sendMessage(m.chat, { text: '⚠️ No se pudo obtener la información del grupo.' }, { quoted: m });
    }

    let ps = metadata.participants.map(p => p.id);

    if (ps.length < 2) {
      return conn.sendMessage(m.chat, { text: '⚠️ Necesitan al menos 2 personas en el grupo.' }, { quoted: m });
    }

    // Mezclar participantes aleatoriamente
    ps = ps.sort(() => Math.random() - 0.5);

    // Tomar hasta 10 participantes para formar 5 parejas
    const parejas = [];
    for (let i = 0; i < Math.min(ps.length, 10); i += 2) {
      if (ps[i + 1]) parejas.push([ps[i], ps[i + 1]]);
    }

    let texto = '*_😍 Las mejores parejas del grupo 😍_*\n\n';
    const mensajes = [
      'Esta pareja está destinada a estar junta 💙',
      'Estos dos tortolitos están enamorados ✨',
      'Ya hasta familia deberían tener 🤱🧑‍🍼',
      'Se casaron en secreto 💍',
      'Están de luna de miel ✨🥵😍❤️'
    ];

    parejas.forEach((p, idx) => {
      texto += `*_${idx + 1}.- ${toM(p[0])} y ${toM(p[1])}_*\n- ${mensajes[idx] || 'Son una linda pareja 💖'}\n\n`;
    });

    // Menciones
    const mentions = parejas.flat();

    await conn.sendMessage(
      m.chat,
      { text: texto, mentions },
      { quoted: m }
    );
  }
};