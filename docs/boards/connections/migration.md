# Migration of Activities to Huddo Boards (using standalone Mongo/Redis)

!!! tip

    If you are using Component Pack please follow [this guide](../cp/migration.md)

As part of the installation process for Huddo Boards you can run the migration service to move the existing Activities into Huddo Boards.

!!! info

    Please review the [Roles page](../cp/roles/index.md) for details on how Community Activity membership is interpreted & presented by Boards

## Difference between the individual import

There is an individual import, when you hover over the orange _Create_ button and click _Import from Activities_. It can be accessed by end-users, but only usess the Activities API. While this works for basic Activitiy functionality, it **doesn't include** any extra features from Huddo Boards for WebSphere. Card colors are one example of those features.

So you'll need to use the migration service described here to import **all** data in the new Boards.

## Process Overview

This service will:

1. access Activities data in the existing Connections SQL database
1. process the Activity into a Board
1. get file attachments and long descriptions via mounting the Connections shared drive
1. write Boards data into the Component Pack mongo database
1. write file attachments into S3 storage

Ensure you have updated the following variables as applicable in the `global.env` section of your `boards.yaml` file downloaded previously

|                                              | Example                                                  | Description                                                                                                                                                                                                               |
| -------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sharedDrive.server`                         | `192.168.10.1` or `websphereNode1`                       | IP or Hostname of the server with the Connections shared drive mount                                                                                                                                                      |
| `sharedDrive.path`                           | `/opt/HCL/Connections/data/shared` or `/nfs/data/shared` | Path on the mount to the Connections shared drive                                                                                                                                                                         |
| `sharedDrive.storage`                        | `10Gi` (optional)                                        | The capacity of the PV and PVC                                                                                                                                                                                            |
| `sharedDrive.accessMode`                     | `ReadOnlyMany` (optional)                                | The accessMode of the PV and PVC                                                                                                                                                                                          |
| `sharedDrive.volumeMode`                     | `Filesystem` (optional)                                  | The volumeMode of the PV and PVC                                                                                                                                                                                          |
| `sharedDrive.persistentVolumeReclaimPolicy`  | `Retain` (optional)                                      | The persistentVolumeReclaimPolicy of the PV and PVC                                                                                                                                                                       |
| `sharedDrive.storageClassName`               | `manual` (optional)                                      | The storageClassName of the PV and PVC - useful for custom spec (e.g. hostPath)                                                                                                                                           |
| `sharedDrive.spec`                           | [Example](../cp/migration.md#custom-persistent-volume) | Using a fully custom spec - e.g. FlexVolume or hostPath                                                                                                                                                                   |
| `env.CONNECTIONS_URL`                        | `httsp://connections.example.com`                        | URL of your Connections environment                                                                                                                                                                                       |
| `env.FILE_PATH_ACTIVITIES_CONTENT_STORE`     | `/data/activities/content`                               | Path of the Activities content store relative to the Connections shared drive.</br>Must start with /data as the Connections shared drive is mounted at /data</br>Ensure you set the IP and path for the NFS volume mount. |
| `env.API_GATEWAY`                            | `https://[CONNECTIONS_URL]/api-boards`                   | URL of the Boards API.</br>Used by files attached to a board. URL.                                                                                                                                                        |
| `env.CONNECTIONS_ACTIVITIES_ADMIN_USERNAME`  | `connectionsadmin`                                       | Credentials for user with `admin` role </br>on the Activities application.</br>See `ISC` => `Applications` => </br>`Activities` => </br>`Security role to user mapping`                                                   |
| `env.CONNECTIONS_ACTIVITIES_ADMIN_PASSWORD`  | `adminpassword`                                          | Password for the Activities administrator                                                                                                                                                                                 |
| `env.CONNECTIONS_DB_TYPE`                    | `db2` or `mssql` or `oracle`                             | SQL database type hosting Activities.                                                                                                                                                                                     |
| `env.CONNECTIONS_DB_HOST`                    | `dbserver.company.com`                                   | SQL Server hostname                                                                                                                                                                                                       |
| `env.CONNECTIONS_DB_PORT`                    | `50000` or `1433` or `1531`                              | SQL Server connection port                                                                                                                                                                                                |
| `env.CONNECTIONS_DB_USER`                    | `dbuser`                                                 | SQL Server user name                                                                                                                                                                                                      |
| `env.CONNECTIONS_DB_PASSWORD`                | `dbpassword`                                             | SQL Server user password                                                                                                                                                                                                  |
| `env.CONNECTIONS_DB_SID`                     | `DATABASE`                                               | SQL Server SID</br>**Note: applicable to Oracle**                                                                                                                                                                         |
| `env.CONNECTIONS_DB_DOMAIN`                  | `domain`                                                 | SQL Server connection string</br>**Note: applicable to Microsoft SQL**                                                                                                                                                    |
| `env.CONNECTIONS_DB_CONNECT_STRING`          | `HOSTNAME=<host>;PROTOCOL=...` or `<host>:<port>/<sid>`  | SQL Server connection string</br>**Note: Optional</br>Default is built from other values.</br>Only applicable to DB2 and Oracle**                                                                                         |
| `env.PROCESSING_PAGE_SIZE`                   | `10` (default)                                           | Number of Activities to process </br>simultaneously. Value must not exceed </br>the connection pool size supported </br>by the SQL database                                                                               |
| `env.PROCESSING_LOG_EVERY`                   | `50` (default)                                           | The migration process logs every 50 Activities completed                                                                                                                                                                  |
| `env.IMMEDIATELY_PROCESS_ALL`                | `false` (default)                                        | Process ALL Activities on service startup.                                                                                                                                                                                |
| `env.COMPLETE_ACTIVITY_AFTER_MIGRATED`       | `false`                                                  | Mark the old Activity data as complete                                                                                                                                                                                    |
| `env.CREATE_LINK_IN_ACTIVITY_AFTER_MIGRATED` | `false`                                                  | Create link to new Board in old Activity                                                                                                                                                                                  |

