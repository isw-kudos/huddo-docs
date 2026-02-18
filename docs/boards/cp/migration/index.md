# Migration of Activities to Huddo Boards (with Component Pack)

!!! tip

    If you are not using Component Pack please follow [this guide](../../connections/migration.md)

As part of the installation process for Huddo Boards (Activities Plus) you must run the migration service to move the existing Activities into Huddo Boards.

!!! info

    Please review the [Roles page](../roles/index.md) for details on how Community Activity membership is interpreted & presented by Boards

## Process Overview

This service will:

1. access Activities data in the existing Connections SQL database
1. process the Activity into a Board
1. get file attachments and long descriptions via mounting the Connections shared drive
1. write Boards data into the Component Pack mongo database
1. write file attachments into S3 storage

## Environment Variables

Ensure you have updated the following variables as applicable in your `boards-cp.yaml` file downloaded previously

### Shared Drive

| Variable                                    | Example                                                  | Description                                                                     |
| ------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `sharedDrive.server`                        | `192.168.10.1` or `websphereNode1`                       | IP or Hostname of the server with the Connections shared drive mount            |
| `sharedDrive.path`                          | `/opt/HCL/Connections/data/shared` or `/nfs/data/shared` | Path on the mount to the Connections shared drive                               |
| `sharedDrive.mountOptions`                  | `-nfsvers=4.1` (optional)                                | Any additional sharedDrive mountOptions. All yaml is passed through drive       |
| `sharedDrive.storage`                       | `10Gi` (optional)                                        | The capacity of the PV and PVC                                                  |
| `sharedDrive.accessMode`                    | `ReadOnlyMany` (optional)                                | The accessMode of the PV and PVC                                                |
| `sharedDrive.volumeMode`                    | `Filesystem` (optional)                                  | The volumeMode of the PV and PVC                                                |
| `sharedDrive.persistentVolumeReclaimPolicy` | `Retain` (optional)                                      | The persistentVolumeReclaimPolicy of the PV and PVC                             |
| `sharedDrive.storageClassName`              | `manual` (optional)                                      | The storageClassName of the PV and PVC - useful for custom spec (e.g. hostPath) |
| `sharedDrive.spec`                          | See [below](#custom-persistent-volume)                   | Using a fully custom spec - e.g. FlexVolume or hostPath                         |

### Database and Processing

| Name                                     | Example                                                                     | Description                                                                                                                                                             |
| ---------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FILE_PATH_ACTIVITIES_CONTENT_STORE`     | `/data/activities/content`                                                  | Path of the Activities content store relative to the Connections shared drive.</br>Must start with /data as the Connections shared drive is mounted at /data            |
| `API_GATEWAY`                            | `https://[CONNECTIONS_URL]/api-boards`                                      | URL of the Boards API.</br>Used by files attached to a board. URL.                                                                                                      |
| `TZ`                                     | `Europe/London` or</br>`Australia/Hobart` etc                               | 'Local' Timezone</br>Used for date interpretation. See full [list of supported timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)                 |
| `CONNECTIONS_ACTIVITIES_ADMIN_USERNAME`  | `connectionsadmin`                                                          | Credentials for user with `admin` role </br>on the Activities application.</br>See `ISC` => `Applications` => </br>`Activities` => </br>`Security role to user mapping` |
| `CONNECTIONS_ACTIVITIES_ADMIN_PASSWORD`  | `adminpassword`                                                             | Password for the Activities administrator                                                                                                                               |
| `CONNECTIONS_DB_TYPE`                    | `db2` or `mssql` or `oracle`                                                | SQL database type hosting Activities.                                                                                                                                   |
| `CONNECTIONS_DB_HOST`                    | `dbserver.company.com`                                                      | SQL Server hostname hostname                                                                                                                                            |
| `CONNECTIONS_DB_PORT`                    | `50000` or `1433` or `1531`                                                 | SQL Server connection port                                                                                                                                              |
| `CONNECTIONS_DB_USER`                    | `dbuser`                                                                    | SQL Server user name                                                                                                                                                    |
| `CONNECTIONS_DB_PASSWORD`                | `dbpassword`                                                                | SQL Server password password                                                                                                                                            |
| `CONNECTIONS_DB_SID`                     | `DATABASE`                                                                  | SQL Server SID</br>**Note: applicable to Oracle**                                                                                                                       |
| `CONNECTIONS_DB_DOMAIN`                  | `domain`                                                                    | SQL Server connection string</br>**Note: applicable to Microsoft SQL**                                                                                                  |
| `CONNECTIONS_DB_CONNECT_STRING`          | `HOSTNAME=<host>;PROTOCOL=...`</br>or `<host>:<port>/<sid>`                 | SQL Server connection string</br>**Note: Optional</br>Default is built from other values.</br>Only applicable to DB2 and Oracle**                                       |
| `IMMEDIATELY_PROCESS_ALL`                | `false` (default)                                                           | Process ALL Activities on service startup.                                                                                                                              |
| `IMMEDIATELY_PROCESS_ACTIVITY_IDS`       | `e11dc638-2146-49e3-9d0e-dacd7e3150f0,e11dc638-2146-49e3-9d0e-dacd7e3150f1` | Comma separated list of Activity IDs to process immediately. Useful if you want to run in bulk but not ALL Activities.                                                  |
| `COMPLETE_ACTIVITY_AFTER_MIGRATED`       | `false`                                                                     | Mark the old Activity data as complete                                                                                                                                  |
| `CREATE_LINK_IN_ACTIVITY_AFTER_MIGRATED` | `false`                                                                     | Create link to new Board in old Activity                                                                                                                                |

#### Custom DB Names

If you have a custom database names for either the Activities or Profiles database, you can override the defaults using the following variables:

| Variable                        | Default    | Description         |
| ------------------------------- | ---------- | ------------------- |
| `CONNECTIONS_DB_ACTIVITIES`     | `OPNACT`   | Activities database |
| `CONNECTIONS_PEOPLEDB_DATABASE` | `PEOPLEDB` | Profiles database   |

#### PeopleDB ACL

Additional Properties for access to `PEOPLEDB` if separate host or authentication.

| Variable                              | Default                         | Example                                                     | Description                  |
| ------------------------------------- | ------------------------------- | ----------------------------------------------------------- | ---------------------------- |
| `CONNECTIONS_PEOPLEDB_HOST`           | `CONNECTIONS_DB_HOST`           | `dbserver.company.com`                                      | SQL Server hostname          |
| `CONNECTIONS_PEOPLEDB_PORT`           | `CONNECTIONS_DB_PORT`           | `50000` or `1433` or `1531`                                 | SQL Server connection port   |
| `CONNECTIONS_PEOPLEDB_SID`            | `CONNECTIONS_DB_SID`            | `DATABASE`                                                  | SQL Server SID (for Oracle)  |
| `CONNECTIONS_PEOPLEDB_USER`           | `CONNECTIONS_DB_USER`           | `dbuser`                                                    | SQL Server user name         |
| `CONNECTIONS_PEOPLEDB_PASSWORD`       | `CONNECTIONS_DB_PASSWORD`       | `dbpassword`                                                | SQL Server user password     |
| `CONNECTIONS_PEOPLEDB_CONNECT_STRING` | `CONNECTIONS_DB_CONNECT_STRING` | `HOSTNAME=<host>;PROTOCOL=...`</br>or `<host>:<port>/<sid>` | SQL Server connection string |

#### MSSQL

| Variable                 | Example                          | Description                                                   |
| ------------------------ | -------------------------------- | ------------------------------------------------------------- |
| `CONNECTIONS_DB_OPTIONS` | {"trustServerCertificate": true} | JSON encoded options for the MS SQL Server connection string. |

#### Oracle

As of `2024-02-14` we have moved to the `node-oracledb` in `thin client` mode which does not support Native Network Encryption (NNE). Please temporarily disable NNE in the Oracle server configuration to run the migration service.

If you have this enabled, it will cause the following error:

````
Error: NJS-500: connection to the Oracle Database was broken
NJS-521: connection to host *************** port **** received end-of-file on communication channel```
````

For more information, please see the [node-oracledb documentation](https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#native-network-encryption) and [this issue](https://github.com/oracle/node-oracledb/issues/1567).

### Performance Tuning

Below are supported performance tuning options.

| Name                   | Default | Description                                                                                                         |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `PROCESSING_PAGE_SIZE` | `5`     | Number of Activities to process simultaneously.                                                                     |
| `PROCESSING_LOG_EVERY` | `50`    | The migration process logs every 50 Activities completed                                                            |
| `FIELDS_PAGE_SIZE`     | `10`    | Number of fields in an Activity to process simultaneously.</br>Dates, File attachments, etc.                        |
| `FIELDS_LOG_EVERY`     | `50`    | The migration process logs every 50 fields completed                                                                |
| `NODES_PAGE_SIZE`      | `50`    | Number of nodes in an Activity to process simultaneously.                                                           |
| `FILE_READ_STREAM_MB`  | `5`     | The migration process reads files from the DB.</br>This is the value it is allowed to get ahead of the write in MB. |
| `FILE_WRITE_CHUNK_MB`  | `5`     | The migration process writes to S3.</br>It batches the data in chunks in Memory. Minimum of 5MB.                    |

### Purge

If you encounter issues with certain Activities, you can purge them from the database re-run the migration process.

| Name                          | Example                                                                     | Description                                                                                                                                                           |
| ----------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PURGE_MIGRATED_ACTIVITY_IDS` | `e11dc638-2146-49e3-9d0e-dacd7e3150f0,e11dc638-2146-49e3-9d0e-dacd7e3150f1` | Comma separated list of Activity IDs to purge from the database. This is useful if you want to remove previously migrated Activities to re-run the migration process. |
| `PURGE_INCOMPLETE`            | `false` or `true`                                                           | Purge any Activities that are marked have been marked as started but are incomplete.                                                                                  |

## Custom Persistent Volume

The default chart values use an NFS mount. Below are examples custom configuration of the persisent volume definition for access to the Shared Drive using other methods.

!!! note

    We recommend running the helm chart with `--dry-run --debug` to confirm the yaml output

1. Host path

    !!! tip

        This can be used in conjunction with existing linux methods (e.g. `cifs-utils`, `smbclient` etc) to mount a Windows Samba share directly onto the Kubernetes Node(s).

    Please read the [Kubernetes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage/#create-a-persistentvolume).

        migration:
          sharedDrive:
            storageClassName: manual
            spec:
              hostPath:
                path: /data/shared

2. Kubernetes CIFS Volume Driver (for Samba shares).

    Please read the [CIFS documentation](https://k8scifsvol.morimoto.net.br/)

        migration:
          sharedDrive:
            spec:
              flexVolume:
                driver: juliohm/cifs
                options:
                  opts: sec=ntlm,uid=1000
                  server: my-cifs-host
                  share: /MySharedDirectory
                secretRef:
                  name: my-secret

!!! question "Additional for Windows"

    This migration is designed to be a once-off operation. If you are using Windows SMB shares and neither option above is appropriate for your environment, we would recommend:

    1. Temporarily copy the Activity Store content directory at `<SHARED_DRIVE>/activities/content` (e.g. `/opt/HCL/connections/data/shared/activities/content`) to an existing Linux accessible drive (e.g. `/pv-connections/activitystore`).
    1. Set the standard `sharedDrive.server` & `sharedDrive.path` to mount this path at `/data` in the containers
    1. Set `migration.env.FILE_PATH_ACTIVITIES_CONTENT_STORE: "/data"`

---

## Deploy Helm Chart

Please deploy the following chart with the same configuration `boards-cp.yaml` file used to deploy the huddo-boards-cp chart

    helm upgrade huddo-boards-cp-activity-migration https://docs.huddo.com/assets/config/kubernetes/huddo-boards-cp-activity-migration-1.4.0.tgz -i -f ./boards-cp.yaml --namespace connections --recreate-pods

> **Note:** the configuration file has changed as of the v3 chart. Please add the new `sharedDrive` parameters described above

---

## Migrate Activities

The migration interface is accessible at `https://[CONNECTIONS_URL]/boards/admin/migration` to select which Activities to migrate (ie ignore completed/deleted). For some explanation of the interface, see [Activity Migration User Interface](interface.md).

You can also set the `env.IMMEDIATELY_PROCESS_ALL` if you wish to migrate every Activity without the UI.

---

## Logs

You can check the pod logs for the activity-migration to see progress of the running migration

For example

![Example](logs.png)

---

## After Migration Complete

1. The Migration service can be removed. Please use the following command

        helm delete huddo-boards-cp-activity-migration --purge

1. Turn off the Activities application in WebSphere ISC

> **Note:** There are reports that in some environments that the following Connections services are affected by this: seedlists, homepage, desktop plugin, email notifications and search message bus
