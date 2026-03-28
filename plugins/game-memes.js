// handler-meme.js
let memes = [
  // Aquí ponés tus links de Catbox o cualquier host de imágenes
  "https://files.catbox.moe/66gvcy.jpg",
  "https://files.catbox.moe/66gvcy.jpg",
  "https://files.catbox.moe/66gvcy.jpg",
  "https://files.catbox.moe/66gvcy.jpg",
  "https://files.catbox.moe/66gvcy.jpg"
];

let handler = async (m, { conn }) => {
  try {
    // Elegir meme aleatorio
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];

    const wm = (typeof global !== 'undefined' && global.wm) ? global.wm : 'Shadow-BOT-MD ⚔️';
    const bot = 'Shadow-BOT-MD ⚔️';

    let fkontak = {
      key: { participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
      message: {
        contactMessage: {
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      participant: '0@s.whatsapp.net'
    };

    let caption = `☽ 『 Shadow Garden Memes 』 ☽

🧠 Aquí tienes un meme en español invocado desde las sombras...
✦ Que la risa ilumine tu noche oscura.`;

    // Enviar meme con botones
    await conn.sendButton(
      m.chat,
      caption,
      wm,
      randomMeme,
      [
        ['☽ Siguiente meme ☽', '.meme'],
        ['☽ Volver al Menú ☽', '/menu']
      ],
      null,
      [[bot, 'https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O']],
      fkontak
    );

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    await conn.sendMessage(m.chat, { react: { text: '✖️', key: m.key } });
    m.reply('⚠️ Las sombras no pudieron encontrar un meme...');
    console.error(e);
  }
};

handler.command = handler.help = ['meme'];
handler.tags = ['diversión', 'humor'];
export default handler;