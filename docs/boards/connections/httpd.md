# Proxy Config

## Open Proxy Config

1. Open WebSphere ISC

    This is usually accessible through a URL like:

        https://[DEPLOY_MANAGER_ALIAS]:9043/ibm/console/logon.jsp

    ![example](/assets/connections/isc.png)

1. Open `Servers` -> `Server Types` => `Web servers`

    Click on the name of your web server

    ![example](/assets/connections/httpd1.png)

1. Click `Edit` on the `http.conf`

    ![example](/assets/connections/httpd2.png)

---

## Configure Reverse Proxy

Boards can be configured either as a standalone domain, or on the same domain as HCL Connections. For details on these config options [please see here](/boards/kubernetes/#ssl-network-setup). Please follow the appropriate instructions below:


### a) New Boards Domain

> The following configuration should be set when Huddo Boards is deployed as a new domain.

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

#### Connections SSO Header config

!!! info 

    The following configuration is required to load the Connections Header via SSO from the Boards domain.

!!! note

    Customise the `SetEnvIf` domain below as required for your Boards domain.

```apache
# Huddo Boards - allow CORS related access control headers in requests for
Header unset Access-Control-Allow-Origin
SetEnvIf Origin "https://(boards\.huddo\.com)$" AccessControlAllowOrigin=$0
Header always set Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
Header always set Access-Control-Allow-Credentials "true" env=AccessControlAllowOrigin
Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT"
Header always set Access-Control-Allow-Headers "x-requested-with, Content-Type, origin, authorization, accept, client-security-token, Cache-Control, Content-Language, Expires, Last-Modified, Pragma, slug, X-Update-Nonce,x-ic-cre-request-origin,x-ic-cre-user,x-lconn-auth,x-shindig-st"
Header always set Access-Control-Expose-Headers "Content-Disposition, Content-Encoding, Content-Length, Date, Transfer-Encoding, Vary, ETag, Set-Cookie, Location, Connection, X-UA-Compatible, X-LConn-Auth, X-LConn-UserId, Authorization,x-ic-cre-user" env=AccessControlAllowOrigin

# Allow LtpaToken usage from Boards domain
Header edit Set-Cookie ^(.*)$ "$1; Secure; SameSite=None"
```


You may need to apply similar changes anywhere that the LtpaToken is issued. For example:

- via an `nginx` proxy:

    ```nginx
    # Allow LtpaToken usage from Boards domain
    proxy_cookie_flags LtpaToken Secure SameSite=None;
    proxy_cookie_flags LtpaToken2 Secure SameSite=None;
    ```

- Verse integration - see [HCL Domino documentation](https://help.hcltechsw.com/domino/12.0.0/admin/conf_samesite_cookie.html)

!!! tip

    Users may need to logout and login to Connections again for the LtpaToken cookie to be re-issued with SSO enabled

---

### b) Existing HCL Connections domain

> The following configuration should be set when Huddo Boards is deployed at a context root under the existing HCL Connections domain.

```apache
<VirtualHost *:443>
    ServerName [CONNECTIONS_URL]

    #Huddo Boards
    ProxyPass "/boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/boards"
    ProxyPassReverse "/boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/boards"
    ProxyPass "/api-boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/api-boards"
    ProxyPassReverse "/api-boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/api-boards"
    #End Huddo Boards
</VirtualHost>
```

Where:

- `[BOARDS-URL]` is the URL of your Boards deployment (as a domain)</br>
- `[CONNECTIONS-URL]` is the URL of your HCL Connections deployment</br>
- `[KUBERNETES_NAME]` is the hostname/IP of the master in your cluster</br>
- `[KUBERNETES_PORT]` is the port of your Ingress Controller (ie 32080)</br>
