
### Configure Activity Stream posting access

1. Open WebSphere ISC & browse to the list of applications
1. Open the WidgetContainer application and choose 'Security role to user/group mapping'
1. Map the 'trustedExternalApplication' role to the special subject of 'All Authenticated in Application's Realm', then click OK
1. Save the changes

### WebSphere config for Buzzy

1. Open WebSphere ISC -> open web server -> edit `http.conf` -> add another VirtualHost

        <VirtualHost *:443>
          ServerName <BUZZY_URL>

          #Buzzy On-prem
          ProxyPreserveHost On
          ProxyPass / http://<KUBERNETES_NAME>:<KUBERNETES_PORT>/
          ProxyPassReverse / http://<KUBERNETES_NAME>:<KUBERNETES_PORT>/
          #End Buzzy On-prem

          SSLEnable
            # Disable SSLv2
            SSLProtocolDisable SSLv2
            # Set strong ciphers
            SSLCipherSpec TLS_RSA_WITH_AES_128_CBC_SHA
            SSLCipherSpec TLS_RSA_WITH_AES_256_CBC_SHA
            SSLCipherSpec SSL_RSA_WITH_3DES_EDE_CBC_SHA
        </VirtualHost>

        <VirtualHost *:443>
          ServerName <BUZZY_LOGGING_URL>

          #Buzzy On-prem
          ProxyPreserveHost On
          ProxyPass / http://<KUBERNETES_NAME>:<KUBERNETES_PORT>/
          ProxyPassReverse / http://<KUBERNETES_NAME>:<KUBERNETES_PORT>/
          #End Buzzy On-prem

          SSLEnable
            # Disable SSLv2
            SSLProtocolDisable SSLv2
            # Set strong ciphers
            SSLCipherSpec TLS_RSA_WITH_AES_128_CBC_SHA
            SSLCipherSpec TLS_RSA_WITH_AES_256_CBC_SHA
            SSLCipherSpec SSL_RSA_WITH_3DES_EDE_CBC_SHA
        </VirtualHost>

    Where:

      `<BUZZY_URL>` is the URL of your Boards deployment (as a domain)

      `<BUZZY_LOGGING_URL>` is the URL of your Boards deployment (as a domain)

      `<KUBERNETES_NAME>` is the hostname/IP of the master in your cluster

      `<KUBERNETES_PORT>` is the port of your Ingress Controller (ie 32080)

### Configure Proxy

  In order for IBM Connections to load the buzzy widgets, you must configure the IBM Connections proxy.

  ---

  1. SSH to the IBM Connections Deployment Manager (substitute the alias)

          ssh root@[DEPLOY_MANAGER_ALIAS]

  1. Start `wsadmin` (substiture your credentials)

          cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin/
          ./wsadmin.sh -lang jython -username connectionsadmin -password passw0rd

  1. Check out the proxy-config file

          execfile("connectionsConfig.py")
          LCConfigService.checkOutProxyConfig("/LCCheckedOut", AdminControl.getCell())

  1. Edit the proxy-config.tpl file and add the following proxy policy, replacing `<BUZZY_URL>`

          <proxy:policy url="https://<BUZZY_URL>/*" acf="none" basic-auth-support="true" auth-support="true">
            <proxy:actions>
              <proxy:method>GET</proxy:method>
              <proxy:method>POST</proxy:method>
              <proxy:method>PUT</proxy:method>
              <proxy:method>DELETE</proxy:method>
            </proxy:actions>
            <proxy:headers>
              <proxy:header>content-type</proxy:header>
              <proxy:header>accept-encoding</proxy:header>
              <proxy:header>uit</proxy:header>
              <proxy:header>pst</proxy:header>
              <proxy:header>User-Agent</proxy:header>
              <proxy:header>Accept.*</proxy:header>
              <proxy:header>Content.*</proxy:header>
              <proxy:header>Authorization.*</proxy:header>
              <proxy:header>X-Method-Override</proxy:header>
              <proxy:header>If-.*</proxy:header>
              <proxy:header>Pragma</proxy:header>
              <proxy:header>Cache-Control</proxy:header>
              <proxy:header>X-Update-Nonce</proxy:header>
            </proxy:headers>
            <proxy:cookies>
              <proxy:cookie>DomAuthSessId</proxy:cookie>
              <proxy:cookie>LtpaToken</proxy:cookie>
              <proxy:cookie>LtpaToken2</proxy:cookie>
              <proxy:cookie>Shimmer</proxy:cookie>
              <proxy:cookie>ShimmerS</proxy:cookie>
              <proxy:cookie>iwaSSL</proxy:cookie>
              <proxy:cookie>iwaSSL2</proxy:cookie>
              <proxy:cookie>JSESSIONID</proxy:cookie>
              <proxy:cookie>has</proxy:cookie>
              <proxy:cookie>PD-H-SESSION-ID</proxy:cookie><!-- TAM -->
              <proxy:cookie>PD-S-SESSION-ID</proxy:cookie><!-- TAM -->
              <proxy:cookie>SMIDENTITY</proxy:cookie><!-- SiteMinder -->
              <proxy:cookie>SMSESSION</proxy:cookie><!-- SiteMinder -->
            </proxy:cookies>
          </proxy:policy>

  1. Check in the proxy-config file

          LCConfigService.checkInProxyConfig("/LCCheckedOut", AdminControl.getCell())
