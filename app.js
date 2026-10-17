/* ============================================================
   app.js  —  motor del sitio
   No hace falta editar nada acá.
   ============================================================ */

/* ---------- Utilidades ---------- */

function formatearPrecio(n) {
  const s = String(n == null ? "" : n).replace(/\D/g, "");
  if (!s) return "";
  return CONFIG.moneda + s.replace(/\B(?=(\d{3})+(?!\d))/g, CONFIG.separadorMiles);
}

function linkWhatsApp(mensaje) {
  return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(mensaje);
}

function existeFoto(valor) {
  return valor && valor !== "pendiente" && valor !== "";
}

/* Solo el nombre del archivo de una foto */
function nombreDeFoto(valor) {
  if (!valor) return "";
  if (typeof valor === "object") valor = valor.path || valor.url || "";
  const limpio = String(valor).trim().replace(/\\/g, "/");
  if (!limpio || limpio === "pendiente") return "pendiente";
  return limpio.split("/").pop() || "pendiente";
}

/* Icono de WhatsApp en SVG (sin dependencias externas) */
const ICONO_WSP =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.78 9.78 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.81-9.8a9.75 9.75 0 0 1 9.79 9.81c0 5.4-4.4 9.8-9.79 9.8zm8.34-18.14A11.72 11.72 0 0 0 12.05 0C5.53 0 .22 5.31.22 11.83c0 2.09.55 4.12 1.59 5.92L.12 24l6.4-1.68a11.8 11.8 0 0 0 5.53 1.41h.01c6.51 0 11.82-5.31 11.82-11.83 0-3.16-1.23-6.13-3.49-8.36z"/></svg>';

/* ---------- Navegación ---------- */

function inicializarMenu() {
  const boton = document.querySelector(".boton-menu");
  const menu = document.querySelector(".menu");
  if (boton && menu) {
    boton.addEventListener("click", () => menu.classList.toggle("abierto"));
  }

  const actual = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach((a) => {
    const destino = a.getAttribute("href");
    if (destino === actual) a.classList.add("activo");
  });
}

/* ---------- Textos editables (textos.js) ---------- */

function ponerTexto(clave, valor) {
  if (!valor) return;
  document.querySelectorAll('[data-contenido="' + clave + '"]').forEach((el) => {
    el.textContent = valor;
  });
}

function pintarTextos() {
  if (typeof TEXTOS === "undefined") return;

  if (TEXTOS.portada) {
    ponerTexto("portada.titulo", TEXTOS.portada.titulo);
    ponerTexto("portada.bajada", TEXTOS.portada.bajada);
    ponerTexto("portada.bloque_titulo", TEXTOS.portada.bloque_titulo);
    ponerTexto("portada.bloque_texto", TEXTOS.portada.bloque_texto);
  }

  if (TEXTOS.sobremi) {
    ponerTexto("sobremi.titulo", TEXTOS.sobremi.titulo);

    const contParrafos = document.getElementById("parrafos-sobremi");
    if (contParrafos && Array.isArray(TEXTOS.sobremi.parrafos) && TEXTOS.sobremi.parrafos.length) {
      contParrafos.innerHTML = TEXTOS.sobremi.parrafos
        .map((t) => "<p>" + t + "</p>")
        .join("");
    }

    const contValores = document.getElementById("valores-sobremi");
    if (contValores && Array.isArray(TEXTOS.sobremi.valores) && TEXTOS.sobremi.valores.length) {
      contValores.innerHTML = TEXTOS.sobremi.valores
        .map((t) => "<li>" + t + "</li>")
        .join("");
    }
  }

  if (Array.isArray(TEXTOS.recuadros) && TEXTOS.recuadros.length) {
    const cont = document.getElementById("recuadros-portada");
    if (cont) {
      cont.innerHTML = TEXTOS.recuadros.map((r) =>
        '<article class="tarjeta aparece">' +
          '<div class="tarjeta-cuerpo">' +
            "<h3>" + r.titulo + "</h3>" +
            '<p class="material">' + r.texto + "</p>" +
          "</div>" +
        "</article>"
      ).join("");
    }
  }
}

/* ---------- Datos del negocio en la página ---------- */

