# Migration of Activities to Huddo Boards

As part of the installation process for Huddo Boards you can run the migration service to move the existing Activities into Huddo Boards.

## Difference between the individual import

There is an individual import, when you hover over the orange _Create_ button and click _Import from Activities_. It can be accessed by end-users, but only usess the Activities API. While this works for basic Activitiy functionality, it **doesn't include** any extra features from Huddo Boards for WebSphere. Card colors are one example of those features.

So you'll need to use the migration service described here to import **all** data in the new Boards.

## Process Overview

This service will:

1. access Activities data in the existing Connections SQL database
1. process the Activity into a Board
1. get file attachments and long descriptions not in SQL database via the Activities API
1. write Boards data into the Component Pack mongo database
1. write file attachments into S3 storage

Ensure you have updated the following variables as applicable in the `global.env` section of your `boards.yaml` file downloaded previously

|                                          | Example                                                 | Description                                                                                                                                                             |
| ---------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONNECTIONS_URL`                        | `httsp://connections.example.com`                       | URL of your Connections environment                                                                                                                                     |
| `API_GATEWAY`                            | `https://[CONNECTIONS_URL]/api-boards`                  | URL of the Boards API.</br>Used by files attached to a board. URL.                                                                                                      |
| `CONNECTIONS_ACTIVITIES_ADMIN_USERNAME`  | `connectionsadmin`                                      | Credentials for user with `admin` role </br>on the Activities application.</br>See `ISC` => `Applications` => </br>`Activities` => </br>`Security role to user mapping` |
| `CONNECTIONS_ACTIVITIES_ADMIN_PASSWORD`  | `adminpassword`                                         | Password for the Activities administrator                                                                                                                               |
| `CONNECTIONS_DB_TYPE`                    | `db2` or `mssql` or `oracle`                            | SQL database type hosting Activities.                                                                                                                                   |
| `CONNECTIONS_DB_HOST`                    | `dbserver.company.com`                                  | SQL Server hostname                                                                                                                                                     |
| `CONNECTIONS_DB_PORT`                    | `50000` or `1433` or `1531`                             | SQL Server connection port                                                                                                                                              |
| `CONNECTIONS_DB_USER`                    | `dbuser`                                                | SQL Server user name                                                                                                                                                    |
| `CONNECTIONS_DB_PASSWORD`                | `dbpassword`                                            | SQL Server user password                                                                                                                                                |
| `CONNECTIONS_DB_SID`                     | `DATABASE`                                              | SQL Server SID</br>**Note: applicable to Oracle**                                                                                                                       |
| `CONNECTIONS_DB_DOMAIN`                  | `domain`                                                | SQL Server connection string</br>**Note: applicable to Microsoft SQL**                                                                                                  |
| `CONNECTIONS_DB_CONNECT_STRING`          | `HOSTNAME=<host>;PROTOCOL=...` or `<host>:<port>/<sid>` | SQL Server connection string</br>**Note: Optional</br>Default is built from other values.</br>Only applicable to DB2 and Oracle**                                       |
| `PROCESSING_PAGE_SIZE`                   | `10` (default)                                          | Number of Activities to process </br>simultaneously. Value must not exceed </br>the connection pool size supported </br>by the SQL database                             |
| `PROCESSING_LOG_EVERY`                   | `50` (default)                                          | The migration process logs every 50 Activities completed                                                                                                                |
| `IMMEDIATELY_PROCESS_ALL`                | `false` (default)                                       | Process ALL Activities on service startup.                                                                                                                              |
| `COMPLETE_ACTIVITY_AFTER_MIGRATED`       | `false`                                                 | Mark the old Activity data as complete                                                                                                                                  |
| `CREATE_LINK_IN_ACTIVITY_AFTER_MIGRATED` | `false`                                                 | Create link to new Board in old Activity                                                                                                                                |

Example:

```yaml
migration:
  env:
    CONNECTIONS_DB_TYPE: db2
    CONNECTIONS_DB_HOST: cnx-db.internal
    CONNECTIONS_DB_PORT: 50000
    CONNECTIONS_DB_USER: lcuser
    CONNECTIONS_DB_PASSWORD: xxx
    # ...
```
---

## Deploy Helm Chart

Please deploy the following chart with the same configuration `boards.yaml` file used to deploy the kudos-boards chart

    helm upgrade kudos-boards-activity-migration https://docs.huddo.com/assets/config/kubernetes/kudos-boards-activity-migration-4.0.0.tgz -i -f ./boards.yaml --namespace boards --recreate-pods

---

## Migrate Activities

The migration interface is accessible at `https://[BOARDS_URL]/admin/migration` to select which Activities to migrate (ie ignore completed/deleted). For some explanation of the interface, see [Activity Migration User Interface](/boards/cp/migration-interface).

You can also set the `global.env.IMMEDIATELY_PROCESS_ALL` variable if you wish to migrate every Activity without the UI.

---

## Logs

You can check the pod logs for the kudos-boards-activity-migration to see progress of the running migration:

```bash
kubectl logs -n boards -f $(kubectl get po -n boards | grep activity-migration | awk '{print $1}')
```

When the helm chart was installed in another namespace (`helm upgrade ... --namespace my-boards`), change `-n boards` to your modified namespace like `-n my-boards`. To stop following the logs, press `[Ctrl] + [C]`.

For example

![Example](/assets/boards/cp/migration-logs.png)

---

## After Migration Complete

1.  The Migration service can be removed. Please use the following command

        helm delete kudos-boards-activity-migration --purge

1.  Turn off the Activities application in WebSphere ISC
