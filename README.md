# Manos Creativas — sitio web

Sitio estático (HTML + CSS + JavaScript, sin frameworks) pensado para publicarse
en **Cloudflare Pages** y apuntar el dominio `manoscreativas.cl`.

---

## 1. Archivos del sitio

```
sitio/
├── index.html        Portada
├── galeria.html      Catálogo de tejidos
├── ferias.html       Ferias y fotos
├── sobre.html        Quién teje
├── style.css         Todo el diseño (colores, tipografías)
├── config.js         ← DATOS DEL NEGOCIO (WhatsApp, nombre, Instagram…)
├── productos.js      ← LAS PRENDAS
├── ferias.js         ← LAS FERIAS
├── app.js            Motor del sitio (no tocar)
└── img/              Todas las fotos van acá
```

---

## 2. Cambiar los datos de tu mamá

Abrir **`config.js`** con cualquier editor de texto (Bloc de notas, TextEdit, VS Code)
y cambiar:

| Campo | Qué poner |
|---|---|
| `nombre` | Nombre del emprendimiento |
| `artesana` | El nombre de tu mamá |
| `whatsapp` | **Número con código de país, sin `+` ni espacios**: `56912345678` |
| `instagram` | Usuario sin `@`. Si no tiene, dejar `""` |
| `correo` | Correo de contacto. Si no hay, dejar `""` |
| `ciudad` | Ciudad que aparece en el pie |

### ⚠️ El número de WhatsApp

Es lo más importante. El formato correcto para Chile es:

```
56  +  9  +  8 dígitos   →   56912345678
```

Sin `+`, sin espacios, sin guiones. Si queda mal, los botones verdes no abren nada.

---

## 3. Agregar una prenda

Abrir **`productos.js`** y copiar un bloque `{ ... }` antes del `]` final:

```js
  {
    nombre: "Chaleco trenzado",
    categoria: "chaleco",        // chaleco | chal | gorro | bufanda | mantas | otro
    material: "Lana de oveja natural",
    precio: 45000,               // solo números, sin puntos
    estado: "disponible",        // disponible | vendido | encargo
    descripcion: "Tejido a palillo grueso.",
    imagen: "chaleco-1.jpg"      // el archivo dentro de img/
  },
```

**Ojo con las comas**: después de cada línea de datos va una coma, y entre un bloque
y el siguiente también. Si falta una coma, la galería queda vacía.

Si todavía no hay foto, dejar `imagen: "pendiente"` y la tarjeta muestra un recuadro
con el nombre de la prenda.

### La foto

1. Guardar la imagen en la carpeta `img/`
2. Poner el nombre exacto del archivo en `imagen:` — respetar mayúsculas y la extensión
   (`.jpg`, `.jpeg`, `.png`, `.webp`)
3. Recomendado: fotos cuadradas, de unos 800 × 800 px, y menos de 300 KB

---

## 4. Agregar una feria

Igual, en **`ferias.js`**. Copiar un bloque y pegarlo **al principio** de la lista
para que aparezca primero:

```js
  {
    fecha: "20 y 21 de marzo 2027",
    mes: "Mar",
    dia: "20-21",
    nombre: "Nombre de la feria",
    lugar: "Lugar, Ciudad",
    descripcion: "Una o dos frases.",
    futura: true,              // true = todavía no ocurre
    imagen: "feria-1.jpg"      // o "pendiente"
  },
```

El sitio separa automáticamente las próximas ferias (con fondo destacado y la
etiqueta verde) de las que ya pasaron.

---

## 5. Subirlo a Cloudflare Pages

### Opción A — arrastrar y soltar (la más simple)

1. Entrar a <https://dash.cloudflare.com> y crear cuenta (gratis)
2. En el menú lateral: **Workers & Pages** → **Create application** → pestaña **Pages**
3. Elegir **Upload assets** / **Use direct upload**
4. Nombre del proyecto: `manoscreativas`
5. Arrastrar **la carpeta completa** `sitio` (con todo lo de adentro) o su `.zip`
6. **Deploy site**
7. Queda publicado en `manoscreativas.pages.dev`

### Opción B — con GitHub (se actualiza solo)

1. Subir la carpeta a un repositorio de GitHub
2. En Cloudflare Pages: **Create application → Pages → Connect to Git**
3. Framework preset: **None**
4. Build command: `exit 0`
5. Build output directory: `/` (o la subcarpeta donde estén los HTML)

Cada vez que se cambie algo en GitHub, el sitio se republica solo.

---

## 6. Conectar `manoscreativas.cl`

El dominio está registrado en **NIC Chile**, y NIC Chile no permite mover los DNS
libremente desde el panel. Hay dos caminos:

### Camino 1 — Delegar el dominio a Cloudflare (recomendado)

1. En Cloudflare: **Add a site** → escribir `manoscreativas.cl` → plan **Free**
2. Cloudflare entrega dos nameservers, algo así como
   `ada.ns.cloudflare.com` y `bob.ns.cloudflare.com`
3. Entrar a <https://www.nic.cl> con la cuenta del dominio
4. Buscar la opción de **modificar servidores DNS / delegación** y reemplazar los
   actuales por los dos que dio Cloudflare
5. Guardar. La propagación puede tardar desde minutos hasta 24–48 horas
6. Cuando Cloudflare confirme el dominio, ir al proyecto Pages →
   **Custom domains** → **Set up a custom domain** → escribir `manoscreativas.cl`
7. Repetir con `www.manoscreativas.cl` si se quiere que también funcione con www

### Camino 2 — Dejarlo en NIC Chile y apuntar con CNAME

Si NIC Chile permite registros DNS para el dominio:

1. En Cloudflare Pages → **Custom domains** → agregar `manoscreativas.cl`
   (Cloudflare dará un destino tipo `manoscreativas.pages.dev`)
2. En NIC Chile, crear un registro **CNAME** para `www` apuntando a
   `manoscreativas.pages.dev`
3. Para el dominio raíz (sin www), NIC Chile necesitaría soportar CNAME en la raíz
   o redirección; si no lo permite, usar el Camino 1

> Con el Camino 1, Cloudflare además entrega el certificado SSL automático y gratis.
> Con el Camino 2, verificar que el SSL quede activo.

---

## 7. Actualizar el sitio después

- **Con Cloudflare Pages y arrastrar y soltar**: volver a entrar al proyecto →
  **Create new deployment** → subir la carpeta actualizada. La versión anterior
  queda guardada por si hay que volver atrás.
- **Con GitHub**: basta con subir el cambio; se publica solo.

---

## 8. Uso diario (para tu mamá)

Para publicar una prenda nueva o una foto de feria hacen falta dos pasos:

1. Copiar la foto a la carpeta `img/`
2. Agregar las líneas del producto o la feria en `productos.js` o `ferias.js`,
   y volver a publicar

Es un archivo de texto, no un panel. Si más adelante quieren que ella misma pueda
subir fotos desde el celular sin tocar archivos, se puede conectar el sitio a un
CMS como Decap CMS o a una planilla de Google Sheets — avísame y lo armamos.

---

## 9. Detalles técnicos

- Sin dependencias externas: no carga nada desde Google Fonts, CDN ni servicios de
  terceros. Carga rápido y no necesita cookies ni aviso de privacidad.
- Responsive: funciona en celular, tablet y computador.
- Optimizado para buscadores: cada página tiene su título y descripción propios.
- El visor de fotos (lightbox) tiene navegación con flechas y tecla Escape.
- Los botones de WhatsApp llevan el nombre de la prenda ya escrito en el mensaje.
