# ============================================================
#  CÓMO ACTUALIZAR EL SITIO  (versión simple, sin JSON)
# ============================================================
#  El sitio NO lee archivos de contenido/. Los datos viven
#  dentro de cuatro archivos, escritos en español llano.
# ============================================================


## Los cuatro archivos con datos

| Archivo        | Qué contiene                          |
|----------------|---------------------------------------|
| `config.js`    | WhatsApp, Instagram, ciudad, nombre   |
| `textos.js`    | Los párrafos de las páginas           |
| `productos.js` | Las prendas (nombre, precio, foto)    |
| `ferias.js`    | Las ferias (fecha, lugar, foto)       |

Todo lo editable está ahí. Los demás archivos (`index.html`,
`style.css`, `app.js`) son el diseño y no hace falta tocarlos.


## Agregar una prenda

Abrir `productos.js` y pegar este bloque **al principio** de la lista:

```js
  {
    nombre: "Chaleco verde",
    categoria: "chaleco",
    material: "Lana de oveja natural",
    precio: 52000,
    estado: "disponible",
    descripcion: "Tejido grueso con trenzas al centro.",
    imagen: "chaleco-verde.jpg"
  },
```

Y poner la foto en la carpeta `img/` con ese mismo nombre.

**Categorías válidas:** chaleco · chal · gorro · bufanda · mantas · otro
**Estados válidos:** disponible · vendido · encargo

Ojo con las comas: después de cada dato va una coma, y entre un
bloque y el siguiente también. Si falta una, la galería queda vacía.


## Agregar una feria

Igual, en `ferias.js`:

```js
  {
    fecha: "20 y 21 de marzo 2027",
    mes: "Mar",
    dia: "20-21",
    nombre: "Feria de Otoño",
    lugar: "Plaza Principal, Coyhaique",
    descripcion: "Stand con prendas nuevas.",
    futura: true,
    imagen: "feria-1.jpg"
  },
```

`futura: true` destaca la feria como próxima. `futura: false` la
muestra como ya realizada.


## Cambiar los textos de las páginas

En `textos.js`, todo está entre comillas. Se cambia lo que está
adentro y listo. Ejemplo:

```js
titulo: "Tejidos en lana de oveja natural, hechos a mano",
```

Los párrafos de "Sobre mí" son una lista: cada línea entre comillas
es un párrafo. Se pueden agregar o quitar.


## Publicar los cambios

Con el sitio conectado a GitHub (proyecto `manoscreativasv2`),
**cualquier cambio en el repositorio se publica solo**. Dos formas:

**Opción A — desde GitHub (la más simple)**
1. Abrir el archivo
2. Ícono de lápiz
3. Cambiar lo que haga falta
4. *Commit changes*

En un minuto el sitio está actualizado.

**Opción B — desde el panel `/admin`**
manoscreativasv2.pages.dev/admin
Formularios con campos, sin ver código.


## Subir fotos

Las fotos van siempre a la carpeta **`img/`**, con el nombre exacto
que se escribe en el campo `imagen`.

- Formato: `.jpg` para fotos
- Tamaño ideal: 800 × 800 px y menos de 300 KB
- Ojo con mayúsculas: `Chaleco.jpg` y `chaleco.jpg` son distintos
- La portada usa `portada.jpg` y "Sobre mí" usa `artesana.jpg`


## Qué NO hace falta tocar

`index.html` · `galeria.html` · `ferias.html` · `sobre.html`
`style.css` · `app.js`

Estos archivos son el diseño. Si algo no aparece en el sitio,
la causa casi siempre está en los cuatro archivos de datos.


## Las dos direcciones del sitio

- `manoscreativasv2.pages.dev` → el sitio conectado a GitHub,
  **este es el que se actualiza solo**
- `manoscreativas.pages.dev` → la versión anterior, subida a mano,
  **ya no hay que actualizar esta**
