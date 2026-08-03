<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

<img src="./public/brand/anclora-groundsync.png" alt="Anclora GroundSync" width="132" />

# Anclora GroundSync

### Gestión y sincronización de turnos de trabajo

Aplicación operativa interna, gobernada como producto independiente, para planificar turnos, importar datos desde Excel y generar informes.

**Español** · [English](./README.en.md)

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Categoría](https://img.shields.io/badge/categoría-Premium-C07860)
![Idiomas](https://img.shields.io/badge/idiomas-ES%20%7C%20EN-047857)

</div>

---

> [!IMPORTANT]
> Repositorio interno del ecosistema Anclora. No publicar detalles operativos, credenciales ni lógica sensible fuera de canales autorizados.

## Qué es

Anclora GroundSync es una herramienta operativa interna de planificación y sincronización de turnos de trabajo. Aunque es de uso interno, se gobierna en el ecosistema de marca como producto independiente, comparable a `anclora-impulso`.

## Categoría en el ecosistema

| Campo | Valor |
|---|---|
| Categoría | Premium |
| Acento de marca | `#6AAD49` |
| Repositorio canónico | `anclora-groundsync` |

## Funcionalidades principales

- Panel mensual de turnos con navegación por mes
- Importación de turnos desde Excel (ExcelJS)
- Extracción de datos por OCR (Tesseract.js)
- Generación de informes en PDF (jsPDF)
- Base de datos serverless (Neon)

## Stack tecnológico

| Área | Tecnología |
|---|---|
| Frontend | React, Vite |
| Backend | Express |
| Base de datos | Neon (PostgreSQL serverless) |
| Datos | ExcelJS, PDF.js, Tesseract.js |
| PDF | jsPDF |

## Arranque local

```bash
npm install
npm run dev
```

## Idiomas soportados

- Español (predeterminado)
- English

## Documentación y gobernanza

- Contratos de marca y gobernanza: [`docs/standards/`](./docs/standards/)
- Bóveda Anclora (fuente de verdad): `contracts/` y `docs/governance/`

---

<div align="center">

### Anclora Group

Uso interno.

</div>
