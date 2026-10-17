/* ============================================================
   FERIAS  —  acá van las ferias
   ============================================================
   Para AGREGAR una feria: copia un bloque { ... } y pégalo al
   principio de la lista (para que salga primero).

   Campos:
     fecha        Como se mostrará. Ej: "15 y 16 de noviembre 2026"
     mes          Tres letras. Ej: "Nov"
     dia          Día(s). Ej: "15-16"
     nombre       Nombre de la feria
     lugar        Lugar y ciudad
     descripcion  Una o dos frases. Opcional.
     futura       true si todavía no ocurre | false si ya pasó
     imagen       Foto dentro de img/. Ej: "feria-1.jpg"
                  Sin foto: "pendiente"
   ============================================================ */

const FERIAS = [

  {
    fecha: "15 y 16 de noviembre 2026",
    mes: "Nov",
    dia: "15-16",
    nombre: "Feria de Artesanía de la Plaza",
    lugar: "Plaza de Armas, Coyhaique",
    descripcion: "Stand con prendas de lana de oveja natural, hilado propio.",
    futura: true,
    imagen: "pendiente"
  },

  {
    fecha: "5 de diciembre 2026",
    mes: "Dic",
    dia: "5",
    nombre: "Expo Tejidos del Sur",
    lugar: "Gimnasio Municipal, Coyhaique",
    descripcion: "Feria de fin de año, con demostración de hilado en vivo.",
    futura: true,
    imagen: "pendiente"
  }

];
