# Deploy MongoDB

Huddo Boards requires a Mongo database. This documentation will deploy a MongoDB replicaSet into your Kubernetes setup.

If you already have externally hosted Mongo database please skip to the [Outcomes section](/boards/kubernetes/mongo/#outcomes) to determine your equivalent connection parameters.

You can also email us for support at [support@huddo.com](mailto:support@huddo.com)

## Prerequisites

1. [Config file](/assets/config/kubernetes/mongo.yaml) downloaded

---

## Update config file

| Line | Key          | Default Value         | Description                             |
| ---- | ------------ | --------------------- | --------------------------------------- |
| 21   | `nfs.path`   | `/pv-kudos/mongo`     | Path to storage location                |
| 22   | `nfs.server` | `[STORAGE_SERVER_IP]` | IP of NFS server</br>ie `192.168.10.50` |

---

## Deploy instructions

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

## Outcomes

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

## Optional

### Connect to Mongo

You may need to connect to Mongo for validation or other changes. To connect to Kubernetes Mongo (without CP), simply:

1. get the name of the mongo pod

        kubectl get pods --all-namespaces

        NAMESPACE     NAME                                     READY   STATUS    RESTARTS   AGE
        boards        mongo-67696548c-xpdqh                    1/1     Running   0          35s

1. exec into the pod using the mongosh (or mongo) command - replacing pod name and namespace

        kubectl exec -it mongo-67696548c-xpdqh -n boards -- mongosh --host mongo-service:27017

### Access Boards Data

1. open the db containing board nodes

        show dbs
        use boards-app
        

1. find all boards
        
        db.nodes.find({ type: 'board' }})

1. find a board from a particular activitity
        
        db.nodes.find({ providerID: 'activities-id-goes-here' }})
        
1. find the members for a particular board

        db.boardmembers.find({ board: ObjectId("_id-of-board-found-above") })
        
### Replace Member of a Board

1. find the users in question, e.g Andrew & Nicky

        use boards-user
        db.users.find({ name: "Andrew Welch" })
        { "_id" : ObjectId("617891eae72f26802c4bec5e"), "email" : "awelch@isw.net.au", ....

        db.users.find({ name: "Nicky Tope" })
        { "_id" : ObjectId("617891ed660876da990253b7"), "email": "ntope@isw.net.au", .....
        

1. switch to the boards app
        
        use boards-app

1. find the members for a particular board (substitute the ID)

        db.boardmembers.find({ board: ObjectId("<BOARD_ID>") })
        
1. replace user A with B, e.g. Andrew with Nicky
        
        db.boardmembers.updateOne({ board: ObjectId("<BOARD_ID>"), 'entity.kind': 'User', 'entity.id': '617891eae72f26802c4bec5e'  }, { $set: { 'entity.id': '617891ed660876da990253b7' }})
