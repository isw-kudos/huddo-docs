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

Use a YAML folded block (`>-`) with one directive per line, each ending in a semicolon. Start in report-only mode, then move the same value to `CSP` to enforce it.

### What Boards needs from a policy

In the table below, *API host* is where `API_GATEWAY` points, and *Connections host* is the Connections deployment Boards is configured against. When either shares the Boards domain, `'self'` already covers it and the entry can be dropped.

| Directive      | Value                                | Why Boards needs it                                                                                                                        |
| -------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `default-src`  | `'self'`                             | Safe fallback for anything not listed; Boards itself is served from its own origin.                                                        |
| `script-src`   | `'unsafe-inline'`                    | Connections/Collab banner only — it injects inline scripts. Drop it on deployments without the banner.                                    |
|                | `'unsafe-eval'`                      | Connections/Collab banner only (its Dojo toolkit) — drop it on deployments without the banner.                                             |
|                | Connections host                     | Banner scripts (only when Connections is on a different origin).                                                                           |
| `style-src`    | `'unsafe-inline'`                    | Rich-text formatting (text colour, alignment) is rendered as inline styles; the Connections banner also injects styles.                    |
|                | Connections host                     | Banner stylesheets.                                                                                                                        |
| `img-src`      | `data:` `blob:`                      | Avatars and file thumbnails are fetched via the API and displayed from memory; placeholders and icons are inline data URLs.                |
|                | `https:`                             | User content (descriptions, comments) can reference images on any host. Replace with known hosts for a tighter policy — external images then show as broken. |
| `connect-src`  | API host + `wss:` API host           | All API calls, file/preview downloads and live updates (WebSocket).                                                                        |
|                | Connections host                     | Banner data requests and notifications.                                                                                                    |
| `media-src`    | API host                             | Video/audio file preview.                                                                                                                  |
| `frame-src`    | API host                             | HTML file preview renders in an iframe served by the API.                                                                                  |
| `form-action`  | `'self'`                             | Restricts where forms may submit (prevents form-hijacking). Boards' own forms post to its own origin.                                      |
|                | API host                             | Form submits to the API (e.g. sign-in). Drop when the API shares the Boards origin.                                                        |
|                | Connections host                     | Connections/Collab banner forms (e.g. its search box).                                                                                     |
| `font-src`     | `data:`                              | Bundled fonts; some are inlined as data URLs.                                                                                              |
|                | Connections host                     | Banner icon fonts.                                                                                                                         |
|                | `https://static2.sharepointonline.com` `https://spoprod-a.akamaihd.net` | Microsoft 365 deployments only: the Microsoft 365 header loads its fonts and icon font from these Microsoft CDNs. Without them the header falls back to system fonts and icons render blank. |
| `worker-src`   | `'self'` `blob:`                     | Offline service worker and the PDF preview worker.                                                                                         |
| `manifest-src` | `'self'`                             | The web-app manifest (install/pin metadata).                                                                                               |
| `object-src`   | `'none'`                             | Nothing uses plugins — lock it down.                                                                                                       |
| `base-uri`     | `'self'`                             | Restricts the page `<base>` URL. This directive has **no** `default-src` fallback, so always set it explicitly.                            |
| `frame-ancestors` | **do not set**                    | Framing is controlled by `CORS_ALLOWED_ORIGINS` (see above), which emits its own `frame-ancestors` policy. Browsers enforce every policy — setting it here too means a parent must be allowed by **both**, which can block framers you meant to allow. It is also ignored in Report-Only mode, so it cannot be validated via `CSP_REPORT_ONLY` anyway. |

### Same domain as Connections

The usual Component Pack shape — Boards and its API served from the Connections domain (e.g. `connections.example.com/boards` and `connections.example.com/api-boards`). Everything is same-origin, so `'self'` covers the API *and* the Connections banner:

```yaml
webfront:
  env:
    CSP_REPORT_ONLY: >-
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: https:;
      connect-src 'self';
      media-src 'self';
      frame-src 'self';
      form-action 'self';
      font-src 'self' data:;
      worker-src 'self' blob:;
      manifest-src 'self';
      object-src 'none';
      base-uri 'self';
```

### Separate host names

Boards on its own host names (e.g. `boards.example.com` with the API at `api-boards.example.com`, Connections at `connections.example.com`). `https://*.example.com` covers the API and Connections hosts in one entry — replace it with the explicit host names for a tighter policy:

```yaml
webfront:
  env:
    CSP_REPORT_ONLY: >-
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.example.com;
      style-src 'self' 'unsafe-inline' https://*.example.com;
      img-src 'self' data: blob: https:;
      connect-src 'self' https://*.example.com wss://*.example.com;
      media-src 'self' https://api-boards.example.com;
      frame-src 'self' https://api-boards.example.com;
      form-action 'self' https://*.example.com;
      font-src 'self' data: https://*.example.com;
      worker-src 'self' blob:;
      manifest-src 'self';
      object-src 'none';
      base-uri 'self';
```

### Standalone (no Connections banner)

Without the Connections/Collab banner (e.g. DX deployments), `script-src` needs no `'unsafe-inline'` or `'unsafe-eval'` at all, and the Connections host entries go away. For a deployment at `boards.example.com` with the API at `api-boards.example.com`:

```yaml
webfront:
  env:
    CSP_REPORT_ONLY: >-
      default-src 'self';
      script-src 'self';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: https:;
      connect-src 'self' https://api-boards.example.com wss://api-boards.example.com;
      media-src 'self' https://api-boards.example.com;
      frame-src 'self' https://api-boards.example.com;
      form-action 'self' https://api-boards.example.com;
      font-src 'self' data:;
      worker-src 'self' blob:;
      manifest-src 'self';
      object-src 'none';
      base-uri 'self';
```

**DX**: no extra CSP entries. Embedding Boards *inside* DX pages is controlled by `CORS_ALLOWED_ORIGINS` (framing), not by this policy.

Whatever the shape, run report-only first — violations surface anything deployment-specific (integrations, customisations) before a policy blocks it.
