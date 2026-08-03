<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

<img src="./public/brand/anclora-groundsync.png" alt="Anclora GroundSync" width="132" />

# Anclora GroundSync

### Work-shift management and synchronization

Internal operational application, governed as an independent product, for shift planning, Excel data import, and report generation.

[Español](./README.md) · **English**

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Category](https://img.shields.io/badge/category-Premium-C07860)
![Languages](https://img.shields.io/badge/languages-ES%20%7C%20EN-047857)

</div>

---

> [!IMPORTANT]
> Internal Anclora ecosystem repository. Do not publish operational details, credentials, or sensitive logic outside authorized channels.

## What it is

Anclora GroundSync is an internal operational tool for work-shift planning and synchronization. Although used internally, it is governed in the brand ecosystem as an independent product, comparable to `anclora-impulso`.

## Category in the ecosystem

| Field | Value |
|---|---|
| Category | Premium |
| Brand accent | `#6AAD49` |
| Canonical repository | `anclora-groundsync` |

## Key features

- Monthly shift dashboard with month navigation
- Shift import from Excel (ExcelJS)
- OCR data extraction (Tesseract.js)
- PDF report generation (jsPDF)
- Serverless database (Neon)

## Technology stack

| Area | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Express |
| Database | Neon (serverless PostgreSQL) |
| Data | ExcelJS, PDF.js, Tesseract.js |
| PDF | jsPDF |

## Local setup

```bash
npm install
npm run dev
```

## Supported languages

- Español (default)
- English

## Documentation and governance

- Brand and governance contracts: [`docs/standards/`](./docs/standards/)
- Anclora Vault (source of truth): `contracts/` and `docs/governance/`

---

<div align="center">

### Anclora Group

Internal use.

</div>
