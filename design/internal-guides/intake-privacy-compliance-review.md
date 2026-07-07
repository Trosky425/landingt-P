# Revisión interna de compliance: formulario, privacidad y consentimiento

**Estado:** Interno, no publicar. Decisión aplicada: ruta WhatsApp-assisted/no Netlify storage.
**Fecha de preparación:** 2026-07-06
**Objetivo:** preparar una revisión interna para decidir si el flujo actual de formulario, privacidad y consentimiento debe ajustarse antes de cualquier cambio público.

> Decisión tomada por el usuario: conservar el formulario gestionado desde la landing, validar localmente y abrir WhatsApp con un mensaje estructurado, evitando almacenamiento del intake en Netlify Forms.

## Alcance y fuentes revisadas

### Alcance

Esta revisión cubre el flujo visible y técnico de captación de datos asociado al formulario de solicitud de servicio, la política pública de tratamiento de datos, el aviso de privacidad y las reglas operativas internas del repositorio.

No modifica páginas públicas legales ni valida jurídicamente el contenido existente.

### Fuentes revisadas

| Fuente | Uso en esta revisión |
|---|---|
| `public/index.html` | Estructura del formulario, checkbox de consentimiento, enlaces a privacidad, WhatsApp y teléfono. |
| `public/js/script.js` | Validación local de campos, construcción de mensaje de WhatsApp y endurecimiento de enlaces externos. |
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
5. Si la validación pasa, el script construye un mensaje de WhatsApp con nombre, ciudad, servicio de interés y referencia al consentimiento.
6. El sitio no realiza `fetch` ni envía el formulario a Netlify Forms.
7. El formulario oculta los campos, muestra estado de continuidad a WhatsApp y abre WhatsApp con el mensaje prellenado para que la persona lo revise, edite y lo envíe desde su cuenta; al abrir `wa.me`, el texto prellenado viaja por el URL hacia WhatsApp/Meta y queda sujeto a su tratamiento y condiciones.

## Datos recogidos y finalidad aparente

| Dato / señal | Fuente técnica | Obligatorio | Finalidad aparente observada | Estado de soporte |
|---|---:|---:|---|---|
| `nombre` / nombre completo | `public/index.html` formulario intake | Sí | Identificar a la persona para contactarla. | Soportado técnicamente por el formulario; finalidad legal requiere revisión humana. |
| `ciudad` | `public/index.html` formulario intake | Sí | Ubicar la solicitud y orientar la clasificación inicial. | Soportado técnicamente por el formulario; finalidad legal requiere revisión humana. |
| `servicio` | `public/index.html` + `SERVICE_LABELS` en `public/js/script.js` | Sí | Clasificar el asunto entre personas/derechos, conflictos/acuerdos o emprendimientos/empresas. | Soportado técnicamente. |
| `consent` | Checkbox requerido en `public/index.html` | Sí para enviar | Registrar que la persona marcó autorización de tratamiento conforme a la política. | Soportado técnicamente por checkbox requerido; suficiencia probatoria requiere revisión legal. |
| Mensaje de WhatsApp con nombre, ciudad y servicio de interés | `public/js/script.js` | Derivado | Facilitar continuidad comercial por WhatsApp sin almacenamiento en Netlify Forms. | Soportado técnicamente; uso de WhatsApp como canal de tratamiento requiere revisión legal/operativa. |

## Puntos técnicamente correctos sin cambio técnico inmediato

- El checkbox de consentimiento no está preseleccionado y es requerido para enviar el formulario.
- La validación de `servicio` está limitada a valores permitidos en `SERVICE_LABELS`.
- El sitio ya no publica atributos ni campos de Netlify Forms para el intake.
- El script ya no usa `fetch` para enviar el formulario intake.
- El intake usa un contenedor no-submit con `role="form"`; sin JavaScript no existe envío navegacional con datos personales en la URL.
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
| “Se transmiten de forma segura a través de Netlify Forms”. | Texto público anterior en `public/privacy.html` | Resuelto técnicamente | Se removió como canal activo del intake porque el flujo elegido no usa Netlify Forms. |
| Uso “exclusivo” de los datos para contacto/orientación. | `public/privacy.html`, `public/aviso-privacidad.html` | Requiere revisión legal/operativa | Contrastar con finalidades amplias de la política: calidad, facturación, obligaciones legales y comunicaciones. |
| Medidas técnicas, administrativas y jurídicas de protección. | `public/aviso-privacidad.html` | Requiere revisión legal/operativa | Debe corresponder con controles reales del despacho y proveedores. |
| Evidencia suficiente de consentimiento por checkbox + envío posterior desde WhatsApp. | `public/index.html`, `public/js/script.js` | Requiere revisión legal | Definir si el flujo actual es suficiente para autorización expresa, previa e informada y cómo se conserva evidencia operativa. |
| Retención, acceso, exportación y eliminación de datos dentro de WhatsApp. | Flujo técnico elegido | Requiere revisión legal/operativa | Definir control interno del canal, responsables, tiempos de conservación y respuesta a solicitudes de titulares. |
| Tratamiento posterior en WhatsApp/Meta. | Apertura de `wa.me` con texto prellenado en el URL | Requiere revisión legal/operativa | Definir si el aviso/política cubre adecuadamente ese canal, el momento de transferencia al proveedor y el control interno del despacho. |

