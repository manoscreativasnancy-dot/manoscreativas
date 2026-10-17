/* ============================================================
   leer.js  —  lee el contenido que se publica desde el panel
   ============================================================
   Trae el contenido de la carpeta contenido/ y lo deja
   disponible para que el sitio lo muestre.

   Acepta TRES formas de guardar la misma lista:

     1) Archivo único con lista suelta:
        contenido/ferias.json      ->  [ {...}, {...} ]

     2) Archivo único con lista envuelta (lo que escribe el panel):
        contenido/ferias.json      ->  { "ferias": [ {...} ] }

     3) Una carpeta, un archivo por elemento (lo que también
        puede escribir el panel):
        contenido/ferias/feria-1.json
        contenido/ferias/feria-2.json

   Y hay una lista escrita a mano dentro del propio archivo
   (LISTA_CONOCIDA), que es la última red de seguridad: si todo
   lo demás falla, el sitio igual muestra las ferias originales
   en lugar de quedarse vacío.
   ============================================================ */

const RUTA_CONTENIDO = "contenido/";

/* Última red de seguridad: la lista que venía escrita a mano.
   Solo se usa si no se pudo leer nada de la carpeta contenido/. */
const LISTA_CONOCIDA = {
  "ferias.json": [
    { fecha: "15 y 16 de noviembre 2026", mes: "Nov", dia: "15-16",
      nombre: "Feria de Artesanía de la Plaza", lugar: "Plaza de Armas, Coyhaique",
      descripcion: "Stand con prendas de lana de oveja natural, hilado propio.",
      futura: true, imagen: "pendiente" },
    { fecha: "5 de diciembre 2026", mes: "Dic", dia: "5",
      nombre: "Expo Tejidos del Sur", lugar: "Gimnasio Municipal, Coyhaique",
      descripcion: "Feria de fin de año, con demostración de hilado en vivo.",
      futura: true, imagen: "pendiente" },
    { fecha: "12 de abril 2026", mes: "Abr", dia: "12",
      nombre: "Mercado de Mujeres Creadoras", lugar: "Centro Cultural, Coyhaique",
      descripcion: "Primera feria del año. Se agotaron los gorros el primer día.",
      futura: false, imagen: "pendiente" }
  ],
  "tejidos.json": [
    { nombre: "Chaleco trenzado", categoria: "chaleco",
      material: "Lana de oveja natural, teñido con cáscara de cebolla",
      precio: 45000, estado: "disponible",
      descripcion: "Tejido a palillo grueso, sin costuras laterales.",
      imagen: "chaleco-1.jpg" },
    { nombre: "Chal de abrigo", categoria: "chal",
      material: "Lana de oveja natural, hilado a mano",
      precio: 38000, estado: "disponible",
      descripcion: "Punto amplio, liviano y muy abrigador.", imagen: "pendiente" },
    { nombre: "Gorro con pompón", categoria: "gorro",
      material: "Lana de oveja natural", precio: 15000, estado: "disponible",
      descripcion: "Pompón de lana cardada.", imagen: "pendiente" },
    { nombre: "Bufanda larga", categoria: "bufanda",
      material: "Lana de oveja natural", precio: 22000, estado: "disponible",
      descripcion: "Punto inglés, se puede usar cruzada.", imagen: "pendiente" },
    { nombre: "Manta de sofá", categoria: "mantas",
      material: "Lana de oveja natural, hilado artesanal",
      precio: 85000, estado: "disponible",
      descripcion: "Tejida en telar, medida aproximada 1,2 x 1,6 m.",
      imagen: "pendiente" },
    { nombre: "Chaleco con cuello alto", categoria: "chaleco",
      material: "Lana de oveja natural", precio: 48000, estado: "vendido",
      descripcion: "Pieza única, repetible por encargo.", imagen: "pendiente" }
  ]
};

async function traerJSON(ruta) {
  try {
    const r = await fetch(ruta, { cache: "no-cache" });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) {
    return null;
  }
}

/* Saca la lista de una respuesta, venga suelta o envuelta */
function buscarLista(datos, nombres) {
  if (Array.isArray(datos)) return datos;
  if (!datos || typeof datos !== "object") return null;

  for (const nombre of nombres) {
    if (Array.isArray(datos[nombre])) return datos[nombre];
  }

  // Si tiene una sola propiedad que sea lista, es esa
  for (const clave of Object.keys(datos)) {
    if (Array.isArray(datos[clave])) return datos[clave];
  }

  return null;
}

/* Lee una carpeta donde hay un archivo por elemento.
   Se apoya en un índice que el panel puede escribir.
   Si no hay índice, se prueban nombres numerados. */
async function leerCarpeta(nombreCarpeta) {
  const resultados = [];

  // 1) Índice dentro de la propia carpeta
  const indice = await traerJSON(RUTA_CONTENIDO + nombreCarpeta + "/index.json");
  if (Array.isArray(indice)) return indice;
  if (indice && Array.isArray(indice.items)) return indice.items;

  // 2) Archivos numerados o con nombre conocido
  const posibles = [];
  for (let i = 1; i <= 12; i++) {
    posibles.push(RUTA_CONTENIDO + nombreCarpeta + "/" + i + ".json");
    posibles.push(RUTA_CONTENIDO + nombreCarpeta + "/" + nombreCarpeta.slice(0, -1) + "-" + i + ".json");
    posibles.push(RUTA_CONTENIDO + nombreCarpeta + "/" + i.toString().padStart(2, "0") + ".json");
  }

  const leidos = await Promise.all(posibles.map((p) => traerJSON(p)));
  leidos.forEach((d) => { if (d && typeof d === "object" && !Array.isArray(d)) resultados.push(d); });

  return resultados.length ? resultados : null;
}

