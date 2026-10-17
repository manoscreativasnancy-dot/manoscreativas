/* ============================================================
   FERIAS  —  acá se agregan las ferias
   ============================================================
   Para AGREGAR una feria: copiar un bloque { ... }, pegarlo al
   principio de la lista (para que aparezca primero) y cambiar
   los datos.

   Campos:
     fecha        Texto de la fecha, ej: "15 y 16 de noviembre 2026"
     mes          Mes corto para el costado, ej: "Nov"
     dia          Día(s) para el costado, ej: "15-16"
     nombre       Nombre de la feria
     lugar        Ciudad y dirección
     descripcion  Una o dos frases. Opcional.
     futura       true si todavía no ocurre  |  false si ya pasó
     imagen       Foto de la feria, ej: "feria-1.jpg"
                  Sin foto todavía: dejar la palabra: pendiente
   ============================================================ */

const FERIAS = [

  {
    fecha: "15 y 16 de noviembre 2026",
    mes: "Nov",
    dia: "15-16",
    nombre: "Feria de Artesanía de la Plaza",
    lugar: "Plaza de Armas, Puerto Natales",
    descripcion: "Stand con prendas de lana de oveja natural, hilado propio.",
    futura: true,
    imagen: "pendiente"
  },

  {
    fecha: "5 de diciembre 2026",
    mes: "Dic",
    dia: "5",
    nombre: "Expo Tejidos del Sur",
    lugar: "Gimnasio Municipal, Punta Arenas",
    descripcion: "Feria de invierno, con demostración de hilado en vivo.",
    futura: true,
    imagen: "pendiente"
  },

  {
    fecha: "12 de abril 2026",
    mes: "Abr",
    dia: "12",
    nombre: "Mercado de Mujeres Creadoras",
    lugar: "Centro Cultural, Puerto Natales",
    descripcion: "Primera feria del año. Se agotaron los gorros el primer día.",
    futura: false,
    imagen: "pendiente"
  }

];