## Decisiones pendientes para la propietaria/socio legal

1. Confirmar si el responsable, dirección, correo y teléfono publicados son correctos y suficientes.
2. Validar si el claim de no obligación RNBD aplica al caso concreto.
3. Decidir si la redacción actual de consentimiento es suficiente o si debe incluir finalidades resumidas junto al checkbox.
4. Definir el procedimiento interno de acceso, conservación y eliminación de datos recibidos por WhatsApp.
5. Validar si el consentimiento del flujo WhatsApp-assisted debe complementarse con registro operativo interno.
6. Validar si WhatsApp debe mencionarse con mayor precisión como canal principal de tratamiento y coordinación.
7. Confirmar si el tratamiento y condiciones de WhatsApp/Meta están explicados de forma suficiente para el flujo con mensaje prellenado en URL.
8. Confirmar si se mantendrán finalidades como encuestas, comunicaciones informativas y facturación dentro de la política pública.
9. Decidir si se necesita registro operativo interno de consentimientos o procedimiento documentado de atención de reclamos.

## Opciones de implementación posterior

### Ruta elegida — Formulario asistido por WhatsApp sin Netlify storage

**Qué implica:** conservar el modal de intake en la landing, validar localmente los campos mínimos y abrir WhatsApp con un mensaje estructurado por la persona usuaria, aclarando que el texto prellenado viaja por el URL hacia WhatsApp/Meta al abrir el canal.

**Ajustes aplicados:**

- Remover atributos y campos de Netlify Forms del formulario intake.
- Eliminar el envío `fetch` del formulario.
- Reemplazar el formulario navegacional por un contenedor no-submit con `role="form"` para evitar filtración de datos personales por query string si JavaScript falla.
- Ajustar copy público mínimo para decir “Continuar por WhatsApp” y evitar afirmar almacenamiento o envío por servidor.
- Ajustar referencias públicas a Netlify Forms como canal activo del intake.
- Ajustar copy público para explicar conservadoramente que WhatsApp/Meta recibe el mensaje prellenado al abrir `wa.me`, antes de que el titular decida enviarlo dentro de WhatsApp.

**Riesgo restante:** requiere validar operación interna de WhatsApp/Meta, evidencia de consentimiento, conservación de datos y consistencia completa de la política pública.

### Opción A — Mantener Netlify Forms

**Estado:** descartada para el intake actual por decisión del usuario.

### Opción B — Usar solo WhatsApp/teléfono sin formulario asistido

**Qué implicaría:** retirar o desactivar el formulario público y canalizar contacto únicamente por medios directos.

**Riesgo:** reduce superficie técnica del formulario, pero no elimina obligaciones de privacidad ni necesidad de aviso/política sobre canales de atención. Requiere revisión legal antes de cambiar páginas públicas.

### Opción C — Dejar como está con riesgo aceptado

**Qué implicaría:** no realizar cambios técnicos ni legales inmediatos.

**Riesgo:** la propietaria/socio legal debe aceptar expresamente los puntos marcados como `Necesita fuente` o `Requiere revisión legal`, especialmente RNBD, consentimiento, tratamiento por WhatsApp/Meta, retención y coherencia de finalidades.

## Recomendación mínima

Después de la decisión aplicada, el siguiente paso seguro es revisión humana/legal de los textos públicos modificados y definición del procedimiento interno para datos recibidos por WhatsApp.

## Bloque de revisión obligatoria

```yaml
source_status: partially_supported
human_review: required
unsupported_claims:
  - "Aplicabilidad o no del RNBD al responsable publicado."
  - "Suficiencia legal del consentimiento capturado mediante checkbox y envío posterior desde WhatsApp."
  - "Plazos, derechos y procedimiento de reclamos citados en la política pública."
  - "Rol, seguridad, retención, acceso y eliminación de datos en WhatsApp/Meta."
  - "Cobertura legal del paso hacia WhatsApp/Meta al abrir el URL con mensaje prellenado y tratamiento en ese canal."
  - "Consistencia entre finalidades exclusivas de orientación/contacto y finalidades ampliadas como calidad, facturación o comunicaciones."
drafting_notes:
  - "Este documento se basa en lectura técnica del repositorio y reglas internas; no constituye validación legal."
  - "Las fuentes jurídicas públicas citadas por las páginas existentes no fueron verificadas contra texto legal oficial en esta tarea."
  - "El usuario aceptó este documento como base interna y eligió la ruta WhatsApp-assisted/no Netlify storage."
  - "Se hicieron ajustes públicos mínimos para coherencia técnica; no constituyen validación legal completa."
  - "Las decisiones legales pendientes deben ser revisadas por la propietaria/socio legal antes de considerar el flujo como cerrado jurídicamente."
```
