/* ============================================================
   PRODUCTOS  —  acá se agregan las prendas
   ============================================================
   Para AGREGAR una prenda: copiar un bloque { ... }, pegarlo
   antes del cierre "]" y cambiar los datos.

   Campos:
     nombre       Nombre de la prenda
     categoria    chaleco | chal | gorro | bufanda | mantas | otro
     material     Ej: "Lana de oveja natural"
     precio       El precio en pesos, SOLO números (ej: 45000)
     estado       "disponible" | "vendido" | "encargo"
     descripcion  Una frase. Opcional.
     imagen       Nombre del archivo de la foto, ej: "chaleco-1.jpg"
                  Si no hay foto todavía, dejar la palabra: pendiente

   IMPORTANTE: las comas entre bloques y al final de cada línea
   de datos. Si algo queda mal, la página no muestra nada.
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
  },

  {
    nombre: "Chaleco con cuello alto",
    categoria: "chaleco",
    material: "Lana de oveja natural",
    precio: 48000,
    estado: "vendido",
    descripcion: "Pieza única, repetible por encargo.",
    imagen: "pendiente"
  }

];
