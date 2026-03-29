import { exec } from 'child_process';

const handler = async (m, { conn }) => {
    let sentMsg = await m.reply('◜࣭࣭࣭࣭࣭᷼💢̸̷ׁᮬᰰᩫ࣭࣭࣭࣭ Actualizando para ti… un momento, querido');

    exec('git pull', (err, stdout, stderr) => {
        if (err) {
            conn.sendMessage(m.chat, { text: '◜࣭࣭࣭࣭࣭᷼💢̸̷ׁᮬᰰᩫ࣭࣭࣭࣭ Mm… algo salió terriblemente mal...Qué encantador...Supongo que tendré que forzarlo', edit: sentMsg.key }, { quoted: m });

            exec('git reset --hard origin/main && git pull', (err2, stdout2, stderr2) => {
                if (err2) {
                    conn.sendMessage(m.chat, { text: `◜࣭࣭࣭࣭࣭᷼🔐̸̷ׁᮬᰰᩫ࣭࣭࣭࣭ Todo ya estaba en orden… No había nada que actualizar...\nRazón: ${err2.message}`, edit: sentMsg.key }, { quoted: m });
                    return;
                }

                if (stderr2) console.warn(stderr2);
                conn.sendMessage(m.chat, { text: `◜࣭࣭࣭࣭࣭᷼🫐̸̷ׁᮬᰰᩫ࣭࣭࣭࣭ Lo hice a mi manera… Y, por supuesto… funcionó, Nunca falla.\n\n${stdout2}`, edit: sentMsg.key }, { quoted: m });
            });
            return;
        }

        if (stderr) console.warn(stderr);

        if (stdout.includes('Already up to date.')) {
            conn.sendMessage(m.chat, { text: '◜࣭࣭࣭࣭࣭᷼🔐̸̷ׁᮬᰰᩫ࣭࣭࣭࣭Todo ya estaba en orden, No había nada que actualizar.', edit: sentMsg.key }, { quoted: m });
        } else {
            conn.sendMessage(m.chat, { text: `◜࣭࣭࣭࣭࣭᷼🐞̸̷ׁᮬᰰᩫ࣭࣭࣭࣭Actualización completada con éxito!\n\n${stdout}`, edit: sentMsg.key }, { quoted: m });
        }
    });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.owner = true;

export default handler;