# Informes SEO semanales

Informes generados automáticamente por `pnpm seo:report` (cron GitHub Actions los lunes 09:00 UTC).

## Convención de nombres

```text
docs/reports/seo-YYYY-MM-DD.md
```

Ejemplo: `seo-2026-09-08.md`.

## Uso

- **No editar a mano.** Regenera con `pnpm seo:report` o espera al workflow.
- Fuente de verdad para una **Cursor Automation** que lea el informe más reciente y proponga PRs de metadatos/copy orientados a captación de clientes.
- El mismo informe se envía por email a la dirección configurada en `SEO_REPORT_TO`.

## Contenido típico

1. Resumen ejecutivo (leads / visibilidad en riesgo)
2. KPIs Search Console (28 días vs 28 anteriores)
3. Páginas en pico de impresiones
4. Consultas comerciales
5. Top páginas (money pages marcadas)
6. PageSpeed Insights (URLs dinámicas)
7. Recomendaciones Alta / Media / Baja con archivo del repo a tocar

## Notas de robustez (edge cases)

- Picos: ≥ 10 impresiones actuales; si no había base previa, ≥ 20 (evita falsos positivos).
- Caídas de clics: requieren ≥ 3 clics en el periodo anterior.
- Email en CI se envía **después** del push para que el enlace a GitHub funcione.
- Consultas con `-site:` / `site:` o > 80 caracteres se filtran como ruido.

Ver detalle del comando y secrets en [`docs/SCRIPTS.md`](../SCRIPTS.md).
