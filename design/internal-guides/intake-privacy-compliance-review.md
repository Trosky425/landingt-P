# Revisión interna de compliance: formulario, privacidad y consentimiento

**Estado:** Interno, no publicar.  
**Fecha de preparación:** 2026-07-06  
**Objetivo:** preparar una revisión interna para decidir si el flujo actual de formulario, privacidad y consentimiento debe ajustarse antes de cualquier cambio público.

> Recomendación mínima: no tocar `public/` hasta validar los claims legales y operativos marcados como `Necesita fuente` o `Requiere revisión legal`.

## Alcance y fuentes revisadas

### Alcance

Esta revisión cubre el flujo visible y técnico de captación de datos asociado al formulario de solicitud de servicio, la política pública de tratamiento de datos, el aviso de privacidad y las reglas operativas internas del repositorio.

No modifica páginas públicas legales ni valida jurídicamente el contenido existente.

### Fuentes revisadas

| Fuente | Uso en esta revisión |
|---|---|
| `public/index.html` | Estructura del formulario, checkbox de consentimiento, enlaces a privacidad, WhatsApp y teléfono. |
| `public/js/script.js` | Validación de campos, envío a Netlify Forms, honeypot, redirección a WhatsApp y endurecimiento de enlaces externos. |
| `public/privacy.html` | Claims públicos sobre finalidad, responsable, canales, RNBD, derechos, reclamos, plazos y vigencia. |
| `public/aviso-privacidad.html` | Resumen público del tratamiento, canales, responsable, medidas y derechos. |
| `docs/operations.md` | Regla interna: cambios de datos personales, privacidad, formularios o consentimiento requieren revisión legal. |
| `docs/file-map.md` | Regla interna: material legal/operativo no publicable vive en `design/internal-guides/`. |
| `.opencode/skills/legal-source-grounding/references/review-policy.md` | Política de trabajo: todo artifact legal/compliance requiere revisión humana y claims sin fuente se marcan como `Needs source` / equivalente. |

## Mapa del flujo de datos del formulario

1. La persona usuaria abre la landing y activa un botón con `data-service` o `data-intake`.
2. El sitio abre el modal `#intakeModal` con el servicio precargado si el valor está permitido por la lista interna del JavaScript.
3. La persona ingresa:
   - nombre completo;
   - ciudad;
   - servicio de interés;
   - autorización mediante checkbox de consentimiento.
4. Antes del envío, el JavaScript valida que los campos requeridos estén completos y que el checkbox esté marcado.
5. Si el campo honeypot `bot-field` tiene valor, el script detiene el envío.
6. Si la validación pasa, el script construye `URLSearchParams` a partir del formulario y fuerza `form-name=intake` si hace falta.
7. El sitio envía el payload con `fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, credentials: 'same-origin' })` para Netlify Forms.
8. Si Netlify responde correctamente, el formulario oculta los campos, muestra estado de éxito y abre/continúa a WhatsApp con un mensaje que incluye el servicio de interés.
9. Si falla el envío, se revierte el botón y se muestra un error recomendando intentar nuevamente o escribir por WhatsApp.

## Datos recogidos y finalidad aparente

