# Cómo actualizar el sitio

Todo el contenido vive en la carpeta `data/` (archivos JSON) y se edita
desde el panel: **tusitio.pages.dev/admin**

| Archivo               | Qué contiene                        |
|-----------------------|-------------------------------------|
| `data/config.json`    | WhatsApp, Instagram, ciudad, nombre |
| `data/textos.json`    | Textos de las páginas               |
| `data/productos.json` | Las prendas                         |
| `data/ferias.json`    | Las ferias                          |

## Desde el panel (/admin)
1. Entrar a `/admin` e iniciar sesión con GitHub.
2. Elegir **Tejidos** o **Ferias** → *Agregar* → completar → **Publicar**.
3. En 1–2 minutos el sitio se actualiza solo.

Las fotos que se suban desde el panel quedan en `img/`.
Tamaño ideal: 800 × 800 px y menos de 300 KB.

## Importante
- Cuando una feria ya pasó, desmarcar "¿Todavía no ocurre?".
- `portada.jpg` y `artesana.jpg` se cambian subiéndolas a `img/` en GitHub.
- Si editas los JSON a mano en GitHub, cuidar comas y comillas.
