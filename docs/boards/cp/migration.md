# Migration of Activities to Huddo Boards

As part of the installation process for Huddo Boards (Activities Plus) you must run the migration service to move the existing Activities into Huddo Boards.

> Note: please review the [Roles page](/boards/cp/roles/) for details on how Community Activity membership is interpreted & presented by Boards

## Process Overview

This service will:

1. access Activities data in the existing Connections SQL database
1. process the Activity into a Board
1. get file attachments and long descriptions via mounting the Connections shared drive
1. write Boards data into the Component Pack mongo database
1. write file attachments into S3 storage

Ensure you have updated the following variables as applicable in your `boards-cp.yaml` file downloaded previously

|                                              | Example                                                  | Description                                                                                                                                                                                                               |
| -------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sharedDrive.server`                         | `192.168.10.1` or `websphereNode1`                       | IP or Hostname of the server with the Connections shared drive mount                                                                                                                                                      |
| `sharedDrive.path`                           | `/opt/HCL/Connections/data/shared` or `/nfs/data/shared` | Path on the mount to the Connections shared drive                                                                                                                                                                         |
| `sharedDrive.mountOptions`                   | `-nfsvers=4.1`                                           | Any additional sharedDrive mountOptions. All yaml is passed through drive                                                                                                                                                 |
| `env.FILE_PATH_ACTIVITIES_CONTENT_STORE`     | `/data/activities/content`                               | Path of the Activities content store relative to the Connections shared drive.</br>Must start with /data as the Connections shared drive is mounted at /data</br>Ensure you set the IP and path for the NFS volume mount. |
| `env.API_GATEWAY`                            | `https://[CONNECTIONS_URL]/api-boards`                   | URL of the Boards API.</br>Used by files attached to a board. URL.                                                                                                                                                        |
| `env.TZ`                                     | `Europe/London` or `Australia/Hobart` etc                | 'Local' Timezone</br>Used for date interpretation. See full [list of supported timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)                                                                   |
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

---

## Deploy Helm Chart

Please deploy the following chart with the same configuration `boards-cp.yaml` file used to deploy the kudos-boards-cp chart

    helm upgrade kudos-boards-cp-activity-migration https://docs.huddo.com/assets/config/kubernetes/kudos-boards-cp-activity-migration-3.1.0.tgz -i -f ./boards-cp.yaml --namespace connections --recreate-pods

> **Note:** the configuration file has changed as of the v3 chart. Please add the new `sharedDrive` parameters described above

---

## Migrate Activities

The migration interface is accessible at `https://[CONNECTIONS_URL]/boards/admin/migration` to select which Activities to migrate (ie ignore completed/deleted). For some explanation of the interface, see [Activity Migration User Interface](/boards/cp/migration-interface).

You can also set the `env.IMMEDIATELY_PROCESS_ALL` if you wish to migrate every Activity without the UI.

---

## Logs

You can check the pod logs for the kudos-boards-cp-activity-migration to see progress of the running migration

For example

![Example](/assets/boards/cp/migration-logs.png)

---

## After Migration Complete

1.  The Migration service can be removed. Please use the following command

        helm delete kudos-boards-cp-activity-migration --purge

1.  Turn off the Activities application in WebSphere ISC
