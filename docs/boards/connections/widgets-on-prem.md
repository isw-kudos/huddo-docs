# HCL Connections Widget Setup

Basic instructions for adding Huddo Boards Docker widgets into HCL Connections on-premise environments

---

### Community Widget

1.  Check out the widgets-config.xml file.

        execfile("profilesAdmin.py")
        ProfilesConfigService.checkOutWidgetConfig("/LCCheckedOut", AdminControl.getCell())

1.  Edit the widgets-config.xml file.

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

      > Note: this is optional but highly recommended for CP installations of Activities Plus

      Once Activities are migrated into Boards, it is recommended that the Community Activity widget is disabled to prevent confusion around the old data.

      Find and comment out the Activity widget with `defId="Activities"`

        <!-- Deprecated Activities widget, replaced by Activities Plus / Boards
        ...
        End of Deprecated Activities widget -->

      ![Disabled Activity Widget in widgets-config.xml](/assets/connections/widget-disable-activities.png)
     

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

### ICEC (Community Highlights)

![Example](/assets/connections/highlights-communityboards.png)

1. Download the Boards [CP widget definition file](/assets/boards/cp/custom.js)

1. Open the ICEC (XCC) main admin page

      i.e. `https://connections.company.com/xcc/main`

1. Click `Customize`, `Settings`, expand `Customization Files` & click `Upload File`

     ![Example](/assets/connections/highlights-fileupload.png)

     > Note: you must have the admin role for the `Customize` button to appear

1. Select the `custom.js` downloaded previously

     > Note: the file must have this name. If you already have a `custom.js` file you must manually merge the contents of the `init` function

1. To validate:

      1. Open the `Highlights` application in a Community
      1. Click `Customize` & then `Create Widget`

         ![Example](/assets/connections/highlights-create.png)
      
      1. Select `Huddo Boards` from the menu and enter the ID: `CommunityBoards`

         ![Example](/assets/connections/highlights-def-community.png)

      1. Click `Create`. The Boards app should now appear

         ![Example](/assets/connections/highlights-communityboards.png)
