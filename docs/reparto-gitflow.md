# Landing page: cinco sectores y cinco features

Cada integrante tiene un sector y un commit de implementación. Los comentarios `REPARTO INICIO NOMBRE` y `REPARTO FIN NOMBRE` indican desde dónde hasta dónde copiar. Incorporar todos los bloques propios, conservando el orden que tienen en los archivos de referencia.

| Sector | Responsable | Contenido | Rama | Conventional Commit |
| --- | --- | --- | --- | --- |
| 1. Inicio | Jose | Estructura, navegación, hero, beneficios, idioma y estilos compartidos | `feature/inicio` | `feat(inicio): agregar estructura, navegacion e idioma del landing` |
| 2. Producto | Victor | Propuesta de valor, video del producto, soluciones y mapa ilustrativo | `feature/producto` | `feat(producto): agregar propuesta de valor y soluciones de InstAlert` |
| 3. Planes | Jean | Suscripciones, selector PEN/USD y botones de registro | `feature/planes` | `feat(planes): agregar suscripciones y selector de moneda` |
| 4. Equipo | Simon | Presentación, retratos de los cinco integrantes y video del equipo | `feature/equipo` | `feat(equipo): agregar integrantes y presentacion del equipo` |
| 5. Cierre | Yngrid | Llamada final, acceso a planes, footer, ayuda, legales y volver al inicio | `feature/cierre` | `feat(cierre): agregar llamada final y pie de pagina` |

## Qué copia cada integrante

- **Jose:** bloques `JOSE` de `index.html`, `styles/main.css` y `scripts/main.js`; `scripts/site-config.js`, `scripts/vendor/lucide.min.js`, `img/instalert-logo.svg`, `img/hero-phone-composite.png`, README y esta guía. Lucide se incorpora completo sin modificar su código de terceros.
- **Victor:** bloques `VICTOR` de `index.html`, `styles/main.css` y `scripts/main.js`. El mapa se construye con HTML/CSS. Aporta el controlador y los estilos compartidos para los videos de producto y equipo.
- **Jean:** bloques `JEAN` de `index.html`, `styles/main.css` y `scripts/main.js`; archivo completo `scripts/pricing.js`. Los botones de planes usan `data-auth="signup"` y el controlador compartido de Jose. Permanecen deshabilitados mientras `siteConfig.auth.signup` sea `null`.
- **Simon:** bloques `SIMON` de `index.html` y `styles/main.css`; los cinco archivos de `img/team/`. Reutiliza los controles de video de Victor y los estilos comunes de Jose.
- **Yngrid:** bloques `YNGRID` de `index.html` y `styles/main.css`; `docs/help-center.pdf`, `docs/privacy-policy.pdf` y `docs/terms-of-service.pdf`. Reutiliza el logo y los estilos comunes de Jose.

Copiar los comentarios junto con el contenido. Un responsable puede tener varios bloques por archivo. No sobrescribir un archivo compartido entero: insertar cada bloque en su posición de referencia. Los cierres de `main`, `body` y `html` son de Jose y permanecen después de las secciones correspondientes.

Los bloques responsive de `styles/main.css` deben quedar dentro del mismo `@media` que muestra la referencia. Si esa condición no existe aún en el destino, crear su envoltura con llaves. Mantener el orden original de las reglas.

Conservar los atributos de traducción `data-es`, `data-es-alt`, `data-es-label` y `data-es-title`, el orden de los scripts `defer` y la inicialización al final de `main.js`.

## Integración y dependencias

Orden recomendado: **Jose → Victor → Jean → Simon → Yngrid**. Coincide con el recorrido visual del landing. Las cinco features comparten estructura y funciones: una reconstrucción parcial no garantiza una página ejecutable. Por ejemplo, el idioma usa `renderPricing()` de Jean y el botón `.back-top` de Yngrid. Validar el comportamiento completo al integrar las cinco partes.

## Gitflow

Esta carpeta de referencia no tiene repositorio Git. Cada integrante hace su commit con su propia identidad en el repositorio del equipo; aquí se prepararon los bloques y mensajes, sin crear commits ni ramas.

- `main` conserva las versiones publicadas.
- `develop` integra las features.
- `feature/*` nace de `develop` y vuelve a `develop` mediante PR.
- `release/*` nace de `develop`; al aprobarse, se integra en `main` y de vuelta en `develop`, con la etiqueta de versión acordada.
- `hotfix/*` nace de `main` para correcciones urgentes y vuelve a `main` y `develop`.

Si `develop` no existe, el coordinador la crea desde `main` y la publica una sola vez. Trabajar con el árbol limpio y `origin` configurado. Desde la raíz del landing en el repositorio destino, cada integrante actualiza `develop` y crea su rama:

```bash
git switch develop
git pull --ff-only origin develop
git switch -c feature/inicio
```

Reemplazar `feature/inicio` por la rama asignada. Copiar exclusivamente los bloques y recursos propios. Para archivos compartidos ya versionados:

```bash
git add -p -- index.html styles/main.css scripts/main.js
git diff --cached
```

Agregar los archivos completos y recursos propios por ruta explícita con `git add -- ruta`. Para staging parcial de un archivo nuevo, usar primero `git add -N -- ruta` y después `git add -p -- ruta`.

Cada integrante ejecuta solo su comando:

```bash
# Jose: feature/inicio
git commit -m "feat(inicio): agregar estructura, navegacion e idioma del landing"

# Victor: feature/producto
git commit -m "feat(producto): agregar propuesta de valor y soluciones de InstAlert"

# Jean: feature/planes
git commit -m "feat(planes): agregar suscripciones y selector de moneda"

# Simon: feature/equipo
git commit -m "feat(equipo): agregar integrantes y presentacion del equipo"

# Yngrid: feature/cierre
git commit -m "feat(cierre): agregar llamada final y pie de pagina"
```

Publicar la rama, por ejemplo `git push -u origin feature/inicio`, y abrir un PR hacia `develop`. Conservar los cinco commits de feature: no hacer un squash conjunto. Los commits de preparación, merge y release son adicionales a esos cinco commits de implementación. Para cambios posteriores usar `fix(scope): ...` o `docs(scope): ...`, según corresponda.

Si se reconstruye desde cero, mantener la referencia completa fuera del repositorio destino para evitar incluir las cinco features en el primer commit. Si el landing completo ya está commiteado, estos comentarios no separan su historia anterior: registrar el reparto como documentación o acordar una reconstrucción en otro repositorio sin reescribir la historia compartida.

## Verificación antes de release

- Revisar escritorio y móvil, navegación y todos los enlaces internos.
- Cambiar ES/EN y comprobar que el idioma se conserva al recargar.
- Cambiar PEN/USD; los importes `null` muestran precios pendientes.
- Comprobar que los botones de planes y registro permanecen deshabilitados mientras no se configure la URL de registro.
- Revisar los retratos, controles de video, llamada final, retorno al inicio y enlaces a PDF.
- Confirmar que no hay errores JavaScript y revisar los cinco commits con `git log develop --oneline --no-merges`.
