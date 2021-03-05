# Huddo Boards for Kubernetes and IBM Cloud Private

Deploying Huddo Boards into Kubernetes -or- IBM Cloud Private for on-premise environments

---

### Prerequisites

1. Kubernetes is installed and running
1. WebSphere environment with Web Server (or another reverse proxy)
1. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) is installed
1. [helm](https://docs.helm.sh/using_helm/#installing-helm) is installed
1. SMTP gateway setup for email notifications if required
1. [Dockerhub](https://hub.docker.com) account setup with access to Huddo Boards repository.<br>Please send your account details to [support@huddo.com](mailto:support@huddo.com) if you don't already have this.

---

### SSL / Network setup

Kubernetes for on-premise environments requires a reverse proxy to route traffic. There are a number of different ways this reverse proxy can be configured and Huddo Boards aims to match whatever you already have in place. Some examples of network routing:

|                         | New domain                                                                                                                                                                                                   | Path on existing domain                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Example of `BOARDS_URL` | `boards.example.com`                                                                                                                                                                                         | `example.com/boards`                                                                |
| Example of `API_URL`    | `api.example.com`                                                                                                                                                                                            | `example.com/api-boards`                                                            |
| Requirement             | 1. Reverse proxy able to match any current domains as well as the new one for Huddo Boards (either by using SNI or a compatible certificate for all domains).</br>2. Certificate coverage for the 2 domains. | Ability to proxy the 2 paths                                                        |
| Certificate Resolution  | a) in your proxy and forward the unencrypted traffic to kubernetes</br>**-OR-**</br>b) forward the encrypted traffic and perform the certificate resolution in kubernetes (described in config below).       | All certificate resolution on the proxy server                                      |
| Notes                   | IBM HTTP WebServer supports only one certificate. You must have a Wildcard certificate to cover all of your domains including the new Boards domains (ie \*.example.com).                                    | Additional config required to make Boards webfront handle redirects, details below. |
| For Connections Header  | Additional [WebSphere application](/boards/connections/header-on-prem/) must be installed                                                                                                                    | -                                                                                   |

Please decide on which configuration will suit your environment best and the corresponding `BOARDS_URL` & `API_URL`. These values will then be used in the following documentation.

For more details on configuring an IBM HTTP WebServer as reverse proxy, [please see here](/boards/connections/httpd/)

---

### Setup OAuth

Huddo Boards currently supports the following oAuth providers for authentication and integration: HCL Connections (on premise), IBM Connections Cloud and Microsoft Office 365.

You will need to setup an OAuth application with one (or more) of these providers for Huddo Boards to function. please refer to the following documentation:

| Provider                        | Registration / Documentation                                                                                  | Callback URL                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| HCL Connections<br>(on premise) | [Huddo instructions](/boards/connections/auth-on-prem/)                                                       | `https://[BOARDS_URL]/auth/connections/callback` |
| Microsoft Office 365            | [Azure app registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) | `https://[BOARDS_URL]/auth/msgraph/callback`     |
| Google                          | [Google Console](https://console.developers.google.com/apis/credentials)                                      | `https://[BOARDS_URL]/auth/google/callback`      |
| LinkedIn                        | [LinkedIn](https://www.linkedin.com/developers/apps)                                                          | `https://[BOARDS_URL]/auth/linkedin/callback`    |
| Facebook                        | [Facebook developer centre](https://developers.facebook.com/apps/2087069981334024/fb-login/settings/)         | `https://[BOARDS_URL]/auth/facebook/callback`    |

---

### Configure kubectl

|                       | Instructions                                                                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Kubernetes**        | copy `~/kube/.config` from the Kubernetes master server to the same location locally</br>(backup any existing local config)                                                                                  |
| **IBM Cloud Private** | - Open ICP Console</br>- Go to `Admin` (top right)</br>- Click `Config Client`</br>- Copy the contents shown</br>- Open your command line / terminal</br>- Paste the commands copied earlier and press enter |

---

### Create Huddo Boards namespace

    kubectl create namespace boards

---

### Setup Storage

Huddo Boards requires a Mongo database and an S3 file storage. If you already have equivalent services already then you can use your existing details in the config below, otherwise you may follow our instructions to deploy one or both of these services as follows:

1. [Mongo database](/boards/kubernetes/mongo)
1. [S3 storage](/boards/kubernetes/minio)

**Note:** these tasks are very similar to each other and can be performed simultaneously

---

### Setup secrets

1.  Dockerhub credentials

        kubectl create secret docker-registry dockerhub --docker-server=docker.io --docker-username=<username> --docker-password=<password> --docker-email=<email> --namespace=boards

1.  SSL certificate details

    > Only perform this step if you need to resolve certificates in kubernetes

        kubectl create secret tls huddoboards-domain-secret --key </path/to/keyfile> --cert </path/to/certificate> --namespace=boards

---

### Update Config file

Download our [config file](/assets/config/kubernetes/boards.yaml) and update all example values as required. Details as below.

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

Follow instructions on [this page](/boards/env/common/)

---

### Deploy Boards Chart

Install the Boards services via our Helm chart

    helm upgrade boards https://docs.huddo.com/assets/config/kubernetes/kudos-boards-4.0.0.tgz -i -f ./boards.yaml --namespace boards --recreate-pods

> **Note:** `--recreate-pods` ensures all images are up to date. This will cause downtime.

> **Note:** if your Kubernetes version is pre 1.13, you must uncomment "global.legacyKube: true" in the yaml config file

---

### Add Proxy Config

## Connections On Premise - update WAS config

> in the linked document you should use the IP of your kubernetes manager and the http port for your ingress (32080 if you have component pack installed)

Please follow [these instructions](/boards/connections/httpd/)

## Connections Cloud or Microsoft Office 365

Add a reverse proxy entry in your network that resolves your certificates and forwards your 2 domains to the IP of the kubernetes manager and the http port for your ingress. If any assistance is required

---

### HCL Connections integrations

- [Header](/boards/connections/header-on-prem/) (_Note: only required if Boards is hosted on a different domain to Connections_)
- [Apps Menu](/boards/connections/apps-menu-on-prem/)
- [Widgets](/boards/connections/widgets-on-prem/)
- [Migrate your Activities to Boards](/boards/connections/migration)
