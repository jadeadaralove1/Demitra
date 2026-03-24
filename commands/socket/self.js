export default {
  command: ['self'],
  category: 'socket',
  run: async (client, m, args) => {
    const idBot = client.user.id.split(':')[0] + '@s.whatsapp.net';
    const config = global.db.data.settings[idBot];

    const isOwner2 = [
      idBot,
      ...(config.owner ? [config.owner] : []),
      ...global.owner.map(num => num + '@s.whatsapp.net')
    ].includes(m.sender);

    if (!isOwner2) return m.reply('No tienes permisos para usar este comando.');

    const chat = global.db.data.settings[idBot];
    const estado = chat.self ?? false;

    if (args[0] === 'enable' || args[0] === 'on') {
      if (estado) return m.reply('El modo Self ya estaba activado.');
      chat.self = true;
      return m.reply('Has activado el modo Self.');
    }

    if (args[0] === 'disable' || args[0] === 'off') {
      if (!estado) return m.reply('El modo Self ya estaba desactivado.');
      chat.self = false;
      return m.reply('Has desactivado el modo Self.');
    }

    return m.reply(
      `Self\nEstado: ${estado ? '✓ Activado' : '✗ Desactivado'}\n\nPuedes cambiarlo con:\n- Activar › self enable\n- Desactivar › self disable`
    );
  },
};