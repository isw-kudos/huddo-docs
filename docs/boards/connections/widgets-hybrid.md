# HCL Connections Widget Setup

Basic instructions for adding Huddo Boards Hybrid widgets into HCL Connections on-premise environments

---

### Community Widget

1.  Check out the widgets-config.xml file.

        execfile("profilesAdmin.py")
        ProfilesConfigService.checkOutWidgetConfig("/LCCheckedOut", AdminControl.getCell())

1.  Edit the widgets-config.xml file.

    Find the resource element with the type of community, e.g. `<resource ... type="community" ... >`, then under `<widgets>`, then within `<definitions>` add the following:

        <!-- Huddo Boards -->
        <widgetDef defId="HuddoBoards" modes="view fullpage" url="{webresourcesSvcRef}/web/com.ibm.social.urliWidget.web.resources/widget/urlWidget.xml" themes="wpthemeNarrow wpthemeWide wpthemeBanner" uniqueInstance="true">
            <itemSet>
                <item name="resourceId" value="{resourceId}"/>
                <item name="width" value="100%"/>
                <item name="height" value="500px"/>
                <item name="url" value="https://boards.huddo.com/community/connections"/>
            </itemSet>
        </widgetDef>
        <!-- END Huddo Boards -->

1.  Check in the widgets-config.xml file.

        ProfilesConfigService.checkInWidgetConfig()

1.  Restart the `Communities` application via the ISC

---

### Activity Stream widget

1. Open `Homepage` => `Administration`

    Click `Add another app`

    ![Example](/assets/connections/homepage-admin.png)

1. Select the following:

    - `OpenSocial Gadget`
    - `Trusted` and `Use SSO`
    - `Show for Activity Stream events`
    - `All servers`

    Click the `Add Mapping` button.

    ![Example](/assets/connections/homepage-admin2.png)

1. Enter values:

    - OAuth Client: `conn-ee`
    - Service name: `connections_service`

    Click `Ok`

1. Enter the following:

    | Field       | Value                                                        |
    | ----------- | ------------------------------------------------------------ |
    | App Title   | Huddo Boards Stream                                          |
    | URL Address | `https://boards.huddo.com/widgets/connections/url-gadget.xml` |
    | Icon URL    | `https://boards.huddo.com/favicon.ico`                        |

1. Scroll down and click `Save`

1. Select the newly defined app and click `Enable`

    ![Example](/assets/connections/homepage-admin6.png)

<!-- This is not needed for the iframe widget
### Register Widget

Required for HCL Connections 6.0 CR1 onwards:

    execfile("newsAdmin.py")
    NewsWidgetCatalogService.addWidget(title="Huddo Boards", url="http://boards.huddo.com/boards/community/connections" ,secureUrl="https://boards.huddo.com/boards/community/connections", categoryName=WidgetCategories.NONE, isHomepageSpecific=0, isDefaultOpened=0, multipleInstanceAllowed=0, isGadget=0, policyFlags=[GadgetPolicyFlags.TRUSTED], prereqs=['communities'], appContexts=["IWIDGETS"])
    NewsWidgetCatalogService.enableWidget("<ID_RETURNED>")
    NewsWidgetCatalogService.clearWidgetCaches()
-->

---

### CEC (Community Highlights)

Huddo Boards integrates with Connections Engagement Center

![Example](/assets/connections/highlights-boards.png)

1. Download the Boards [Hybrid widget definition file](/assets/boards/hybrid/custom.js)

1. Open the CEC (XCC) main admin page

      i.e. `https://connections.company.com/xcc/main`

1. Click `Customize`, `Engagement Center Settings`, expand `Customization Files` & click `Upload File`

     ![Example](/assets/connections/highlights-fileupload.png)

     > Note: you must have the admin role for the `Customize` button to appear

1. Select the `custom.js` downloaded previously

     > Note: the file must have this name. If you already have a `custom.js` file you must manually merge the contents. Copy the `HuddoBoards()` function and make sure to call it in `init()`

1. To validate:

      1. Open the `Highlights` application in a Community
      1. Click `Customize`, `Widgets` and `Huddo Boards`

         ![Example](/assets/connections/highlights-add-boards.png)
      
      1. The Boards Highlights widget should now appear at the end of the page

         ![Example](/assets/connections/highlights-boards.png)
