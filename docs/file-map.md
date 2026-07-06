# Mapa de carpetas y archivos

Este mapa traduce la estructura técnica a lenguaje de propietario. La pregunta clave es: ¿esto es público, interno, operativo o de gobierno?

## Mapa principal

| Ruta | Tipo | Qué significa | Cuándo actualizar |
|---|---|---|---|
| `public/` | Público / desplegable | Sitio que Netlify publica: páginas, estilos, scripts e imágenes aprobadas. | Cuando cambia lo que verá el visitante. |
| `public/index.html` | Público | Página principal de la landing. | Cambios de contenido, secciones, SEO o estructura visible. |
| `public/privacy.html` | Público legal | Política o información de privacidad pública. | Cambios legales o de tratamiento de datos. |
| `public/aviso-privacidad.html` | Público legal | Aviso de privacidad público. | Cambios legales o de tratamiento de datos. |
| `public/css/styles.css` | Público técnico | Apariencia visual: colores, espaciado, responsive y componentes. | Cambios de diseño visual. |
| `public/js/script.js` | Público técnico | Comportamiento del formulario, modal, WhatsApp y validaciones. | Cambios de interacción o captación. |
| `public/images/` | Público | Imágenes aprobadas para el sitio. | Al reemplazar logos, fotos o piezas visuales públicas. |
| `public/_redirects` | Público operativo | Reglas de Netlify para bloquear rutas internas y crear alias. | Cambios de rutas, bloqueos o redirecciones. |
| `public/robots.txt` | Público SEO | Instrucciones básicas para rastreadores. | Cambios de indexación. |
| `public/sitemap.xml` | Público SEO | Mapa de URLs públicas. | Al agregar, quitar o cambiar páginas públicas. |
| `docs/` | Interno operativo | Documentación viva para entender y mantener el proyecto. | En cambios estructurales, operativos, de gobierno o publicación. |
| `design/` | Interno referencia | Archivo estratégico con etiquetas de estado: referencia vigente, borrador, histórico, no publicar o por validar. | Al agregar material de referencia o reclasificar fuentes internas. |
| `design/tamara_pineros_landing_kit/` | Interno referencia histórica | Kit base/histórico de la landing: brief, copy, UI, SEO, compliance y handoff. | Cuando se use como fuente para una nueva versión o revisión. |
| `design/internal-guides/` | Interno legal/operativo no publicable | Guías, registros y documentos de trabajo que requieren revisión antes de publicación. | Al crear o revisar guías internas. |
| `design/TP_PLAN_MAESTRO_SDD/` | Interno estratégico por validar | Planes amplios, flujos y matrices para evolución futura. | Cuando una idea pase a decisión validada u OpenSpec. |
| `tools/` | Interno verificación | Scripts locales de control, como el smoke test del sitio estático. | Al cambiar contratos técnicos o reglas de seguridad. |
| `openspec/` | Gobierno interno | Propuestas, especificaciones, diseños y tareas del flujo SDD. | En cada cambio formal del proyecto. |
| `.opencode/` | Interno herramientas | Skills o configuración local de automatización del asistente. | Solo al cambiar herramientas de trabajo. |
| `.atl/` | Interno herramientas | Datos locales de herramientas/índices. Está ignorado y no debe publicarse. | Normalmente no se edita manualmente. |
| `netlify.toml` | Operativo despliegue | Configura publicación desde `public/`, encabezados de seguridad y caché. | Cambios de despliegue, seguridad o caché. |
| `.gitignore` | Operativo repositorio | Define qué archivos no entran al control de versiones. | Al cambiar qué debe versionarse o ignorarse. |

## Regla de oro

Si un archivo contiene criterio interno, borradores, instrucciones de trabajo o material no aprobado, no pertenece a `public/`. Primero vive en `docs/` o `design/`; solo se copia a `public/` cuando ya fue aprobado para publicación.

Dentro de `design/`, revise primero `design/README.md` para confirmar la etiqueta de estado antes de usar una fuente como base de trabajo.

## Propiedad práctica

| Decisión | Responsable recomendado |
|---|---|
| Texto jurídico público | Propietaria/socio legal con revisión humana. |
| Experiencia visual | Diseño o técnico con aprobación de marca. |
| Scripts y despliegue | Mantenedor técnico. |
| Guías internas | Equipo legal/operativo. |
| Cambios de arquitectura | Técnico + propietaria cuando afecta datos, privacidad o operación. |
