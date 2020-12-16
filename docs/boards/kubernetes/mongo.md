# Deploy MongoDB

Huddo Boards requires a Mongo database. This documentation will deploy a MongoDB replicaSet into your Kubernetes setup.

If you already have externally hosted Mongo database please skip to the [Outcomes section](/boards/kubernetes/mongo/#outcomes) to determine your equivalent connection parameters.

You can also email us for support at [support@kudosboards.com](mailto:support@kudosboards.com)

### Prerequisites

1. [Config file](/assets/config/kubernetes/mongo.yaml) downloaded

---

### Update config file

| Line | Key          | Default Value         | Description                             |
| ---- | ------------ | --------------------- | --------------------------------------- |
| 21   | `nfs.path`   | `/pv-kudos/mongo`     | Path to storage location                |
| 22   | `nfs.server` | `[STORAGE_SERVER_IP]` | IP of NFS server</br>ie `192.168.10.50` |

---

### Deploy instructions

1.  Create the folder at `nfs.path` location on the `nfs.server` with access `777`

    **Note:** please ensure sufficient storage is available (ie 100GB)

1.  Ensure each Node in your Kubernetes cluster can mount this location.

    Please modify the file `/etc/exports` on your NFS Server to include this line

        <NFS_PATH_FOR_MONGO> <IP_RANGE_OF_YOUR_SERVERS>/<SUBNET_MASK>(rw,no_root_squash)

    For example:

        /pv-kudos/mongo 192.168.0.0/255.255.0.0(rw,no_root_squash)

    Apply new NFS storage to exports

        exportfs -ra

1.  Install Mongo

        kubectl apply -f ./mongo.yaml

---

### Outcomes

The following are the parameters required to connect to this database. You will need these later in the application setup. If you have your own MongoDB deployment, please substitute your values.

| Key              | Default Value           | Description                                                                    |
| ---------------- | ----------------------- | ------------------------------------------------------------------------------ |
| `MONGO_PROTOCOL` | `mongo`                 | Protocol used in your Connections String                                       |
| `MONGO_HOST`     | `mongo-service:27017`   | Hostname of your Mongo service                                                 |
| `MONGO_PARAMS`   | `replicaSet=replicaset` | Request parameters (ie ?)                                                      |
| `MONGO_USER`     | None                    | Username to connect.</br>Authentication is disabled in this private deployment |
| `MONGO_PASSWORD` | None                    | Password to connect.</br>Authentication is disabled in this private deployment |

Alternatively, these parameters can be set with `MONGO_URI` which is built from:

    [MONGO_PROTOCOL]://[MONGO_HOST]/[MONGO_DB]?[MONGO_PARAMS]

    mongo://mongo-service:27017/database?replicaSet=replicaset

Or with optional credentials:

    [MONGO_PROTOCOL]://[MONGO_USER]:[MONGO_PASSWORD]@[MONGO_HOST]/[MONGO_DB]?[MONGO_PARAMS]

    mongo://user:passw0rd@mongo-service:27017/database?replicaSet=replicaset
