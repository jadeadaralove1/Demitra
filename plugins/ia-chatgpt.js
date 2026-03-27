import axios from "axios";
import fetch from "node-fetch";

let handler = async (m, { conn, args }) => {
  const query =
    args?.join(" ") ||
    m.quoted?.text ||
    m.text?.replace(/^([#./!])?(venice|veniceai)\s*/i, "").trim();

  if (!query) {
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key }
    });
    return m.reply("❌ Escribe algo después del comando.");
  }

  try {
    await conn.sendMessage(m.chat, {
      react: { text: '⏳', key: m.key }
    });

    const { data } = await axios.request({
      method: "POST",
      url: "https://outerface.venice.ai/api/inference/chat",
      headers: {
        accept: "*/*",
        "content-type": "application/json",
        origin: "https://venice.ai",
        referer: "https://venice.ai/",
        "user-agent": "Mozilla/5.0 (Android 10; Mobile)",
        "x-venice-version": "interface@20250523.214528+393d253"
      },
      data: {
        requestId: "mifinfinity",
        modelId: "dolphin-3.0-mistral-24b",
        prompt: [{ content: query, role: "user" }],
        systemPrompt: "",
        conversationType: "text",
        temperature: 0.8,
        webEnabled: true,
        topP: 0.9,
        isCharacter: false,
        clientProcessingTime: 15
      }
    });

    let result = "";

    if (typeof data === "string") {
      const chunks = data
        .split("\n")
        .filter(v => v.trim())
        .map(v => {
          try {
            return JSON.parse(v);
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      result = chunks.map(v => v.content || "").join("");
    }

    if (!result) result = "Sin respuesta.";

    await conn.sendMessage(
      m.chat,
      { text: `🧠 *VChatgpt AI:*\n${result}` },
      { quoted: m }
    );

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    });

  } catch (err) {
    console.log(err);
    await conn.sendMessage(m.chat, {
      react: { text: '❎', key: m.key }
    });
    m.reply(`❌ Error: ${err.message}`);
  }
};

handler.help = ['chatgpt'];
handler.tags = ['ia'];
handler.command = ['chatgpt', 'chatgptai'];

export default handler;