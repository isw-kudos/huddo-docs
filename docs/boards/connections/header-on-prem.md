# Connections Header Integration

!!! important

    This step is only required if you are hosting Huddo Boards on a different domain to HCL Connections.

![Outcome](/assets/connections/header.png)

---

## Connections Header via SSO

If you are running Boards on a standalone domain we recommend integrating with the Connections Header using SSO. Please follow these steps:

1. Reverse Proxy Config

    Please follow the instructions as part of the [HTTP Proxy config](/boards/connections/httpd/#connections-sso-header-config).

1. Enable in Boards

    Open the Boards admin page, select your `Organisation`, and then the `Connections` client

    ![example](/assets/connections/admin-client.png)

    Tick the checkbox for `Load Connections Header via SSO` and click `Save`

    ![example](/assets/connections/header-sso.png)

    Once you reload the page you should see the Connections header!

---

## iFrame App (Deprecated)

!!! warning
    
    This option is no longer recommended.

1. Download the Application

    The latest .ear from [here](/assets/connections/kudos-boards-frame.ear)

1. Login to WebSphere ISC

    This is usually accessible through a URL like:

        https://[DEPLOY_MANAGER_ALIAS]:9043/ibm/console/logon.jsp

    ![example](/assets/connections/isc.png)

1. Open `Environment` -> `WebSphere variables`

    Ensure the scope is selected as the `Cell`

    Click `New`

    ![example](/assets/connections/header/env1.png)


1. Set the following details and click `OK`

        EXTERNAL_APPS_CONFIG
        {"boards":"https://[BOARDS_URL]/auth/connections"}

    Where `[BOARDS_URL]` is the URL of the Boards installation specified previously

    ![example](/assets/connections/header/env-on-prem.png)

1. The config may require saving. Click `Save` if presented

    ![example](/assets/connections/isc-sync.png)

1. Open `Applications` -> `Application Types` -> `WebSphere enterprise applications`

    Click `Install`

    ![example](/assets/connections/header/app1.png)

1. Select the file and click `Next`

    ![example](/assets/connections/header/app2.png)

1. You can rename the App if you wish, then click `Next`

    ![example](/assets/connections/header/app4.png)

1. Select the checkbox for the module

    Hold shift while selecting both the `WebServer` and the `AppsCluster` from the list

    Click Apply

    The Servers should update on the right hand side

    Click `Next`

    ![example](/assets/connections/header/app5.png)

1. Click `Next`

    ![example](/assets/connections/header/app6.png)

1. Click `Finish`

    ![example](/assets/connections/header/app7.png)

1. The config may prompt to save. Click `Save`

    ![example](/assets/connections/header/app8.png)

    The application should now be installed

1. Start the Header App

    Tick the box next to the app name, and click `Start`

    ![example](/assets/connections/header/app9.png)

    The app should now start. Congratulations, you have installed the app!

    ![example](/assets/connections/header/app10.png)

1. Open Boards

    You should now be able to load the Boards app with HCL Connections header at this path:

        https://[CONNECTIONS_URL]/boards

    For example:

        https://connections.example.com/boards