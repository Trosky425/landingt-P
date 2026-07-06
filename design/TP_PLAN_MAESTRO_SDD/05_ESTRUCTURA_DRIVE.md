# Estructura Drive propuesta

```text
TP_OPERACION/
│
├── 00_ADMINISTRACION/
│   ├── contratos_internos/
│   ├── honorarios/
│   ├── pagos/
│   └── reportes/
│
├── 01_MARCA_Y_MARKETING/
│   ├── logos/
│   ├── piezas_visuales/
│   ├── videos/
│   ├── copys/
│   └── calendario_contenido/
│
├── 02_COMERCIAL/
│   ├── leads/
│   ├── scripts_whatsapp/
│   ├── catalogo_servicios/
│   └── propuestas/
│
├── 03_CLIENTES/
│   ├── 2026_Cliente_Apellido_Asunto/
│   │   ├── 01_intake/
│   │   ├── 02_documentos_cliente/
│   │   ├── 03_analisis_juridico/
│   │   ├── 04_borradores/
│   │   ├── 05_version_final/
│   │   ├── 06_soportes_entrega/
│   │   └── 07_cierre/
│
├── 04_PLANTILLAS/
│   ├── derechos_peticion/
│   ├── tutelas/
│   ├── contratos/
│   ├── poderes/
│   ├── propuestas_servicio/
│   └── respuestas_modelo/
│
├── 05_POOL_ABOGADOS/
│   ├── perfiles/
│   ├── contratos_prestacion/
│   ├── areas/
│   └── asignaciones/
│
├── 06_COMPLIANCE/
│   ├── politica_datos/
│   ├── aviso_privacidad/
│   ├── autorizaciones/
│   ├── terminos_web/
│   └── disclaimers/
│
└── 07_METRICAS/
    ├── dashboard_whatsapp/
    ├── dashboard_redes/
    ├── dashboard_ventas/
    └── dashboard_operacion/
```

## Regla de nombres

```text
AAAA-MM-DD_CLIENTE_ASUNTO_TIPO_DOCUMENTO_v01
```

## Ejemplo

```text
2026-06-26_MARIA-GOMEZ_ARRIENDO_RESPUESTA-INCREMENTO_v01
```

## Reglas mínimas

- Cada cliente debe tener carpeta propia.
- Cada caso debe tener intake.
- Cada documento debe tener versión.
- Cada entrega debe guardar soporte.
- Cada carpeta debe tener permisos por rol.
- Los documentos sensibles no deben circular por canales personales.
