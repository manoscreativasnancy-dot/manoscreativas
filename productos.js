/* ============================================================
   TEJIDOS  —  acá van las prendas
   ============================================================
   Para AGREGAR una prenda: copia un bloque { ... }, pégalo al
   principio de la lista (para que salga primero) y cambia los datos.

   Campos:
     nombre       Nombre de la prenda
     categoria    chaleco | chal | gorro | bufanda | mantas | otro
     material     Ej: "Lana de oveja natural"
     precio       Solo números, sin puntos. Ej: 45000
     estado       disponible | vendido | encargo
     descripcion  Una frase. Opcional.
     imagen       Nombre del archivo dentro de img/
                  Ej: "chaleco-1.jpg"
                  Si no hay foto todavía: "pendiente"

   OJO CON LAS COMAS: después de cada dato va una coma, y entre
   un bloque y el siguiente también. Si falta una, la galería
   queda vacía.
   ============================================================ */

const PRODUCTOS = [

  {
    nombre: "Chaleco trenzado",
    categoria: "chaleco",
    material: "Lana de oveja natural, teñido con cáscara de cebolla",
    precio: 45000,
    estado: "disponible",
    descripcion: "Tejido a palillo grueso, sin costuras laterales.",
    imagen: "chaleco-1.jpg"
  },

  {
    nombre: "Chal de abrigo",
    categoria: "chal",
    material: "Lana de oveja natural, hilado a mano",
    precio: 38000,
    estado: "disponible",
    descripcion: "Punto amplio, liviano y muy abrigador.",
    imagen: "pendiente"
  },

  {
    nombre: "Gorro con pompón",
    categoria: "gorro",
    material: "Lana de oveja natural",
    precio: 15000,
    estado: "disponible",
    descripcion: "Pompón de lana cardada.",
    imagen: "pendiente"
  },

  {
    nombre: "Bufanda larga",
    categoria: "bufanda",
    material: "Lana de oveja natural",
    precio: 22000,
    estado: "disponible",
    descripcion: "Punto inglés, se puede usar cruzada.",
    imagen: "pendiente"
  },

  {
    nombre: "Manta de sofá",
    categoria: "mantas",
    material: "Lana de oveja natural, hilado artesanal",
    precio: 85000,
    estado: "disponible",
    descripcion: "Tejida en telar, medida aproximada 1,2 x 1,6 m.",
    imagen: "pendiente"
  }

];
