# Proxy Configuration

The following configuration should be set when Huddo Boards is deployed at a context root under an existing domain (e.g. HCL Connections).

## nginx

Please add the following location blocks to your proxy `server` -> `listen 443` blocks:

```nginx
# Boards UI
location /boards {
    proxy_pass http://[DOCKER_COMPOSE_HOSTNAME]:80/boards;
}

# Boards API (including WebSocket support)
location /api-boards {
    proxy_pass http://[DOCKER_COMPOSE_HOSTNAME]:80/api-boards;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
}
```

Where:

- `[DOCKER_COMPOSE_HOSTNAME]` is the hostname/IP of the server running the Docker Compose

## httpd

Please add the following Proxy rules to the VirtualHost 443 block:

```apache
<VirtualHost *:443>
    ServerName [HOST_DOMAIN]

    #Huddo Boards
    ProxyPass "/boards" "http://[DOCKER_COMPOSE_HOSTNAME]:80/boards"
    ProxyPassReverse "/boards" "http://[DOCKER_COMPOSE_HOSTNAME]:80/boards"
    ProxyPass "/api-boards" "http://[DOCKER_COMPOSE_HOSTNAME]:80/api-boards"
    ProxyPassReverse "/api-boards" "http://[DOCKER_COMPOSE_HOSTNAME]:80/api-boards"
    #End Huddo Boards
</VirtualHost>
```

Where:

- `[HOST_DOMAIN]` is the URL of your environment, e.g. HCL Connections deployment
- `[DOCKER_COMPOSE_HOSTNAME]` is the hostname/IP of the server running the Docker Compose
