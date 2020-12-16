## Configure Reverse Proxy

1. Open WebSphere ISC

    This is usually accessible through a URL like:

        https://[DEPLOY_MANAGER_ALIAS]:9043/ibm/console/logon.jsp

    ![example](/assets/connections/isc.png)

1. Open `Servers` -> `Server Types` => `Web servers`

    Click on the name of your web server

    ![example](/assets/connections/httpd1.png)

1. Click `Edit` on the `http.conf`

    ![example](/assets/connections/httpd2.png)

1. Define the Virtual Host Reverse Proxy

    For details on these config options [please see here](/boards/kubernetes/#ssl-network-setup)

    **a) Boards as a Domain**

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

    **b) Boards as a path under Connections domain**

    Note: combine this with the existing VirtualHost entry

        <VirtualHost *:443>
          ServerName [CONNECTIONS_URL]

          #Huddo Boards
          ProxyPass "/boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/boards"
          ProxyPassReverse "/boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/boards"
          ProxyPass "/api-boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/api-boards"
          ProxyPassReverse "/api-boards" "http://[KUBERNETES_NAME]:[KUBERNETES_PORT]/api-boards"
          #End Huddo Boards
        </VirtualHost>

    Where:

      `[BOARDS-URL]` is the URL of your Boards deployment (as a domain)</br>
      `[CONNECTIONS-URL]` is the URL of your HCL Connections deployment</br>
      `[KUBERNETES_NAME]` is the hostname/IP of the master in your cluster</br>
      `[KUBERNETES_PORT]` is the port of your Ingress Controller (ie 32080)</br>
