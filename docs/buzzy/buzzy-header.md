![Outcome](/assets/connections/header.png)


## Download the Application
The latest .ear from [here](/assets/connections/kudos-boards-frame.ear)

## Login to WebSphere ISC
This is usually accessible through a URL like:

    https://[DEPLOY_MANAGER_ALIAS]:9043/ibm/console/logon.jsp

![example](/assets/connections/isc.png)


## Create Config
1. Open `Environment` -> `WebSphere variables`

    Ensure the scope is selected as the `Cell`

    Click `New`

    ![example](/assets/connections/header/env1.png)


1. Set the following details and click `OK`

        EXTERNAL_APPS_CONFIG
        {"buzzy":"https://[BUZZY_URL]/l?team=[TEAM_NAME]&pagestyle=white"}

    Where `[BUZZY_URL]` is the URL of the Buzzy installation specified previously
    And `[TEAM_NAME]` is the teamname configured in buzzy.yml

    ![example](/assets/config/buzzy-header-console.png)

1. The config may require saving. Click `Save` if presented

    ![example](/assets/connections/isc-sync.png)


## Install the Header App
1. Open `Applications` -> `Application Types` -> `WebSphere enterprise applications`

    Click `Install`

    ![example](/assets/connections/header/app1.png)

1. Select the file and click `Next`

    ![example](/assets/connections/header/app2.png)

1. You can rename the App to buzzy-frame if you wish, then click `Next`

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

## Start the Header App
Tick the box next to the app name, and click `Start`

![example](/assets/connections/header/app9.png)

The app should now start. Congratulations, you have installed the app!

![example](/assets/connections/header/app10.png)


## Open Buzzy

You should now be able to load the Buzzy app with IBM Connections header at this path:

    https://[CONNECTIONS_URL]/buzzy

For example:

    https://connections.example.com/buzzy
