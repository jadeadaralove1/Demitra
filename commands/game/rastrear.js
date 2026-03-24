import { performance } from 'perf_hooks';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// 🌍 lista de países para fallback
const fakeCountries = [
  '+54 Argentina 🇦🇷',
  '+58 Venezuela 🇻🇪',
  '+57 Colombia 🇨🇴',
  '+52 México 🇲🇽',
  '+51 Perú 🇵🇪',
  '+56 Chile 🇨🇱',
  '+55 Brasil 🇧🇷',
  '+598 Uruguay 🇺🇾',
  '+591 Bolivia 🇧🇴',
  '+593 Ecuador 🇪🇨',
  '+595 Paraguay 🇵🇾',

  '+1 Estados Unidos 🇺🇸',
  '+1 Canadá 🇨🇦',

  '+34 España 🇪🇸',
  '+33 Francia 🇫🇷',
  '+49 Alemania 🇩🇪',
  '+39 Italia 🇮🇹',
  '+44 Reino Unido 🇬🇧',
  '+31 Países Bajos 🇳🇱',
  '+32 Bélgica 🇧🇪',
  '+41 Suiza 🇨🇭',
  '+43 Austria 🇦🇹',
  '+351 Portugal 🇵🇹',
  '+46 Suecia 🇸🇪',
  '+47 Noruega 🇳🇴',
  '+45 Dinamarca 🇩🇰',
  '+358 Finlandia 🇫🇮',
  '+48 Polonia 🇵🇱',
  '+420 República Checa 🇨🇿',
  '+30 Grecia 🇬🇷',
  '+36 Hungría 🇭🇺',
  '+40 Rumanía 🇷🇴',
  '+380 Ucrania 🇺🇦',

  '+7 Rusia 🇷🇺',

  '+90 Turquía 🇹🇷',
  '+972 Israel 🇮🇱',
  '+971 Emiratos Árabes 🇦🇪',
  '+966 Arabia Saudita 🇸🇦',

  '+91 India 🇮🇳',
  '+92 Pakistán 🇵🇰',
  '+880 Bangladesh 🇧🇩',

  '+86 China 🇨🇳',
  '+81 Japón 🇯🇵',
  '+82 Corea del Sur 🇰🇷',
  '+84 Vietnam 🇻🇳',
  '+66 Tailandia 🇹🇭',
  '+60 Malasia 🇲🇾',
  '+65 Singapur 🇸🇬',
  '+62 Indonesia 🇮🇩',
  '+63 Filipinas 🇵🇭',

  '+61 Australia 🇦🇺',
  '+64 Nueva Zelanda 🇳🇿',

  '+27 Sudáfrica 🇿🇦',
  '+20 Egipto 🇪🇬',
  '+234 Nigeria 🇳🇬',
  '+254 Kenia 🇰🇪',
  '+212 Marruecos 🇲🇦',

  '+216 Túnez 🇹🇳'
];
export default {
  command: ['rastrear'],
  tags: ['fun'],
  group: true,
  register: true,

  run: async (conn, m) => {

    let target;
    if (m.mentionedJid?.length) {
      target = m.mentionedJid[0];
    } else if (m.quoted) {
      target = m.quoted.sender;
    } else {
      target = m.sender;
    }

    const raw = target.split('@')[0];
    const name = m.pushName || raw;

    let country = null;
    let finalNumber = raw;

    try {
      const phone = parsePhoneNumberFromString('+' + raw);

      if (phone && phone.isValid()) {
        const code = phone.countryCallingCode;
        const iso = phone.country;

        country = `+${code} ${iso}`;
      }
    } catch {}

    // 🔥 SI NO HAY PAÍS REAL → GENERAR UNO CREÍBLE
    if (!country) {
      country = fakeCountries[Math.floor(Math.random() * fakeCountries.length)];
    }

    const loading = [
      '💻 Iniciando rastreo...',
      '📡 Escaneando...',
      '🔍 Analizando...',
      '🧠 Procesando datos...'
    ];

    for (let line of loading) {
      await m.reply(line);
    }

    const start = performance.now();
    await new Promise(r => setTimeout(r, 500));
    const end = performance.now();
    const speed = (end - start).toFixed(2);

    const result = `
☠ RASTREO COMPLETADO ☠

👤 Usuario: @${raw}
📱 Número: ${finalNumber}
🌐 País: ${country}
⏳ Tiempo: ${speed}ms

⚠ Ya perdiste...
`;

    await conn.sendMessage(
      m.chat,
      { text: result, mentions: [target] },
      { quoted: m }
    );
  }
};