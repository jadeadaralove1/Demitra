let handler = async (m, { conn }) => {
  try {
    // 🐞 Reacción estilo Demitrabot
    await conn.sendMessage(m.chat, {
      react: { text: '🐞', key: m.key }
    });

    // 📞 Datos del owner
    let numberOwner = '5493863447787';
    let nombreOwner = '#Owner﹐     𓈓 (🪼)    ❤︎    ¿ 𝖠𝖣𝖠𝖱𝖠?
        𝄖 ♡       ❛  ﹫socialmedia   ❜       ⛃';

    // 📇 vCard
    let vcardOwner = `BEGIN:VCARD
VERSION:3.0
N:${nombreOwner};;;
FN:${nombreOwner}
TEL;type=CELL;type=VOICE;waid=${numberOwner}:${numberOwner}
END:VCARD`;

    // 💬 Mensaje estilo anime
    let texto = `    ︵︵︵  ׅ  ׄ ୨ 𖹭 ৎ ׄ  ׅ  ︵︵︵

ᘞㅤ۪ㅤ𝇄 𝇃ㅤ¡ 𝗗𝖾𝗆𝗶𝗍𝗋𝖺 𝗕𝗈𝗍!ㅤׅㅤ🪼

⁖    ᭲⏰ᯮ  ᯮ    ᮫  Aquí está el núm de mi creadora. 

ׅ  ⁘  𝆬 🌸 Puedes hablar con ella por cualquier cosa. 

> 𖦹 ̼  ﹒ ﹒ Lol. 

 𝅭  ㅤ ⎯⎯ㅤ   ִㅤ୨ 🪼 ୧ㅤִ     ⎯⎯ ㅤ 𝅭`;

    // 📩 Enviar mensaje
    await conn.sendMessage(m.chat, { text: texto }, { quoted: m });

    // 📇 Enviar contacto
    await conn.sendMessage(m.chat, {
      contacts: {
        displayName: nombreOwner,
        contacts: [{ vcard: vcardOwner }]
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('Ocurrió un error... inténtalo otra vez');
  }
};

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;