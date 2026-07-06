# Tamara & Piñeros — guía del proyecto

Este repositorio contiene la landing page estática de Tamara & Piñeros Abogados Asociados. Piense en este proyecto como una oficina jurídica organizada: `public/` es la recepción visible para el cliente, mientras que `docs/`, `design/`, `tools/` y `openspec/` son archivos internos para operar, revisar y evolucionar el sitio con criterio.

## Ruta rápida

1. Lea esta página para entender qué es público y qué es interno.
2. Continúe con [docs/project-overview.md](docs/project-overview.md) para la explicación del negocio y del alcance actual.
3. Use [docs/file-map.md](docs/file-map.md) cuando quiera saber qué significa cada carpeta.
4. Antes de publicar cambios, siga [docs/operations.md](docs/operations.md).

## Qué es este proyecto

La landing es una tarjeta de presentación digital enfocada en conversión: explica la firma, orienta al visitante hacia el servicio correcto y lo lleva a formulario o WhatsApp. Hoy no es una aplicación con usuarios, base de datos propia o panel administrativo; es un sitio estático desplegado en Netlify desde la carpeta `public/`.

## Quién debe leer qué

| Si usted es... | Lea primero | Para qué sirve |
|---|---|---|
| Propietaria o socio jurídico | [docs/project-overview.md](docs/project-overview.md) | Entender propósito, alcance y límites. |
| Colaborador que actualiza contenido | [docs/operations.md](docs/operations.md) | Cambiar texto, verificar y pedir revisión legal. |
| Técnico o mantenedor | [docs/architecture.md](docs/architecture.md) | Entender estructura, despliegue y contratos del sitio. |
| Diseñador o estratega | [design/README.md](design/README.md) | Ubicar material de referencia sin publicarlo por accidente. |
| Equipo pensando en una app futura | [docs/evolution-roadmap.md](docs/evolution-roadmap.md) | Decidir cuándo pasar de landing a entrada de aplicación. |

## Frontera pública e interna

| Zona | Estado | Explicación simple |
|---|---|---|
| `public/` | Pública / desplegable | Todo lo que Netlify puede servir al visitante. Aquí van HTML, CSS, JS, imágenes aprobadas, `robots.txt`, `sitemap.xml` y `_redirects`. |
| `docs/` | Interna / operativa | Documentación viva del proyecto. No se publica como contenido del sitio. |
| `design/` | Interna / referencia | Kits, guías, estrategia, borradores y material de diseño. No es fuente pública automática. |
| `openspec/` | Interna / gobierno de cambios | Propuestas, especificaciones, diseño técnico y tareas de cambios SDD. Está ignorada por Git en este repositorio. |
| `tools/` | Interna / verificación | Scripts locales para comprobar contratos del sitio antes de publicar. |

Regla importante: ningún documento interno, borrador legal o guía no aprobada debe guardarse dentro de `public/`. Si algo entra a `public/`, se trata como material candidato a publicación.

## Verificación rápida

Ejecute desde la raíz del repositorio:

```bash
node tools/smoke-static-contracts.js
```

El resultado esperado es:

```text
Smoke static contracts passed.
```

## Cómo evoluciona sin improvisar

La landing puede crecer de forma ordenada:

1. Landing estática actual: presentación, servicios, formulario y WhatsApp.
2. Contenido más maduro: PDFs públicos aprobados, páginas legales o casos de uso.
3. Entrada a aplicación: ruta `/app` o subdominio si aparecen cuentas, formularios avanzados o seguimiento.
4. Aplicación completa: solo después de decidir autenticación, datos personales, auditoría, privacidad, soporte y operación.

La guía completa está en [docs/evolution-roadmap.md](docs/evolution-roadmap.md).

## Regla de mantenimiento

Todo cambio estructural, de despliegue, de activos públicos o de gobierno debe actualizar la documentación relevante en el mismo trabajo. No basta con cambiar archivos: hay que dejar explicado qué cambió y por qué.
