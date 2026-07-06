# Visión general del proyecto

Este documento explica el proyecto en lenguaje de propietario: qué existe hoy, para quién sirve, qué partes son públicas y qué límites no se deben cruzar sin decisión legal y técnica.

## Resumen ejecutivo

La landing de Tamara & Piñeros es un sitio estático para captar consultas jurídicas con una experiencia sobria, clara y confiable. Su función actual es presentar la firma, orientar al visitante por servicio, recibir solicitudes mediante formulario Netlify Forms y facilitar continuidad por WhatsApp.

No es todavía un sistema de gestión de clientes, CRM, expediente digital, portal de usuarios ni aplicación con base de datos propia.

## Alcance actual

| Área | Estado actual |
|---|---|
| Sitio público | Landing estática en `public/`. |
| Captación | Formulario de contacto y WhatsApp. |
| Legal básico | Páginas de privacidad y aviso de privacidad dentro de `public/`. |
| Diseño y estrategia | Material de referencia en `design/`. |
| Gobierno del proyecto | Cambios planificados con OpenSpec/SDD en `openspec/`. |
| Verificación | Script local en `tools/smoke-static-contracts.js`. |

## Qué ve el visitante

El visitante solo debe interactuar con contenido aprobado y publicado desde `public/`: páginas HTML, estilos, comportamiento JavaScript, imágenes, rutas legales, sitemap, robots y redirecciones. Esta carpeta es la vitrina.

## Qué no debe ver el visitante

El visitante no debe recibir borradores, guías internas, prompts, especificaciones, matrices de decisión, documentos SDD, material no aprobado o notas de revisión. Ese material pertenece a `docs/`, `design/`, `openspec/`, `.opencode/`, `.atl/` o carpetas internas equivalentes.

## Definición de éxito

El proyecto está sano cuando:

- La landing comunica rápido qué hace la firma.
- El visitante puede elegir un servicio y contactar sin fricción.
- La información legal pública está revisada por criterio humano/legal.
- El material interno no se publica accidentalmente.
- Los cambios se verifican antes de desplegar.
- La documentación se actualiza cuando cambia la estructura o la operación.

## Próxima lectura

- Para entender carpetas y archivos: [file-map.md](file-map.md).
- Para operar cambios: [operations.md](operations.md).
- Para decisiones técnicas: [architecture.md](architecture.md).
