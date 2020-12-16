# Collab Cloud to Huddo Boards Migration

This document details how to import data from the private Connections (Multi-tenant) install. This process connects to the DB2 servers and Connections APIs (Activities), processes the data, and uploads into temporary tables in the Huddo Boards database & s3 file store. Once the upload has been validated, this data can then be imported into the Huddo production stores.

**Note: this process is designed to migrate one tenant at a time**

## Prerequisites

1. Installed

      - docker
      - docker-compose

1. Valid Dockerhub credentials for the `iswkudos/kudos-microservices` repository

1. Server IP is whitelisted in Huddo Boards Mongo database

## Installation Instructions

1.  Copy the [docker-compose.yml](https://github.com/isw-kudos/devops/blob/master/boards/cloudmigration/docker-compose.yml) file provider to the migration server

1.  Ensure you have the latest Docker images

        docker-compose pull

## Environment Variables

The following variables must be set near the end in the `docker-compose.yml` file

| Variable                                | Description                                     | Example                          |
| --------------------------------------- | ----------------------------------------------- | -------------------------------- |
| `IMMEDIATELY_PROCESS_ALL`               | When set to "true" this initiates the migration | "false"                          |
| `CONNECTIONS_DB_HOST`                   | Source DB2 IP/hostname                          | 208.85.191.12                    |
| `CONNECTIONS_DB_PORT`                   | Source DB2 Port                                 | 50000                            |
| `CONNECTIONS_DB_USER`                   | Source DB2 Username                             | LCUSER                           |
| `CONNECTIONS_DB_PASSWORD`               | Source DB2 Password                             |                                  |
| `CONNECTIONS_REGION`                    | Region as per Huddo naming (ams, us, test)      | test                             |
| `CONNECTIONS_DB_TENANT`                 | Tenant ID to process                            | 5000000001                       |
| `CONNECTIONS_URL`                       | URL for the tenant                              | https://orga.testna.collab.cloud |
| `CONNECTIONS_ACTIVITIES_ADMIN_USERNAME` | Tenant Admin username - used for API access     | user1@orga.com.au                |
| `CONNECTIONS_ACTIVITIES_ADMIN_PASSWORD` | Tenant Admin password                           |                                  |

## Migrate the data

To test if the migration can be processed it is recommended to leave `IMMEDIATELY_PROCESS_ALL="false"`. If the variables are valid, the logs will output the first 10 Activity IDs when this command is run:

    docker-compose up

Once you are satisfied that the migration variables are valid and ready to run, please set `IMMEDIATELY_PROCESS_ALL="true"` and run:

    docker-compose up

> Note: Please check all log outputs before commencing the next step.

## Inform Huddo Team

In order to complete the migration, the Huddo Teams needs to import the data from the temporary mongo databases and s3 buckets into production. Please inform the Huddo team and we can run a migration script.

## Questions / Issues

Please contact the Huddo Team at <a href="mailto:support@huddo.com?subject=Migration: plz send help">via email</a>