Example:

```yaml
migration:
  # configure access to the Connections Shared mount
  sharedDrive:
    # Replace with IP address for the NFS server
    server: 192.168.10.1
    # for example "/opt/HCL/Connections/data/shared" or "/nfs/data/shared"
    path: /nfs/data/shared
  env:
    FILE_PATH_ACTIVITIES_CONTENT_STORE: /data/activities/content
    API_GATEWAY: https://example.com/api-boards
    CONNECTIONS_URL: httsp://connections.example.com
    CONNECTIONS_ACTIVITIES_ADMIN_USERNAME: connectionsadmin
    CONNECTIONS_ACTIVITIES_ADMIN_PASSWORD: adminpassword
    CONNECTIONS_DB_TYPE: db2
    CONNECTIONS_DB_HOST: cnx-db.internal
    CONNECTIONS_DB_PORT: 50000
    CONNECTIONS_DB_USER: lcuser
    CONNECTIONS_DB_PASSWORD: xxx
    # ...
```

---

## Deploy Helm Chart

Please deploy the following chart with the same configuration `boards.yaml` file used to deploy the huddo-boards chart

    helm upgrade huddo-boards-activity-migration https://docs.huddo.com/assets/config/kubernetes/huddo-boards-activity-migration-1.0.0.tgz -i -f ./boards.yaml --namespace boards --recreate-pods

> **Note:** the new `sharedDrive` parameters described above. You may also need to delete the previously name chart

---

## Migrate Activities

The migration interface is accessible at `https://[BOARDS_URL]/admin/migration` to select which Activities to migrate (ie ignore completed/deleted). For some explanation of the interface, see [Activity Migration User Interface](../cp/migration-interface.md).

You can also set the `global.env.IMMEDIATELY_PROCESS_ALL` variable if you wish to migrate every Activity without the UI.

---

## Logs

You can check the pod logs for the activity-migration to see progress of the running migration:

```bash
kubectl logs -n boards -f $(kubectl get pod -n boards | grep activity-migration | awk '{print $1}')
```

When the helm chart was installed in another namespace (`helm upgrade ... --namespace my-boards`), change `-n boards` to your modified namespace like `-n my-boards`. To stop following the logs, press `[Ctrl] + [C]`.

For example

![Example](/assets/boards/cp/migration-logs.png)

---

## After Migration Complete

1.  The Migration service can be removed. Please use the following command

        helm delete huddo-boards-activity-migration --purge

1.  Turn off the Activities application in WebSphere ISC
