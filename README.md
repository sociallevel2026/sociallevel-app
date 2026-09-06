# SocialLevel — Versión PWA (Progressive Web App)

Esta carpeta convierte el prototipo en una app instalable desde el navegador,
sin pasar por Android Studio, emuladores ni archivos `.apk`.

## Qué incluye

- `index.html` — la app, con las etiquetas de PWA ya agregadas
- `manifest.json` — le dice al teléfono el nombre, ícono y colores de la app
- `service-worker.js` — permite que abra rápido y no se rompa del todo sin internet
- `icons/` — los íconos en los tamaños que Android e iOS necesitan

## Antes de publicarla: conecta tu backend real

Abre `index.html` con el Bloc de notas, busca esta línea:
```javascript
var PUBLIC_BACKEND_URL = "https://sociallevel-backend.onrender.com";
```
Reemplázala por la URL real de tu backend en Render (o donde lo hayas desplegado).

## Cómo publicarla gratis — GitHub Pages

Una PWA necesita estar en una dirección **https://**, no abrirse como archivo local
(los service workers no funcionan con `file://`). GitHub Pages te da esto gratis,
sin necesitar tarjeta ni servidor propio.

### Pasos

1. Ve a [github.com](https://github.com) y crea un repositorio nuevo, por ejemplo `sociallevel-app`
2. Sube **todo el contenido de esta carpeta** (arrastrando los archivos: `index.html`,
   `manifest.json`, `service-worker.js`, y la carpeta `icons` completa)
3. En el repositorio, ve a **Settings → Pages**
4. En "Source", elige la rama `main` y la carpeta `/ (root)`
5. Dale **Save**
6. Espera 1-2 minutos. GitHub te va a dar una URL como:
   ```
   https://tu-usuario.github.io/sociallevel-app/
   ```

Esa es la dirección que le compartes a cualquier persona — empresas del piloto,
compañeros, quien sea.

## Cómo "instalarla" en un teléfono

1. Abre esa URL desde Chrome (Android) o Safari (iPhone)
2. En Android: aparece un aviso "Agregar a pantalla de inicio", o desde el menú
   (⋮) → "Instalar app" / "Agregar a pantalla de inicio"
3. En iPhone: toca el botón de compartir (□↑) → "Agregar a pantalla de inicio"
4. Queda un ícono como cualquier app — se abre a pantalla completa, sin la barra
   del navegador

## Ventaja sobre el camino de Android Studio

Cada vez que cambies algo en `index.html`, solo tienes que volver a subir el
archivo actualizado a GitHub — no hay que recompilar nada. La próxima vez que
alguien abra la app (o la recargue), ya tiene la versión nueva.