| Dato / señal | Fuente técnica | Obligatorio | Finalidad aparente observada | Estado de soporte |
|---|---:|---:|---|---|
| `nombre` / nombre completo | `public/index.html` formulario intake | Sí | Identificar a la persona para contactarla. | Soportado técnicamente por el formulario; finalidad legal requiere revisión humana. |
| `ciudad` | `public/index.html` formulario intake | Sí | Ubicar la solicitud y orientar la clasificación inicial. | Soportado técnicamente por el formulario; finalidad legal requiere revisión humana. |
| `servicio` | `public/index.html` + `SERVICE_LABELS` en `public/js/script.js` | Sí | Clasificar el asunto entre personas/derechos, conflictos/acuerdos o emprendimientos/empresas. | Soportado técnicamente. |
| `consent` | Checkbox requerido en `public/index.html` | Sí para enviar | Registrar que la persona marcó autorización de tratamiento conforme a la política. | Soportado técnicamente por checkbox requerido; suficiencia probatoria requiere revisión legal. |
| `form-name=intake` | Campo oculto y refuerzo en `public/js/script.js` | Sí para Netlify Forms | Identificar el formulario ante Netlify. | Soportado técnicamente. |
| `bot-field` | Honeypot oculto | No para humanos | Reducir envíos automatizados básicos. | Soportado técnicamente; eficacia antispam no debe presentarse como garantía. |
| Mensaje de WhatsApp con servicio de interés | `public/js/script.js` | Derivado | Facilitar continuidad comercial por WhatsApp después del envío. | Soportado técnicamente; uso de WhatsApp como canal de tratamiento requiere revisión legal/operativa. |

## Puntos técnicamente correctos sin cambio técnico inmediato

- El checkbox de consentimiento no está preseleccionado y es requerido para enviar el formulario.
- La validación de `servicio` está limitada a valores permitidos en `SERVICE_LABELS`.
- El envío usa `application/x-www-form-urlencoded`, compatible con el patrón observado de Netlify Forms.
- Existe honeypot técnico (`bot-field`) para fricción básica contra bots.
- Los enlaces externos abiertos en nueva pestaña reciben `rel="noopener noreferrer"`.
- El flujo público ya enlaza la política de tratamiento desde el texto del consentimiento.
- La política y el aviso ya reconocen el formulario intake como canal de recolección, según el contenido observado.

Estos puntos no significan cumplimiento legal definitivo; solo indican que no se detecta una corrección técnica urgente antes de la revisión humana.

## Claims legales/técnicos que requieren fuente o validación humana

| Claim o punto | Ubicación observada | Estado | Nota de revisión |
|---|---|---|---|
| Cumplimiento de Ley 1581 de 2012, Decreto 1377 de 2013 y demás normas concordantes. | `public/privacy.html` | Necesita fuente / Requiere revisión legal | Validar texto legal completo, alcance y redacción vigente. |
| “RNBD: A la fecha, no aplica.” | `public/privacy.html`, `public/aviso-privacidad.html` | Necesita fuente / Requiere revisión legal | Requiere criterio legal y soporte específico del responsable. |
| Plazo de quince días hábiles y referencia al artículo 16 de Ley 1581 de 2012. | `public/privacy.html` | Necesita fuente / Requiere revisión legal | No validar sin fuente legal revisada. |
| “Doctrina y jurisprudencia de la SIC — conceptos y decisiones vinculantes”. | `public/privacy.html` | Necesita fuente / Requiere revisión legal | Requiere precisión sobre fuente, obligatoriedad y redacción. |
| “Se transmiten de forma segura a través de Netlify Forms”. | `public/privacy.html` | Necesita fuente | Requiere soporte técnico/documental de Netlify y criterio sobre cómo expresarlo. |
| Uso “exclusivo” de los datos para contacto/orientación. | `public/privacy.html`, `public/aviso-privacidad.html` | Requiere revisión legal/operativa | Contrastar con finalidades amplias de la política: calidad, facturación, obligaciones legales y comunicaciones. |
| Medidas técnicas, administrativas y jurídicas de protección. | `public/aviso-privacidad.html` | Requiere revisión legal/operativa | Debe corresponder con controles reales del despacho y proveedores. |
| Evidencia suficiente de consentimiento por checkbox + Netlify Forms. | `public/index.html`, `public/js/script.js` | Requiere revisión legal | Definir si el registro capturado prueba autorización expresa, previa e informada de forma suficiente. |
| Retención, acceso, exportación y eliminación de datos dentro de Netlify Forms. | Flujo técnico inferido por uso de Netlify Forms | Necesita fuente | Validar rol de Netlify, configuración de cuenta, retención y procedimiento interno. |
| Tratamiento posterior en WhatsApp. | Redirección posterior al envío | Requiere revisión legal/operativa | Definir si el aviso/política cubre adecuadamente ese canal y el control interno del despacho. |

