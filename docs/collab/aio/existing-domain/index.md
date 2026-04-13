# Collab AIO - Existing domain

!!! tip

    This deployment type integrates Huddo Collab under an existing domain (e.g. `connections.example.com/huddo`), using your current reverse proxy or adding a bundled proxy container alongside Collab.

## Setup

### Download Configuration

1.  Download the following files

    | Description         | File                                                                                                                                                                                                                                                         |
    | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
    | Configuration       | [config.zip](./config.zip)</br></br>This contains</br>- Environment variables (`.env`)</br>- Docker Compose file (`docker-compose.yaml`)</br>- Traefik overlay (`docker-compose.traefik.yaml`)</br>- nginx overlay (`docker-compose.nginx.yaml`)             |
    | User authentication | Pick the file for your authentication provider:</br>- [HCL Connections](../auth/connections/user.env)</br>- [HCL Domino](../auth/domino/user.env)</br>- [HCL Digital Experience (DX)](../auth/dx/user.env)</br>- [Microsoft AD](../auth/msad/user.env)       |

1.  Unzip the `config.zip` file to a directory of your choice (e.g. `huddocollab`)
1.  Copy the `user.env` file to the same directory.

### Configure

#### .env

Update the following variables in the `.env` file:

| Variable                | Example                           | Description                                                         |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------- |
| `IMAGE_TAG`             | `2025-01-15`                      | [Date of our latest release](../../releases.md)                     |
| `APP_URI`               | `https://connections.example.com` | Full public base URL — no trailing slash                            |
| `APP_HOST`              | `connections.example.com`         | Hostname only (no protocol) — used for inter-service routing        |
| `MONGO_PASSWORD`        | `dbpassword`                      | MongoDB root password — set on first start                          |
| `S3_ACCESS_KEY`         | `changeme`                        | SeaweedFS / S3 access key — set on first start                      |
| `S3_SECRET_KEY`         | `changeme`                        | SeaweedFS / S3 secret key — set on first start                      |
| `SOCKET_CLUSTER_SECRET` | `changeme`                        | Shared secret for SocketCluster                                     |

#### user.env

Set all of the variables in the `user.env` file. Each file contains different variables. For full details of the variables please see the [documentation](../../env/common.md#provider-specific-options).

## Deploy

Choose your proxy option:

### Option A — Use your existing proxy (BYOP)

If you have an existing nginx or HTTPD proxy (e.g. from HCL Connections), configure it to forward requests to the Collab services. See the [Proxy Configuration](./proxy.md) for the required location blocks and port mappings.

Then start only the core Collab stack:

```bash
docker compose -f docker-compose.yaml up -d
```

### Option B — Traefik (bundled)

If you want Traefik to handle TLS termination for this domain, set `LETSENCRYPT_DIR` and `APP_HOST` in `.env`, then run:

```bash
docker compose -f docker-compose.yaml -f docker-compose.traefik.yaml up -d
```

### Option C — nginx (bundled)

```bash
docker compose -f docker-compose.yaml -f docker-compose.nginx.yaml up -d
```