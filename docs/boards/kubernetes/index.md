# Huddo Boards for Kubernetes

Deploying Huddo Boards into Kubernetes for on-premise environments

---

## Prerequisites

1. Kubernetes is installed and running
1. WebSphere environment with Web Server (or another reverse proxy)
1. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) is installed and [configured](../faq/kubectl.md)
1. [helm](https://docs.helm.sh/using_helm/#installing-helm) is installed
1. SMTP gateway setup for email notifications if required
1. [Quay.io - Red Hat](https://quay.io) account setup with access to the [Huddo Boards repository](../images.md). Please send your account details to [support@huddo.com](mailto:support@huddo.com) if you do not already have this.

---

## SSL / Network

Kubernetes for on-premise environments requires a reverse proxy to route traffic. There are a number of different ways this reverse proxy can be configured and Huddo Boards aims to match whatever you already have in place. Some examples of network routing:

|                        | New domain                                                                                                                                                                                                   | Path on existing domain                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `BOARDS_URL`           | `boards.example.com`                                                                                                                                                                                         | `example.com/boards`                                                                |
| `API_URL`              | `api.example.com`                                                                                                                                                                                            | `example.com/api-boards`                                                            |
| Requirement            | 1. Reverse proxy able to match any current domains as well as the new one for Huddo Boards (either by using SNI or a compatible certificate for all domains).</br>2. Certificate coverage for the 2 domains. | Ability to proxy the 2 paths                                                        |
| Certificate Resolution | a) in your proxy and forward the unencrypted traffic to kubernetes</br>**-OR-**</br>b) forward the encrypted traffic and perform the certificate resolution in kubernetes (described in config below).       | All certificate resolution on the proxy server                                      |
| Notes                  | IBM HTTP WebServer supports only one certificate. You must have a Wildcard certificate to cover all of your domains including the new Boards domains (ie \*.example.com).                                    | Additional config required to make Boards webfront handle redirects, details below. |
| For Connections Header | Additional [WebSphere application](../connections/header-on-prem.md) must be installed                                                                                                                       | -                                                                                   |

Please decide on which configuration will suit your environment best and the corresponding `BOARDS_URL` & `API_URL`. These values will then be used in the following documentation.

For more details on configuring a reverse proxy, [please see below](#proxy-config).

---

## OAuth

Huddo Boards currently supports the following oAuth providers for authentication and integration: HCL Connections (on premise), IBM Connections Cloud and Microsoft 365.

You will need to setup an OAuth application with one (or more) of these providers for Huddo Boards to function. please refer to the following documentation:

| Provider        | Registration / Documentation                                                                                  | Callback URL                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| HCL Connections | [instructions](../connections/auth-on-prem.md)                                                                | `https://[BOARDS_URL]/auth/connections/callback` |
| HCL Domino      | [instructions](../domino/oauth/index.md)                                                                      | `https://[BOARDS_URL]/auth/domino/callback`      |
| HCL DX          | [instructions](../dx/auth/websphere.md)                                                                       | `https://[BOARDS_URL]/auth/dx/callback`          |
| Microsoft 365   | [Azure app registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) | `https://[BOARDS_URL]/auth/msgraph/callback`     |
| Google          | [Google Console](https://console.developers.google.com/apis/credentials)                                      | `https://[BOARDS_URL]/auth/google/callback`      |
| LinkedIn        | [LinkedIn](https://www.linkedin.com/developers/apps)                                                          | `https://[BOARDS_URL]/auth/linkedin/callback`    |
| Facebook        | [Facebook developer centre](https://developers.facebook.com/apps/2087069981334024/fb-login/settings/)         | `https://[BOARDS_URL]/auth/facebook/callback`    |

---

## Huddo Boards namespace

    kubectl create namespace boards

---

## Database & Storage

Huddo Boards requires a Mongo database and an S3 file storage. If you already have equivalent services already then you can use your existing details in the config below, otherwise you may follow our instructions to deploy one or both of these services as follows:

1. [Mongo database](deploy-mongo.md)
1. [S3 storage](minio.md)

**Note:** these tasks are very similar to each other and can be performed simultaneously

---

## Secrets

1.  [Follow this guide](../images.md) to get access to our images in Quay.io

1.  SSL certificate details

    > Only perform this step if you need to resolve certificates in kubernetes

        kubectl create secret tls huddoboards-domain-secret --key </path/to/keyfile> --cert </path/to/certificate> --namespace=boards

---

## Configuration

Download our [config file](../../assets/config/kubernetes/boards.yaml) and update all example values as required. Details as below.

**Kubernetes Variables**:

| Key                         | Description                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------- |
| `global.env.APP_URI`        | `https://[BOARDS_URL]`                                                              |
| `global.env.MONGO_USER`     | MongoDB user</br>If using our storage above you may leave this commented out        |
| `global.env.MONGO_PASSWORD` | MongoDB password</br>If using our storage above you may leave this commented out    |
| `global.env.MONGO_HOST`     | MongoDB host</br>If using our storage above you may leave the default               |
| `global.env.MONGO_PARAMS`   | MongoDB request parameters</br>If using our storage above you may leave the default |
| `global.env.S3_ENDPOINT`    | S3 URL</br>If using our storage above you may leave the default                     |
| `global.env.S3_ACCESS_KEY`  | S3 Access Key</br>If using our storage above you may leave the default              |
| `global.env.S3_SECRET_KEY`  | S3 Secret Key</br>If using our storage above you may leave the default              |
| `webfront.ingress.hosts`    | `[BOARDS_URL]` (no protocol)                                                        |
| `core.ingress.hosts`        | `[API_URL]` (no protocol, e.g. api.huddoboards.com)                                 |

**Boards Variables**:

Follow instructions on [this page](../env/common.md)

---

## Deploy Boards Chart

Install the Boards services via our Helm chart

    helm upgrade huddo-boards https://docs.huddo.com/assets/config/kubernetes/huddo-boards-1.0.0.tgz -i -f ./boards.yaml --namespace boards --recreate-pods

> **Note:** `--recreate-pods` ensures all images are up to date. This will cause downtime.

---

## Proxy Config

### Connections On Premise

For Connections on-premise you have two options:

1. `nginx` - if you have an NGINX (e.g. customizer) in front of IHS use that instead to support websockets and use one less proxy. Follow [these instructions](../proxy/nginx.md).

1. `httpd` - please follow [these instructions](../connections/httpd/index.md).

### Connections Cloud or Microsoft 365

Add a reverse proxy entry in your network that resolves your certificates and forwards your 2 domains to the IP of the kubernetes manager and the http port for your ingress. If any assistance is required

---

## HCL Connections integrations

-   [Header](../connections/header-on-prem.md) (_Note: only required if Boards is hosted on a different domain to Connections_)
-   [Apps Menu](../connections/apps-menu/on-prem.md)
-   [Widgets](../connections/widgets-on-prem.md)
-   [Migrate your Activities to Boards](../connections/migration.md)
