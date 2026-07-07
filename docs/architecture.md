# Arquitectura actual

La arquitectura actual es deliberadamente simple: un sitio estático publicado desde `public/`, con documentación y material interno fuera de la zona desplegable. La simplicidad protege al negocio: menos infraestructura, menos riesgo operativo y una frontera pública clara.

## Decisión principal

Netlify publica `public/` como raíz del sitio. Todo lo demás es contexto interno del repositorio y no debe tratarse como contenido público.

```text
Repositorio
├─ public/      -> sitio publicado
├─ docs/        -> documentación viva interna
├─ design/      -> referencia, estrategia y fuentes
├─ tools/       -> verificación local
├─ openspec/    -> gobierno SDD de cambios
└─ netlify.toml -> reglas de despliegue y seguridad
```

## Flujo del visitante

1. El visitante abre la landing en `public/index.html`.
2. El HTML presenta contenido, servicios, llamados a la acción y formulario.
3. `public/css/styles.css` controla la apariencia.
4. `public/js/script.js` controla interacciones, validación, modal de contacto y continuidad a WhatsApp.
5. Las páginas legales públicas viven en `public/privacy.html` y `public/aviso-privacidad.html`.

## Flujo de datos sensible

El formulario debe tratarse como captación de datos personales. La implementación actual valida localmente nombre, ciudad, servicio y consentimiento; no envía datos a Netlify Forms ni usa `fetch` para el intake. Después prepara un mensaje estructurado y abre WhatsApp para que la persona lo revise y lo envíe desde su cuenta.

## Contratos de seguridad y frontera

| Contrato | Dónde se evidencia |
|---|---|
| La raíz publicada es `public/`. | `netlify.toml` con `publish = "public"`. |
| Markdown interno no debe exponerse desde `public/`. | `tools/smoke-static-contracts.js` y `public/_redirects`. |
| Rutas internas como `openspec` o `.atl` deben bloquearse. | `public/_redirects` y headers en `netlify.toml`. |
| JavaScript público no debe usar APIs inseguras. | `tools/smoke-static-contracts.js`. |
| Servicios del formulario deben estar allowlisted. | `public/index.html`, `public/js/script.js` y smoke test. |

## Rol de cada zona

| Zona | Rol arquitectónico |
|---|---|
| `public/` | Runtime público del sitio. |
| `docs/` | Manual de operación y comprensión actual. |
| `design/` | Archivo de fuente: copy, estrategia, compliance, UI y guías. |
| `tools/` | Pruebas locales ligeras para evitar regresiones. |
| `openspec/` | Memoria formal de decisiones y cambios planeados. |

## Límite para una app futura

Una aplicación futura no debe improvisarse dentro de la landing. Si aparecen cuentas, autenticación, pagos, expedientes, estados de caso, base de datos o panel administrativo, el equipo debe decidir primero:

- ruta `/app` o subdominio separado;
- backend y base de datos;
- autenticación y autorización;
- tratamiento de datos personales;
- auditoría y trazabilidad;
- soporte operativo;
- revisión legal previa.

La ruta de evolución está detallada en [evolution-roadmap.md](evolution-roadmap.md).

## Regla de mantenimiento

Cualquier cambio en estructura, despliegue, rutas públicas, activos descargables, formulario, privacidad o gobierno debe actualizar esta documentación o la guía operativa en el mismo trabajo.
