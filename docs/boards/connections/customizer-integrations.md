# Connections Integrations using Connections Customizer

> **Note:** These instructions are for HCL Connections On-Premise

If you want to learn more about using Connections Customizer, have a read of the developer documentation on [GitHub](https://github.com/ibmcnxdev/customizer/blob/master/docs/HCLConnectionsCustomizer.md).

## Prerequisites

1. Connections Customizer is setup as [per documentation](https://help.hcltechsw.com/connections/v65/admin/install/cp_config_customizer_intro.html)
1. Download [boards-iframe-download-customizer.zip](/assets/connections/boards-task-integration-customiser.zip)

---

## Configure Reverse Proxy

As part of the Connections Customizer set up, you configured a reverse proxy.

Our Customizer app has integration points in all the standard Connections Applications. The rule in your reverse proxy conf that directs requests to `mw-proxy` (customizer) should include all Community paths. You might already be directing all traffic through Customizer, which will also work.


    location ~ ^/(files/customizer|files/app|communities/service/html|forums/html|search/web|homepage/web|social/home|mycontacts|wikis/home|blogs|news|activities/service/html|profiles/html|viewer) {
          proxy_pass http://MW_PROXY_SERVICE:30301;
      }

---

## Copy Files to Customizer Server

The script file that is injected by Customizer needs to be copied into a directory on the `mw-proxy` server.

1. Extract files from `boards-task-integration-customiser.zip`

1. You will need to change the variable `boardsIntegrationURL` in the common.js to the URL (or part there of) of Boards in your environment

1. Copy `common.js` & `files.js` into `/pv-connections/customizations/huddo-boards-integrations`

---

## Register Connections Integrations in Customizer

1. Go to the Connections Customizer App Registry, e.g `https://connections.example.com/appreg`

  > Note: To access App Registry, you need to have the `admin` Security Role for the Common application. This is configured in the WebSphere console

![App Registration Page](/assets/connections/appreg.png)

1. Add a new app.

1. Open Code Editor.

1. Import or copy the entire contents of `appreg-manifest.json` from `boards-task-integration-customiser.zip` into the code editor and click `Save`.

   > This saves you from completing all of the form fields for creating the app. You can edit the app now to customize names or directories if necessary.

---

![App Editor](/assets/connections/iframe-appreg.png)
