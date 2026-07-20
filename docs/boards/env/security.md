# Security Headers

**Optional**: control CORS, framing, HSTS and Content-Security-Policy per deployment. All are unset by default — Boards behaves exactly as before when left blank.

## CORS &amp; framing

By default the API accepts cross-origin calls from any origin (needed for embedding Boards in unknown parent sites). Set `CORS_ALLOWED_ORIGINS` to lock Boards down to a known set of origins instead.

| Key                             | Description                                                                                                                                                                                                                                              | Default              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `global.env.CORS_ALLOWED_ORIGINS` | <div style="max-width:440px">**Optional**: Comma-separated list of origins allowed to embed or cross-origin-call Boards. When set, the API reflects **only** these origins (Boards' own URL is added automatically) and the frontend restricts framing (CSP `frame-ancestors`) to them. `*` matches a single sub-domain label, e.g. `https://*.example.com`. <br/>Blank = open (any origin).</div> | *(open)* |

A single origin can be set inline. For a longer list, use a YAML folded block (`>-`) with one origin per line, each ending in a comma:

```yaml
global:
  env:
    # inline
    CORS_ALLOWED_ORIGINS: https://connections.company.com

    # list
    CORS_ALLOWED_ORIGINS: >-
      https://teams.microsoft.com,
      https://*.teams.microsoft.com,
      https://connections.company.com
```

## HSTS

`Strict-Transport-Security` is always sent (default `max-age=15724800; includeSubDomains`). Use these settings to override the default:

| Key                                   | Description                                                              | Default    |
| ------------------------------------- | ----------------------------------------------------------------------- | ---------- |
| `global.env.HSTS_MAX_AGE`             | **Optional**: `max-age` in seconds. Non-numeric values fall back to the default. | `15724800` |
| `global.env.HSTS_INCLUDE_SUBDOMAINS`  | **Optional**: Set `false` to drop the `includeSubDomains` directive.    | `true`     |
| `global.env.HSTS_PRELOAD`             | **Optional**: Set `true` to add the `preload` directive.                | `false`    |

For example, a two-year policy with preload:

```yaml
global:
  env:
    HSTS_MAX_AGE: 31536000
    HSTS_INCLUDE_SUBDOMAINS: 'true'
    HSTS_PRELOAD: 'true'
```

## Content-Security-Policy

No CSP is enforced by default (aside from `frame-ancestors`, set via `CORS_ALLOWED_ORIGINS` above). Validate a policy in report-only mode first, then enforce it.

| Key                                | Description                                                                                                                                                                                                                                | Notes                                                                                                                                                                                                    |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `webfront.env.CSP_REPORT_ONLY`     | <div style="max-width:440px">**Optional**: A candidate policy sent as `Content-Security-Policy-Report-Only`. The browser **reports** violations without blocking anything — use it to see what a policy would break before enforcing.</div> |                                                                                                                                                                                                        |
| `webfront.env.CSP`                 | <div style="max-width:440px">**Optional**: An enforced `Content-Security-Policy` (same syntax as `CSP_REPORT_ONLY`).</div>                                                                                                                 | <div style="max-width:300px">Do **not** set `frame-ancestors` here — control framing via `CORS_ALLOWED_ORIGINS` only, or the two policies intersect and can block framers you intended to allow.</div> |

Use a YAML folded block (`>-`) with one directive per line, each ending in a semicolon. Start in report-only mode, then move the same value to `CSP` to enforce it:

```yaml
webfront:
  env:
    CSP_REPORT_ONLY: >-
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: https:;
      connect-src 'self' https://your-api.example.com wss://your-api.example.com;
      frame-src 'self';
      worker-src 'self' blob:
```
