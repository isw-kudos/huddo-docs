## Configure Reverse Proxy

This document describes how to setup the proxy for serving the Boards application hosted in the Component pack by your Connections IHS

It also includes a proxy rewrite rule, to serve the migrated Board when the legacy Activity URL is requested.

1. Open WebSphere ISC

    This is usually accessible through a URL like:

        https://[DEPLOY_MANAGER_ALIAS]:9043/ibm/console/logon.jsp

    ![example](../../assets/connections/isc.png)

1. Open `Servers` -> `Server Types` => `Web servers`

    Click on the name of your web server

    ![example](../../assets/connections/httpd1.png)

1. Click `Edit` on the `http.conf`

    ![example](../../assets/connections/httpd2.png)

1. Define the Virtual Host Reverse Proxy

    Note: combine this with the existing VirtualHost entry

        <VirtualHost *:443>
          ServerName [CONNECTIONS_URL]

          RewriteEngine On
          RewriteRule ^/activities/service/html/(.*)$ /boards/activities/service/html/$1  [R]

          ProxyPass "/boards" "http://[KUBERNETES_NAME]:32080/boards"
          ProxyPassReverse "/boards" "http://[KUBERNETES_NAME]:32080/boards"
          ProxyPass "/api-boards" "http://[KUBERNETES_NAME]:32080/api-boards"
          ProxyPassReverse "/api-boards" "http://[KUBERNETES_NAME]:32080/api-boards"
        </VirtualHost>

    Where:

      `[CONNECTIONS-URL]` is the URL of your HCL Connections deployment</br>
      `[KUBERNETES_NAME]` is the hostname/IP of the master in your cluster</br>
      `[KUBERNETES_PORT]` is the port of your Ingress Controller (ie 32080)</br>

    For example:

        <VirtualHost *:443>
          ServerName connections.example.com

          #Huddo Boards
          ProxyPass "/boards" "http://kube-master.company.com:32080/boards"
          ProxyPassReverse "/boards" "http://kube-master.company.com:32080/boards"
          ProxyPass "/api-boards" "http://kube-master.company.com:32080/api-boards"
          ProxyPassReverse "/api-boards" "http://kube-master.company.com:32080/api-boards"
          #End Huddo Boards
        </VirtualHost>
