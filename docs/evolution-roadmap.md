# Ruta de evolución

La landing puede crecer, pero debe hacerlo por decisiones explícitas. El objetivo es evitar convertir una tarjeta de presentación clara en una aplicación improvisada sin privacidad, soporte ni arquitectura.

Los planes amplios en `design/TP_PLAN_MAESTRO_SDD/` son insumos estratégicos y requieren validación legal, comercial y técnica antes de convertirse en operación vigente.

## Fase 0 — Landing estática actual

| Criterio | Estado |
|---|---|
| Propósito | Presentar la firma y captar consultas. |
| Tecnología | HTML, CSS y JavaScript estático en `public/`. |
| Captación | Formulario Netlify Forms y WhatsApp. |
| Riesgo principal | Publicar material interno o cambiar textos legales sin revisión. |

Mantener esta fase mientras el objetivo sea conversión simple y presencia profesional.

## Fase 1 — Madurez de contenido

Se justifica cuando la firma necesita más claridad comercial sin crear una app.

Posibles cambios:

- mejores páginas legales;
- guías descargables aprobadas;
- más casos de uso o preguntas frecuentes;
- mejoras SEO;
- medición básica de conversión;
- sistema más ordenado de revisión de contenido.

Puertas de decisión:

- ¿El contenido fue revisado legalmente?
- ¿El activo público pertenece realmente a `public/`?
- ¿El smoke test sigue bloqueando material interno?
- ¿La documentación operativa fue actualizada?

## Fase 2 — Entrada a aplicación

Se justifica si aparece una experiencia separada: seguimiento de solicitudes, clientes recurrentes, agenda, formularios complejos o área privada.

Decisión técnica previa:

- usar `/app` dentro del mismo dominio o un subdominio separado;
- definir si la landing sigue siendo estática;
- separar el marketing público del producto privado;
- decidir autenticación, datos y soporte.

Recomendación: mantener la landing como entrada pública y construir la app como unidad separada, aunque comparta marca.

## Fase 3 — Aplicación web completa

Solo debe iniciar cuando existan necesidades reales de producto, no por ansiedad técnica.

Requisitos antes de construir:

- modelo de usuarios y roles;
- política de tratamiento de datos;
- base de datos y backups;
- auditoría de acciones sensibles;
- seguridad de autenticación;
- flujo de soporte;
- responsable operativo;
- presupuesto de mantenimiento;
- revisión legal y técnica formal.

## Señales de que NO hace falta una app todavía

- La mayoría de contactos se resuelve por WhatsApp o formulario simple.
- No hay necesidad de historial privado para clientes.
- No hay equipo para operar soporte técnico.
- No existe decisión de privacidad, datos y retención.
- La prioridad sigue siendo claridad comercial y captación.

## Regla de gobierno

Si una nueva idea requiere autenticación, persistencia, pagos, expedientes, mensajes privados o datos sensibles, no se implementa directamente en `public/`. Primero se abre una decisión de arquitectura y se actualizan las especificaciones/documentación.
