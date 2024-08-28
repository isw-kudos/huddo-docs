# Huddo Boards All-in-One (AIO) Docker setup

!!! tip

    This document outlines a standalone (all in one) deployment of Huddo Boards using `docker compose`. This can be used as a proof of concept, staging deployment or even a production deployment for a limited number of users (e.g. &lt; 500).

## Server requirements

You may run all services including database and file storage on one server, or you can use an external Mongo database or S3 file store.

RHEL (or Centos 7) server with:

|              | Minimum |
| ------------ | ------- |
| RAM          | 8gb     |
| vCPU         | 4       |
| System drive | 40gb    |
| Data drive   | 100gb   |
| Software     | docker  |

## Options

### Data/Services

Boards utilises 3 types of data services. Each of these may use external services (e.g. Mongo Atlas) or the included services in the template (this hugely changes the server demand).

| Service | Duration   | Description                        |
| ------- | ---------- | ---------------------------------- |
| MongoDB | Persistent | Data storage (database)            |
| S3      | Persistent | File storage (user uploaded files) |
| Redis   | Cache      | Short term caching for performance |

#### Backups

!!! warning

    If using the included services, you must have a separate mount point on your server for persistent data with a directory each for mongo and s3 (minio) storage. You will need to map directories for mongo and s3 containers to this data drive. This data drive should be backed up however you currently backup data.

### Network

Please choose the appropriate network configuration for your environment:

|              | Existing domain                                                                                                     | New Subdomains                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Example URLs | `example.com/boards`</br>`example.com/api-boards`                                                                   | `boards.example.com`</br>`boards-api.example.com`                                                |
| Comments     | - use your existing domain</br>- no additional certificates</br>- easier SSO integration of HCL Connections header. | - cleaner looking URL</br>- requires 2 domains (and therefore certificates) in your environment. |
| Proxy        | Uses your [existing NGINX or HTTPD proxy](./existing-domain/proxy.md)                                               | Boards will deploy a reverse proxy                                                               |

## Deployment

### Access to Images

Please [follow this guide](../images.md) to get access to our images in Quay.io so that we may give you access to our repositories and templates. Once you have access please run the `docker login` command available from the Quay.io interface, for example:

    docker login -u="<username>" -p="<encrypted-password>" quay.io

---

### Instructions

Once you have decided on your deployment type please follow the appropriate instructions:

a) [Existing domain](./existing-domain/index.md)

b) [New subdomains](./subdomains/index.md)

---

## Debugging

The mount point on your system for the mongo data needs to include user 1001 with read/write access, see [bitnami/mongodb](https://github.com/bitnami/bitnami-docker-mongodb) for more info and full documentation.

if your setup is not running, first check the db logs and make sure it is not complaining about permissions to write the files it needs
`docker compose logs mongo`

To remove any other network configuration/hops on the docker server you should be able to:
`curl -H "Host: your.web.url" --insecure https://localhost`
This should return the html from webfront
`curl -H "Host: your.api.url" --insecure https://localhost`
This should return the html for the swagger api documentation
`curl -H "Host: your.api.url" --insecure https://localhost/health`
This should return "{listening: 3001}"

If the above works then you may have configuration issues with a proxy / dns not pointing traffic to the docker server properly
If it does not work then the local nginx proxy is probably not working, check `docker compose logs nginx` to see if it points out any misconfiguration

The core image has ping enabled and has access to all others so you can use it to test connectivity

```shell
docker compose exec -it core sh
ping user
ping mongo
... etc
```
