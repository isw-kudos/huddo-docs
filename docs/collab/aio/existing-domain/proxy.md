# Proxy Configuration

The following configuration should be set when Huddo Collab is deployed under an existing domain (e.g. HCL Connections). All Collab paths are routed by context path to individual services on the Collab host.

The Collab services expose the following ports on the Docker host:

| Path                 | Port  | Notes                         |
| -------------------- | ----- | ----------------------------- |
| `/huddo/attachments` | 2882  | Strip `/huddo` prefix         |
| `/huddo/discussions` | 3473  | Strip `/huddo` prefix         |
| `/huddo/editor`      | 27012 | WebSocket upgrade required    |
| `/huddo/ideas`       | 4332  |                               |
| `/huddo/wikis`       | 9454  |                               |
| `/huddo`             | 2655  | Core UI and API               |
| `/auth`              | 2655  | Rewrite to `/huddo/auth`      |
| `/socketcluster`     | 7625  | WebSocket upgrade required    |

## nginx

Please add the following location blocks to your proxy `server` -> `listen 443` blocks:

```nginx
# OAuth callbacks — rewrite /auth → /huddo/auth (Next.js basePath)
location /auth {
    rewrite ^/auth(.*) /huddo/auth$1 break;
    proxy_pass http://[DOCKER_COMPOSE_HOSTNAME]:2655;
    proxy_pass_request_headers on;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
}

# Collab editor (WebSocket)
location /huddo/editor {
    proxy_pass http://[DOCKER_COMPOSE_HOSTNAME]:27012;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Ideas
location /huddo/ideas {
    proxy_pass http://[DOCKER_COMPOSE_HOSTNAME]:4332;
    proxy_pass_request_headers on;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
}

# Wikis
location /huddo/wikis {
    proxy_pass http://[DOCKER_COMPOSE_HOSTNAME]:9454;
    proxy_pass_request_headers on;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
}

# Attachments (strip /huddo prefix)
location /huddo/attachments {
    rewrite ^/huddo(/.*) $1 break;
    proxy_pass http://[DOCKER_COMPOSE_HOSTNAME]:2882;
    proxy_pass_request_headers on;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
}

# Discussions (strip /huddo prefix)
location /huddo/discussions {
    rewrite ^/huddo(/.*) $1 break;
    proxy_pass http://[DOCKER_COMPOSE_HOSTNAME]:3473;
    proxy_pass_request_headers on;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
}

# Core UI and API
location /huddo {
    proxy_pass http://[DOCKER_COMPOSE_HOSTNAME]:2655;
    proxy_pass_request_headers on;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
}

# SocketCluster real-time (WebSocket)
location /socketcluster {
    proxy_pass http://[DOCKER_COMPOSE_HOSTNAME]:7625;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Where:

- `[DOCKER_COMPOSE_HOSTNAME]` is the hostname or IP of the server running the Docker Compose

## httpd

Please add the following Proxy rules to the VirtualHost 443 block:

```apache
<VirtualHost *:443>
    ServerName [HOST_DOMAIN]

    # Huddo Collab — OAuth callbacks
    ProxyPass "/auth" "http://[DOCKER_COMPOSE_HOSTNAME]:2655/huddo/auth"
    ProxyPassReverse "/auth" "http://[DOCKER_COMPOSE_HOSTNAME]:2655/huddo/auth"

    # Huddo Collab — Core UI and API
    ProxyPass "/huddo" "http://[DOCKER_COMPOSE_HOSTNAME]:2655/huddo"
    ProxyPassReverse "/huddo" "http://[DOCKER_COMPOSE_HOSTNAME]:2655/huddo"

    # Huddo Collab — Ideas
    ProxyPass "/huddo/ideas" "http://[DOCKER_COMPOSE_HOSTNAME]:4332/huddo/ideas"
    ProxyPassReverse "/huddo/ideas" "http://[DOCKER_COMPOSE_HOSTNAME]:4332/huddo/ideas"

    # Huddo Collab — Wikis
    ProxyPass "/huddo/wikis" "http://[DOCKER_COMPOSE_HOSTNAME]:9454/huddo/wikis"
    ProxyPassReverse "/huddo/wikis" "http://[DOCKER_COMPOSE_HOSTNAME]:9454/huddo/wikis"

    # Huddo Collab — Attachments
    ProxyPass "/huddo/attachments" "http://[DOCKER_COMPOSE_HOSTNAME]:2882/attachments"
    ProxyPassReverse "/huddo/attachments" "http://[DOCKER_COMPOSE_HOSTNAME]:2882/attachments"

    # Huddo Collab — Discussions
    ProxyPass "/huddo/discussions" "http://[DOCKER_COMPOSE_HOSTNAME]:3473/discussions"
    ProxyPassReverse "/huddo/discussions" "http://[DOCKER_COMPOSE_HOSTNAME]:3473/discussions"

    # Huddo Collab — SocketCluster (WebSocket — requires mod_proxy_wstunnel)
    ProxyPass "/socketcluster" "ws://[DOCKER_COMPOSE_HOSTNAME]:7625/socketcluster"
    ProxyPassReverse "/socketcluster" "ws://[DOCKER_COMPOSE_HOSTNAME]:7625/socketcluster"
</VirtualHost>
```

Where:

- `[HOST_DOMAIN]` is the URL of your environment, e.g. your HCL Connections deployment
- `[DOCKER_COMPOSE_HOSTNAME]` is the hostname or IP of the server running the Docker Compose

!!! note

    WebSocket proxying for `/socketcluster` and `/huddo/editor` requires `mod_proxy_wstunnel` to be enabled in Apache httpd.