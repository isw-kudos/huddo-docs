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

Then reconnect to the primary and create the user:

```js
db.getSiblingDB("$external").runCommand({
  createUser: "C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=huddo-collab,emailAddress=huddo-collab@mongodb",
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

Set `MONGO_CERT_USER: huddo-collab` for each service in your `collab-cp.yaml` (see the [config file](./collab-cp.yaml)).

!!! tip

    For development environments, set `MONGO_CERT_USER: admin` to reuse the existing superuser. No database changes are required, but this grants full cluster access.

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

1. `httpd` - please follow [these instructions](./httpd.md).

---

## Integrations

### HCL Connections

- [Apps Menu](../connections/apps-menu/on-prem.md)
- [Widgets](./widgets-on-prem.md)

---

## Migrate Wikis data

Please follow the [instructions here](../../wikis/shift/index.md) for WikiShift
