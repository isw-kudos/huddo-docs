# Huddo Boards for HCL Connections CP

Deploying Huddo Boards into HCL Connections Component Pack (Kubernetes)

---

[Release Information](/boards/cp/releases)

---

### Prerequisites

1. HCL Component Pack is installed and running
1. WebSphere environment with Web Server (or another reverse proxy)
1. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) is installed
1. [helm](https://docs.helm.sh/using_helm/#installing-helm) is installed
1. SMTP gateway setup for email notifications if required

---

### SSL / Network setup

Huddo Boards in Connections Component Pack (CP) uses the existing CP infrastructure.

The UI and API each require a unique route:

- UI for Boards: `[CONNECTIONS_URL]/boards`. We will refer to this as `BOARDS_URL`
- API Gateway: `[CONNECTIONS_URL]/api-boards`. We will refer to this as `API_URL`

For more details on configuring an IBM HTTP WebServer as reverse proxy, [please see here](/boards/cp/httpd/)

---

### Setup OAuth

You will need to setup an OAuth application with one (or more) of these providers for Huddo Boards to function. please refer to the following documentation:

| Provider                        | Registration / Documentation                            | Callback URL                                                 |
| ------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| HCL Connections<br>(on premise) | [Huddo instructions](/boards/connections/auth-on-prem/) | `https://[CONNECTIONS_URL]/boards/auth/connections/callback` |
| Microsoft Office 365            | [Huddo instructions](/boards/msgraph/auth/)             | `https://[CONNECTIONS_URL]/boards/auth/msgraph/callback`     |

---

### Configure kubectl

|                | Instructions                                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Kubernetes** | copy `~/kube/.config` from the Kubernetes master server to the same location locally</br>(backup any existing local config) |

---

### Storage

#### S3

Huddo Boards for Component Pack deploys a Minio service. Please follow [S3 storage details here](/boards/cp/minio) to configure the NFS mount.

#### Mongo

Huddo Boards uses the Mongo database already deployed inside the Component Pack. There is no configuration required.

---

### Licence Key

Huddo Boards / Activities Plus is a free entitlement however it requires a licence key from [https://store.huddo.com](https://store.huddo.com). For more details [see here](/boards/cp/store/).

---

### Update Config file

Download our [config file](/assets/config/kubernetes/boards-cp.yaml) and update all the values inside. Descriptions as below.

**Kubernetes variables**:

| Key                      | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| `global.env.APP_URI`     | `https://[BOARDS_URL]` (e.g. `https://connections.example.com/boards`) |
| `webfront.ingress.hosts` | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)      |
| `core.ingress.hosts`     | `[API_URL]` (no protocol, e.g. `connections.example.com/api-boards`)   |
| `minio.nfs.server`       | IP address of the NFS Server file mount (e.g. `192.168.10.20`)         |

**Boards variables**:

Are [detailed here](/boards/env/common/).

**Activity migration variables**:

The Activity migration chart will be deployed separately but use the same config file. The variables are [described here](/boards/cp/migration).

---

### Deploy Boards Helm Chart

Install the Boards services via our Helm chart

    helm upgrade kudos-boards-cp [PATH_TO_HELM_CHARTS]/kudos-boards-cp-3.0.1.tgz -i -f ./boards-cp.yaml --namespace connections --recreate-pods

> Where [PATH_TO_HELM_CHARTS] is the file path to the helm charts,
> ie `[extractedFolder]/microservices_connections/hybridcloud/helmbuilds/`
> or `https://docs.huddo.com/assets/config/kubernetes/`

> **Note:** `--recreate-pods` ensures all images are up to date. This will cause downtime.

> **Note:** if your Kubernetes version is pre 1.13, you must uncomment "global.legacyKube: true" in the yaml config file

For example:

    helm upgrade kudos-boards-cp ./microservices_connections/hybridcloud/helmbuilds/kudos-boards-cp-3.0.1.tgz -i -f ./boards-cp.yaml --namespace connections --recreate-pods

    helm upgrade kudos-boards-cp https://docs.huddo.com/assets/config/kubernetes/kudos-boards-cp-3.0.1.tgz -i -f ./boards-cp.yaml --namespace connections --recreate-pods

---

### Add Proxy Config

## Connections On Premise - update WAS config

> in the linked document you should use the IP of your kubernetes manager and the http port for your ingress (32080 for default component pack installs)

Please follow [these instructions](/boards/cp/httpd/)

---

## Integrations

### HCL Connections

- [Apps Menu](/boards/connections/apps-menu-on-prem/)
- [Widgets](/boards/connections/widgets-on-prem/)
- [Boards Search](/boards/connections/customizer-search-app/)

### Microsoft Teams

- [Install On-Premise App](/boards/msgraph/teams-on-prem/)

---

## Migrate Activities data

Please follow the [instructions here](/boards/cp/migration)

---

## Subscribing to latest updates from Huddo Team

[Guide here](/boards/cp/dockerhub)
