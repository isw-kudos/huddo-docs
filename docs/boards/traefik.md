# Migrate to Traefik

## Background

The Kubernetes community has announced the retirement of the Ingress NGINX controller, with best-effort maintenance continuing only until March 2026. HCL Connections has adopted Traefik as the reference ingress controller and published a migration guide ([KB0129510](https://support.hcl-software.com/csm?id=kb_article&sysparm_article=KB0129510)) covering the core Component Pack charts.

!!! note

    The [HCL migration guide](https://support.hcl-software.com/csm?id=kb_article&sysparm_article=KB0129510) explicitly excludes Huddo Boards: "If Huddo Boards is installed, contact HCL Connections Support before proceeding. The Huddo chart is not included in the migration kit." This guide is the Huddo Boards equivalent — follow it after completing the HCL Component Pack migration steps.

## Breaking change in v2.0.0

`huddo-boards-cp v2.0.0` removes the nginx-specific ingress defaults that were previously baked into the chart (`ingressClassName: nginx`, regex paths, and all `nginx.ingress.kubernetes.io/*` annotations). Traefik is now the reference ingress controller.

If you are upgrading from v1.x, you must add your ingress configuration explicitly to your values file before upgrading. See [Values file changes](#values-file-changes) below.

If you are staying on nginx, add the nginx annotations to your own values file before upgrading — they will no longer be provided by the chart.

## Prerequisites

### Traefik is installed and running

This guide assumes you have already completed Phases 1 and 2 of the HCL migration guide (KB0129510): ingress-nginx has been uninstalled and Traefik is running in your cluster.

Verify Traefik is active:

    kubectl get pods -n <namespace> | grep traefik
    kubectl get ingressclass

### IngressClass name

The component pack charts default to `ingressClassName: cnx-ingress-traefik`, which matches the HCL migration kit (`helm upgrade cnx-ingress traefik/traefik`). If you installed Traefik via the HCL guide, no override is needed.

If you installed Traefik yourself (e.g. `helm install traefik traefik/traefik`), the IngressClass is typically traefik and you must override it in your values file:

    core:
    ingress:
        ingressClassName: traefik

    webfront:
    ingress:
        ingressClassName: traefik

### Know your TLS configuration

The HCL migration kit configures TLS at the controller level via `tlsStore`, meaning Traefik serves a default certificate for all HTTPS traffic without requiring a `tls:` section on each Ingress. If your Traefik was installed this way, you can omit `tls:` from the values below.

If you manage TLS per-ingress (e.g. a local or non-standard install), keep the `tls:` sections as shown.

### Body size limit (`proxy-body-size`)

The previous nginx chart set `proxy-body-size: 50m` on the `core` Ingress. Traefik has no default body size limit, so large uploads will work without additional configuration.

Traefik's `buffering` middleware can enforce a body size limit, but it is incompatible with CORS preflight requests — the middleware's response reader fails on empty-body OPTIONS responses (`vulcand/oxy/buffer: failed to read response, err: no data ready`), returning HTTP 500. For this reason the chart does not use the buffering middleware. If a hard body size limit is required, enforce it at the application level.

### Configure Traefik entrypoint timeouts

The previous nginx chart included `proxy-read-timeout` and `proxy-send-timeout` of 3600s (1 hour) for long-lived websocket connections. In Traefik, these are entrypoint-level settings (not per-route), so they must be configured when installing Traefik.

If Traefik was installed via the HCL migration kit, update the Traefik Helm values:

#### traefik-values.yaml

    ports:
    websecure:
        transport:
        respondingTimeouts:
            readTimeout: 3600s
            writeTimeout: 3600s
            idleTimeout: 3600s

Or via `--set` flags:

    helm upgrade cnx-ingress traefik/traefik \
    --reuse-values \
    --set "ports.websecure.transport.respondingTimeouts.readTimeout=3600s" \
    --set "ports.websecure.transport.respondingTimeouts.writeTimeout=3600s" \
    --set "ports.websecure.transport.respondingTimeouts.idleTimeout=3600s"

Without this, the Traefik default `readTimeout` (60s) may terminate long-running websocket connections.

!!! note
    
    If using `--reuse-values` on the Traefik chart, the HCL migration kit sets `metrics.prometheus: null` which may fail schema validation on newer Traefik chart versions. Work around this by also setting `--set metrics.prometheus.entryPoint=metrics` in the same command.

## Values file changes

Add the following to your values file. Replace `<your-hostname>` / `<your-tls-secret>` with your environment values. The ingressClassName defaults to `cnx-ingress-traefik` — only override it if your Traefik uses a different IngressClass (see [above](#ingressclass-name)).

### `core` (API service)

    core:
    ingress:
        hosts:
        - <your-api-hostname>
        tls:                          # omit if using Traefik tlsStore default cert
        - hosts:
            - <your-api-hostname>
            secretName: <your-tls-secret>
        traefik:
        stripPrefix:
            enabled: true   # creates a StripPrefix Middleware CRD and wires up the annotation automatically

!!! note

    Sticky sessions are enabled by default for `core` in v2.0.0. The chart automatically adds Traefik sticky cookie annotations (`SameSite=None`, `Secure`, `HttpOnly`) to the core Ingress. This matches the nginx session affinity behaviour from v1.x and is required for socket.io websocket upgrades. To disable, set `core.ingress.traefik.stickyCookie.enabled: false`.

### `webfront` (UI service)

    webfront:
    ingress:
        hosts:
        - <your-app-hostname>
        tls:                          # omit if using Traefik tlsStore default cert
        - hosts:
            - <your-app-hostname>
            secretName: <your-tls-secret>
        traefik:
        stripPrefix:
            enabled: true

## Performing the upgrade

    helm upgrade huddo-boards-cp \
    <path-to-chart> \
    -n <namespace> \
    --reuse-values \
    -f <your-values.yaml>

The `--reuse-values` flag preserves all previously deployed configuration and layers only the new values on top, consistent with the approach used by the HCL migration kit for other Component Pack charts.

The upgrade creates two new `StripPrefix` Middleware CRDs and updates the two Ingress objects in place. No downtime is required beyond normal rolling pod restarts.

!!! note

    If any Middleware CRDs already exist in the namespace from a previous migration attempt, delete them first to avoid ownership conflicts:

    ```
    kubectl delete middleware \
      <release>-core-strip-prefix \
      <release>-webfront-strip-prefix \
      -n <namespace> --ignore-not-found
    ```

## Verification

1 . Ingress objects updated

    Confirm `CLASS` shows the Traefik IngressClass for both `core` and `webfront`:

    kubectl get ingress -n <namespace>

Expected:

| NAME                | HOSTS                | CLASS               | ADDRESS | PORTS   | 
| ------------------- | -------------------- | ------------------- | ------- | ------- |
| <release\>-core     | <your-api-hostname\> | cnx-ingress-traefik | <ip\>   | 80, 443 |
| <release\>-webfront | <your-app-hostname\> | cnx-ingress-traefik | <ip\>   | 80, 443 |

2 . Middleware CRDs created

    kubectl get middleware -n <namespace>

Expected:

    <release>-core-strip-prefix
    <release>-webfront-strip-prefix

3 . Traffic routing

API health check — path stripping must be working for this to return 200

    curl -sk https://<your-api-hostname>/api-boards/health

Webfront — should return the HTML shell

    curl -sk https://<your-app-hostname>/boards/

4 . Functional verification

* Log in to Huddo Boards and confirm the board list loads
* Create a board and confirm it persists
* Open a board and confirm real-time updates work (socket.io)

## Troubleshooting

### `404` on all `/api-boards/*` routes

The `StripPrefix` middleware strips `/api-boards` before forwarding to the `core` service. If the middleware was not created or is not referenced correctly, the request reaches `core` with the full path and returns 404.

Check:

    kubectl get middleware -n <namespace>
    kubectl describe ingress <release>-core -n <namespace>

Confirm the `traefik.ingress.kubernetes.io/router.middlewares` annotation on the Ingress references `<namespace>-<release>-core-strip-prefix@kubernetescrd`.

### `404` on `/boards/*` routes

Same cause for `webfron`t. Verify `<release>-webfront-strip-prefix` exists and is referenced in the Ingress annotation.

### Sessions not sticky (users logged out unexpectedly)

Confirm the sticky cookie annotations are present on the `core` Service (not Ingress — Traefik reads `service.*` annotations from the Service object):

    kubectl get svc <release>-core -n <namespace> \
    -o jsonpath='{.metadata.annotations}' | tr ',' '\n' | grep sticky

Expected output:

    traefik.ingress.kubernetes.io/service.sticky.cookie: "true"
    traefik.ingress.kubernetes.io/service.sticky.cookie.name: "traefik_session"
    traefik.ingress.kubernetes.io/service.sticky.cookie.secure: "true"
    traefik.ingress.kubernetes.io/service.sticky.cookie.httponly: "true"
    traefik.ingress.kubernetes.io/service.sticky.cookie.samesite: "none"

### Legacy nginx Ingress objects remain after migration

Any Ingress objects that were created outside of the Helm chart (e.g. manually applied for auth rewrites, root redirects, or login redirects) will not be removed by `helm upgrade`. They must be deleted manually, otherwise nginx-class routes may conflict with or shadow Traefik routes.

List all ingresses and identify any with `CLASS: nginx` that are not managed by this chart:

    kubectl get ingress -n <namespace>

Delete each legacy nginx ingress:

    kubectl delete ingress <ingress-name> -n <namespace>

### `invalid ownership metadata` error on upgrade

A resource (typically the minio `PersistentVolume`) exists in the cluster but is not tracked by Helm. Adopt it:

    kubectl patch pv <pv-name> --type=merge -p \
    '{"metadata":{"labels":{"app.kubernetes.io/managed-by":"Helm"},"annotations":{"meta.helm.sh/release-name":"<release>","meta.helm.sh/release-namespace":"<namespace>"}}}'

### Residual nginx annotations after upgrade

When using `--reuse-values`, old `nginx.ingress.kubernetes.io/*` annotations from the v1.x deployment persist in the Helm release values and appear on the Ingress objects. These are ignored by Traefik and are harmless, but can be cleaned up by explicitly setting empty annotations in your values file:

    core:
    ingress:
        annotations: {}
    webfront:
    ingress:
        annotations: {}