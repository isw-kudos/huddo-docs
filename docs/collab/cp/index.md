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

Please follow [our instructions](./auth-on-prem.md) to setup HCL Connections OAuth for Huddo Collab.

The OAuth Callback URL for this configuration is `https://[HUDDO_URL]/auth/connections/callback`

---

## Storage

### S3

Huddo Collab for Component Pack deploys a Minio service. Please follow [S3 storage details here](minio.md) to configure the NFS mount.

### Mongo

Huddo Collab uses the MongoDB database already deployed by Component Pack, authenticating via **X.509 certificates**.

#### Deploying to the `connections` namespace

If deploying directly into the `connections` namespace, the required `connections-env` ConfigMap, `mongo-secret`, and `redis-secret` already exist. Skip ahead to [Creating the MongoDB User](#creating-the-mongodb-user).

#### Deploying to a separate namespace

The chart references resources that live in the `connections` namespace. Copy them to your target namespace:

```bash
# ConfigMap with Connections environment config (mongo hostname, redis host/port, etc.)
kubectl get configmap connections-env -n connections -o yaml \
  | sed 's/namespace: connections/namespace: collab/' \
  | kubectl apply -f -

# MongoDB x509 client certificate secret
kubectl get secret mongo-secret -n connections -o yaml \
  | sed 's/namespace: connections/namespace: collab/' \
  | kubectl apply -f -

# Redis password secret
kubectl get secret redis-secret -n connections -o yaml \
  | sed 's/namespace: connections/namespace: collab/' \
  | kubectl apply -f -
```

!!! note

    These are static copies. If any of these resources are updated in the `connections` namespace, they must be re-copied. Consider [Reflector](https://github.com/emberstack/kubernetes-reflector) to keep them in sync automatically.

Then patch the hostnames to use fully qualified names so pods in your namespace can resolve them:

```bash
kubectl patch configmap connections-env -n collab --type=merge -p '{
  "data": {
    "redis-node-service-name": "haproxy-redis.connections.svc.cluster.local",
    "redis-sentinel-node-service-name": "redis-sentinel.connections.svc.cluster.local",
    "redis-options": "{\"sentinels\": [{\"host\": \"redis-sentinel.connections.svc.cluster.local\", \"port\": 26379 }]}",
    "mongo-name": "mongo5.connections.svc.cluster.local"
  }
}'
```

!!! note

    Re-apply this patch any time the `connections-env` configmap is re-copied from the `connections` namespace.

#### Creating the MongoDB User

You must create a dedicated X.509 user in MongoDB's `$external` database. Connect to the **primary** node (must not be a secondary).

First, find the primary:

```bash
kubectl exec -it mongo5-0 -c mongo5 -n connections -- mongosh \
  --tls \
  --tlsCertificateKeyFile /etc/ca/user_admin.pem \
  --tlsCAFile /etc/ca/internal-ca-chain.cert.pem \
  --host mongo5-0.mongo5.connections.svc.cluster.local \
  --authenticationMechanism=MONGODB-X509 \
  --authenticationDatabase '$external' \
  -u 'C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=admin,emailAddress=admin@mongodb' \
  --eval "rs.status().members.find(m => m.stateStr === 'PRIMARY').name"
```

Then reconnect replacing the `--host` with the primary hostname, and grant access to the `kudos-boards` user:

```js
db.getSiblingDB("$external").runCommand({
  grantRolesToUser: "C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=kudos-boards,emailAddress=kudos-boards@mongodb",
  roles: [
    { role: "readWrite", db: "collab-attachments" },
    { role: "readWrite", db: "collab-discussions" },
    { role: "readWrite", db: "collab-ideas" },
    { role: "readWrite", db: "collab-wikis" },
    { role: "readWrite", db: "collab-user" },
    { role: "readWrite", db: "collab-licence" }
  ],
  writeConcern: { w: "majority", wtimeout: 5000 }
})
```

You can validate the user was updated correctly by running:
```
db.getSiblingDB("$external").getUser("C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=kudos-boards,emailAddress=kudos-boards@mongodb")

```

!!! tip

    For development environments, set `MONGO_CERT_USER: admin` to reuse the existing superuser. No database changes are required, but this grants full cluster access.

---

## Deployment

### Update Config file

Download our [config file](./collab-cp.yaml) and update all the values inside. Descriptions as below.

**Kubernetes variables**:

| Key                                   | Description                                                                                                            |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `global.env.APP_URI`                  | `https://[HUDDO_URL]` (e.g. `https://connections.example.com/huddo`)                                                   |
| `global.env.S3_ENDPOINT`              | `https://[HUDDO_URL]` (e.g. `https://connections.example.com/huddo`)                                                   |
| `global.env.S3_ACCESS_KEY`            | Random string to also set in Kubernetes                                                                                |
| `global.env.S3_SECRET_KEY`            | Random string to also set in Kubernetes                                                                                |
| `global.env.SOCKET_CLUSTER_SECRET`    | Random string to also set in Kubernetes                                                                                |
| `core.ingress.hosts`                  | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)                                                      |
| `attachments.ingress.hosts`           | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)                                                      |
| `discussions.ingress.hosts`           | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)                                                      |
| `ideas.ingress.hosts`                 | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)                                                      |
| `wikis.ingress.hosts`                 | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)                                                      |
| `editor.ingress.hosts`                | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)                                                      |
| `user.env.CONNECTIONS_CLIENT_ID`      | oAuth client-id, usually `collab`                                                                                      |
| `user.env.CONNECTIONS_CLIENT_SECRET`  | oAuth client-secret as configured in [this step](./auth-on-prem.md)                                                    |
| `user.env.CONNECTIONS_URL`            | HCL Connections URL, e.g. `https://connections.example.com`                                                            |
| `user.env.CONNECTIONS_ADMINS`         | Emails or GUIDs of users to grant admin permissions.<br/>e.g. `"[\"admin1@company.example.com\", \"PROF_GUID_2\"]`"    |
| `socketcluster.ingress.hosts`         | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)                                                      |
| `wikishift.ingress.hosts`             | `[CONNECTIONS_URL]` (no protocol, e.g. `connections.example.com`)                                                      |
| `wikishift.volumes.nfs.server`        | `[NFS_SERVER_IP]`                                                                                                      |
| `env.CNX_HOSTNAME`                    | `https://[CONNECTIONS_URL]` (with protocol, e.g. `https://connections.example.com`)                                    |
| `env.DB2_HOSTNAME`                    | `[DB2_HOSTNAME]` (no protocol, e.g. `db2.example.com`)                                                                 |

---

### Set Kubernetes Secrets

```
kubectl create secret generic myregkey -n connections --docker-server=hclcr.io/cnx --docker-username=<<helm_repo_username>> --docker-password <<helm_repo_password>>
```

### Install Collab Helm Chart

Install the Boards services via our Helm chart

    helm upgrade huddo-collab-cp https://docs.huddo.com/assets/config/kubernetes/huddo-collab-cp-0.1.0.tgz -i -f ./collab-cp.yaml --namespace connections --recreate-pods

> **Note:** `--recreate-pods` ensures all images are up to date. This will cause downtime.

---

## Proxy Config

For Connections on-premise you have two options:

1. `nginx` - if you have an NGINX (e.g. customizer) in front of IHS use that instead to support websockets and use one less proxy. Follow [these instructions](../proxy/nginx.md).

1. `httpd` - please follow [these instructions](./httpd.md).

---

## Integrations

### HCL Connections

- [Apps Menu](../connections/apps-menu/on-prem.md)
- [Widgets](./widgets-on-prem.md)

---

## Migrate Wikis data

Please follow the [instructions here](../../wikis/shift/index.md) for WikiShift
