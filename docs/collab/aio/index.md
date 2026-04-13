# Huddo Collab All-in-One (AIO) Docker setup

!!! tip

    This document outlines a standalone (all in one) deployment of Huddo Collab using `docker compose`. This can be used as a proof of concept, staging deployment or even a production deployment for a limited number of users (e.g. &lt; 500).

## Server requirements

You may run all services including database and file storage on one server, or you can use an external Mongo database or S3 file store.

RHEL server with:

!!! note

    The primary replacements for the now-unsupported CentOS Linux are Rocky Linux and AlmaLinux

|              | Minimum |
| ------------ | ------- |
| RAM          | 8gb     |
| vCPU         | 4       |
| System drive | 40gb    |
| Data drive   | 100gb   |
| Software     | docker  |

## Options

### Services

Collab is composed of the following application services:

| Service          | Description                          | Port  |
| ---------------- | ------------------------------------ | ----- |
| `core`           | Main Collab UI and API               | 2655  |
| `ideas`          | Ideas sub-application                | 4332  |
| `wikis`          | Wikis sub-application                | 9454  |
| `attachments`    | File attachment service              | 2882  |
| `discussions`    | Discussions service                  | 3473  |
| `editor`         | Collaborative rich-text editor       | 27012 |
| `socketcluster`  | Real-time WebSocket server           | 7625  |
| `user`           | User management                      | —     |
| `licence`        | Licence service                      | —     |
| `provider`       | Integration provider                 | —     |
| `acl`            | Access control layer                 | —     |

### Data/Services

Collab utilises 3 types of data services. Each of these may use external services (e.g. Mongo Atlas) or the included services in the template (this hugely changes the server demand).

| Service | Duration   | Description                        |
| ------- | ---------- | ---------------------------------- |
| MongoDB | Persistent | Data storage (database)            |
| S3      | Persistent | File storage (user uploaded files) |
| Redis   | Cache      | Short term caching for performance |

#### Backups

!!! warning

    Persistent data (MongoDB, S3/SeaweedFS) is stored in named Docker volumes. These volumes should be backed up regularly. Use `docker volume inspect` to find the volume paths on the host, or configure your backup tooling to snapshot the volumes directly.

### Network

All Collab services are served from a single domain under the `/huddo` path prefix (e.g. `connections.example.com/huddo` or `collab.example.com/huddo`). The `/huddo` prefix is built into the application and cannot be changed.

For the reverse proxy, three options are available — see [Deployment](#deployment) below.

## Deployment

### Access to Images

Our images are hosted on [Quay.io](https://quay.io/organization/huddo). To get access:

1. Create a [Quay.io](https://quay.io/signin/) account if you do not already have one.
1. Email [support@huddo.com](mailto:support@huddo.com) with your Quay.io account name requesting access to the Huddo Collab repository.
1. Once access is granted, log in on your server using the encrypted password from your Quay.io account settings:

        docker login -u="<username>" -p="<encrypted-password>" quay.io

---

### Instructions

Follow the [setup guide](./existing-domain/index.md) to configure your environment and choose a proxy option.

---

## Debugging

If your setup is not running, first check the database logs:

```shell
docker compose logs mongo
docker compose logs redis
```

To test connectivity directly on the docker server (bypassing any external proxy/DNS):

```shell
# Core UI — should return HTML
curl -H "Host: your.domain" --insecure https://localhost/huddo

# Core health check — should return {"status":"ok"} or similar
curl http://localhost:2655/

# Ideas health check
curl http://localhost:4332/

# Wikis health check
curl http://localhost:9454/

# SocketCluster health check
curl http://localhost:7625/health
```

If the above work then you may have configuration issues with your proxy or DNS not pointing traffic to the docker server correctly.

Check the proxy logs if using the bundled proxy:

```shell
docker compose logs proxy    # nginx overlay
docker compose logs traefik  # traefik overlay
```

The `core` container can reach all internal services and is useful for testing internal connectivity:

```shell
docker compose exec core sh
# Inside the container:
curl http://user:2620/health
curl http://licence:2621/health
curl http://provider:2623/health
curl http://acl:2250/health
curl http://socketcluster:7625/health
```
