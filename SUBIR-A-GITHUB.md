# Cómo subir el sitio a GitHub

Tu usuario de GitHub es **`manoscreativasnancy-dot`**.
El repositorio se va a llamar **`manoscreativas`**.

---

## Paso 1 — Descomprimir

Descomprime el ZIP `manoscreativas-sitio.zip` en una carpeta de tu computador.
Va a quedar así:

```
manoscreativas-sitio/
├── index.html
├── galeria.html
├── ferias.html
├── sobre.html
├── style.css
├── config.js
├── productos.js
├── ferias.js
├── app.js
├── _headers
├── _redirects
├── README.md
├── SUBIR-A-GITHUB.md
├── admin/
│   ├── index.html
│   └── config.yml
├── contenido/
│   ├── datos.json
│   ├── portada.json
│   └── sobremi.json
└── img/
    └── tus fotos
```

> **Ojo:** copia tu carpeta `img/` de antes dentro de esta, para no perder
> las fotos que ya tienes (portada.jpg, artesana.jpg, chaleco-1.jpg).

---

## Paso 2 — Crear el repositorio

1. Entra a <https://github.com> e inicia sesión
2. Arriba a la derecha, haz clic en el **`+`** → **New repository**
3. Complétalo así:

| Campo | Qué poner |
|---|---|
| Repository name | `manoscreativas` |
| Description | (opcional) Sitio de tejidos en lana de oveja natural |
| Public / Private | **Public** |
| Add a README file | ❌ **Dejar sin marcar** |

4. Clic en **Create repository**

> Debe quedar **Public**. Si lo dejas privado, GitHub Pages y el panel
> necesitan configuración extra que complica todo.

---

## Paso 3 — Subir los archivos

En la página del repositorio recién creado, busca el enlace azul
**"uploading an existing file"** (o ve a la pestaña **Add file** →
**Upload files**).

### 3.1 — Subir los archivos sueltos

1. Abre la carpeta `manoscreativas-sitio` en tu computador
2. Selecciona **todos los archivos sueltos** (los `.html`, `.css`, `.js`,
   `_headers`, `_redirects`, `README.md`, `SUBIR-A-GITHUB.md`)
   — **menos las carpetas**
3. Arrástralos a la zona de carga de GitHub
4. Espera a que terminen de subir

### 3.2 — Subir las carpetas

Repite el proceso, una carpeta por vez:

1. **Add file → Upload files**
2. Abre la carpeta `admin/`, selecciona los dos archivos de adentro
   (`index.html` y `config.yml`) y arrástralos
3. **Importante:** antes de subir, en el campo de ruta escribe `admin/`
   cuando GitHub te pregunte dónde dejarlos. GitHub conserva la ruta
   si arrastras la carpeta completa, pero a veces la aplana.
4. Repite con `contenido/` (los tres `.json`)
5. Repite con `img/` (todas tus fotos)

### 3.3 — Guardar

Abajo, en **Commit changes**, escribe un mensaje como
`Primera versión del sitio` y haz clic en **Commit changes**.

---

## Paso 4 — Verificar

En la página principal del repositorio deben aparecer:

- Los archivos sueltos arriba (`index.html`, `style.css`, etc.)
- Las carpetas `admin`, `contenido` e `img`

Si `admin/` no aparece como carpeta, entrale con clic y revisa que
los archivos hayan quedado **adentro**, no sueltos en la raíz.

---

## Paso 5 — Avisar

Cuando el repositorio esté completo, avísame. Lo siguiente es:

1. Conectar Cloudflare Pages al repositorio
2. Probar que el sitio se publique solo con cada cambio
3. Conectar el panel de administración

---

## Si algo cuesta

**Los archivos no se arrastran bien** → Arrástralos de a pocos, no
todos de una vez. El límite por archivo es 25 MB.

**No encuentro "uploading an existing file"** → Es la pestaña
**Add file** → **Upload files**, arriba a la derecha de la lista.

**Quedó una carpeta con los archivos sueltos afuera** → Entra a la
carpeta, sube los archivos ahí dentro, y borra los duplicados de la raíz.

**Un archivo subió con el nombre cambiado** → Pasa cuando el archivo
tiene espacios o tildes en el nombre. Renómbralos antes de subir.
