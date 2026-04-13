# Configuration Options

## Required Variables

The following variables must be set in your `.env` file before starting the stack.

| Variable                | Example                          | Description                                                         |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------- |
| `IMAGE_TAG`             | `2025-01-15`                     | Image tag to deploy — see [releases](../releases.md)               |
| `APP_URI`               | `https://collab.example.com`     | Full public base URL, no trailing slash                             |
| `APP_HOST`              | `collab.example.com`             | Hostname only (no protocol) — used for routing and TLS             |
| `MONGO_PASSWORD`        | `changeme`                       | MongoDB root password — set on first start                          |
| `S3_ACCESS_KEY`         | `changeme`                       | SeaweedFS / S3 access key — set on first start                      |
| `S3_SECRET_KEY`         | `changeme`                       | SeaweedFS / S3 secret key — set on first start                      |
| `SOCKET_CLUSTER_SECRET` | `changeme`                       | Shared secret for SocketCluster real-time service                   |

At least one OAuth provider must also be configured (see below).

## Provider-Specific Options

### HCL Connections

!!! tip

    These settings are required if you are using HCL Connections as your authentication provider.

| Variable                         | Example                                           | Description                                                              |
| -------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------ |
| `CONNECTIONS_URL`                | `https://connections.example.com`                 | HCL Connections URL                                                      |
| `CONNECTIONS_HOSTNAME`           | `connections.example.com`                         | Hostname only                                                            |
| `CONNECTIONS_CLIENT_ID`          | `collabClientId`                                  | OAuth client ID registered in Connections                                |
| `CONNECTIONS_CLIENT_SECRET`      |                                                   | OAuth client secret                                                      |
| `CONNECTIONS_ADMINS`             | `'["admin@example.com"]'`                         | JSON array of admin email addresses                                      |
| `CONNECTIONS_NAME`               | `HCL Connections`                                 | **Optional**: Display name on the login page                             |
| `CONNECTIONS_KEYCLOAK_URL`       | `https://login.example.com`                       | **Optional**: Keycloak URL for Connections deployments using Keycloak    |
| `CONNECTIONS_KEYCLOAK_REALM`     | `connections`                                     | **Optional**: Keycloak realm                                             |
| `CONNECTIONS_KEYCLOAK_PATH`      | `/auth`                                           | **Optional**: Keycloak path (use `/realms` for Keycloak v22+)            |

---

### HCL Domino

!!! tip

    These settings are required if you are using HCL Domino as your authentication provider.

| Variable                               | Example                             | Description                                                                       |
| -------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| `DOMINO_AUTH_URL`                      | `https://iam.example.com`           | HCL Domino IAM / REST API URL                                                     |
| `DOMINO_CLIENT_ID`                     |                                     | OAuth client ID                                                                   |
| `DOMINO_CLIENT_SECRET`                 |                                     | OAuth client secret                                                               |
| `DOMINO_ADMINS`                        | `admin@example.com`                 | **Optional**: Admin email address(es)                                             |
| `DOMINO_AUTH_SCOPE`                    | `$DATA`                             | **Optional**: OAuth scope. Default: `$DATA`                                       |
| `DOMINO_REST_SCOPE`                    | `directorylookup`                   | **Optional**: REST API scope. Default: `directorylookup`                          |
| `DOMINO_USE_PROFILE_IMAGE_ATTACHMENTS` | `true`                              | **Optional**: Set `true` to use profile images from Domino                        |
| `DOMINO_PROFILE_IMAGE_NAME`            | `photo.jpg`                         | **Optional**: Filename of profile image attachment                                |

---

### HCL Digital Experience (DX)

!!! tip

    These settings are required if you are using HCL DX as your authentication provider.

| Variable               | Example                        | Description                                                                  |
| ---------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `DX_URL`               | `https://dx.example.com`       | HCL DX URL                                                                   |
| `DX_CLIENT_ID`         |                                | OAuth client ID                                                              |
| `DX_CLIENT_SECRET`     |                                | OAuth client secret                                                          |
| `DX_ADMINS`            | `admin@example.com`            | **Optional**: Admin email address(es)                                        |
| `DX_NAME`              | `HCL DX`                       | **Optional**: Display name on the login page                                 |
| `DX_AUTH_PROVIDER_NAME`| `OAuthConfig`                  | **Optional**: OAuth Service Provider name. Default: `OAuthConfig`            |
| `DX_KEYCLOAK_URL`      |                                | **Optional**: Keycloak URL for DX deployments using Keycloak                 |
| `DX_KEYCLOAK_REALM`    |                                | **Optional**: Keycloak realm                                                 |

---

### Microsoft Active Directory (AD FS)

!!! tip

    These settings are required if you are using Microsoft AD FS as your authentication provider.

| Variable                 | Example                                               | Description                             |
| ------------------------ | ----------------------------------------------------- | --------------------------------------- |
| `MSAD_FS_URL`            | `https://adfs.example.com`                            | AD FS server URL                        |
| `MSAD_CLIENT_ID`         |                                                       | AD FS client ID                         |
| `MSAD_CLIENT_SECRET`     |                                                       | AD FS client secret                     |
| `MSAD_ADMINS`            | `admin@example.com`                                   | Admin email address(es)                 |
| `MSAD_NAME`              | `Microsoft AD`                                        | **Optional**: Display name              |
| `MSAD_LDAP_URL`          | `ldap://ad.example.com`                               | **Optional**: LDAP server URL           |
| `MSAD_LDAP_BASE_DN`      | `DC=example,DC=com`                                   | **Optional**: LDAP base DN              |
| `MSAD_LDAP_BIND_DN`      | `CN=Collab,OU=Service Accounts,DC=example,DC=com`     | **Optional**: LDAP bind DN              |
| `MSAD_LDAP_BIND_PASSWORD`|                                                       | **Optional**: LDAP bind password        |

---

## Optional Variables

### Reverse proxy (bundled proxy only)

| Variable           | Example             | Description                                                                      |
| ------------------ | ------------------- | -------------------------------------------------------------------------------- |
| `LETSENCRYPT_DIR`  | `/etc/letsencrypt`  | Directory containing `live/<APP_HOST>/fullchain.pem` and `privkey.pem` for TLS  |

### ACL service

| Variable          | Default | Description                                      |
| ----------------- | ------- | ------------------------------------------------ |
| `L1_CACHE_TTL`    | `60`    | L1 (in-memory) cache TTL in seconds              |
| `L2_CACHE_TTL`    | `300`   | L2 (Redis) cache TTL in seconds                  |
| `MAX_RETRIES`     | `3`     | Max retries on cache miss                        |

### User service

| Variable                  | Default | Description                                      |
| ------------------------- | ------- | ------------------------------------------------ |
| `DISABLE_WELCOME_EMAIL`   | `false` | Set `true` to suppress welcome emails            |
| `DISABLE_USER_LICENSING`  | `false` | Set `true` to disable per-user licence checks    |

### Ideas and Wikis

| Variable             | Description                                               |
| -------------------- | --------------------------------------------------------- |
| `UNSPLASH_APP_ID`    | **Optional**: Unsplash app ID for cover image search      |
| `UNSPLASH_ACCESS_KEY`| **Optional**: Unsplash access key                         |
| `UNSPLASH_SECRET_KEY`| **Optional**: Unsplash secret key                         |

### Debug

| Variable | Example       | Description                                                           |
| -------- | ------------- | --------------------------------------------------------------------- |
| `DEBUG`  | `collab:*`    | Comma-separated debug namespaces, e.g. `collab:auth,collab:db`       |