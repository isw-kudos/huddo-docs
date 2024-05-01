# Huddo Boards for HCL Connections CP

!!! info

    The HCL Connections Component Pack (CP) provides a **MongoDB** database and **Redis** cache. Huddo Boards for CP utilises these existing services.  This guide will walk you through the setup to deploy a Minio S3 service for storage, and the Huddo Boards services into your existing CP environment.

## Releases

See the latest changes in our [On-Premise Release notes](../releases.md).

---

## Prerequisites

1. HCL Component Pack is installed and running
1. WebSphere environment with Web Server (or another reverse proxy)
1. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) is installed and [configured](../faq/kubectl.md)
1. [helm](https://docs.helm.sh/using_helm/#installing-helm) is installed
1. SMTP gateway setup for email notifications if required

---

## SSL / Network setup

Huddo Boards uses the existing CP infrastructure.

The UI and API each require a unique route:

-   UI for Boards: `[CONNECTIONS_URL]/boards`. We will refer to this as `BOARDS_URL`
-   API Gateway: `[CONNECTIONS_URL]/api-boards`. We will refer to this as `API_URL`

For more details on configuring a reverse proxy, please [see below](#proxy-config).

---

## Setup OAuth

Please follow [our instructions](../connections/auth-on-prem.md) to setup HCL Connections OAuth for Huddo Boards.

The OAuth Callback URL for this configuration is `https://[BOARDS_URL]/auth/connections/callback`

---

## Storage

### S3

Huddo Boards for Component Pack deploys a Minio service. Please follow [S3 storage details here](minio.md) to configure the NFS mount.

### Mongo

Huddo Boards uses the Mongo database already deployed inside the Component Pack. There is no configuration required.

---

## Licence Key

Huddo Boards / Activities Plus is a free entitlement however it requires a licence key from [https://store.huddo.com](https://store.huddo.com). For more details [see here](../store/index.md).

---

## Deployment

### Update Config file

Download our [config file](../../assets/config/kubernetes/boards-cp.yaml) and update all the values inside. Descriptions as below.

**Kubernetes variables**:

| Key                      | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| `global.env.APP_URI`     | `https://[BOARDS_URL]` (e.g. `https://connections.example.com/boards`) |
| `webfront.ingress.hosts` | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)      |
| `core.ingress.hosts`     | `[API_URL]` (no protocol, e.g. `connections.example.com/api-boards`)   |
| `minio.nfs.server`       | IP address of the NFS Server file mount (e.g. `192.168.10.20`)         |
| `minio.storageClassName` | (Optional) name of the storage class when using dynamic provisioning   |

**Boards variables**:

Are [detailed here](../env/common.md).

**Customising Boards notifications**:

Some elements of the Boards notifications that are sent out [can be customised](../env/notifications.md).

**Activity migration variables**:

The Activity migration chart will be deployed separately but use the same config file. The variables are [described here](migration/index.md).

---

### Install Boards Helm Chart

Install the Boards services via our Helm chart

    helm upgrade huddo-boards-cp https://docs.huddo.com/assets/config/kubernetes/huddo-boards-cp-1.2.0.tgz -i -f ./boards-cp.yaml --namespace connections --recreate-pods

> **Note:** `--recreate-pods` ensures all images are up to date. This will cause downtime.

---

## Proxy Config

For Connections on-premise you have two options:

1. `nginx` - if you have an NGINX (e.g. customizer) in front of IHS use that instead to support websockets and use one less proxy. Follow [these instructions](../proxy/nginx.md).

1. `httpd` - please follow [these instructions](../connections/httpd/index.md).

---

## Integrations

### HCL Connections

-   [Apps Menu](../connections/apps-menu-on-prem.md)
-   [Widgets](../connections/widgets-on-prem.md)
-   [Customizer - Boards Search](../connections/customizer/customizer-integrations-package.md)

### Microsoft Teams

-   [Install On-Premise App](../msgraph/teams/on-prem.md)

---

## Migrate Activities data

Please follow the [instructions here](migration/index.md)

---

## Subscribing to latest updates from Huddo Team

[Guide here](latest.md)
