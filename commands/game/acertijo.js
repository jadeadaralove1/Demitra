export default {
  command: ['acertijo', 'riddle', 'respuesta'],
  tags: ['fun'],
  help: ['#acertijo o #riddle', '#respuesta <tu respuesta>'],
  group: true,

  run: async (conn, m, args) => {
    // Inicializar memoria de acertijos por chat
    global.acertijoActual = global.acertijoActual || {};

    // Si el usuario usa #respuesta
    if (args[0]?.toLowerCase() === "respuesta") {
      const userRespuesta = args.slice(1).join(" ").toLowerCase();
      const correcta = global.acertijoActual[m.chat];

      if (!correcta) 
        return conn.sendMessage(m.chat, { text: "⚠️ No hay acertijo activo. Pide uno con #acertijo" });

      if (userRespuesta === correcta) {
        await conn.sendMessage(m.chat, { text: "🎉 ¡Correcto! ¡Bien hecho!" });
        delete global.acertijoActual[m.chat]; // borrar acertijo resuelto
      } else {
        await conn.sendMessage(m.chat, { text: "❌ Incorrecto, inténtalo de nuevo 😅" });
      }
      return;
    }

    // Lista de acertijos (ejemplo limpio y con comas correctas)
    const acertijos = [
  // ANIMALES
  { pregunta: "Soy grande, gris y tengo trompa.", respuesta: "elefante", categoria: "animal" },
  { pregunta: "Hago 'miau', me gusta cazar ratones.", respuesta: "gato", categoria: "animal" },
  { pregunta: "Hago 'guau', soy el mejor amigo del hombre.", respuesta: "perro", categoria: "animal" },
  { pregunta: "Vivo en el agua y croo croo.", respuesta: "rana", categoria: "animal" },
  { pregunta: "Tengo alas y pico, canto por la mañana.", respuesta: "pájaro", categoria: "animal" },
  { pregunta: "Soy grande, gris y con cuernos.", respuesta: "rinoceronte", categoria: "animal" },
  { pregunta: "Soy el rey de la selva.", respuesta: "león", categoria: "animal" },
  { pregunta: "Tengo rayas blancas y negras.", respuesta: "cebra", categoria: "animal" },
  { pregunta: "Soy rápido, manchas en el cuerpo.", respuesta: "guepardo", categoria: "animal" },
  { pregunta: "Hago miel y vuelo de flor en flor.", respuesta: "abeja", categoria: "animal" },
  { pregunta: "Salto mucho y tengo bolsa.", respuesta: "canguro", categoria: "animal" },
  { pregunta: "Tengo caparazón y camino lento.", respuesta: "tortuga", categoria: "animal" },
  { pregunta: "Soy nocturno, vuelo y hago 'uuuuh'.", respuesta: "búho", categoria: "animal" },
  { pregunta: "Vivo en el agua, tengo aletas y branquias.", respuesta: "pez", categoria: "animal" },
  { pregunta: "Soy grande, rayado y feroz.", respuesta: "tigre", categoria: "animal" },
  { pregunta: "Tengo cuello largo y manchas.", respuesta: "jirafa", categoria: "animal" },
  { pregunta: "Hago 'oink', vivo en granjas.", respuesta: "cerdo", categoria: "animal" },
  { pregunta: "Hago 'muuu', me gusta el pasto.", respuesta: "vaca", categoria: "animal" },
  { pregunta: "Hago 'cuac', vivo en estanques.", respuesta: "pato", categoria: "animal" },
  { pregunta: "Soy blanco y negro, como bamboo.", respuesta: "panda", categoria: "animal" },
  { pregunta: "Vivo en el océano, tengo aletas.", respuesta: "delfín", categoria: "animal" },
  { pregunta: "Tengo patas largas y pico grande, vuelo.", respuesta: "pelícano", categoria: "animal" },
  { pregunta: "Soy rojo y canto al amanecer.", respuesta: "gallo", categoria: "animal" },
  { pregunta: "Tengo cuernos y vivo en montañas.", respuesta: "cabra", categoria: "animal" },
  { pregunta: "Tengo alas y vuelo de noche.", respuesta: "murciélago", categoria: "animal" },
  { pregunta: "Vivo en el océano y tengo tentáculos.", respuesta: "pulpo", categoria: "animal" },
  { pregunta: "Vivo en el hielo y hago 'brrr'.", respuesta: "pingüino", categoria: "animal" },
  { pregunta: "Tengo alas y pico, vuelo alto.", respuesta: "águila", categoria: "animal" },
  { pregunta: "Soy naranja y vivo en bosques fríos.", respuesta: "zorro", categoria: "animal" },
  { pregunta: "Vivo en el desierto y tengo jorobas.", respuesta: "camello", categoria: "animal" },
  { pregunta: "Soy pequeño, rojo y vuelo por el jardín.", respuesta: "colibrí", categoria: "animal" },
  { pregunta: "Soy un felino pequeño y astuto.", respuesta: "gato montés", categoria: "animal" },
  { pregunta: "Soy un ave que no vuela y corro rápido.", respuesta: "avestruz", categoria: "animal" },
  { pregunta: "Soy un reptil que cambia de color.", respuesta: "camaleón", categoria: "animal" },
  { pregunta: "Soy un insecto con colores brillantes.", respuesta: "mariposa", categoria: "animal" },
  { pregunta: "Soy un mamífero grande y azul.", respuesta: "ballena", categoria: "animal" },
  { pregunta: "Soy un roedor pequeño y rápido.", respuesta: "ratón", categoria: "animal" },
  { pregunta: "Soy un felino grande y manchas negras.", respuesta: "leopardo", categoria: "animal" },
  { pregunta: "Soy un mamífero que duerme colgado.", respuesta: "murciélago", categoria: "animal" },
  { pregunta: "Soy un animal de granja que da huevos.", respuesta: "pollo", categoria: "animal" },
  { pregunta: "Soy un insecto que hace miel.", respuesta: "abeja", categoria: "animal" },
  { pregunta: "Soy un ave nocturna y giro la cabeza.", respuesta: "búho", categoria: "animal" },
  { pregunta: "Tengo rayas negras y blancas y vivo en África.", respuesta: "cebra", categoria: "animal" },

  // FRUTAS
  { pregunta: "Soy roja y redonda, me usan en ensaladas y postres.", respuesta: "manzana", categoria: "fruta" },
  { pregunta: "Soy amarilla y curvada, perfecta para un snack.", respuesta: "banana", categoria: "fruta" },
  { pregunta: "Soy pequeña, roja y dulce, crezco en el jardín.", respuesta: "fresa", categoria: "fruta" },
  { pregunta: "Soy naranja y me exprimes para jugo.", respuesta: "naranja", categoria: "fruta" },
  { pregunta: "Soy verde por fuera y roja por dentro, con semillas negras.", respuesta: "sandía", categoria: "fruta" },
  { pregunta: "Soy pequeña y azul, me llaman baya azul.", respuesta: "arándano", categoria: "fruta" },
  { pregunta: "Soy tropical, amarillo por dentro y rugoso por fuera.", respuesta: "piña", categoria: "fruta" },
  { pregunta: "Soy redonda y morada, muy dulce y jugosa.", respuesta: "uva", categoria: "fruta" },
  { pregunta: "Soy verde y redonda, pequeña y ácida.", respuesta: "kiwi", categoria: "fruta" },
  { pregunta: "Soy pequeña y roja, con muchas semillas, me llaman frambuesa.", respuesta: "frambuesa", categoria: "fruta" },
  { pregunta: "Soy amarilla y ácida, me usan para limonadas.", respuesta: "limón", categoria: "fruta" },
  { pregunta: "Soy dulce, anaranjada y suave, muy jugosa.", respuesta: "mandarina", categoria: "fruta" },
  { pregunta: "Soy roja y pequeña, me usan en pasteles y mermeladas.", respuesta: "cereza", categoria: "fruta" },
  { pregunta: "Soy ovalada, verde por fuera y rosa por dentro.", respuesta: "guayaba", categoria: "fruta" },
  { pregunta: "Soy tropical, morada por fuera y naranja por dentro.", respuesta: "mango", categoria: "fruta" },
  { pregunta: "Soy pequeña, negra y ácida, me llaman grosella negra.", respuesta: "grosella", categoria: "fruta" },
  { pregunta: "Soy amarilla y pequeña, muy ácida.", respuesta: "maracuyá", categoria: "fruta" },
  { pregunta: "Soy roja, dulce y crezco en racimos.", respuesta: "uva", categoria: "fruta" },
  { pregunta: "Soy redonda y verde, se parece a una manzana pequeña.", respuesta: "ciruela", categoria: "fruta" },
  { pregunta: "Soy blanca por dentro, dura por fuera, tropical.", respuesta: "coco", categoria: "fruta" },
  { pregunta: "Soy redonda y amarilla, muy jugosa.", respuesta: "melón", categoria: "fruta" },
  { pregunta: "Soy tropical, amarilla y jugosa, me llaman fruta del dragón.", respuesta: "pitahaya", categoria: "fruta" },

  // OBJETOS
  { pregunta: "Sirvo para escribir y tengo tinta dentro.", respuesta: "bolígrafo", categoria: "objeto" },
  { pregunta: "Me usas para leer, tengo páginas y letras.", respuesta: "libro", categoria: "objeto" },
  { pregunta: "Tengo ruedas y motor, te llevo a cualquier lugar.", respuesta: "auto", categoria: "objeto" },
  { pregunta: "Sirvo para medir el tiempo y tengo agujas.", respuesta: "reloj", categoria: "objeto" },
  { pregunta: "Me usas para iluminar y tengo filamento.", respuesta: "lámpara", categoria: "objeto" },
  { pregunta: "Tomo agua y te hidrato.", respuesta: "vaso", categoria: "objeto" },
  { pregunta: "Sirvo para escribir en la computadora.", respuesta: "teclado", categoria: "objeto" },
  { pregunta: "Me usas para apuntar en la computadora.", respuesta: "mouse", categoria: "objeto" },
  { pregunta: "Me llenas de aire y ruedo.", respuesta: "pelota", categoria: "objeto" },
  { pregunta: "Me usas para dormir y soy blando.", respuesta: "almohada", categoria: "objeto" },
  { pregunta: "Sirvo para cortar papeles.", respuesta: "tijeras", categoria: "objeto" },
  { pregunta: "Me usas para limpiar los pisos.", respuesta: "escoba", categoria: "objeto" },
  { pregunta: "Me llenas de agua y me usas para regar.", respuesta: "regadera", categoria: "objeto" },
  { pregunta: "Me pones en la cabeza y protejo tu cabeza.", respuesta: "casco", categoria: "objeto" },
  { pregunta: "Me usas para abrigarte en la lluvia.", respuesta: "paraguas", categoria: "objeto" },
  { pregunta: "Me usas para guardar cosas y tengo tapa.", respuesta: "caja", categoria: "objeto" },
  { pregunta: "Sirvo para cocinar y tengo fuego.", respuesta: "olla", categoria: "objeto" },
  { pregunta: "Me usas para comer sopa.", respuesta: "cuchara", categoria: "objeto" },
  { pregunta: "Sirvo para cortar pan.", respuesta: "cuchillo", categoria: "objeto" },
  { pregunta: "Sirvo para abrir puertas.", respuesta: "llave", categoria: "objeto" },
  { pregunta: "Me usas para sentarte.", respuesta: "silla", categoria: "objeto" },
  { pregunta: "Me usas para dormir.", respuesta: "cama", categoria: "objeto" },
  { pregunta: "Sirvo para cubrirte y abrigarte por la noche.", respuesta: "manta", categoria: "objeto" },
  { pregunta: "Me usas para limpiar la boca después de comer.", respuesta: "servilleta", categoria: "objeto" },
  { pregunta: "Sirvo para sostener lápices y bolígrafos.", respuesta: "portalápices", categoria: "objeto" },
  { pregunta: "Me usas para guardar dinero.", respuesta: "billetera", categoria: "objeto" },
  { pregunta: "Sirvo para llevar cosas en la espalda.", respuesta: "mochila", categoria: "objeto" },
  { pregunta: "Me usas para ver objetos de lejos.", respuesta: "binoculares", categoria: "objeto" },
  { pregunta: "Sirvo para mirar la televisión.", respuesta: "control remoto", categoria: "objeto" },
  { pregunta: "Me usas para cocinar pan y pasteles.", respuesta: "horno", categoria: "objeto" },
  { pregunta: "Sirvo para calentar agua o té.", respuesta: "tetera", categoria: "objeto" },
  { pregunta: "Me usas para beber café.", respuesta: "taza", categoria: "objeto" },
  { pregunta: "Me usas para lavar ropa.", respuesta: "lavadora", categoria: "objeto" },
  { pregunta: "Sirvo para secar ropa.", respuesta: "secadora", categoria: "objeto" },
  { pregunta: "Me usas para ver tu reflejo.", respuesta: "espejo", categoria: "objeto" },
  { pregunta: "Sirvo para mantener las manos calientes.", respuesta: "guantes", categoria: "objeto" },
  { pregunta: "Sirvo para cubrir los pies.", respuesta: "zapatos", categoria: "objeto" },
  { pregunta: "Sirvo para cubrir la cabeza del sol.", respuesta: "sombrero", categoria: "objeto" },
  { pregunta: "Sirvo para escribir en pizarras.", respuesta: "tiza", categoria: "objeto" },
  { pregunta: "Me usas para limpiar ventanas.", respuesta: "trapeador", categoria: "objeto" },
  { pregunta: "Me usas para atar cosas.", respuesta: "cuerda", categoria: "objeto" },
  { pregunta: "Sirvo para protegerte del frío.", respuesta: "abrigo", categoria: "objeto" },
  { pregunta: "Me usas para medir líquidos.", respuesta: "vaso medidor", categoria: "objeto" },
  { pregunta: "Me usas para medir ingredientes secos.", respuesta: "taza medidora", categoria: "objeto" },
  { pregunta: "Me usas para guardar ropa.", respuesta: "armario", categoria: "objeto" },
  { pregunta: "Sirvo para colgar ropa.", respuesta: "percha", categoria: "objeto" },
  { pregunta: "Sirvo para calentar la comida.", respuesta: "microondas", categoria: "objeto" },
  { pregunta: "Me usas para limpiar dientes.", respuesta: "cepillo de dientes", categoria: "objeto" },
  { pregunta: "Me usas para afeitar barba.", respuesta: "rastrillo", categoria: "objeto" },
  { pregunta: "Sirvo para cortar cabello.", respuesta: "tijeras", categoria: "objeto" },
  { pregunta: "Me usas para peinar el cabello.", respuesta: "peine", categoria: "objeto" },
  { pregunta: "Sirvo para ver películas.", respuesta: "televisión", categoria: "objeto" },
  { pregunta: "Me usas para almacenar archivos digitales.", respuesta: "computadora", categoria: "objeto" },
  { pregunta: "Sirvo para guardar comida.", respuesta: "refrigerador", categoria: "objeto" },
  { pregunta: "Me usas para calentar la casa.", respuesta: "estufa", categoria: "objeto" },
  { pregunta: "Me usas para enfriar la casa.", respuesta: "ventilador", categoria: "objeto" },
  { pregunta: "Me usas para sentarte y relajarte.", respuesta: "sofá", categoria: "objeto" },
  { pregunta: "Me usas para escribir notas pequeñas.", respuesta: "post-it", categoria: "objeto" },
  { pregunta: "Me usas para limpiar polvo.", respuesta: "plumero", categoria: "objeto" },
  { pregunta: "Sirvo para sostener libros.", respuesta: "estante", categoria: "objeto" },
  { pregunta: "Sirvo para iluminar y decorar.", respuesta: "lámpara", categoria: "objeto" },
  { pregunta: "Me usas para guardar utensilios de cocina.", respuesta: "cajón", categoria: "objeto" },
  { pregunta: "Me usas para hervir agua.", respuesta: "olla", categoria: "objeto" },
  { pregunta: "Me usas para cortar tela.", respuesta: "tijeras", categoria: "objeto" },
  { pregunta: "Sirvo para mantener la bebida fría.", respuesta: "nevera", categoria: "objeto" }
];
    // Elegir un acertijo aleatorio
    const acertijo = acertijos[Math.floor(Math.random() * acertijos.length)];

    // Guardar respuesta correcta
    global.acertijoActual[m.chat] = acertijo.respuesta.toLowerCase();

    // Enviar el acertijo
    await conn.sendMessage(m.chat, {
      text: `🧩 Acertijo: ${acertijo.pregunta}\n\nResponde con #respuesta <tu respuesta>`
    });
  }
};