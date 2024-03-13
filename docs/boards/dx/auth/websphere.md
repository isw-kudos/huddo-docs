# WebSphere OAuth Config

OAuth must be configured in IBM WebSphere for Boards to authenticate with HCL DX.

!!! tip

    Remember to replace `<username>` & `<password>` with valid credentials

Connect to the core server, e.g on Kubernetes:

    kubectl exec -it hcl-dx-dev1-core-0 core -n hcl-dx-dev1 -- sh

## Create Service Provider

!!! note

    These instructions are based on the [IBM documentation - Creating an OAuth service provider](https://www.ibm.com/docs/en/was/9.0.5?topic=services-creating-oauth-service-provider)

1.  Create the OAuth provider by using the wsadmin utility

        cd /opt/HCL/AppServer/bin
        ./wsadmin.sh -lang jython -username <username> -password <password>
        AdminTask.createOAuthProvider('[-providerName OAuthConfig -fileName /opt/HCL/AppServer/properties/OAuthConfigSample.xml]')
        AdminConfig.save()
        quit

1.  Enable Auto Authorize

    Edit the OAuthConfig.xml file which was just created. For a full list of supported options see the [IBM documentation](https://www.ibm.com/docs/en/was/9.0.5?topic=services-defining-oauth-service-provider).

    `vi /opt/HCL/wp_profile/config/cells/dockerCell/oauth20/OAuthConfig.xml`

        <parameter name="oauth20.autoauthorize.param" type="ws" customizable="false">
            <value>autoauthz</value>
        </parameter>
        <parameter name="oauth20.autoauthorize.clients" type="ws" customizable="true">
            <value>huddoboards</value>
        </parameter>

1.  Restart the WebSphere Application Server

        cd /opt/HCL/AppServer/bin
        ./stopServer.sh WebSphere_Portal -profileName wp_profile -username wpsadmin -password wpsadmin
        ./startServer.sh WebSphere_Portal -profileName wp_profile

1.  Check TAI Interceptor properties are set, if not please update as per below:

    `Global security` > `Trust association` > `Interceptors` > `com.ibm.ws.security.oauth20.tai.OAuthTAI`

        provider_1.name=OAuthConfig
        provider_1.filter=Authorization%=Bearer

    For example:

    ![OAuth TAI Config](oauth-tai.png)

## Register OAuth Client

!!! note

    These instructions are based on the [IBM documentation - Creating an OAuth service provider](https://www.ibm.com/docs/en/was/9.0.5?topic=services-creating-oauth-service-provider).

1.  copy default client definitions

        cp /opt/HCL/AppServer/properties/base.clients.xml /opt/HCL/wp_profile/config/cells/dockerCell/oauth20/

2.  edit file to include Huddo Boards client

    `vi /opt/HCL/wp_profile/config/cells/dockerCell/oauth20/base.clients.xml`

        <client id="huddoboards" component="<OAUTH_PROVIDER_NAME>" secret="<OAUTH_SECRET>" displayname="Huddo Boards" redirect="https://<BOARDS_URL>/auth/dx/<BASE_64_ENCODED_DX_HOSTNAME>/callback" enabled="true">
        </client>

    Where:

    -   `<OAUTH_PROVIDER_NAME>` is the name of the Provider specified above, typically `OAuthConfig`
    -   `<OAUTH_SECRET>` is a complex, random secret, e.g. a [UUID](https://www.uuidgenerator.net/). This will be required later.
    -   `<BOARDS_URL>` is the URL of the Boards deployment, e.g. `company.example.com/boards` or `boards.company.com`
    -   `<BASE_64_ENCODED_DX_HOSTNAME>` is a base64(dx-hostname) encoded string

    For example:

        <client id="huddoboards" component="OAuthConfig" secret="a2e3d8c3-7875-4512-a0da-8b5fd61f2245" displayname="Huddo Boards" redirect="https://boards.huddo.com/auth/dx/ZHhkZXYxLmlzd2xhYi5uZXQ=/callback" enabled="true">
        </client>

## Install OAuth Application

!!! note

    These instructions are based on the [IBM documentation - Enabling your system to use the OAuth 2.0 feature](https://www.ibm.com/docs/en/was/9.0.5?topic=services-enabling-your-system-use-oauth-20-feature).

1.  Install the OAuth 2.0 service provider application

        cd /opt/HCL/AppServer/bin
        ./wsadmin.sh -f ./installOAuth2Service.py install dockerNode WebSphere_Portal -profileName wp_profile -username <username> -password <password>

1.  Enable OAuth 2.0 TAI

        cd /opt/HCL/AppServer/bin
        ./wsadmin.sh -lang jython -username <username> -password <password>
        AdminTask.enableOAuthTAI()
        AdminConfig.save()
        quit

1.  Restart the WebSphere Application Server

        cd /opt/HCL/AppServer/bin
        ./stopServer.sh WebSphere_Portal -profileName wp_profile -username <username> -password <password>
        ./startServer.sh WebSphere_Portal -profileName wp_profile

---

## Troubleshooting

**Issue**: SSL Error

    ServletWrapper service CWSRV0014E: Uncaught service() exception root cause OAuth20EndpointServlet: javax.net.ssl.SSLHandshakeException: com.ibm.jsse2.util.j: PKIX path building failed: com.ibm.security.cert.IBMCertPathBuilderException: unable to find valid certification path to requested target

**Resolution**: Import the self-signed certificate into the WebSphere ISC
