# Huddo Collab for HCL Connections Component Pack

!!! info

    The HCL Connections Component Pack (CP) provides a **MongoDB** database and **Redis** cache. Huddo Collab for CP utilises these existing services.  This guide will walk you through the setup to deploy a Minio S3 service for storage, and the Huddo Collab services into your existing CP environment.

---

## Prerequisites

1. HCL Component Pack is installed and running
1. WebSphere environment with Web Server (or another reverse proxy)
1. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) is installed and configured
1. [helm](https://docs.helm.sh/using_helm/#installing-helm) is installed
1. SMTP gateway setup for email notifications if required

---

## SSL / Network setup

Huddo Collab uses the existing CP infrastructure.

- UI for Collab: `[CONNECTIONS_URL]/huddo`. We will refer to this as `HUDDO_URL`

For more details on configuring a reverse proxy, please [see below](#proxy-config).

---

## Setup OAuth

Please follow [our instructions](../connections/auth-on-prem.md) to setup HCL Connections OAuth for Huddo Collab.

The OAuth Callback URL for this configuration is `https://[HUDDO_URL]/auth/connections/callback`

---

## Storage

### S3

Huddo Collab for Component Pack deploys a Minio service. Please follow [S3 storage details here](minio.md) to configure the NFS mount.

### Mongo

Huddo Collab uses the Mongo database already deployed inside the Component Pack. There is no configuration required.

---

## Deployment

### Update Config file

Download our [config file](./collab-cp.yaml) and update all the values inside. Descriptions as below.

**Kubernetes variables**:

| Key                      | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| `global.env.APP_URI`     | `https://[HUDDO_URL]` (e.g. `https://connections.example.com/huddo`)   |
| `webfront.ingress.hosts` | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)      |
| `core.ingress.hosts`     | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)      |
| `minio.nfs.server`       | IP address of the NFS Server file mount (e.g. `192.168.10.20`)         |
| `minio.storageClassName` | (Optional) name of the storage class when using dynamic provisioning   |

**Collab variables**:

Are [detailed here](./common.md).

---

### Install Collab Helm Chart

Install the Boards services via our Helm chart

    helm upgrade huddo-collab-cp https://docs.huddo.com/assets/config/kubernetes/huddo-collab-cp-0.1.0.tgz -i -f ./collab-cp.yaml --namespace connections --recreate-pods

> **Note:** `--recreate-pods` ensures all images are up to date. This will cause downtime.

---

## Proxy Config

For Connections on-premise you have two options:

1. `nginx` - if you have an NGINX (e.g. customizer) in front of IHS use that instead to support websockets and use one less proxy. Follow [these instructions](../proxy/nginx.md).

1. `httpd` - please follow [these instructions](../connections/httpd/index.md).

---

## Integrations

### HCL Connections

- [Apps Menu](../connections/apps-menu/on-prem.md)
- [Widgets](../connections/widgets-on-prem.md)

---

## Migrate Wikis data

Please follow the [instructions here](../../wikis/shift/index.md) for WikiShift
