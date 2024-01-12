# Boards Standalone Deployment

!!! tip

    This document outlines a standalone (all in one) deployment of Huddo Boards using `docker-compose`. This can be used as a proof of concept, staging deployment or even a production deployment for a limited number of users (e.g. &lt; 500).

You may run all services including database and file storage on one server, or you can use an external Mongo database or S3 file store.

Like all other deployments of Huddo Boards, this requires configuration of 2 domains: Application and API. e.g. `boards.huddo.com` and `boards.api.huddo.com`

## Server requirements

RHEL (or Centos 7) server with:

-   8gb ram minimum
-   4 vCPUs
-   40gb system drive
-   100gb data drive (will be shared for database and file store) <sup>\*see Persistence Options below</sup>
-   docker and docker-compose

---

## Options

### Network

You may use an external proxy or send traffic directly to the server. If you are sending traffic directly to the server, you will need pem encoded certificate (with full chain) and key.

The implementation of this will require 2 domains in your environment (typically "boards." and "boards-api." subdomains), one for the web app and one for the API.

### Persistence

Boards uses 3 types of persistent data:

1. Mongodb
1. S3 file store
1. Redis cache.

Each of these may use external services (e.g. Mongo Atlas) or the included services in the template (this hugely changes the server demand).

!!! warning

    If using the included services, you must have a separate mount point on your server for persistent data with a directory each for mongo and s3(minio) storage. You will need to map directories for mongo and s3 containers to this data drive. This data drive should be backed up however you currently backup data.

---

## Deployment

### Access to Images

Please [follow this guide](images.md) to get access to our images in Quay.io so that we may give you access to our repositories and templates. Once you have access please run the `docker login` command available from the Quay.io interface, for example:

    docker login -u="<username>" -p="<encrypted-password>" quay.io

---

### Configuration

1.  download the configuration files:

    -   [docker-compose yaml](../assets/boards/aio/boards.yml)
    -   [nginx proxy conf](../assets/boards/aio/nginx.conf)

1.  update all example values in both files as required. Most required variables are in the template, for more information see the Kubernetes docs

    -   [Global config](kubernetes/index.md#update-config-file)
    -   [Boards variables](env/common.md)

    The minio credentials are are used to both set in the minio service and access it from other services, the x-minio-access field is used as the username in minio and the x-minio-secret is used as the password you can view minios documentation on these fields here: https://docs.min.io/minio/baremetal/reference/minio-server/minio-server.html#root-credentials and an example of the values used here: https://docs.min.io/docs/minio-docker-quickstart-guide.html the standard seems to be around 20 characters all caps/numbers for the username and around 40 characters any case / number for the password.

    The nginx proxy setup assumes that you will have 2 subdomains as stated above with a shared (wildcard) ssl certificate, both the certificate and key file for these domains need to be accessible to the server and the path filled in under the proxy section. you may use separate certificates if needed by mounting them both in the proxy service with appropriate naming and using the new mounted files in the `nginx.conf`.

    !!! tip

          **Authentication**: the user environment variables in the compose file assume you are installing this in a Connections environment, these can be removed or replaced with a Microsoft 365 tenant info as [shown here](https://docs.huddo.com/boards/msgraph/auth/#configure-oauth-in-boards). For more info on other authentication methods contact the [huddo team](mailto:support@huddo.com). The default variables for Domino are also included and can be uncommented as required.

### Start

Start the deployment using the following command

    docker-compose -f ./boards.yml up -d

---

## Debugging

The mount point on your system for the mongo data needs to include user 1001 with read/write access, see [bitnami/mongodb](https://github.com/bitnami/bitnami-docker-mongodb) for more info and full documentation.

if your setup is not running, first check the db logs and make sure it is not complaining about permissions to write the files it needs
`docker-compose logs mongo`

To remove any other network configuration/hops on the docker server you should be able to:
`curl -H "Host: your.web.url" --insecure https://localhost`
This should return the html from webfront
`curl -H "Host: your.api.url" --insecure https://localhost`
This should return the html for the swagger api documentation
`curl -H "Host: your.api.url" --insecure https://localhost/health`
This should return "{listening: 3001}"

If the above works then you may have configuration issues with a proxy / dns not pointing traffic to the docker server properly
If it does not work then the local nginx proxy is probably not working, check `docker-compose logs nginx` to see if it points out any misconfiguration

The core image has ping enabled and has access to all others so you can use it to test connectivity

```shell
docker-compose exec -it core sh
ping user
ping mongo
... etc
```
