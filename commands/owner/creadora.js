export default {
  command: ['owner', 'creadora', 'dueña'],
  category: 'main',

  run: async (client, m, args) => {
    try {
      // Reacción estilo demitra
      await client.sendMessage(m.chat, {
        react: { text: '🐢', key: m.key }
      });


      let numberOwner = '5493863447787';
      let nombreOwner = 'Adara creadora';

      // 📇 vCard
      let vcardOwner = `BEGIN:VCARD
VERSION:3.0
N:${nombreOwner};;;
FN:${nombreOwner}
TEL;type=CELL;type=VOICE;waid=${numberOwner}:${numberOwner}
END:VCARD`;

      // 💬 Mensaje estilo anime
      let texto = `.    ︵︵︵  ׅ  ׄ ୨ 𖹭 ৎ ׄ  ׅ  ︵︵︵

ᘞㅤ۪ㅤ𝇄 𝇃ㅤ¡ 𝗗𝖾𝗆𝗶𝗍𝗋𝖺 𝗕𝗈𝗍!ㅤׅㅤ🪼

⁖    ᭲⏰ᯮ  ᯮ    ᮫  Aquí está el núm de mi creadora. 

ׅ  ⁘  𝆬 🌸 Puedes hablar con ella por cualquier cosa. 

> 𖦹 ̼  ﹒ ﹒ Lol. 

 𝅭  ㅤ ⎯⎯ㅤ   ִㅤ୨ 🪼 ୧ㅤִ     ⎯⎯ ㅤ 𝅭`;

      // 📩 Mensaje
      await client.sendMessage(m.chat, { text: texto }, { quoted: m });

      // 📇 Contacto
      await client.sendMessage(m.chat, {
        contacts: {
          displayName: nombreOwner,
          contacts: [{ vcard: vcardOwner }]
        }
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      await m.reply('Ocurrió un error, inténtalo otra vez ❌🦭');
    }
  }
}