function pintarDatosGenerales() {
  document.querySelectorAll("[data-nombre]").forEach((el) => (el.textContent = CONFIG.nombre));
  document.querySelectorAll("[data-artesana]").forEach((el) => (el.textContent = CONFIG.artesana));
  document.querySelectorAll("[data-ciudad]").forEach((el) => (el.textContent = CONFIG.ciudad));
  document.title = document.title.replace("{nombre}", CONFIG.nombre);

  document.querySelectorAll("[data-wsp]").forEach((el) => {
    const mensaje = el.getAttribute("data-wsp") ||
      "Hola " + CONFIG.artesana + ", vi la página de " + CONFIG.nombre + " y quiero consultar por una prenda.";
    el.setAttribute("href", linkWhatsApp(mensaje));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  document.querySelectorAll("[data-enlace-correo]").forEach((el) => {
    if (CONFIG.correo) el.href = "mailto:" + CONFIG.correo;
    else el.style.display = "none";
  });
  document.querySelectorAll("[data-enlace-instagram]").forEach((el) => {
    if (CONFIG.instagram) el.href = "https://instagram.com/" + CONFIG.instagram.replace("@", "");
    else el.style.display = "none";
  });
}

/* ---------- Galería de prendas ---------- */

function tarjetaProducto(p, indice) {
  const vendido = p.estado === "vendido";
  const foto = existeFoto(nombreDeFoto(p.imagen))
    ? '<img src="img/' + nombreDeFoto(p.imagen) + '" alt="' + p.nombre + '" loading="lazy">'
    : '<div class="foto-vacia">Foto pendiente<br><small>' + p.nombre + "</small></div>";

  const etiqueta = vendido
    ? '<span class="etiqueta-unica" style="background:rgba(74,55,40,.85)">Vendido</span>'
    : '<span class="etiqueta-unica">Pieza única</span>';

  const mensaje = "Hola " + CONFIG.artesana + ", me interesa \"" + p.nombre +
    "\" (" + formatearPrecio(p.precio) + ") que vi en " + CONFIG.nombre + ".";

  return `
    <article class="tarjeta aparece" data-categoria="${p.categoria}">
      <div class="tarjeta-imagen" data-indice="${indice}">
        ${foto}
        ${etiqueta}
      </div>
      <div class="tarjeta-cuerpo">
        <h3>${p.nombre}</h3>
        <p class="material">${p.material || ""}</p>
        <p class="precio">${formatearPrecio(p.precio)}</p>
        <a class="boton boton-wsp boton-chico" href="${linkWhatsApp(mensaje)}"
           target="_blank" rel="noopener">${ICONO_WSP} Consultar</a>
      </div>
    </article>`;
}

function pintarGaleria() {
  const contenedor = document.getElementById("rejilla-productos");
  if (!contenedor) return;
  if (typeof PRODUCTOS === "undefined") return;

  contenedor.innerHTML = PRODUCTOS.map(tarjetaProducto).join("");

  document.querySelectorAll(".filtro").forEach((boton) => {
    boton.addEventListener("click", () => {
      document.querySelectorAll(".filtro").forEach((b) => b.classList.remove("activo"));
      boton.classList.add("activo");
      const cat = boton.dataset.categoria;
      document.querySelectorAll("#rejilla-productos .tarjeta").forEach((t) => {
        const mostrar = cat === "todas" || t.dataset.categoria === cat;
        t.style.display = mostrar ? "" : "none";
      });
    });
  });

  inicializarLightbox();
}

/* ---------- Ferias ---------- */

function fichaFeria(f) {
  const archivo = nombreDeFoto(f.imagen);
  const foto = existeFoto(archivo)
    ? '<img src="img/' + archivo + '" alt="' + f.nombre + '" loading="lazy" style="border-radius:10px;margin-top:14px;max-height:230px;object-fit:cover;width:100%">'
    : "";

  return `
    <div class="ficha-feria aparece ${f.futura ? "proxima" : ""}">
      <div class="fecha-feria">
        <strong>${f.dia || ""}</strong>${f.mes || ""}
      </div>
      <div class="detalle-feria">
        ${f.futura ? '<span class="etiqueta-prox">Próxima feria</span>' : ""}
        <h3>${f.nombre}</h3>
        <p class="lugar-feria">${f.lugar || ""}</p>
        <p>${f.descripcion || ""}</p>
        ${foto}
      </div>
    </div>`;
}

function pintarFerias() {
  const contenedor = document.getElementById("lista-ferias");
  if (!contenedor) return;
  if (typeof FERIAS === "undefined") return;
  contenedor.innerHTML = FERIAS.map(fichaFeria).join("");
}

/* ---------- Galería de fotos de ferias ---------- */

function pintarFotosFerias() {
  const contenedor = document.getElementById("rejilla-fotos-ferias");
  if (!contenedor) return;
  if (typeof FERIAS === "undefined") return;

  const fotos = FERIAS.filter((f) => existeFoto(nombreDeFoto(f.imagen)));
  if (fotos.length === 0) {
    contenedor.outerHTML =
      '<div class="foto-vacia" style="border-radius:14px;padding:50px 20px">' +
      "Acá van las fotos de las ferias.<br><small>Sube las imágenes a la carpeta <code>img/</code> " +
      "y escribe el nombre del archivo en <code>ferias.js</code>.</small></div>";
    return;
  }

  contenedor.innerHTML = fotos.map((f) =>
    '<div class="tarjeta aparece"><div class="tarjeta-imagen">' +
    '<img src="img/' + nombreDeFoto(f.imagen) + '" alt="' + f.nombre + '" loading="lazy"></div>' +
    '<div class="tarjeta-cuerpo"><h3>' + f.nombre + "</h3>" +
    '<p class="material">' + (f.fecha || "") + "</p></div></div>"
  ).join("");
}

/* ---------- Visor de fotos (lightbox) ---------- */

function inicializarLightbox() {
  const caja = document.getElementById("lightbox");
  if (!caja || typeof PRODUCTOS === "undefined") return;

  const imagen = caja.querySelector("img");
  const info = caja.querySelector(".lightbox-info");
  const disponibles = PRODUCTOS.filter((p) => existeFoto(nombreDeFoto(p.imagen)));
  let posicion = 0;

  function abrir(i) {
    posicion = i;
    const p = disponibles[posicion];
    if (!p) return;
    imagen.src = "img/" + nombreDeFoto(p.imagen);
    imagen.alt = p.nombre;
    info.textContent = p.nombre + " — " + formatearPrecio(p.precio);
    caja.classList.add("abierto");
  }

  document.querySelectorAll(".tarjeta-imagen").forEach((el) => {
    el.addEventListener("click", () => {
      const nombre = el.querySelector("img") ? el.querySelector("img").alt : "";
      const i = disponibles.findIndex((p) => p.nombre === nombre);
      if (i >= 0) abrir(i);
    });
  });

  caja.querySelector(".lightbox-cerrar").addEventListener("click", () => caja.classList.remove("abierto"));
  caja.addEventListener("click", (e) => { if (e.target === caja) caja.classList.remove("abierto"); });

  caja.querySelector(".lightbox-prev").addEventListener("click", (e) => {
    e.stopPropagation();
    abrir((posicion - 1 + disponibles.length) % disponibles.length);
  });
  caja.querySelector(".lightbox-next").addEventListener("click", (e) => {
    e.stopPropagation();
    abrir((posicion + 1) % disponibles.length);
  });

  document.addEventListener("keydown", (e) => {
    if (!caja.classList.contains("abierto")) return;
    if (e.key === "Escape") caja.classList.remove("abierto");
    if (e.key === "ArrowLeft") abrir((posicion - 1 + disponibles.length) % disponibles.length);
    if (e.key === "ArrowRight") abrir((posicion + 1) % disponibles.length);
  });
}

/* ---------- Fotos principales ---------- */

function pintarFotoPrincipal() {
  document.querySelectorAll("[data-foto]").forEach((caja) => {
    const archivo = caja.getAttribute("data-foto");
    if (!archivo) return;
    const respaldo = caja.querySelector(".foto-vacia");
    const img = new Image();

    img.onload = () => {
      caja.innerHTML = "";
      caja.appendChild(img);
    };
    img.onerror = () => {
      if (respaldo) respaldo.hidden = false;
    };
    img.alt = CONFIG.nombre;
    img.loading = "lazy";
    img.src = "img/" + archivo;
  });
}

/* ---------- Aparecer al hacer scroll ---------- */

function inicializarAnimaciones() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".aparece").forEach((el) => el.classList.add("visible"));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.08 });

  document.querySelectorAll(".aparece").forEach((el) => observador.observe(el));
}

/* ---------- Arranque ---------- */

document.addEventListener("DOMContentLoaded", () => {
  inicializarMenu();
  pintarDatosGenerales();
  pintarTextos();
  pintarFotoPrincipal();
  pintarGaleria();
  pintarFerias();
  pintarFotosFerias();
  inicializarAnimaciones();
});
