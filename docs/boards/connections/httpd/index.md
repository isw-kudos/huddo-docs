# Proxy (httpd)

!!! tip

    To edit the `httpd.conf`, please follow [this guide](./edit.md).

Boards can be configured either as a standalone domain, or on the same domain as HCL Connections. For details on these config options [please see here](../../kubernetes/index.md#ssl-network-setup). Please follow the appropriate instructions below:

## a) New Domain

-   Allow CORS - follow these [instructions](./sso-header.md).

-   httpd

    ```apache
    <VirtualHost *:443>
        ServerName [BOARDS-URL]
        ProxyPreserveHost On
        ProxyPass / http://[KUBERNETES_NAME]/
        ProxyPassReverse / http://[KUBERNETES_NAME]/

        SSLEnable
        # Disable SSLv2
        SSLProtocolDisable SSLv2
        # Set strong ciphers
        SSLCipherSpec TLS_RSA_WITH_AES_128_CBC_SHA
        SSLCipherSpec TLS_RSA_WITH_AES_256_CBC_SHA
        SSLCipherSpec SSL_RSA_WITH_3DES_EDE_CBC_SHA
    </VirtualHost>
    ```

---

## b) Existing domain

!!! tip

    If you have an NGINX (e.g. customizer) in front of IHS use that instead to support websockets and use one less proxy. Follow [this guide for nginx](../../proxy/nginx.md).

The following configuration should be set when Huddo Boards is deployed at a context root under the existing HCL Connections domain.

It also includes a proxy rewrite rule, to serve the migrated Board when the legacy Activity URL is requested.

```apache
<VirtualHost *:443>
    ServerName [CONNECTIONS_URL]

    # redirect Activities to Boards once migrated
    RewriteEngine On
    RewriteRule ^/activities/service/html/(.*)$ /boards/activities/service/html/$1  [R]

    #Huddo Boards
    ProxyPass "/boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/boards"
    ProxyPassReverse "/boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/boards"
    ProxyPass "/api-boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/api-boards"
    ProxyPassReverse "/api-boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/api-boards"
    #End Huddo Boards
</VirtualHost>
```

Where:

-   `[CONNECTIONS_URL]` is the URL of your HCL Connections deployment</br>
-   `[KUBERNETES_NAME]` is the hostname/IP of the master in your cluster</br>
-   `[KUBERNETES_PORT]` is the port of your Ingress Controller (ie 32080)</br>

For example:

```apache
<VirtualHost *:443>
    ServerName connections.example.com

    #Huddo Boards
    ProxyPass "/boards" "http://kube-master.company.com:32080/boards"
    ProxyPassReverse "/boards" "http://kube-master.company.com:32080/boards"
    ProxyPass "/api-boards" "http://kube-master.company.com:32080/api-boards"
    ProxyPassReverse "/api-boards" "http://kube-master.company.com:32080/api-boards"
    #End Huddo Boards
</VirtualHost>
```
