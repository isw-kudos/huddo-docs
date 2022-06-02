# HCL Connections Widget Setup

Add Huddo Boards Docker widgets into HCL Connections on-premise environments

---

### Community Widget

1. SSH to the WAS Deployment Manager

1. Start `wsadmin`

        cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
        ./wsadmin.sh -lang jython -user wasadmin -password <password-here>

1. Check out the `widgets-config.xml` file.

        execfile("profilesAdmin.py")
        ProfilesConfigService.checkOutWidgetConfig("/LCCheckedOut", AdminControl.getCell())

1. Edit the `widgets-config.xml` file.

    Find the resource element with the type of community, e.g. `<resource ... type="community" ... >`, then under `<widgets>`, then within `<definitions>` add the following, replacing `[BOARDS_URL]` with your URL:

        <!-- Huddo Boards -->
        <widgetDef defId="HuddoBoards" modes="view fullpage" url="{webresourcesSvcRef}/web/com.ibm.social.urliWidget.web.resources/widget/urlWidget.xml" themes="wpthemeNarrow wpthemeWide wpthemeBanner" uniqueInstance="true">
            <itemSet>
                <item name="resourceId" value="{resourceId}"/>
                <item name="width" value="100%"/>
                <item name="height" value="500px"/>
                <item name="url" value="https://[BOARDS_URL]/boards/community/connections"/>
            </itemSet>
        </widgetDef>
        <!-- END Huddo Boards -->

1. Disable Community Activity widget

    !!! tip
        this is optional but highly recommended for CP installations of Activities Plus

        Once Activities are migrated into Boards, it is recommended that the Community Activity widget is disabled to prevent confusion around the old data.

    Find and comment out the Activity widget with `defId="Activities"`

      <!-- Deprecated Activities widget, replaced by Activities Plus / Boards
      ...
      End of Deprecated Activities widget -->

    ![Disabled Activity Widget in widgets-config.xml](/assets/connections/widget-disable-activities.png)
     

1.  Check in the widgets-config.xml file.

        ProfilesConfigService.checkInWidgetConfig()

1.  Restart the `Communities` application via the ISC

!!! tip

    If widgets no longer load in Communities and you see errors in the browser console like:

        The following error occurs when retrieving widgetProcess production.
        com.ibm.jsse2.util.h: PKIX path building failed: com.ibm.security.cert.IBMCertPathBuilderException: unable to find valid certification path to requested target

    then please ensure the Connections domain root certificate is trusted in the WebSphere ISC. This can be added using `Retrieve from port` under `SSL certificate and key management` > `Key stores and certificates` > `CellDefaultTrustStore` > `Signer certificates`

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

1. Enter the following, replacing `[BOARDS_URL]` with your URL:

      | Field           | Value                                                     |
      | --------------- | --------------------------------------------------------- |
      | App Title       | Huddo Boards Stream                                       |
      | URL Address     | `https://[BOARDS_URL]/widgets/connections/url-gadget.xml` |
      | Icon URL        | `https://[BOARDS_URL]/favicon.ico`                        |
      | Icon Secure URL | `https://[BOARDS_URL]/favicon.ico`                        |

      Scroll down and click `Save`

1. Select the newly defined app and click `Enable`

    ![Example](/assets/connections/homepage-admin6.png)

---

### CEC (Community Highlights)

Huddo Boards integrates with Connections Engagement Center

![Example](/assets/connections/highlights-boards.png)

1. Download the Boards [CP widget definition file](/assets/boards/cp/custom.js)

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
