# SSL

## Self Signed Certificates

Issues with self-signed certificates can be resolved in 2 different ways:

1. Add the self-signed certificate (recommended)
1. Disable TLS validation (not recommended)

### Add the self-signed certificate

The chart can mount a CA bundle into **every** service and set `NODE_EXTRA_CA_CERTS` for you — you just provide the certificate one of two ways. See the [Internal CA bundle](../env/common.md#internal-ca-bundle) reference for all available options.

!!! info

    Requires `huddo-boards >= 2.1.0` or `huddo-boards-cp >= 2.3.0`. On older charts, see [Manual mounting](#manual-mounting-older-charts) below.

#### Option 1 — let the chart create the secret

Paste your CA bundle (PEM) into your values file; the chart creates and mounts the secret:

```yaml
global:
  internalCa:
    pem: |
      -----BEGIN CERTIFICATE-----
      ...your CA certificate...
      -----END CERTIFICATE-----
```

#### Option 2 — create the secret yourself

Useful if you manage certificates out of band, or share the CA with other workloads. Create the secret in the namespace Boards is installed in — `connections` for Component Pack, or your own namespace (e.g. `boards`) for standalone. The file name becomes the key, and `cert.pem` matches the chart default:

```bash
kubectl create secret generic internal-ca --from-file=cert.pem -n <namespace>
```

Then reference it from your values file:

```yaml
global:
  internalCa:
    existingSecret: internal-ca
```

!!! tip

    If your secret uses a different key/filename, a different mount path, or you let the chart create it under a different name, set `global.internalCa.key`, `.mountPath` or `.secretName` accordingly — see the [reference](../env/common.md#internal-ca-bundle).

In both cases, redeploy the chart and the CA bundle is mounted into all services with `NODE_EXTRA_CA_CERTS` pointed at it automatically — no per-service configuration required.

#### Manual mounting (older charts)

!!! note

    Only required on `huddo-boards < 2.1.0` / `huddo-boards-cp < 2.3.0`, which lack `global.internalCa`.

Create the secret as in Option 2, then mount it into **each** applicable deployment (`core`, `app`, `user`, `provider`, `events`) and set `NODE_EXTRA_CA_CERTS` yourself:

```yaml
global:
  env:
    NODE_EXTRA_CA_CERTS: /etc/ssl/certs/internal-ca.pem

core:
  volumes:
    - name: ssl-cert-vol
      secret:
        secretName: internal-ca
  volumeMounts:
    - name: ssl-cert-vol
      mountPath: /etc/ssl/certs/internal-ca.pem
      subPath: cert.pem

# repeat the same volumes / volumeMounts for app, user, provider and events
```

### Disable TLS Validation

!!! warning

    This is not recommended for production environments.

You can add the environment variable `NODE_TLS_REJECT_UNAUTHORIZED: '0'`.

This value is required in `core`, `user` & `provider` deployments (and possibly `events` depending on the email server configuration).

```yaml
core:
    env:
        NODE_TLS_REJECT_UNAUTHORIZED: "0"
user:
    env:
        NODE_TLS_REJECT_UNAUTHORIZED: "0"
provider:
    env:
        NODE_TLS_REJECT_UNAUTHORIZED: "0"

# if required for your email server
events:
    env:
        NODE_TLS_REJECT_UNAUTHORIZED: "0"
```
