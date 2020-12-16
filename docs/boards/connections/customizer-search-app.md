# Search Integration with Connections Customizer

> **Note:** These instructions are for HCL Connections On-Premise

If you want to learn more about using Connections Customizer, have a read of the developer documentation on [GitHub](https://github.com/ibmcnxdev/customizer/blob/master/docs/HCLConnectionsCustomizer.md).

![Outcome](/assets/connections/search_main.png)

## Prerequisites

1. Connections Customizer is setup as [per documentation](https://www.ibm.com/support/knowledgecenter/en/SSYGQH_6.0.0/admin/install/cp_config_customizer_intro.html)
1. Download [boards-search-customizer.zip](/assets/connections/boards-search-customizer.zip)

---

## Configure Reverse Proxy

As part of the Connections Customizer set up, you configured a reverse proxy.

Our Customizer app has integration points in both the Search Sidebar and full Search page. The rule in your reverse proxy conf that directs requests to `mw-proxy` (customizer) should include all paths where the Search sidebar appears and the Search page. You might already be directing all traffic through Customizer, which will also work.


    location ~ ^/(files/customizer|files/app|communities/service/html|forums/html|search/web|homepage/web|social/home|mycontacts|wikis/home|blogs|news|activities/service/html|profiles/html|viewer) {
          proxy_pass http://MW_PROXY_SERVICE:30301;
      }

---

## Copy Files to Customizer Server

The script file that is injected by Customizer needs to be copied into a directory on the `mw-proxy` server.

1. Extract files from `boards-search-customizer.zip`

1. If you want to restrict messages between Huddo Boards and your Connections environment, replace `targetOrigin` with your connections host (e.g. `https://connections.example.com`)

1. Copy `plugin.js` into `/pv-connections/customizations/boards-search-customizer`

---

## Register Boards Search in Customizer

1. Go to the Connections Customizer App Registry, e.g `https://connections.example.com/appreg`

  > Note: To access App Registry, you need to have the `admin` Security Role for the Common application. This is configured in the WebSphere console

![App Registration Page](/assets/connections/appreg.png)

1. Add a new app.

1. Open Code Editor.

1. Import or copy the entire contents of `appreg-manifest.json` from `boards-search-customizer.zip` into the code editor and click `Save`.

   > This saves you from completing all of the form fields for creating the app. You can edit the app now to customize names or directories if necessary.

---

![App Editor](/assets/connections/appreg2.png)

## Testing

1. Use the Search Sidebar to search for content in Boards from different paths in Connections (e.g. homepage, profiles, activities, forums)

![Search Sidebar](/assets/connections/search_panel.png)

1. Use advanced search (`/search/web/jsp/advancedSearch.jsp`) to see Boards results integrated in the full search results page.

![Advanced Search Standalone Section](/assets/connections/search_main2.png)

    > Note: you need to have content in Boards to see any results.
