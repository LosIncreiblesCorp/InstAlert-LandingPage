# InstAlert Landing Page

![InstAlert](img/instalert-logo.svg)

Landing Page de **InstAlert**, desarrollada por **LosIncreiblesCorp** para presentar una propuesta de seguridad colaborativa entre establecimientos comerciales: alertas de seguridad, una red de negocios cercanos e información de riesgo local.

Este repositorio contiene el sitio público de presentación. La aplicación web y el backend se mantienen en repositorios independientes.

![Vista principal de InstAlert](img/hero-phone-composite.png)

## Contenido

- [Estado y versión](#estado-y-versión)
- [Producto y usuarios](#producto-y-usuarios)
- [Secciones y funcionalidades](#secciones-y-funcionalidades)
- [Tecnologías](#tecnologías)
- [Ejecución local](#ejecución-local)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Configuración](#configuración)
- [Planes y precios](#planes-y-precios)
- [Idiomas](#idiomas)
- [Videos y recursos](#videos-y-recursos)
- [Accesibilidad y diseño adaptable](#accesibilidad-y-diseño-adaptable)
- [Despliegue](#despliegue)
- [Verificación manual](#verificación-manual)
- [GitFlow y contribuciones](#gitflow-y-contribuciones)
- [Solución de problemas](#solución-de-problemas)
- [Equipo y repositorios relacionados](#equipo-y-repositorios-relacionados)
- [Licencia y créditos](#licencia-y-créditos)

## Estado y versión

| Elemento | Estado documentado |
| --- | --- |
| Última versión publicada verificada | [`v2.0.0`](https://github.com/LosIncreiblesCorp/InstAlert-LandingPage/tree/v2.0.0) |
| Rama estable | `main` |
| Rama de integración | `develop` |
| Rama de esta documentación | `feature/readme-documentation`, creada desde `develop` |
| Próxima versión recomendada para este cambio | `2.0.1`, porque solo amplía la documentación |

La referencia anterior no implica que `2.0.1` ya esté publicada. Una versión `2.1.0` se reservaría para una entrega que incorpore nuevas funcionalidades compatibles. El cierre de una release y su etiqueta deben representar los cambios realmente integrados.

## Producto y usuarios

InstAlert está dirigido a dos segmentos:

1. **Administradores y dueños de establecimientos comerciales:** interesados en conocer el servicio, comparar planes y administrar la seguridad de su negocio desde la aplicación.
2. **Personal operativo:** usuarios de las funciones operativas de alertas, reportes y contactos de emergencia de la aplicación.

La landing comunica la propuesta y conduce hacia la aplicación. No autentica usuarios, no ejecuta el botón de pánico, no procesa pagos y no consulta MySQL o Aiven. El mapa incluido en esta página es una representación ilustrativa de la red local, no un mapa conectado a incidentes reales.

## Secciones y funcionalidades

| Sección | Ancla | Contenido |
| --- | --- | --- |
| Inicio | `#top` | Presentación del producto, beneficios y accesos principales. |
| Por qué InstAlert | `#about-product` | Propuesta de valor y video del producto. |
| Soluciones | `#platform` | Explicación del servicio y red local ilustrativa. |
| Funciones | `#features` | Alertas, red de negocios e información de riesgo. |
| Testimonios | `#testimonials` | Testimonios presentados en el sitio. |
| Planes | `#pricing` | Essential, Professional y Business, con selector PEN/USD. |
| Equipo | `#company` | Integrantes de LosIncreiblesCorp y video del equipo. |
| Preguntas frecuentes | `#faq` | Respuestas desplegables. |
| Llamada final | `#subscribe` | Acceso a la sección de planes. |
| Pie de página | — | Navegación, ayuda, privacidad, términos y retorno al inicio. |

También incluye menú adaptable, cambio de idioma ES/EN, conservación del idioma en el navegador y botones para copiar los enlaces de los videos.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| HTML5 | Estructura semántica y contenido. |
| CSS3 | Estilos, distribución y adaptación a pantallas. |
| JavaScript del navegador | Idioma, menú, precios, enlaces y acciones de video. |
| Lucide | Iconos, con una copia local en `scripts/vendor/lucide.min.js`. |
| `localStorage` | Preferencia de idioma, cuando el navegador permite almacenamiento. |
| YouTube | Reproducción externa de los videos de producto y equipo. |

No hay `package.json`, compilación, framework de frontend ni instalación de paquetes requerida. Node.js es opcional para comprobar sintaxis; Python es una opción para servir los archivos localmente.

## Ejecución local

### 1. Descargar el proyecto

```bash
git clone https://github.com/LosIncreiblesCorp/InstAlert-LandingPage.git
cd InstAlert-LandingPage
```

Para trabajar sobre la versión de integración:

```bash
git switch develop
git pull --ff-only origin develop
```

### 2. Iniciar un servidor estático

Desde la raíz del repositorio, con Python 3:

```bash
python -m http.server 5500 --bind 127.0.0.1
```

En Windows también puede utilizarse:

```powershell
py -3 -m http.server 5500 --bind 127.0.0.1
```

Abrir **http://127.0.0.1:5500/**. Detener el servidor con `Ctrl+C`.

Como alternativa, abrir la carpeta en un IDE y utilizar un servidor estático como Live Server. Abrir `index.html` directamente puede servir para una inspección básica, pero el comportamiento del almacenamiento y del portapapeles depende de las restricciones del navegador; se recomienda HTTP local.

No es necesario arrancar el backend para visualizar la landing. Los accesos de registro e ingreso redirigen a la URL configurada de la aplicación.

## Estructura del repositorio

```text
InstAlert-LandingPage/
├── index.html                       # Contenido, traducciones y videos embebidos
├── README.md                        # Documentación de ejecución y mantenimiento
├── styles/
│   └── main.css                     # Estilos generales y reglas responsive
├── scripts/
│   ├── pricing.js                   # Importes mensuales por plan y moneda
│   ├── site-config.js               # URLs públicas e idioma inicial
│   ├── main.js                      # Interacciones e inicialización
│   └── vendor/
│       └── lucide.min.js            # Biblioteca local de iconos
├── img/
│   ├── instalert-logo.svg
│   ├── hero-phone-composite.png
│   ├── community-hero.png
│   ├── instalert-hand.png
│   ├── instalert-shield.png
│   ├── play.svg
│   └── team/                        # Retratos de los integrantes
└── docs/
    ├── help-center.pdf
    ├── privacy-policy.pdf
    ├── terms-of-service.pdf
    └── reparto-gitflow.md           # Referencia de distribución y colaboración
```

## Configuración

La configuración pública se encuentra en [`scripts/site-config.js`](scripts/site-config.js):

```javascript
const siteConfig = {
  auth: {
    signup: "https://instalert-c3f7f.web.app",
    login: "https://instalert-c3f7f.web.app",
  },
  defaultLanguage: "en",
  videos: {
    product: "https://www.youtube.com/watch?v=nV40EGPt8Aw",
    team: "https://www.youtube.com/watch?v=ZMhPKBR7EF0",
  },
};
```

- `auth.signup`: destino de registro y de los botones de selección de plan.
- `auth.login`: destino de ingreso.
- `defaultLanguage`: idioma inicial (`en` o `es`) si no existe una preferencia válida guardada.
- `videos.product` y `videos.team`: enlaces que copian los botones de video.

Actualmente ingreso y registro apuntan a la misma entrada de la aplicación. La landing redirige con `window.location.assign()`; no realiza autenticación ni envía automáticamente un identificador del plan seleccionado.

Si una URL de `auth` es `null`, los botones correspondientes permanecen deshabilitados y se identifican como próximos a estar disponibles. No hace falta eliminar sus atributos `disabled` manualmente: el controlador los actualiza al inicializarse.

Todo JavaScript de este repositorio es público. No colocar contraseñas, cadenas de conexión, tokens de GitHub, secretos de PayPal ni claves de Brevo en estos archivos.

### Orden de los scripts

Conservar el orden y el atributo `defer` que aparecen en `index.html`:

```html
<script src="scripts/vendor/lucide.min.js" defer></script>
<script src="scripts/pricing.js" defer></script>
<script src="scripts/site-config.js" defer></script>
<script src="scripts/main.js" defer></script>
```

`main.js` utiliza las variables `pricing`, `siteConfig` y `lucide`. Reordenar o cargar de forma asíncrona estos scripts sin adaptar el código puede romper la inicialización.

## Planes y precios

Los importes están definidos en [`scripts/pricing.js`](scripts/pricing.js). Los cupos y beneficios comerciales están en la sección `#pricing` de [`index.html`](index.html).

| Plan | Precio mensual PEN | Precio mensual USD | Cupo anunciado | Pulseras anunciadas con el primer pago |
| --- | ---: | ---: | ---: | ---: |
| Essential | S/ 50.00 | USD 15.00 | Hasta 4 empleados | 2 |
| Professional | S/ 100.00 | USD 30.00 | Hasta 8 empleados | 5 |
| Business | S/ 150.00 | USD 45.00 | Hasta 15 empleados | 8 |

Esta tabla documenta el contenido comercial actual de la landing; no acredita la implementación de hardware o de beneficios en otros repositorios.

El selector muestra importes fijos definidos por moneda: **no consulta un tipo de cambio ni convierte los precios en tiempo real**. La moneda inicial es PEN; cambiar el idioma no cambia automáticamente la moneda.

Para actualizar un plan:

1. Cambiar su importe en `scripts/pricing.js`.
2. Actualizar en `index.html` los beneficios y, si corresponde, el precio de respaldo del HTML.
3. Mantener ambas versiones del texto, inglés y español.
4. Contrastar los precios con el catálogo real de la aplicación y PayPal antes de publicar.
5. Probar ES/EN y PEN/USD.

El renderizador muestra “Por definir” / “TBD” si el importe no es un número válido de al menos `0.01`, incluyendo valores `null`. Los importes visibles se formatean con dos decimales.

## Idiomas

El contenido base de `index.html` está en inglés. Las traducciones se declaran en atributos del mismo elemento:

```html
<h2 data-es="Planes pensados para tu negocio">
  Plans designed for your business
</h2>
```

| Atributo | Traduce |
| --- | --- |
| `data-es` | Texto del elemento. |
| `data-es-alt` | Descripción alternativa de una imagen. |
| `data-es-label` | Nombre accesible mediante `aria-label`. |
| `data-es-title` | Atributo `title`. |

`main.js` cambia el atributo `lang` de la página, título, descripción y textos correspondientes. La preferencia se guarda con la clave `instalert-language`; si el almacenamiento está bloqueado, el selector sigue funcionando sin persistencia.

Para agregar texto traducible, utilizar un elemento que contenga el texto que deba reemplazarse. El controlador asigna `textContent`: poner `data-es` en un contenedor con enlaces, iconos u otros elementos hijos puede eliminarlos al traducir. Aplicarlo al elemento de texto más específico y verificar ambos idiomas.

## Videos y recursos

- [Video del producto](https://www.youtube.com/watch?v=nV40EGPt8Aw).
- [Video del equipo](https://www.youtube.com/watch?v=ZMhPKBR7EF0).
- [Centro de ayuda](docs/help-center.pdf).
- [Política de privacidad](docs/privacy-policy.pdf).
- [Términos de servicio](docs/terms-of-service.pdf).

Los videos se muestran mediante `iframe` de YouTube en `index.html`. Los enlaces de los botones de copiar se configuran por separado en `scripts/site-config.js`.

**Al reemplazar un video, actualizar ambos lugares:** el `src` del `iframe` con formato `https://www.youtube.com/embed/ID` y la URL pública de la configuración. Probar que el video permita reproducción embebida y que el botón copie el mismo contenido.

El botón de copiar utiliza el portapapeles del navegador; si esa operación falla, ofrece la URL mediante un cuadro de diálogo. Los videos requieren acceso a YouTube; las imágenes e iconos principales se sirven desde este repositorio.

Conservar nombres, extensiones y mayúsculas de los recursos: un enlace que funciona en Windows puede fallar en un servidor sensible a mayúsculas si no coincide con el archivo real.

## Accesibilidad y diseño adaptable

El código incorpora enlace para saltar al contenido, etiquetas de navegación, nombres accesibles, estado del menú con `aria-expanded`, estado de moneda con `aria-pressed`, cierre del menú con Escape y reglas para reducir movimiento según las preferencias del sistema.

El menú se adapta mediante el punto de corte de `1001px` y existen reglas adicionales para pantallas pequeñas. Estas implementaciones no equivalen a una certificación de accesibilidad: verificar contraste, lectura con tecnologías de asistencia, teclado y ampliación de contenido antes de cada entrega.

## Despliegue

El resultado distribuible es la propia raíz del repositorio. **No se necesita un comando de build ni una carpeta `dist/`.**

Puede publicarse en un hosting de archivos estáticos que sirva `index.html` y respete las rutas relativas de `styles/`, `scripts/`, `img/` y `docs/`.

### Ejemplo con GitHub Pages

1. Integrar y revisar la versión que se publicará en `main`.
2. En la configuración del repositorio, abrir **Pages**.
3. Si se utiliza publicación desde una rama, seleccionar `main` y la carpeta raíz (`/root`).
4. Guardar y utilizar la URL que GitHub indique al completar la publicación.
5. Verificar rutas, recursos, PDFs, videos y enlaces hacia la aplicación.

Estos pasos describen una opción de despliegue; no afirman que Pages esté configurado actualmente. La dirección `https://instalert-c3f7f.web.app` que aparece en la configuración es el destino de la aplicación, no una URL de hosting de la landing verificada por este README.

## Verificación manual

Antes de integrar o publicar:

- [ ] Cargar el sitio mediante HTTP local sin errores de consola.
- [ ] Probar navegación interna y botón de retorno al inicio.
- [ ] Abrir y cerrar el menú en móvil, por enlace, Escape y clic fuera.
- [ ] Cambiar ES/EN y recargar para comprobar persistencia.
- [ ] Comprobar textos, título, descripciones alternativas y nombres accesibles en ambos idiomas.
- [ ] Cambiar PEN/USD y revisar los tres planes.
- [ ] Comprobar las redirecciones de ingreso, registro y selección de plan.
- [ ] Reproducir ambos videos y comprobar sus enlaces de copia.
- [ ] Abrir ayuda, privacidad y términos desde el footer.
- [ ] Revisar escritorio, móvil, navegación con teclado y zoom del navegador.
- [ ] Confirmar que la información comercial coincide con la aplicación.

Para comprobar sintaxis de los scripts propios, si Node.js está instalado:

```bash
node --check scripts/site-config.js
node --check scripts/pricing.js
node --check scripts/main.js
```

Estos comandos verifican sintaxis; no reemplazan una prueba en navegador. El repositorio no define actualmente una suite automatizada ni un comando `npm test`.

## GitFlow y contribuciones

| Rama | Propósito |
| --- | --- |
| `main` | Versiones publicadas. |
| `develop` | Integración de cambios. |
| `feature/*` | Trabajo específico creado desde `develop`; se propone su integración mediante PR. |
| `release/*` | Preparación de una entrega desde `develop`; se integra en `main` y de vuelta en `develop`. |
| `hotfix/*` | Corrección urgente desde `main`; se integra también en `develop`. |

Para comenzar una contribución, con el árbol de trabajo limpio:

```bash
git fetch origin
git switch develop
git pull --ff-only origin develop
git switch -c feature/nombre-del-cambio
```

Agregar únicamente los archivos de la contribución, revisar el diff y utilizar un mensaje que describa el cambio:

```bash
git add README.md
git diff --cached
git commit -m "docs(landing): completar guia de ejecucion y mantenimiento"
git push -u origin feature/nombre-del-cambio
```

Abrir un Pull Request hacia `develop`. Para una release que solo incluya esta documentación, se recomienda `release/2.0.1`, creada después de integrar y revisar el README en `develop`. La etiqueta `v2.0.1` se crea al cerrar esa release; este documento no ejecuta ni acredita esas integraciones.

La [guía de reparto](docs/reparto-gitflow.md) conserva instrucciones del armado inicial. Sus ejemplos de configuración pendiente o de carpeta de referencia describen ese contexto histórico; para el comportamiento actual consultar los archivos de código y este README.

## Solución de problemas

| Síntoma | Comprobación o solución |
| --- | --- |
| El puerto 5500 está ocupado | Usar otro puerto, por ejemplo `python -m http.server 5501 --bind 127.0.0.1`. |
| `python` no se reconoce | Instalar Python 3 o utilizar el servidor estático del IDE. En Windows probar `py -3`. |
| Los botones están deshabilitados | Revisar las URLs de `siteConfig.auth`, el orden de scripts y la consola. |
| No cambia el idioma | Revisar `main.js`, los atributos de traducción y la consola. |
| El idioma inicial no coincide con la configuración | Existe una preferencia guardada en `localStorage`; el selector permite cambiarla. |
| Un precio indica “Por definir” o “TBD” | Revisar que el valor de `pricing.js` sea numérico y al menos `0.01`. |
| Cambié un video, pero el botón copia otro | Actualizar tanto el `iframe` como `siteConfig.videos`. |
| Un video no carga | Comprobar internet, permiso de reproducción embebida y restricciones de YouTube o del hosting. |
| Copiar URL muestra un diálogo | El navegador no permitió el portapapeles; utilizar la alternativa ofrecida. |
| No cargan imágenes, estilos o PDFs | Revisar rutas, mayúsculas y publicación de todas las carpetas. |
| No aparecen los iconos | Comprobar `scripts/vendor/lucide.min.js` y su carga antes de `main.js`. |

## Equipo y repositorios relacionados

**LosIncreiblesCorp**

- Jean Fabio Noriega Collado.
- Yngrid Nahir Ruiz Villegas.
- José Gustavo Asto Jacome.
- Simon Calderon Ismael Sebastian.
- Sebastián Víctor André Díaz Mendoza.

Los nombres corresponden a la sección de equipo de la landing. El reparto inicial por sectores está documentado en `docs/reparto-gitflow.md`.

- [Landing Page](https://github.com/LosIncreiblesCorp/InstAlert-LandingPage).
- [Aplicación web](https://github.com/LosIncreiblesCorp/Instalert-FrontEnd).
- [Backend](https://github.com/LosIncreiblesCorp/Instalert-BackEnd).
- [Informe del proyecto](https://github.com/LosIncreiblesCorp/losIncreibles-project-report).

## Licencia y créditos

El repositorio no incluye actualmente un archivo `LICENSE` que establezca una licencia general del proyecto. Acordar los términos con LosIncreiblesCorp antes de reutilizar o redistribuir el contenido.

Lucide es una biblioteca de terceros y conserva sus propios avisos y condiciones. Los videos, fotografías, marcas y demás recursos pueden tener condiciones de uso independientes; no se presume una licencia común para todos ellos.
