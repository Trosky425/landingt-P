# Operación del proyecto

Esta guía explica cómo actualizar, verificar y publicar cambios sin romper la frontera entre lo público y lo interno.

## Antes de cambiar algo

1. Identifique si el cambio afecta contenido público, diseño, comportamiento, legal, despliegue o documentación interna.
2. Si afecta al visitante, revise primero `public/` y pida aprobación de contenido cuando corresponda.
3. Si afecta estructura, despliegue, activos públicos o gobierno, actualice la documentación relacionada en el mismo trabajo.

## Cambios comunes

| Cambio | Archivos probables | Revisión necesaria |
|---|---|---|
| Texto visible de la landing | `public/index.html` | Legal/negocio si modifica promesas, servicios o datos. |
| Política o aviso de privacidad | `public/privacy.html`, `public/aviso-privacidad.html` | Legal obligatoria. |
| Diseño visual | `public/css/styles.css`, `public/images/` | Marca/propietaria. |
| Interacción del formulario | `public/js/script.js` | Técnica y legal si cambia captación de datos. |
| PDF o guía pública | `public/assets/guides/` si existe y está aprobado | Legal antes de publicar. |
| Documentación interna | `README.md`, `docs/`, `design/README.md` | Técnica/operativa. |
| Rutas o despliegue | `netlify.toml`, `public/_redirects` | Técnica, con verificación. |

## Modelo operativo de 7 pasos

Este es el modelo corto para entender la operación de cara a la propietaria y al público. Los flujos más largos, como modelos de 15 pasos, quedan como planeación interna o referencia en `design/` y no deben presentarse como operación aprobada sin validación.

| Paso | Etapa | Qué ocurre |
|---|---|---|
| 1 | Entrada/contacto | La persona llega por la landing, formulario, WhatsApp o canal referido. |
| 2 | Clasificación | Se identifica el tipo de necesidad jurídica, urgencia, ciudad, canal y datos mínimos. |
| 3 | Filtro legal/comercial | Se valida si el caso encaja con los servicios, si hay conflictos, riesgos o información insuficiente. |
| 4 | Propuesta | Se explica alcance posible, condiciones, honorarios o siguiente paso comercial según corresponda. |
| 5 | Apertura del caso | Si la persona acepta, se formalizan datos, documentos, autorización y responsabilidad interna. |
| 6 | Ejecución y revisión | El equipo trabaja el asunto, revisa avances y mantiene control legal, documental y de comunicación. |
| 7 | Entrega y cierre | Se entrega el resultado acordado, se aclaran siguientes pasos y se conserva registro interno. |

## Verificación local

Ejecute siempre desde la raíz:

```bash
node tools/smoke-static-contracts.js
```

Resultado esperado:

```text
Smoke static contracts passed.
```

Además, revise manualmente:

- los enlaces relativos de la documentación;
- que no existan documentos `.md` dentro de `public/`;
- que `public/_redirects` siga bloqueando rutas internas;
- que `git diff --name-only` muestre solo archivos esperados.

## Flujo para publicar activos legales o PDFs

1. Redacte o edite el material fuera de `public/`, normalmente en `design/internal-guides/`.
2. Solicite revisión humana/legal.
3. Solo cuando esté aprobado, exporte la versión pública final.
4. Copie la versión aprobada a una ruta pública como `public/assets/guides/` si el proyecto la crea.
5. Actualice la allowlist o contrato técnico si el JavaScript debe permitir descarga pública.
6. Enlace el activo desde `public/index.html` únicamente después de aprobarlo.
7. Ejecute `node tools/smoke-static-contracts.js`.

## Despliegue

Netlify despliega desde `public/` según `netlify.toml`. Un cambio en archivos internos no debería alterar el sitio público hasta que se modifique `public/` o la configuración de despliegue.

Antes de dar un despliegue por listo:

- confirme que el smoke test pasa;
- revise el diff;
- confirme que no se publicaron documentos internos;
- valide páginas legales si fueron tocadas;
- compruebe que `sitemap.xml` y `robots.txt` siguen coherentes si cambian URLs públicas.

## Cuándo pedir revisión legal

Pida revisión legal cuando el cambio toque:

- tratamiento de datos personales;
- política o aviso de privacidad;
- promesas de resultado;
- descripción de servicios jurídicos;
- formularios o consentimiento;
- guías descargables;
- textos que puedan interpretarse como asesoría legal específica.

## Regla de mantenimiento

Los cambios estructurales, de despliegue, activos públicos o gobierno deben actualizar `README.md`, `docs/` o `design/README.md` dentro del mismo work unit. Esto evita que el repositorio diga una cosa y el sitio haga otra.
