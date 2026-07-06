# Índice de diseño y referencias internas

`design/` es el archivo estratégico y de referencia del proyecto. Conserva fuentes, kits, borradores, guías internas, respaldos, planeación y materiales históricos que ayudan a entender o mejorar la landing, pero no son la verdad operativa vigente ni material publicable por defecto.

## Lectura rápida

Use esta carpeta para consultar origen, criterio y contexto. Para operar el proyecto hoy, empiece por `docs/`. Para publicar algo en el sitio, trabaje únicamente con versiones aprobadas dentro de `public/`.

## Etiquetas de estado

| Etiqueta | Significado | Regla práctica |
|---|---|---|
| `REFERENCIA VIGENTE` | Material útil para orientar decisiones actuales. | Puede consultarse como soporte, pero confirme en `docs/` antes de operar. |
| `BORRADOR` | Trabajo en desarrollo o no cerrado. | No usar como instrucción final ni publicar. |
| `HISTÓRICO` | Fuente anterior, base de trabajo o respaldo. | Sirve para entender origen; no reemplaza la operación actual. |
| `NO PUBLICAR` | Material interno, sensible, legalmente no validado o no preparado para clientes. | No enlazar ni copiar a `public/` sin revisión formal. |
| `POR VALIDAR` | Idea, plan o contenido que requiere aprobación técnica, legal o comercial. | Validar antes de convertirlo en operación vigente. |

## Mapa de carpetas y uso correcto

| Ruta | Estado | Propósito | Úselo para | No lo use para |
|---|---|---|---|---|
| `design/tamara_pineros_landing_kit/` | `HISTÓRICO` / `REFERENCIA VIGENTE` | Kit base de la landing: brief, arquitectura, copy, UI kit, compliance, SEO, WhatsApp y wireframe. | Entender la intención original, recuperar criterio de marca y contrastar nuevas decisiones. | Tratarlo como verdad actual automática o copiar textos a `public/` sin revisión. |
| `design/TP_PLAN_MAESTRO_SDD/` | `POR VALIDAR` / `BORRADOR` | Planeación estratégica, flujos amplios, matrices y estructura futura de operación. | Tomar insumos para decidir evolución del negocio o abrir especificaciones nuevas. | Ejecutar sus planes como operación aprobada sin validación técnica, legal y comercial. |
| `design/internal-guides/` | `NO PUBLICAR` / `POR VALIDAR` | Guías internas, registros y documentos de revisión legal/operativa. | Preparar material, registrar criterios y revisar contenido antes de una versión pública. | Publicar guías, promesas legales o checklists directamente para clientes. |
| `design/_backup-trust/` | `HISTÓRICO` | Respaldo técnico de una versión o experimento anterior. | Comparar implementación o recuperar piezas puntuales con cuidado. | Reemplazar la landing vigente sin revisión. |
| `design/_backup-slice1/` | `HISTÓRICO` | Respaldo técnico de una iteración anterior. | Consultar diferencias históricas. | Asumir que contiene archivos desplegables vigentes. |
| `design/archived-images/` | `HISTÓRICO` / `NO PUBLICAR` | Imágenes archivadas o no vigentes. | Referencia visual interna. | Usarlas en la landing sin validar derechos, pertinencia y aprobación de marca. |
| `design/tamara_pineros_landing_kit/assets/` | `HISTÓRICO` / `POR VALIDAR` | Activos de referencia del kit original. | Consultar insumos visuales o placeholders. | Publicar activos sin aprobación explícita. |
| `design/tamara_pineros_landing_kit/prototype/` | `HISTÓRICO` | Prototipo estático del kit original. | Entender intención visual o estructura previa. | Confundirlo con el sitio desplegado actual. |

## Fuente de verdad por carpeta

| Carpeta | Rol |
|---|---|
| `docs/` | Verdad operativa vigente: explica cómo está organizado y cómo se mantiene el proyecto hoy. |
| `design/` | Archivo de fuentes, referencia, estrategia, borradores e históricos. No aprueba publicación por sí solo. |
| `public/` | Sitio desplegable: solo contenido y activos aprobados para visitantes. |
| `openspec/` | Gobierno de cambios: propuestas, especificaciones, diseños y tareas SDD. |

Si una decisión tomada desde `design/` cambia la operación actual, actualice también `docs/`. Si una pieza va a publicarse, cree una versión final revisada y ubíquela explícitamente en `public/`.

## Advertencia legal y de publicación

Nada dentro de `design/` debe considerarse asesoría pública, promesa comercial aprobada, política legal vigente o material listo para cliente. Antes de publicar cualquier contenido derivado de esta carpeta:

1. Revise el contenido con criterio humano/legal.
2. Confirme que no expone notas internas, prompts, matrices, borradores o datos sensibles.
3. Genere una versión final apta para clientes.
4. Copie solo esa versión final a `public/`.
5. Ejecute `node tools/smoke-static-contracts.js` y revise el diff.

## Regla sobre flujos largos

Los flujos extensos, como modelos de 15 pasos, pertenecen a planeación interna o referencia. Para explicación de propietario/cliente use el modelo operativo resumido en `docs/operations.md`.