## Decisiones pendientes para la propietaria/socio legal

1. Confirmar si el responsable, dirección, correo y teléfono publicados son correctos y suficientes.
2. Validar si el claim de no obligación RNBD aplica al caso concreto.
3. Decidir si la redacción actual de consentimiento es suficiente o si debe incluir finalidades resumidas junto al checkbox.
4. Definir si Netlify Forms seguirá siendo el canal de recepción o si se prefiere eliminar el formulario y usar solo WhatsApp/teléfono.
5. Definir quién accede a los envíos de Netlify Forms, cómo se exportan, cuánto tiempo se conservan y cómo se atienden solicitudes de supresión/revocatoria.
6. Validar si WhatsApp debe mencionarse con mayor precisión como canal posterior de tratamiento y coordinación.
7. Confirmar si se mantendrán finalidades como encuestas, comunicaciones informativas y facturación dentro de la política pública.
8. Decidir si se necesita registro operativo interno de consentimientos o procedimiento documentado de atención de reclamos.

## Opciones de implementación posterior

### Opción A — Mantener formulario con ajustes mínimos

**Qué implicaría:** conservar Netlify Forms y ajustar copy/legal solo después de revisión humana.

**Posibles ajustes posteriores, no aprobados aún:**

- Reforzar texto de consentimiento con finalidades resumidas validadas.
- Aclarar el rol de WhatsApp y Netlify Forms con fuentes aprobadas.
- Documentar procedimiento interno de acceso, retención y supresión.

**Riesgo:** requiere validar proveedor, evidencia de consentimiento y consistencia legal antes de tocar `public/`.

### Opción B — Usar solo WhatsApp/teléfono

**Qué implicaría:** retirar o desactivar el formulario público y canalizar contacto por medios directos.

**Riesgo:** reduce superficie técnica del formulario, pero no elimina obligaciones de privacidad ni necesidad de aviso/política sobre canales de atención. Requiere revisión legal antes de cambiar páginas públicas.

### Opción C — Dejar como está con riesgo aceptado

**Qué implicaría:** no realizar cambios técnicos ni legales inmediatos.

**Riesgo:** la propietaria/socio legal debe aceptar expresamente los puntos marcados como `Necesita fuente` o `Requiere revisión legal`, especialmente RNBD, Netlify Forms, consentimiento, retención y coherencia de finalidades.

## Recomendación mínima

No tocar `public/` ni las páginas legales públicas hasta que la propietaria/socio legal valide los claims legales y técnicos no soportados. El siguiente paso seguro es revisar este documento internamente y decidir una opción de implementación posterior.

## Bloque de revisión obligatoria

```yaml
source_status: partially_supported
human_review: required
unsupported_claims:
  - "Aplicabilidad o no del RNBD al responsable publicado."
  - "Suficiencia legal del consentimiento capturado mediante checkbox y Netlify Forms."
  - "Plazos, derechos y procedimiento de reclamos citados en la política pública."
  - "Rol, seguridad, retención, acceso y eliminación de datos en Netlify Forms."
  - "Cobertura legal del paso posterior a WhatsApp y tratamiento en ese canal."
  - "Consistencia entre finalidades exclusivas de orientación/contacto y finalidades ampliadas como calidad, facturación o comunicaciones."
drafting_notes:
  - "Este documento se basa en lectura técnica del repositorio y reglas internas; no constituye validación legal."
  - "Las fuentes jurídicas públicas citadas por las páginas existentes no fueron verificadas contra texto legal oficial en esta tarea."
  - "No se modificó public/ ni se aprobaron cambios de copy público."
  - "Las decisiones legales deben quedar aprobadas por la propietaria/socio legal antes de implementar ajustes públicos."
```