/* Lee una lista probando todas las formas posibles.
   Devuelve null solo si no encontró nada en ningún lado.     */
async function leerLista(archivo, carpeta, nombres) {
  // Forma 1 y 2: archivo único
  const datos = await traerJSON(RUTA_CONTENIDO + archivo);
  const lista = buscarLista(datos, nombres);
  if (lista && lista.length) return lista;

  // Forma 3: carpeta con un archivo por elemento
  const deCarpeta = await leerCarpeta(carpeta);
  if (deCarpeta && deCarpeta.length) return deCarpeta;

  // Última red: la lista escrita a mano en este archivo
  return LISTA_CONOCIDA[archivo] || null;
}

/* Deja solo el nombre del archivo de una foto.
   El panel guarda la ruta completa; el sitio solo necesita
   el nombre para armarla como img/<archivo>              */
function nombreDeFoto(valor) {
  if (!valor) return "pendiente";
  if (typeof valor === "object") valor = valor.path || valor.url || "";
  const limpio = String(valor).trim();
  if (!limpio) return "pendiente";
  const nombre = limpio.replace(/\\/g, "/").split("/").pop();
  return nombre || "pendiente";
}

/* Escribe un valor en los elementos que tengan esa etiqueta */
function ponerTexto(clave, valor) {
  if (!valor) return;
  document.querySelectorAll('[data-contenido="' + clave + '"]').forEach((el) => {
    el.textContent = valor;
  });
}

/* Normaliza una feria para que la ficha siempre se pueda dibujar */
function normalizarFeria(f) {
  const item = Object.assign({}, f);
  item.imagen = nombreDeFoto(item.imagen);
  if (!item.mes) item.mes = String(item.fecha || "").replace(/^[^a-zA-Z]*/, "").slice(0, 3) || "—";
  if (item.dia === undefined || item.dia === null) item.dia = "";
  if (typeof item.futura !== "boolean") item.futura = true;
  return item;
}

/* Normaliza una prenda */
function normalizarTejido(p) {
  const item = Object.assign({}, p);
  item.imagen = nombreDeFoto(item.imagen);
  if (!item.categoria) item.categoria = "otro";
  if (item.precio !== undefined && item.precio !== null) {
    item.precio = String(item.precio).replace(/\D/g, "");
  } else {
    item.precio = "0";
  }
  if (!item.material) item.material = "Lana de oveja natural";
  return item;
}

async function aplicarContenido() {
  /* ---- Datos generales (contacto, WhatsApp, ciudad) ---- */
  const datos = await traerJSON(RUTA_CONTENIDO + "datos.json");
  if (datos) {
    if (datos.nombre) CONFIG.nombre = datos.nombre;
    if (datos.artesana) CONFIG.artesana = datos.artesana;
    if (datos.whatsapp) CONFIG.whatsapp = String(datos.whatsapp).replace(/\D/g, "");
    if (datos.ciudad) CONFIG.ciudad = datos.ciudad;
    CONFIG.instagram = datos.instagram || "";
    CONFIG.correo = datos.correo || "";
  }

  /* ---- Página de inicio ---- */
  const portada = await traerJSON(RUTA_CONTENIDO + "portada.json");
  if (portada) {
    ponerTexto("portada.titulo", portada.titulo);
    ponerTexto("portada.bajada", portada.bajada);
    ponerTexto("portada.bloque_titulo", portada.bloque_titulo);
    ponerTexto("portada.bloque_texto", portada.bloque_texto);
  }

  /* ---- Sobre mí ---- */
  const sobre = await traerJSON(RUTA_CONTENIDO + "sobremi.json");
  if (sobre) {
    ponerTexto("sobremi.titulo", sobre.titulo);

    const contParrafos = document.getElementById("parrafos-sobremi");
    const parrafos = buscarLista(sobre.parrafos, ["parrafos", "textos"]);
    if (contParrafos && parrafos && parrafos.length) {
      contParrafos.innerHTML = parrafos
        .map((p) => "<p>" + (p && p.texto ? p.texto : p) + "</p>")
        .join("");
    }

    const contValores = document.getElementById("valores-sobremi");
    const valores = buscarLista(sobre.valores, ["valores", "caracteristicas"]);
    if (contValores && valores && valores.length) {
      contValores.innerHTML = valores
        .map((v) => "<li>" + (v && v.texto ? v.texto : v) + "</li>")
        .join("");
    }

    if (sobre.foto) {
      const archivo = nombreDeFoto(sobre.foto);
      document.querySelectorAll("[data-foto]").forEach((el) => {
        if (el.getAttribute("data-foto") === "artesana.jpg") {
          el.setAttribute("data-foto", archivo);
        }
      });
    }
  }

  /* ---- Tejidos ---- */
  const listaTejidos = await leerLista("tejidos.json", "tejidos", ["prendas", "tejidos", "productos"]);
  if (listaTejidos && listaTejidos.length) {
    const normalizados = listaTejidos.map(normalizarTejido);
    PRODUCTOS.length = 0;
    normalizados.forEach((p) => PRODUCTOS.push(p));
  }

  /* ---- Ferias ---- */
  const listaFerias = await leerLista("ferias.json", "ferias", ["ferias"]);
  if (listaFerias && listaFerias.length) {
    const normalizadas = listaFerias.map(normalizarFeria);
    // Las próximas primero, y las que ya pasaron al final
    normalizadas.sort((a, b) => (b.futura ? 1 : 0) - (a.futura ? 1 : 0));
    FERIAS.length = 0;
    normalizadas.forEach((f) => FERIAS.push(f));
  }
}
